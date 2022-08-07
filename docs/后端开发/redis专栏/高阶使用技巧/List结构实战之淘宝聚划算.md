---
title: List结构实战之淘宝聚划算
date: 2022-08-02 12:12
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
---

先来分析下淘宝聚划算的特点，访问量大但是更新频率不高且更新频率固定，但是数据是分页的所以必然要支持分页才行。
<!-- more -->
::: tip
redis的list数据结构天然支持这种高并发的分页查询功能，具体的技术方案采用lpush和lrange来实现。
:::
- **lpush**：将插入的数据放在列表的开头，假设列表是从左往右放置的，每次使用LPUSH命令插入元素就是把这个元素放在最左侧
- **lrange**：返回指定索引范围的元素，列表的第一个元素索引是0，第二个元素索引是1，依次类推，也可以使用负数索引，-1表示最后一个元素索引，-2表示倒数第二个元素的索引。

```shell
## 先用定时器把数据刷新到list中
127.0.0.1:6379> lpush jhs p1 p2 p3 p4 p5 p6 p7 p8 p9 p10
(integer) 10
## 用lrange来实现分页
127.0.0.1:6379> lrange jhs 0 5
1) "p10"
2) "p9"
3) "p8"
4) "p7"
5) "p6"
6) "p5"
127.0.0.1:6379> lrange jhs 6 10
1) "p4"
2) "p3"
3) "p2"
4) "p1"
```

### 步骤1：采用定时器把特价商品都刷入redis缓存中
```java 
@Service
@Slf4j
public class TaskService {

    @Autowired
    private RedisTemplate redisTemplate;

    @PostConstruct
    public void initJHS(){
        log.info("启动定时器..........");
        new Thread(()->runJhs()).start();
    }

    /**
     * 模拟定时器，定时把数据库的特价商品，刷新到redis中
     */
    public void runJhs() {
        while (true){
            // 模拟从数据库读取100件特价商品，用于加载到聚划算的页面中
            List<Product> list = this.products();
            // 采用redis list数据结构的lpush来实现存储
            this.redisTemplate.delete(Constants.JHS_KEY);
            // lpush命令
            this.redisTemplate.opsForList().leftPushAll(Constants.JHS_KEY,list);
            try {
                //间隔一分钟 执行一遍
                Thread.sleep(1000*60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            log.info("runJhs定时刷新..............");
        }
    }


    /**
     * 模拟从数据库读取100件特价商品，用于加载到聚划算的页面中
     */
    public List<Product> products() {
        List<Product> list=new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            Random rand = new Random();
            int id= rand.nextInt(10000);
            Product obj=new Product((long) id,"product"+i,i,"detail");
            list.add(obj);
        }
        return list;
    }
}
```



### 步骤2：redis分页查询
分页查询：在高并发的情况下，只能走redis查询，走db的话必定会把db打垮
```java 
@GetMapping(value = "/find")
public List<Product> find(int page, int size) {
    List<Product> list=null;
    long start = (page - 1) * size;
    long end = start + size - 1;
    try {
        // 采用redis list数据结构的lrange命令实现分页查询
        list = this.redisTemplate.opsForList().range(Constants.JHS_KEY, start, end);
        if (CollectionUtils.isEmpty(list)) {
            //TODO 走DB查询
        }
        log.info("查询结果：{}", list);
    } catch (Exception ex) {
        //这里的异常，一般是redis瘫痪 ，或 redis网络timeout
        log.error("exception:", ex);
        //TODO 走DB查询
    }
    return list;
}
```


::: tip
当查询QPS= 1000的时候，这时定时器更新redis，先删除再添加就会出现缓存击穿的问题。就必定导致大量的请求都打到数据库上面，从而把数据库打垮，这就出现了缓存击穿问题，那么该如何解决呢？
::: 



