---
title: RocketMQ入门实战
date: 2021-07-31 19:57
categories:
- 中间件
tags:
- 消息队列
- RocketMQ
- 中间件
---



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



## 发送消息常见错误

::: warning
常见错误一 ：org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException:sendDefaultImpl call timeout
原因：阿里云/腾讯云存在多网卡，rocketmq都会根据当前网卡选择一个IP使用，当你的机器有多块网卡时，很有可能会有问题。
比如，我遇到的问题是我机器上有两个IP，一个公网IP，一个私网IP, 因此需要配置broker.conf 指定当前的公网ip, 然后重新启动broker
新增配置：conf/broker.conf  (属性名称brokerIP1=broker所在的公网ip地址 )
新增这个配置：brokerIP1=120.76.62.13
启动命令：nohup sh bin/mqbroker -n localhost:9876  -c ./conf/broker.conf &
:::

具体解决：
org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException: sendDefaultImpl call timeout

```shell
cd /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/conf
vim broker.conf

增加配置
brokerIP1=公网IP

保存后关闭进程
[root@VM-4-16-centos conf]# jps
8578 jar
20692 Jps
26296 NamesrvStartup
26346 BrokerStartup
[root@VM-4-16-centos conf]# kill -9 26346
[root@VM-4-16-centos conf]# cd ..


[root@VM-4-16-centos rocketmq-4.8.0]# sh bin/mqbroker -n localhost:9876  -c ./conf/broker.conf
The broker[broker-a, 1.15.143.246:10911] boot success. serializeType=JSON and name server is localhost:9876
```


::: warning
常见错误二：MQClientException: No route info of this topic, TopicTest1
原因：Broker 禁止自动创建 Topic，且用户没有通过手工方式创建 此Topic, 或者broker和Nameserver网络不通
解决： 通过 sh bin/mqbroker -m  查看配置
autoCreateTopicEnable=true 则自动创建topic
Centos7关闭防火墙  systemctl stop firewalld
:::



::: warning
常见错误三：控制台查看不了数据，提示连接 10909错误
原因：Rocket默认开启了VIP通道，VIP通道端口为10911-2=10909
解决：阿里云安全组需要增加一个端口 10909
:::


其他错误:
::: tip
https://blog.csdn.net/qq_14853889/article/details/81053145
https://blog.csdn.net/wangmx1993328/article/details/81588217#%E5%BC%82%E5%B8%B8%E8%AF%B4%E6%98%8E
https://www.jianshu.com/p/bfd6d849f156
https://blog.csdn.net/wangmx1993328/article/details/81588217
:::



## RocketMQ实战之接收消息

将配置简单提取一下：com.example.rocketmq.jms.JmsConfig

```java
public class JmsConfig {
    public static final String NAME_SERVER = "1.15.143.246:9876";
    public static final String TOPIC = "pay_test_topic";
}
```

消费消息：

```java
@Component
public class PayConsumer {
    /**
     * 接收消息对象
     */
    private DefaultMQPushConsumer consumer;

    private String consumerGroup = "pay_consumer_group";

    public PayConsumer() throws MQClientException {

        consumer = new DefaultMQPushConsumer(consumerGroup);
        consumer.setNamesrvAddr(JmsConfig.NAME_SERVER);
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);

        consumer.subscribe(JmsConfig.TOPIC, "*");

        consumer.registerMessageListener((MessageListenerConcurrently) (msgs, context) -> {
            try {
                Message msg = msgs.get(0);
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), new String(msgs.get(0).getBody()));
                String topic = msg.getTopic();
                String body = new String(msg.getBody(), "utf-8");
                String tags = msg.getTags();
                String keys = msg.getKeys();
                System.out.println("topic=" + topic + ", tags=" + tags + ", keys=" + keys + ", msg=" + body);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        });
        consumer.start();
        System.out.println("consumer start ...");
    }

}
```


