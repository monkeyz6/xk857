---
title: 基于Redis的高并发随机展示 - Set实战之QQ群、微博好友随机推荐
date: 2022-08-01 19:47
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
---

为什么要随机展示？ 因为展示的区域有限，在那么小的地方展示全部数据是不可能的，通常的做法就是随机展示一批数据，然后用户点击“换一换”按钮，再随机展示另一批。
<!-- more -->

QQ群随机推荐

![image-20210523194426809](https://xk857.com/typora/2021/05image-20210523194426809.png)

微博随机推荐

![image-20210523194630209](https://xk857.com/typora/2021/05image-20210523194630209.png)


### 随机展示的redis技术方案

::: tip
上文已经说了随机展示的原因就是区域有限，而区域有限的地方通常就是首页或频道页，这些位置通常都是访问量并发量非常高的，
一般是不可能采用数据库来实现的，通常都是Redis来实现。
:::

redis的实现技术方案:
1. 先把数据准备好，把所有需要展示的内容存入redis的Set数据结构中。 
2. 通过`srandmember`命令随机拿一批数据出来。



### 实现QQ群随机推荐

数据模拟

```java
@Component
public class TaskCrowdService {

    @Autowired
    private RedisTemplate redisTemplate;

    public static final String CROWD_KEY = "crowd";

    /**
     *提前先把数据刷新到redis缓存中。
     */
    @PostConstruct
    public void init(){
        List<String> crowds=this.crowd();
        this.redisTemplate.delete(CROWD_KEY);
        crowds.forEach(t->this.redisTemplate.opsForSet().add(CROWD_KEY,t));
    }

    /**
     * 模拟100个热门群，用于推荐
     */
    public List<String> crowd() {
        List<String> list=new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            Random rand = new Random();
            int id= rand.nextInt(100000);
            list.add("群"+id);
        }
        return list;
    }

}
```

接口实现

```java
@GetMapping(value = "/crowd")
public List<String> crowd() {
    List<String> list=null;
    try {
        //采用redis set数据结构，随机取出10条数据
        list = this.redisTemplate.opsForSet().randomMembers(TaskCrowdService.CROWD_KEY,10);
    } catch (Exception ex) {
        //这里的异常，一般是redis瘫痪 ，或 redis网络timeout
        //TODO 走DB查询
    }
    return list;
}
```


### 实现微博榜单随机推荐

::: tip
微博榜单是整块数据的，所以随机的数据要按块来推荐，这里和QQ榜单不一样，所以我们要定义一个java bean来包装整块数据。
什么叫按块分数据的？意思是榜单是不同的，如知音漫画榜、亚洲娱乐榜等等。
:::

构建javaBean

```java
@Data
public class WeiboList {
    
    private int id;
    /**
     * 榜单名称
     */
    private String name;

    private List<String> users;

}
```

模拟数据

```java
@Component
public class TaskWeibolistService {

    @Autowired
    private RedisTemplate redisTemplate;

    public static final String WEIBO_LIST_KEY = "weibo:list";
    
    @PostConstruct
    public void init() {
        List<WeiboList> crowds = this.list();
        redisTemplate.delete(WEIBO_LIST_KEY);
        crowds.forEach(t->redisTemplate.opsForSet().add(WEIBO_LIST_KEY,t));
    }

    /**
     * 模拟10个热门榜单，用于推荐
     */
    public List<WeiboList> list() {
        List<WeiboList> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            WeiboList wl = new WeiboList();
            wl.setId(i);
            wl.setName("榜单" + i);
            Random rand = new Random();
            List<String> users = new ArrayList<>();
            for (int j = 0; j < 3; j++) {
                int id = rand.nextInt(10000);
                users.add("user:" + id);
            }
            wl.setUsers(users);
            list.add(wl);
        }
        return list;
    }
}
```

编写随机查询接口

```java
@GetMapping(value = "/weibolist")
public WeiboList weibolist() {
    WeiboList list=null;
    try {
        //随机取1块数据
        list = (WeiboList)this.redisTemplate.opsForSet().randomMember(TaskWeibolistService.WEIBO_LIST_KEY);
    } catch (Exception ex) {
        //这里的异常，一般是redis瘫痪 ，或 redis网络timeout
        //TODO 走DB查询
    }
    return list;
}
```

