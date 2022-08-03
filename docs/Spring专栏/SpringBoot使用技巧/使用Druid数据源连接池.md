---
title: 使用Druid数据源连接池
date: 2021-08-03 19:50
categories:
- SpringBoot
tags:
- SpringBoot
---

Druid是阿里巴巴的一个开源项目，号称为监控而生的数据库连接池，在功能、性能、扩展性方面都超过其他，例如 DBCP、C3P0、BoneCP、Proxool、JBoss、DataSource 等连接池，而且Druid已经在阿里巴巴部署了超过600个应用，通过了极为严格的考验，这才收获了大家的青睐！
<!-- more -->

### 依赖

```xml
<!-- MyBatis -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
<!-- Druid数据源 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.22</version>
</dependency>
<!-- MySql依赖 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 配置

```yml
spring:
  datasource:
    url: jdbc:mysql://47.100.177.78:123456/xdcalss?useUnicode=true&characterEncoding=utf-8
    username: root
    password: monkeyz1368
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      stat-view-servlet:
        enabled: true # 激活控制台
        url-pattern: /druid/* # 访问路径
        reset-enable: false # 是否允许重置数据
        login-username: root # 账号
        login-password: root # 密码
      filter:
        stat:
          enabled: true # 记录语句统计
          
mybatis:
  configuration:
    map-underscore-to-camel-case: true  # 驼峰配置
```

附上properties格式的，方便查看

```properties
# druid base configure
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=root

# druid console configure
spring.datasource.druid.stat-view-servlet.enabled=true # 激活控制台
spring.datasource.druid.stat-view-servlet.url-pattern=/druid/* # 访问路径
spring.datasource.druid.filter.stat.enabled=true # 记录语句统计
spring.datasource.druid.stat-view-servlet.reset-enable=false # 是否允许重置数据
spring.datasource.druid.stat-view-servlet.login-username=root # 账号
spring.datasource.druid.stat-view-servlet.login-password=root # 密码

 # mybatis 下划线转驼峰配置,两者都可以
 #mybatis.configuration.mapUnderscoreToCamelCase=true
 mybatis.configuration.map-underscore-to-camel-case=true
```



然后在启动类上面加上：@MapperScan("com.xk857.mapper")

启动后，控制台访问地址：http://localhost:8080/druid
![](https://xk857.com/blog/2021/01image-20210212144906075.png)
