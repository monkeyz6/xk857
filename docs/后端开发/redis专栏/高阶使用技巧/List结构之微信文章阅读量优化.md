---
title: List结构之微信文章阅读量优化
date: 2022-08-02 11:32
categories:
- java
- Redis
tags:
- java
- Redis
---


假设微信每天有10万篇文章，每篇文章的访问量10万。如果采用redis的incr命令来实现计数器的话，每天redis= 10亿次的写操作，1天高峰12小时算的话,
redis大约QPS= 57万。如此大的并发量，CPU单核必定100%，此种技术方案是行不通的。
<!-- more -->

::: tip
核心思路是给Redis降压，那么如何进行降压呢？我们可以设计出一个二级缓存，阅读量数据先存储到JVM的内存中，然后定时同步到Redis中。
:::

1. 文章服务采用了集群部署，在线上可以部署N台
2. 每个文章服务，增加了一级JVM缓存，即用Map存储在jvm。`Map<Long,Map<Integer,Integer>> = Map<时间块，Map<文章id,访问量>>`
3. 一级缓存定时器消费：定时器，定时(5分钟)从jvm的map把时间块的阅读pv取出来,
   然后push到redis的list数据结构中，list的存储结构为Map<文章id,访问量PV>即每个时间块的pv数据
4. 二级缓存定时器消费：定时器，定时(6分钟)从redis的list数据结构pop弹出Map<文章id,访问量 PV>，弹出来做了2件事:
    - 第一件事:先把Map<文章id，访问量PV>，保存到数据库
    - 第二件事:再把Map<文章id，访问量PV>，同步到redis缓存的计数器incr。
      以上4个步骤，用了一级缓存所有的高并发流量都收集到了本地JVM, 然后5分钟同步给二级缓存从而给redis降压。

## 案例实战：二级缓存的高并发微信文章的阅读量PV技术方案

### 1.准备工作，模拟大量PV请求

```java 
public class InitPVTask {
    @Autowired
    private RedisTemplate redisTemplate;
    
    @PostConstruct
    public void initPV(){
        log.info("启动模拟大量PV请求 定时器..........");
        new Thread(()->runArticlePV()).start();
    }
    
    /**
     * 模拟大量PV请求
     */
    public void runArticlePV() {
        while (true){
            this.batchAddArticle();
            try {
                //5秒执行一次
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * 对1000篇文章，进行模拟请求PV
     */
    public void   batchAddArticle() {
        for (int i = 0; i < 1000; i++) {
            this.addPV(new Integer(i));
        }
    }
    
    /**
     * 那如何切割时间块呢？ 如何把当前的时间切入时间块中？
     * 例如我们要计算“小时块”，先把当前的时间转换为为毫秒的时间戳，然后除以一个小时，
     * 即当前时间T/1000*60*60=小时key，然后用这个小时序号作为key。例如：
     * 2020-01-12 15:30:00=1578814200000毫秒 转换小时key=1578814200000/1000*60*60=438560
     * 2020-01-12 15:59:00=1578815940000毫秒 转换小时key=1578815940000/1000*60*60=438560
     * 2020-01-12 16:30:00=1578817800000毫秒 转换小时key=1578817800000/1000*60*60=438561
     * 剩下的以此类推，每一次PV操作时，先计算当前时间是那个时间块，然后存储Map中。
     */
    public void addPV(Integer id) {
        // 时间块为5分钟，小时块是除以1000*60*60，那么5分钟块就是1000*60*5
        long m5=System.currentTimeMillis()/(1000*60*5);
        // Constants.PV_MAP是map集合，您可以自行定义
        Map<Integer,Integer> mMap = Constants.PV_MAP.get(m5);
        if (CollectionUtils.isEmpty(mMap)){
            mMap=new ConcurrentHashMap();
            mMap.put(id,new Integer(1));
            //<5分钟的时间块，Map<文章Id,访问量>>
            Constants.PV_MAP.put(m5, mMap);
        }else {
            //通过文章id 取出浏览量
            Integer value=mMap.get(id);
            if (value==null){
                mMap.put(id,new Integer(1));
            }else{
                mMap.put(id,value+1);
            }
        }
    }
}
```

### 2.一级缓存定时器消费

一级缓存定时器消费：定时器，定时(5分钟)从jvm的map把时间块的阅读pv取出来,
然后push到redis的list数据结构中，list的存储结构为Map<文章id,访问量PV>即每个时间块的pv数据

```java 
public class OneCacheTask {

    @Autowired
    private RedisTemplate redisTemplate;

    @PostConstruct
    public void cacheTask(){
        log.info("启动定时器：一级缓存消费..........");
        new Thread(()->runCache()).start();
    }

    /**
     * 一级缓存定时器消费
     * 定时器，定时（5分钟）从jvm的map把时间块的阅读pv取出来，
     * 然后push到reids的list数据结构中，list的存储的书为Map<文章id，访问量PV>即每个时间块的pv数据
     */
    public void runCache() {
        while (true){
            this.consumePV();
            try {
                //间隔1.5分钟 执行一遍
                Thread.sleep(90000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            log.info("消费一级缓存，定时刷新..............");
        }
    }


    public void consumePV() {
        long m5 = System.currentTimeMillis()/(1000*60*5);
        Iterator<Long> iterator = Constants.PV_MAP.keySet().iterator();
        while (iterator.hasNext()) {
            // 取出map的时间块
            Long key=iterator.next();
            // 小于当前的分钟时间块key ，就消费
            if (key < m5) {
                // 先push
                Map<Integer,Integer> map=Constants.PV_MAP.get(key);
                // push到reids的list数据结构中，list的存储的书为Map<文章id，访问量PV>即每个时间块的pv数据
                this.redisTemplate.opsForList().leftPush(Constants.CACHE_PV_LIST,map);
                // 后remove
                Constants.PV_MAP.remove(key);
                log.info("push进{}",map);
            }
        }
    }
}
```

### 3.二级缓存定时器消费
::: tip
二级缓存定时器消费：定时器，定时(6分钟)从redis的list数据结构pop弹出Map<文章id,访问量 PV>，弹出来做了2件事:
  - 第一件事:先把Map<文章id，访问量PV>，保存到数据库
  - 第二件事:再把Map<文章id，访问量PV>，同步到redis缓存的计数器incr。
:::



```java
public class TwoCacheTask {

    @Autowired
    private RedisTemplate redisTemplate;

    @PostConstruct
    public void cacheTask() {
        log.info("启动定时器：二级缓存消费..........");
        new Thread(()->runCache()).start();
    }

    /**
     * 二级缓存定时器消费
     * 定时器，定时（6分钟），从redis的list数据结构pop弹出Map<文章id，访问量PV>，弹出来做了2件事：
     * 第一件事：先把Map<文章id，访问量PV>，保存到数据库
     * 第二件事：再把Map<文章id，访问量PV>，同步到redis缓存的计数器incr。
     */
    public void runCache() {
        while (true){
            while (this.pop()){
            
            }
            try {
                //间隔2分钟 执行一遍
                Thread.sleep(1000*60*2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            log.info("消费二级缓存，定时刷新..............");
        }
    }


    public boolean pop(){
        //从redis的list数据结构pop弹出Map<文章id，访问量PV>
        ListOperations<String, Map<Integer,Integer>> operations= this.redisTemplate.opsForList();
        Map<Integer,Integer> map= operations.rightPop(Constants.CACHE_PV_LIST);
        log.info("弹出pop={}",map);
        if (CollectionUtils.isEmpty(map)){
            return false;
        }
        
        // 第一步：先存入数据库
        // TODO: 插入数据库

        //第二步：同步redis缓存
        for (Map.Entry<Integer,Integer> entry:map.entrySet()){
            // log.info("key={},value={}",entry.getKey(),entry.getValue());
            String key=Constants.CACHE_ARTICLE+entry.getKey();
            // 调用redis的increment命令
            long n=this.redisTemplate.opsForValue().increment(key,entry.getValue());
            // log.info("key={},pv={}",key, n);
        }
        return true;
    }
}
```

### 4.查看浏览量
```java 
    @GetMapping(value = "/view")
    public String view(Integer id) {
        String key= Constants.CACHE_ARTICLE+id;
        //调用redis的get命令
        String n=this.stringRedisTemplate.opsForValue().get(key);
        log.info("key={},阅读量为{}",key, n);
        return n;
    }
```
