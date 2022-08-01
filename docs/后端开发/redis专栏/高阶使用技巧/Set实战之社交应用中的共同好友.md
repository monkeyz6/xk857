---
title: Set之社交应用中的共同好友
date: 2022-08-01 15:39
categories:
- java
- Redis
tags:
- java
- Redis
---

在社交应用中，有时需要获取共同好友、全部好友以及专属于某个人的好友，用户推荐算法中肯定会用到这些数据。利用Redis中Set结构的API能够查询到两个Set结构交集、并集和差集的数据。
<!-- more -->

实践：

```java
@Autowired
private RedisTemplate redisTemplate;

public void test03() {
    // 用户A
    BoundSetOperations operationsA = redisTemplate.boundSetOps("user:a");
    // 关注了用户A的用户
    operationsA.add("A","B","C","D");
    System.out.println("老A的粉丝"+operationsA.members());

    BoundSetOperations operationsB = redisTemplate.boundSetOps("user:b");
    operationsB.add("A","B","F","G","O","W");
    System.out.println("老B的粉丝"+operationsB.members());

    // 差集
    Set setA = operationsA.diff("user:b");
    System.out.println("A的专属用户"+setA);

    // 交集
    Set set = operationsA.intersect("user:b");
    System.out.println("共同好友"+set);
    
    // 并集
    Set union = operationsA.union("user:b");
    System.out.println("全部好友"+union);
    
    Boolean c = operationsA.isMember("C");
    System.out.println("用户c是不是老王的粉丝"+c);
}
```

结果输出

```java
老A的粉丝[A, C, D, B]
老B的粉丝[W, A, F, G, O, B]
A的专属用户[D, C]
共同好友[A, B]
全部好友[W, A, C, G, F, D, O, B]
用户c是不是老王的粉丝true
```

