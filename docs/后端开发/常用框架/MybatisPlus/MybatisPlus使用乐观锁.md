---
title: MybatisPlus使用乐观锁
date: 2021-06-02 17:29
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

当要更新一条记录的时候，希望这条记录没有被别人更新，此时我们就可以使用乐观锁来进行判断。
<!-- more -->

### 乐观锁实现方式
- 取出记录时，获取当前version
- 更新时，带上这个version
- 执行更新时， set version = newVersion where version = oldVersion
- 如果version不对，就更新失败


### 1.配置
```java
//乐观锁配置
@Bean
public OptimisticLockerInterceptor optimisticLockerInterceptor() {
    return new OptimisticLockerInterceptor();
}
```



### 2.注解实体字段

需要为实体字段添加`@Version`注解。

1. 为表添加version字段，并且设置初始值为1；
  
2. 为User实体对象添加version字段，并且添加@Version注解；
    ```java
    @Version 
    private Integer version;
    ```
