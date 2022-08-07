---
title: Set实战之支付宝天天抽奖
date: 2022-08-01 19:39
categories:
- java
- Redis
- SpringBoot
tags:
- java
- SpringBoot
- Redis
---

思考一个问题：同样是抽奖，那么支付宝的抽奖和京东京豆的抽奖有什么区别？技术又该如何实现呢？
<!-- more -->

1. 京豆抽奖：奖品是可以重复，例如抽5京豆可以再抽到5京豆，即京豆是无限量抽。
2. 支付宝抽奖： 奖品不能重复抽，例如1万人抽1台华为手机；再给大家举一个熟悉的例子： 例如公司年会，抽中奖品的人，下一轮就不能重复抽取，不然就会重复中奖。

::: tip
技术方案和京东的京豆类似，但是不同的是：京东的京豆用了`srandmember`命令，即随机返回set的一个元素。支付宝的抽奖要用spop命令，即随机返回并删除set中一个元素，为什么呢？

因为支付宝的奖品有限，不能重复抽，故抽奖完后，必须从集合中剔除中奖的人。再举个每个人都参与过的例子，年会抽奖，你公司1000人，年会抽奖3等奖500名100元，2等奖50名1000元，1等奖10名10000元，在抽奖的设计中就必须把已中奖的人剔除，不然就会出现重复中奖的概率。
:::


步骤1：初始化抽奖数据

```java
@Component
public class ZFBTask {

    @Autowired
    private RedisTemplate redisTemplate;

    public static final String PRIZE_ZFB_KEY = "zfb";
    
    
    /**
     * 提前先把数据刷新到redis缓存中。
     */
    @PostConstruct
    public void init() {
        boolean bo = redisTemplate.hasKey(PRIZE_ZFB_KEY);
        if (!bo) {
            List<Integer> crowds = this.prize();
            crowds.forEach(t -> redisTemplate.opsForSet().add(PRIZE_ZFB_KEY, t));
        }
    }

    /**
     * 模拟10个用户来抽奖 list存放的是用户id
     * 例如支付宝参与抽奖，就把用户id加入set集合中
     * 例如公司抽奖，把公司所有的员工，工号都加入到set集合中
     * 这里面的i代表了多少人，凡是有人参与就将其加入到Redis中
     */
    public List<Integer> prize() {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            list.add(i);
        }
        return list;
    }
}
```

编写抽奖接口：

```java
@RestController
@RequestMapping("/api/zfb")
public class ZFBController {

    @Autowired
    private RedisTemplate redisTemplate;
    
    /**
     * 抽奖接口
     * @param num 代表有几台奖品
     * @return
     */
    @GetMapping("/prize2")
    public List<Integer> prize2(int num) {
        SetOperations<String, Integer> setOperations = redisTemplate.opsForSet();
        // 随机返回并删除Set中的一个元素，从redis中随机寻找一个用户，返回并在redis中将其删除
        List<Integer> objs = setOperations.pop(JdTask.PRIZE_ZFB_KEY, num);
        return objs;
    }
}
```

使用方式：例如三等奖3名，则传入num为3；二等奖2名，传入num为2
