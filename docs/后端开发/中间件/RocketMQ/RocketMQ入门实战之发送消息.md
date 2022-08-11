---
title: RocketMQ入门实战之发送消息
date: 2021-07-31 19:57
categories:
- 中间件
- SpringBoot
tags:
- 消息队列
- RocketMQ
- SpringBoot
- 中间件
---

在SpringBoot框架中，使用RockerMQ发送消息，模拟真实业务开发场景，而不是官方demo，可以直接按照此文档整合到项目中去。

<!-- more -->

## RocketMQ实战之发送消息

::: tip
先开启防火墙端口，10909、8080、10911、9876 ，搭建 SpringBoot 项目，并加入依赖
:::

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.8.0</version>
</dependency>
```

创建 com.example.rocketmq.jms.PayProducer

```java
@Component
public class PayProducer {

    private String producerGroup = "pay_group";

    private String nameServerAddr = "1.15.143.246:9876";

    private DefaultMQProducer producer;

    public PayProducer() {
        producer = new DefaultMQProducer(producerGroup);
        producer.setNamesrvAddr(nameServerAddr);
        start();
    }

    public DefaultMQProducer getProducer() {
        return this.producer;
    }

    /**
     * 对象在使用前必须调用一次，只能初始化一次
     */
    public void start() {
        try {
            this.producer.start();
        } catch (MQClientException e) {
            e.printStackTrace();
        }
    }

    /**
     * 一般在应用上下文，使用上下文监听器，进行关闭
     */
    public void shutdown() {
        this.producer.shutdown();
    }
}
```

创建接口 com.example.rocketmq.controller.PayController

```java
import com.example.rocketmq.jms.PayProducer;
import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.exception.RemotingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/26 14:08
 */
@RestController
@RequestMapping("/api/pay")
public class PayController {

    @Autowired
    private PayProducer payProducer;

    // 主题
    public static final String topic = "pay_test_topic";

    @RequestMapping("/pay_cb")
    public Object callback(String text) {

        Message message = new Message(topic, "tag1", ("Hello rocketmq = " + text).getBytes());
        try {
            // 发送消息
            SendResult sendResult = payProducer.getProducer().send(message,10000);
            System.out.println(sendResult);
        } catch (MQClientException e) {
            e.printStackTrace();
        } catch (RemotingException e) {
            e.printStackTrace();
        } catch (MQBrokerException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return new HashMap<>();
    }

}
```
