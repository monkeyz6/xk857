---
title: zset实战之微博热度排行榜
date: 2022-08-01 20:02
categories:
- java
- Redis
tags:
- java
- Redis
---


像微博、百度这种高并发实时计算的排行榜，根本就不可能用db实现，db实现小时、天、周、月的排行榜，难度及其大，而且表结构的设计也非常难。
再者db也扛不住这么大的并发量，所以高并发实时的排行榜天然适合用redis来实现。
<!-- more -->
::: tip
知识回顾：相比于set，zset增加了一个权重参数score，使得集合中的元素能够按score进行有序排列，还可以通过score的范围来获取元素的列表。
:::

::: tip
整体的技术实现是采用redis的zset来实现，每条微博是一个member，每条微博的热度值为一个score.
思考:那如何把小时、天、周、月的数据，实时计算呢?估计大家都能想到时间戳，我们可以截取时间戳将去变换为小时的时间戳。
:::

我们以小时为单位，即每个小时为一个zset
- 近24小时，就合并24个zset 
- 近7天，就合并24*74zset 
- 近30天（月），就合并24*30个zset

怎样合并？求并集

::: tip
如何实现以每个小时为一个zset ?如何把时间切割为小时? 先把当前的时间转换为为毫秒的时间戳，然后除以一个小时，即当前时间T/1000*60*60=小时key，然后用这个小时序号作为zset的key。
:::

例如:
2020-01-12 15:30:00=1578814200000毫秒转换小时key=1578814200000/1000*60*60=438560

2020-01-12 15:59:00=1578815940000毫秒转换小时key=1578815940000/1000*60*60=438560

2020-01-12 16:30:00=1578817800000毫秒转换小时key=1578817800000/1000*60*60=438561
剩下的以此类推

::: tip
有了这个思路，剩下的工作就是每次某个微博热度有变化，先计算当前的小时key，然后把当前的微博作为member，热度值作为score，加入zset中。

redis zset命令： zadd小时key热度值微博内容
:::

技术模拟思路：
采用26个英文字母来实现排行，随机为每个字母生成一个随机数作为score.
 为了更好的体验，先做几件事：
1. 先初始化1个月的历史数据
2. 定时5秒钟，模拟微博的热度刷新（例如模拟点赞 收藏 评论的热度值更新）
3. 定时1小时合并统计 天、周、月的排行榜。



### 步骤1：先初始化1个月的历史数据
```java
@Service
@Slf4j
public class InitService {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 先初始化1个月的历史数据
     */
    public void init30day(){
        //计算当前的小时key
        long hour=System.currentTimeMillis()/(1000*60*60);
        //初始化近30天，每天24个key
        for(int i=1;i<24*30;i++){
            //倒推过去30天
            String  key=Constants.HOUR_KEY+(hour-i);
            this.initMember(key);
            System.out.println(key);
        }
    }

    /**
     * 初始化某个小时的key
     */
    public void initMember(String key) {
        Random rand = new Random();
        //采用26个英文字母来实现排行，随机为每个字母生成一个随机数作为score，每个数字所代表的就是微博标题
        for(int i = 1;i<=26;i++){
            this.redisTemplate.opsForZSet().add(key,String.valueOf((char)(96+i)),rand.nextInt(10));
        }
    }
}
```

### 步骤2：定时刷新数据
```java 
@Service
@Slf4j
public class TaskService {
    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 2. 定时5秒钟，模拟微博的热度刷新（例如模拟点赞 收藏 评论的热度值更新）
     * 3. 定时1小时合并统计 天、周、月的排行榜。
     */
    @PostConstruct
    public void init(){
        log.info("启动初始化..........");
        //2. 定时5秒钟，模拟微博的热度刷新（例如模拟点赞 收藏 评论的热度值更新）
        new Thread(()->this.refreshDataHour()).start();
        //3. 定时1小时合并统计 天、周、月的排行榜。
        new Thread(()->this.refreshData()).start();
    }

    /**
     * 采用26个英文字母来实现排行，随机为每个字母生成一个随机数作为score
     */
    public void refreshHour(){
        // 计算当前的小时key
        long hour=System.currentTimeMillis()/(1000*60*60);
        // 为26个英文字母来实现排行，随机为每个字母生成一个随机数作为score
        Random rand = new Random();
        for(int i = 1;i<=26;i++){
            // redis的ZINCRBY 新增这个积分值
            this.redisTemplate.opsForZSet().incrementScore(Constants.HOUR_KEY+hour,String.valueOf((char)(96+i)),rand.nextInt(10));
        }
    }

    /**
     * 刷新当天的统计数据
     */
    public void refreshDay(){
        long hour=System.currentTimeMillis()/(1000*60*60);
        List<String> otherKeys=new ArrayList<>();
        // 算出近24小时内的key
        for(int i=1;i<23;i++){
            String key = Constants.HOUR_KEY+(hour-i);
            otherKeys.add(key);
        }
        // 把当前的时间key，并且把后推23个小时，共计近24小时，求出并集存入Constants.DAY_KEY中。
        // 这里根据业务可以更改，如果是查询当天的，可以获取日期+0点组成时间戳，这样的话调用逻辑也有所更改
        // redis ZUNIONSTORE 求并集
        this.redisTemplate.opsForZSet().unionAndStore(Constants.HOUR_KEY+hour,otherKeys,Constants.DAY_KEY);

        // 设置当天的key 40天过期，不然历史数据浪费内存
        for(int i=0;i<24;i++){
            String  key=Constants.HOUR_KEY+(hour-i);
            this.redisTemplate.expire(key,40, TimeUnit.DAYS);
        }
        log.info("天刷新完成..........");
    }
    
    /**
     * 刷新7天的统计数据
     */
    public void refreshWeek(){
        long hour=System.currentTimeMillis()/(1000*60*60);
        List<String> otherKeys=new ArrayList<>();
        //算出近7天内的key
        for(int i=1;i<24*7-1;i++){
            String  key=Constants.HOUR_KEY+(hour-i);
            otherKeys.add(key);
        }
        //把当前的时间key，并且把后推24*7-1个小时，共计近24*7小时，求出并集存入Constants.WEEK_KEY中
        this.redisTemplate.opsForZSet().unionAndStore(Constants.HOUR_KEY+hour,otherKeys,Constants.WEEK_KEY);

        log.info("周刷新完成..........");
    }

    /**
     *刷新30天的统计数据
     */
    public void refreshMonth(){
        long hour=System.currentTimeMillis()/(1000*60*60);
        List<String> otherKeys=new ArrayList<>();
        // 算出近30天内的key
        for(int i=1;i<24*30-1;i++){
            String  key=Constants.HOUR_KEY+(hour-i);
            otherKeys.add(key);
        }
        // 把当前的时间key，并且把后推24*30个小时，共计近24*30小时，求出并集存入Constants.MONTH_KEY中
        this.redisTemplate.opsForZSet().unionAndStore(Constants.HOUR_KEY+hour,otherKeys,Constants.MONTH_KEY);
        log.info("月刷新完成..........");
    }

    /**
     * 定时1小时合并统计 天、周、月的排行榜。
     */
    public void refreshData(){
        while (true){
            // 刷新当天的统计数据
            this.refreshDay();
            // 刷新7天的统计数据
            this.refreshWeek();
            // 刷新30天的统计数据
            this.refreshMonth();
            // TODO 在分布式系统中，建议用xxljob来实现定时
            try {
                Thread.sleep(1000*60*60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 定时5秒钟，模拟微博的热度刷新（例如模拟点赞 收藏 评论的热度值更新）
     */
    public void refreshDataHour(){
        while (true){
            this.refreshHour();
            // TODO 在分布式系统中，建议用xxljob来实现定时
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```


### 步骤3：排行榜查询接口
```java
@RestController
@Slf4j
public class Controller {

    @Autowired
    private RedisTemplate redisTemplate;


    @GetMapping(value = "/getHour")
    public Set getHour() {
        long hour=System.currentTimeMillis()/(1000*60*60);
        //ZREVRANGE 返回有序集key中，指定区间内的成员,降序。
        Set<ZSetOperations.TypedTuple<Integer>> rang= this.redisTemplate.opsForZSet().reverseRangeWithScores(Constants.HOUR_KEY+hour,0,30);
        return rang;
    }
    
    @GetMapping(value = "/getDay")
    public Set getDay() {
        Set<ZSetOperations.TypedTuple<Integer>> rang= this.redisTemplate.opsForZSet().reverseRangeWithScores(Constants.DAY_KEY,0,30);
        return rang;
    }

    @GetMapping(value = "/getWeek")
    public Set getWeek() {
        Set<ZSetOperations.TypedTuple<Integer>> rang= this.redisTemplate.opsForZSet().reverseRangeWithScores(Constants.WEEK_KEY,0,30);
        return rang;
    }

    @GetMapping(value = "/getMonth")
    public Set getMonth() {
        Set<ZSetOperations.TypedTuple<Integer>> rang= this.redisTemplate.opsForZSet().reverseRangeWithScores(Constants.MONTH_KEY,0,30);
        return rang;
    }
}
```

> 本篇文章的设计思路非本人所想，来源于网络文章，原文章未能找到，如果有找到的请评论区留言告知。
