---
title: SpringBootAdmin服务配置
date: 2021-10-07 20:36
categories:
- SpringBoot
tags:
- SpringBoot
---

## Admin服务端配置
xk857-blob-admin工程启动类加注解
```java 
@EnableDiscoveryClient
@EnableAdminServer
@SpringBootApplication
public class AdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class,args);
    }
}
```

xk857-blob-admin工程，也就是服务端配置：
```yaml
server:
  port: 13006
  servlet:
    context-path: /blog-admin

spring:
  application:
    name: xk857-admin # 应用名
  cloud:
    nacos:
      discovery:
        server-addr: ip:8848
        metadata:
          management:
            context-path: ${server.servlet.context-path}/actuator

# 暴露端点
management:
  endpoints:
    web:
      exposure:
        include: '*'  # 需要开放的端点。默认值只打开 health 和 info 两个端点。通过设置 *, 可以开放所有端点
  endpoint:
    health:
      show-details: always
```

## Client端配置
所有微服务（客户端）配置：
```yaml
management:
  endpoints:
    web:
      exposure:
        include: '*'
```




配置成功后访问：http://localhost:13006/blog-admin/

常见错误：

1. 引入了数据库驱动，但是没有配置数据库，导致报错。 解决方案：建议去除数据库驱动
2. 看不见客户端的信息。原因：客户端没有加入admin或actuator依赖，解决方案：加入依赖即可
3. 启动报错一大堆，解决方案：查看SpringBoot版本与Admin版本是否兼容。

![image-20211029101125755](https://xk857.com/typora/2021/05image-20211029101125755.png)












