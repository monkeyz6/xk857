---
title: List结构实战之微信抢红包
date: 2022-08-02 13:36
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
---
像微信抢红包的高峰期一般是在年底公司开年会和春节2个时间段，高峰的并发量是在几千万以上。
<!-- more -->

高峰的抢红包有3大特点：
1. 包红包的人多：也就是创建红包的任务比较多，即红包系统是以单个红包的任务来区分，特点就是在高峰期红包任务多。
2. 抢红包的人更多：当你发红包出去后，是几十甚至几百人来抢你的红包，即单红包的请求并发量大。
3. 抢红包体验：当你发现红包时，要越快抢到越开心，所以要求抢红包的响应速度要快，一般1秒响应。


## 微信抢红包的技术实现原理

- 包红包：先把金额拆解为小金额的红包，例如总金额100元发20个，用户在点保存的时候，就自动拆解为20个随机小红包。这里的存储就是个难题，多个金额（例如20个小金额的红包）如何存储？采用set？ list？ hash？
- 抢红包：高并发的抢红包时核心的关键技术，就是控制各个小红包的原子性。例如20个红包在500人的群里被抢，20个红包被抢走一个的同时要不红包的库存减1即剩下19个。
::: tip
在整个过程中抢走一个和红包库存减1个是一个原子操作。list的pop操作弹出一个元素的同时会自动从队列里面剔除该元素，它是一个原子性操作。
:::


### 包红包的接口
将总金额total元的红包拆分成count个，然后存储到List结构构成的缓存中。
```java 
@GetMapping(value = "/set")
public long setRedpacket(int total, int count) {
    //拆解红包
    Integer[] packet= this.splitRedPacket(total,count);
    //为红包生成全局唯一id
    long n=this.incrementId();
    //采用list存储红包
    String key=RED_PACKET_KEY+n;
    this.redisTemplate.opsForList().leftPushAll(key,packet);
    //设置3天过期
    this.redisTemplate.expire(key,3, TimeUnit.DAYS);
    log.info("拆解红包{}={}",key,packet);
    return n;
}
```

### 抢红包接口
::: tip
这里出现了两个List集合，分别代表红包集合(用户还没抢的小红包)和已抢红包的用户List，Key都是由红包id构成知识前缀不同。当用户抢到红包后，会存储到抢到红包的List中这个集合存储用户id。
:::
需要先判断用户是否抢过，根据红包id查询List缓存集合，如果该用户还没有抢红包，则从List集合中弹出一个数据，代表这个小红包的金额，并将该用户存储到抢到红包用户List中去。

```java 
@GetMapping(value = "/rob")
public int rob(long redid,long userid) {
    //第一步：验证该用户是否抢过
    Object packet=this.redisTemplate.opsForHash().get(RED_PACKET_CONSUME_KEY+redid,String.valueOf(userid));
    if(packet == null){
        //第二步：从list队列，弹出一个红包
        Object obj=this.redisTemplate.opsForList().leftPop(RED_PACKET_KEY+redid);
        if(obj!=null){
            //第三步：抢到红包存起来
            this.redisTemplate.opsForHash().put(RED_PACKET_CONSUME_KEY+redid,String.valueOf(userid),obj);
            log.info("用户={}抢到{}",userid,obj);
            //TODO 异步把数据落地到数据库上
            return (Integer) obj;
        }
        //-1 代表抢完
        return -1;
    }
    //-2 该用户代表已抢
    return -2;
}
```
说明：Redis是单线程的所以不用担心多线程的并发问题。
