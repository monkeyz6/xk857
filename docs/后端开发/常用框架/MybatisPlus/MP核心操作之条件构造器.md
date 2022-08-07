---
title: MP核心操作之条件构造器
date: 2021-05-29 17:19
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

这是MybatisPlus最为核心的功能了，之前在[基础入门之增删改查](/后端开发/常用框架/MybatisPlus/基础入门之增删改查)提到过一些简单的逻辑不需要去写sql就可以完成，这个SQL就是使用条件构造器去构造的。
<!-- more -->

|     属性      |                       解释                        |
|:-----------:|:-----------------------------------------------:|
|     eq      |                      等于 =                       |
|     ne      |                     不等于 <>                      |
|     gt      |                      大于 >                       |
|     ge      |                     大于等于 >=                     |
|     lt      |                      小于 <                       |
|     le      |                     小于等于 <=                     |
|   between   |                BETWEEN 值1 AND 值2                |
| notBetween  |              NOT BETWEEN 值1 AND 值2              |
|     in      |               in("age", 1, 2, 3)                |
|    notIn    |              notIn("age",{1,2,3})               |
|   groupBy   |              groupBy("id", "name")              |
| orderByAsc  |            orderByAsc("id", "name")             |
| orderByDesc |            orderByDesc("id", "name")            |
|   orderBy   |        orderBy(true, true, "id", "name")        |
|   having    |          having("sum(age) > {0}", 11)           |
|     and     | and(i -> i.eq("name", "李白").ne("status", "活着")) |


## 使用案例
我把[基础入门之增删改查](/后端开发/常用框架/MybatisPlus/基础入门之增删改查)中使用到条件构造器的地方复制了一部分，其中QueryWrapper是构建查询语句，UpdateWrapper是构建修改语句，二者的区别是UpdateWrapper多了set属性。
```java 
@Autowired
private UserMapper userMapper;

public void update(User user) {
    //构建条件
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    //根据用户名更新，参数1对应数据库中的字段
    wrapper.eq("user_name","zhangsan");
    //参数1：实体对象
    userMapper.update(user, wrapper);
}

public void update2(User user) {
    //构建条件
    UpdateWrapper<User> wrapper = new UpdateWrapper<>();
    //更改"user_name"为"zhangsan"的age和password字段
    wrapper.set("age",21).set("password","88888").eq("user_name","zhangsan");
    //参数1：实体对象
    userMapper.update(null, wrapper);
}
```











