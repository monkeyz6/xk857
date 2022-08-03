---
title: 流量防卫兵Sentinel
date: 2021-08-03 21:41
categories:
- 插件开发
tags:
- 插件开发
---

Sentinel是阿里巴巴开源的分布式系统流控工具，以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性，拥有丰富的应用场景：消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
<!-- more -->


以及完备的实时监控：Sentinel 同时提供实时的监控功能，提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。

## 基本概念和作用讲解

- 熔断：保险丝，熔断服务，为了防止整个系统故障，包含当前和下游服务 下单服务 -> 商品服务-> 用户服务 -> （出现异常-> 熔断风控服务
- 降级：抛弃一些非核心的接口和数据，返回兜底数据 旅行箱的例子：只带核心的物品，抛弃非核心的，等有条件的时候再去携带这些物品
- 隔离：服务和资源互相隔离，比如网络资源，机器资源，线程资源等，不会因为某个服务的资源不足而抢占其他服务的资源


- 熔断和降级互相交集
    - 相同点：
        - 从可用性和可靠性触发，为了防止系统崩溃
        - 最终让用户体验到的是某些功能暂时不能用
    - 不同点
        - 服务熔断一般是下游服务故障导致的，而服务降级一般是从整体系统负荷考虑，由调用方控制


- 想进行微服务的容错，业界目前有Sentinel、Hystrix，相对于AlibabaCloud而言，Sentinel是最好的搭配
![Sentinel核心概念](https://oss.xk857.com/images/20220803/Sentinel核心概念.png)


## 基本使用

- 微服务引入Sentinel依赖，三个子模块都引入

```xml
<!-- sentinel -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <!--去除jackson-dataformat-xml，否则会返回xml文件，而不是JSON-->
    <exclusions>
        <exclusion>
            <groupId>com.fasterxml.jackson.dataformat</groupId>
            <artifactId>jackson-dataformat-xml</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

- 配置

```yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: 127.0.0.1:8080 
        port: 9999 

# dashboard: 8080 控制台端口
# port: 9999 本地启的端口，随机选个不能被占用的，与dashboard进行数据交互，会在应用对应的机器上启动一个 Http Server，该 Server 会与 Sentinel 控制台做交互, 若被占用,则开始+1一次扫描
```



## 流控的使用和规则

1. 设置流控规则
![Sentinel控制台1](https://oss.xk857.com/images/20220803/Sentinel控制台1.png)
![Sentinel控制台2](https://oss.xk857.com/images/20220803/Sentinel控制台2.png)

   
2. 流控规则


- 基于统计并发线程数的流量控制
  ::: tip
  并发数控制用于保护业务线程池不被慢调用耗尽
  Sentinel 并发控制不负责创建和管理线程池，而是简单统计当前请求上下文的线程数目（正在执行的调用数目）如果超出阈值，新的请求会被立即拒绝，效果类似于信号量隔离。
  :::
- 基于统计QPS的流量控制
  ::: tip
  当 QPS 超过某个阈值的时候，则采取措施进行流量控制
  :::


### 流控规则效果

- 直接拒绝：默认的流量控制方式，当QPS超过任意规则的阈值后，新的请求就会被立即拒绝
- Warm Up：冷启动/预热，如果系统在此之前长期处于空闲的状态，我们希望处理请求的数量是缓步的增多，经过预期的时间以后，到达系统处理请求个数的最大值
- 匀速排队：严格控制请求通过的间隔时间，也即是让请求以均匀的速度通过，对应的是漏桶算法，主要用于处理间隔性突发的流量，如消息队列，想象一下这样的场景，在某一秒有大量的请求到来，而接下来的几秒则处于空闲状态，我们希望系统能够在接下来的空闲期间逐渐处理这些请求，而不是在第一秒直接拒绝多余的请求
- 注意：
    - 匀速排队等待策略是 Leaky Bucket 算法结合虚拟队列等待机制实现的。
    - 匀速排队模式暂时不支持 QPS > 1000 的场景



## 熔断降级规则

- 熔断降级（虽然是两个概念，基本都是互相配合）

    - 对调用链路中不稳定的资源进行熔断降级也是保障高可用的重要措施之一
    - 对不稳定的**弱依赖服务调用**进行熔断降级，暂时切断不稳定调用，避免局部不稳定因素导致整体的雪崩
    - 熔断降级作为保护自身的手段，通常在客户端（调用端）进行配置



- 什么是Sentinel降级规则

    - 文档：https://github.com/alibaba/Sentinel/wiki/熔断降级
    - 就是配置一定规则，然后满足之后就对服务进行熔断降级



- Sentinel 熔断策略

    - 慢调用比例(响应时间): 选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用

        - 比例阈值：修改后不生效-目前已经反馈给官方那边的bug
        - 熔断时长：超过时间后会尝试恢复
        - 最小请求数：熔断触发的最小请求数，请求数小于该值时即使异常比率超出阈值也不会熔断

      ![image-20200909121342893](https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/06d68a4f733436e9d4c6b18d52930b290e.png)

    - 异常比例：当单位统计时长内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断

        - 比例阈值
        - 熔断时长：超过时间后会尝试恢复
        - 最小请求数：熔断触发的最小请求数，请求数小于该值时，即使异常比率超出阈值也不会熔断

      ![image-20200909121357918](https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/061fb962ec5c721a35fb3158950ce5e82a.png)

    - 异常数：当单位统计时长内的异常数目超过阈值之后会自动进行熔断

        - 异常数:
        - 熔断时长：超过时间后会尝试恢复
        - 最小请求数：熔断触发的最小请求数，请求数小于该值时即使异常比率超出阈值也不会熔断

      ![image-20200909121415806](https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/067ac54d00e34f39e7c5c547be50ea0560.png)



## Sentinel自定义异常

### Sentinel自定义异常降级-新旧版本差异

- 默认降级返回数据问题

    - 限流和熔断返回的数据有问题
    - 微服务交互基本都是json格式，如果让自定义异常信息

- AlibabCloud版本升级，不兼容问题

    - v2.1.0到v2.2.0后，Sentinel里面依赖进行了改动，且不向下兼容

- 自定义降级返回数据

    - 【旧版】实现UrlBlockHandler并且重写blocked方法

  ```java
  @Component
  public class XdclassUrlBlockHandler implements UrlBlockHandler {
      @Override
      public void blocked(HttpServletRequest request, HttpServletResponse response, BlockException e) throws IOException {
         //降级业务处理
      }
  }
  ```

    - 【新版】实现BlockExceptionHandler并且重写handle方法

  ```java
  public class XdclassUrlBlockHandler implements BlockExceptionHandler {
     
      @Override
      public void handle(HttpServletRequest request, HttpServletResponse response, BlockException e) throws Exception {
      //降级业务处理
      }
  }
  ```

### 自定义降级异常

- 异常种类

  ```java
  FlowException  //限流异常
  DegradeException  //降级异常
  ParamFlowException //参数限流异常
  SystemBlockException //系统负载异常
  AuthorityException //授权异常
  ```



- 【新版】实现BlockExceptionHandler并且重写handle方法

  ```java
  @Component
  public class XdclassUrlBlockHandler implements BlockExceptionHandler {
      @Override
      public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws IOException {
          Map<String,Object> backMap=new HashMap<>();
          if (e instanceof FlowException){
              backMap.put("code",-1);
              backMap.put("msg","限流-异常啦");
          }else if (e instanceof DegradeException){
              backMap.put("code",-2);
              backMap.put("msg","降级-异常啦");
          }else if (e instanceof ParamFlowException){
              backMap.put("code",-3);
              backMap.put("msg","热点-异常啦");
          }else if (e instanceof SystemBlockException){
              backMap.put("code",-4);
              backMap.put("msg","系统规则-异常啦");
          }else if (e instanceof AuthorityException){
              backMap.put("code",-5);
              backMap.put("msg","认证-异常啦");
          }
  
          // 设置返回json数据
          httpServletResponse.setStatus(200);
          httpServletResponse.setHeader("content-Type","application/json;charset=UTF-8");
          httpServletResponse.getWriter().write(JSON.toJSONString(backMap));
      }
  }
  ```



### Sentinel整合Open-Feign
::: tip
简单理解：使用Open-Feign获取远程数据时，如果远程数据出现故障获取不到，我们可以实现这个Service接口，当没有远程数据时，会将兜底数据展现给用户。
:::

- 加入依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

- 开启Feign对Sentinel的支持

```yaml
feign:
  sentinel:
    enabled: true
```

- 创建容错类, 实现对应的服务接口, 记得加注解 @Service

```java
@Service
public class VideoServiceFallback implements VideoService {
    @Override
    public Video findById(int videoId) {
        Video video = new Video();
        video.setTitle("熔断降级数据");
        return video;
    }

    @Override
    public Video saveVideo(Video video) {
        return null;
    }
}
```

- 在Service层，配置feign容错类
::: tip
@FeignClient(value = "xdclass-video-service", fallback = VideoServiceFallback.class)
:::
```java
@FeignClient(value = "xdclass-video-service", fallback = VideoServiceFallback.class)
public interface VideoService {

    @GetMapping(value = "/api/v1/video/find_by_id")
    Video findById(@RequestParam("videoId") int videoId);
    ……
}
```


