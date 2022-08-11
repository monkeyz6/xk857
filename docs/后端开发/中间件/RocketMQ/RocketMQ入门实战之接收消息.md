---
title: RocketMQ入门实战之接收消息
date: 2021-07-31 19:59
categories:
- 中间件
- SpringBoot
tags:
- 消息队列
- RocketMQ
- SpringBoot
- 中间件
---

在SpringBoot框架中，使用RockerMQ发送消息后我们需要接收消息，同样模拟真实业务开发场景，可以直接在项目中使用。
<!-- more -->


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

