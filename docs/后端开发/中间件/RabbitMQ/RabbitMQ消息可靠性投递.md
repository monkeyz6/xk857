---
title: RabbitMQ消息可靠性投递
date: 2022-01-07 22:02
categories:
- SpringBoot
- RabbitMQ
tags:
- SpringBoot
- RabbitMQ
- 中间件
---

什么是消息的可靠性投递？即保证消息百分百发送到消息队列中去，消息发送端需要接受到mq服务端接受到消息的确认应答。除此之外还应有完善的消息补偿机制，发送失败的消息可以再感知并二次处理。
<!-- more -->
生产者到交换机通过**confirmCallback**，交换机到队列通过**returnCallback**

## 可靠性投递confirmCallback

confirmCallback是生产者到交换机，可以理解为确认消息是否发送成功。新版依赖可靠性投递默认是关闭的，使用以下方法开启

```properties
#旧版，确认消息发送成功，通过实现ConfirmCallBack接口，消息发送到交换器Exchange后触发回调
spring.rabbitmq.publisher-confirms=true
#新版，NONE值是禁用发布确认模式，是默认值，CORRELATED值是发布消息成功到交换器后会触发回调方法
spring.rabbitmq.publisher-confirm-type: correlated
```

此时的配置文件

```yaml
spring:
  rabbitmq:
    host: 111.5.111.111
    port: 5672
    virtual-host: /dev
    password: password
    username: admin
    # 开启消息二次确认，生产者到broker的交换机
    publisher-confirm-type: correlated
```

### 编码实实现confirmCallback

```java
@Slf4j
@SpringBootTest
class RabbitmqDemoApplicationTests {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    void testConfirmCallback() {
        /*
          correlationData：配置
          ack：交换机是否收到消息，true是成功，false是失败
          cause：失败的原因
         */
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            log.info("confirm==== ack={}", ack);
            log.info("confirm==== cause={}", cause);
            if (ack) {
                log.info("发送成功，{}", cause);
            } else {
                log.error("发送失败，{}", cause);
            }
        });
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, "order.new", "新订单来啦！！");
    }
}
```







## 可靠性投递returnCallback

returnCallback交换机到队列，消息从交换器发送到对应队列失败时触发。

- 第一步 开启returnCallback配置

  ```properties
  spring.rabbitmq.publisher-returns=true #新版
  ```

- 第二步 修改交换机投递到队列失败的策略

  ```properties
  #为true,则交换机处理消息到路由失败，则会返回给生产者
  spring.rabbitmq.template.mandatory=true
  ```

完整配置参考

```yaml
spring:
  rabbitmq:
    host: 111.5.111.111
    port: 5672
    virtual-host: /dev
    password: password
    username: admin
    # 开启消息二次确认，生产者到broker的交换机
    publisher-confirm-type: correlated
    # 开启消息二次确认，交换机到队列的可靠性投递
    publisher-returns: true
    #为true,则交换机处理消息到路由失败，则会返回给生产者
    template:
      mandatory: true
```

### 编码实实现returnCallback

```java
@Test
void testReturnCallback() {
    // 为true,则交换机处理消息到路由失败，则会返回给生产者，开启强制消息投递（mandatory为设置为true），但消息未被路由至任何一个queue，则回退一条消息
    rabbitTemplate.setReturnsCallback(returnedMessage -> {
        int code = returnedMessage.getReplyCode();
        log.info("code={}", code);
        log.info("returned={}", returnedMessage);
    });
    // 这个routingKey是不存在的，它找不到这个路由，所以会出现异常从而触发上面的回调方法
    rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, "xk857.order.new", "新订单来啦！！");
}
```






::: danger
开启消息确认机制以后，保证了消息的准确送达，但由于频繁的确认交互， rabbitmq 整体效率变低，吞吐量下降严重，不是非常重要的消息真心不建议用消息确认机制
:::
