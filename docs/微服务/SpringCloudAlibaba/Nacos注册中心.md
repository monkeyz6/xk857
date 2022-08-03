---
title: Nacos注册中心
date: 2021-08-03 21:33
categories:
- 插件开发
tags:
- 插件开发
---

一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
<!-- more -->
- 官网：https://nacos.io/zh-cn/

- 下载管理：
    - https://download.fastgit.org/alibaba/nacos/releases/download/2.0.0-ALPHA.2/nacos-server-2.0.0-ALPHA.2.tar.gz
    - https://download.fastgit.org/alibaba/nacos/releases/download/2.0.0-ALPHA.2/nacos-server-2.0.0-ALPHA.2.zip

- Linux/Mac安装Nacos
    - 解压安装包
    - 进入bin目录
    - 启动 sh startup.sh -m standalone
    - 访问 localhost:8848/nacos
    - 默认账号密码 nacos/nacos
    - 关闭: sh shutdown.sh

    
### 1.模块中添加依赖

```xml
<!--添加nacos客户端-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 2.视频微服务配置

```yml
spring:
  application:
    name: xk857-video-service
  cloud:
    nacos:
      discovery:
        server-addr: nacos.xk857.com
```


### 3.启动类增加注解

> @EnableDiscoveryClient





## 简单实现服务调用


1. 获取`nacos`服务列表

```java
@Autowired
private DiscoveryClient discoveryClient;
```

2. 获取服务

```java
//获取指定服务的集合(实际中可能会有集群)
List<ServiceInstance> instances = discoveryClient.getInstances("k857-order-service");
//这里只有一个，获取那一个服务就好
ServiceInstance serviceInstance = instances.get(0);
```



### Ribbon负载均衡

- 软硬件角度负载均衡的种类
    - 通过硬件来进行解决，常见的硬件有NetScaler、F5、Radware和Array等商用的负载均衡器，但比较昂贵的
    - 通过软件来进行解决，常见的软件有LVS、Nginx等,它们是基于Linux系统并且开源的负载均衡策略


- 常见的负载均衡策略（看组件的支持情况）
    - 节点轮询
        - 简介：每个请求按顺序分配到不同的后端服务器
    - weight 权重配置
        - 简介：weight和访问比率成正比，数字越大，分配得到的流量越高
    - 固定分发
        - 简介：根据请求按访问ip的hash结果分配，这样每个用户就可以固定访问一个后端服务器
    - 随机选择、最短响应时间等等



**AlibabaCloud集成Ribbon实现负载均衡**

- 什么是Ribbon Ribbon是一个客户端负载均衡工具，通过Spring Cloud封装，可以轻松和AlibabaCloud整合
- 订单服务增加@LoadBalanced 注解

```
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
  return new RestTemplate();
}
```



