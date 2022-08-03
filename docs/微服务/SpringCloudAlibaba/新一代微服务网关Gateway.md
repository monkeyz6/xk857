---
title: 新一代微服务网关Gateway
date: 2021-08-03 21:55
categories:
- 插件开发
tags:
- 插件开发
---

在微服务架构里，分布式是由多个微服务构成的，每个微服务都有属于自己的端口，那么如何统一的访问到这些服务呢，提供不同的端口给前端肯定是不合适的，因此网关就出现了。
<!-- more -->

在微服务架构里，服务的粒度被进一步细分，各个业务服务可以被独立的设计、开发、测试、部署和管理。这时各个独立部署单元可以用不同的开发测试团队维护，可以使用不同的编程语言和技术平台进行设计，这就要求必须使用一种语言和平台无关的服务协议作为各个单元间的通讯方式。


## 基本使用

新建模块：xk857-gateway
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
</dependencies>
```

配置文件

```yml
server:
  port: 8888
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes: #数组形式
        - id: order-service  #路由唯一标识
          uri: http://127.0.0.1:9001  #想要转发到的地址
          order: 1 #优先级，数字越小优先级越高
          predicates: #断言 配置哪个路径才转发
            - Path=/order-server/**
          filters: #过滤器，请求在传递过程中通过过滤器修改
            - StripPrefix=1  #去掉第一层前缀
```


启动类

```java
@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class,args);
    }
}
```


此时访问：http://localhost:8888/order-server/api/v1/order/find_by_id?id=30

会转发到：http://localhost:9001/api/v1/order/find_by_id?id=30



## Gateway配置Nocas

- 原先存在的问题：①微服务地址写死，②负载均衡没做到

- 添加Nacos服务治理配置，网关添加naocs依赖
  ```xml
  <!--添加nacos客户端-->
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>
  ```

- 启动类开启支持
  ```java
  @EnableDiscoveryClient
  ```

- 修改配置文件
  ```yml
  server:
  port: 8888
  spring:
  application:
    name: api-gateway
  cloud:
    nacos:
      discovery:
        server-addr: api.xk857.com:8848
    gateway:
      routes: #数组形式
        - id: order-service  #路由唯一标识
          uri: lb://xdclass-order-service  # 从nacos获取名称转发,lb是负载均衡轮训策略
          predicates: #断言 配置哪个路径才转发
            - Path=/order-server/**
          filters: #过滤器，请求在传递过程中通过过滤器修改
            - StripPrefix=1  #去掉第一层前缀
      discovery:
        locator:
          enabled: true  #开启网关拉取nacos的服务
  ```



## 内置断言实现接口定时下线

- 需求：接口需要在指定时间进行下线，过后不可以在被访问
    - 使用Before ,只要当前时间小于设定时间，路由才会匹配请求
    - 东8区的2020-09-11T01:01:01.000+08:00后，请求不可访问
    - 为了方便测试，修改时间即可

```
predicates:
  - Before=2021-09-01T01:01:01.000+08:00
```




## GateWay过滤器

- 过滤器生命周期

    - PRE： 这种过滤器在请求被路由之前调用,一般用于鉴权、限流等
    - POST：这种过滤器在路由到微服务以后执行，一般用于修改响应结果，比如增加header信息、打点结果日志



- 网关过滤器分类

    - 局部过滤器GatewayFilter：应用在某个路由上,每个过滤器工厂都对应一个实现类，并且这些类的名称必须以 GatewayFilterFactory 结尾
    - 全局过滤器：作用全部路由上,





### Gateway全局过滤器实现用户鉴权

```java
@Component
public class UserGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 获取请求头中第一个"token"，一般token也就是唯一的一个
        String token = exchange.getRequest().getHeaders().getFirst("token");

        if (StringUtils.isBlank(token)){
            //如果为空代表不成功，返回状态码，实际开发中可以返回json数据进行交互
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        // TODO 根据业务开发对应鉴权 如果token不为空代表成功，实际业务应该进行判断token是否正确
        //继续往下执行
        return chain.filter(exchange) ;
    }

    //过滤器优先级，数字越小，优先级越高
    @Override
    public int getOrder() {
        return 0;
    }
}
```

::: warning
网关不建议加入太多的业务逻辑，否则会影响性能
::: 


