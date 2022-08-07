---
title: SpringBootAdmin依赖引入
date: 2021-10-07 20:32
categories:
- SpringBoot
tags:
- SpringBoot
---


### Server端环境搭建
新建一个工程，名为xk857-blob-admin，此工程不依赖于common模块，原因是admin分为server端和client端。还有一个原因common模块有数据库驱动依赖，但这里不需要，所以单独引入。

::: danger
排坑：如果你的Sprigboot依赖是2.1.x 引入的admin也是2.1.x，如果是2.3.x引入的就是2.3.x
:::
```xml
<dependencies>
    <!--项目中添加 spring-boot-starter-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- nacos -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!-- SpringBootAdmin -->
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-server</artifactId>
        <version>2.3.1</version>
    </dependency>
    <!--Spring boot 安全监控-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <!-- 安全认证 -->
    <!-- 
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
	-->
</dependencies>
```


### client端依赖引入
common模块引入依赖如下（所有微服务都引入common模块），因此common模块引入则代表所有client端都引入了
```xml
<!-- SpringBoot Admin 客户端依赖 -->
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.3.1</version>
</dependency>
<!--Spring boot 安全监控-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
