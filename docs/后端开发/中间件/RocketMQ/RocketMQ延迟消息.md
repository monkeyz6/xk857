---
title: RocketMQ延迟消息
date: 2021-07-31 20:15
categories:
- 中间件
- SpringBoot
tags:
- 消息队列
- RocketMQ
- SpringBoot
- 中间件
---


什么是延迟消息？Producer将消息发送到消息队列 RocketMQ 服务端，但并不期望这条消息立马投递，而是推迟到在当前时间点之后的某一个时间投递到 Consumer 进行消费，该消息即定时消息，目前支持固定精度的消息。
<!-- more -->

::: tip
- 源码：rocketmq-store > MessageStoreConfig.java 属性 messageDelayLevel `"1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";`
- 使用message.setDelayTimeLevel(xxx) //xxx是级别，1表示配置里面的第一个级别，2表示第二个级别
:::


## 使用场景
::: tip
1. 通过消息触发一些定时任务，比如在某一固定时间点向用户发送提醒消息
2. 消息生产和消费有时间窗口要求：比如在天猫电商交易中超时未支付关闭订单的场景，在订单创建时会发送一条 延时消息。这条消息将会在 30 分钟以后投递给消费者，消费者收到此消息后需要判断对应的订单是否已完成支付。 如支付未完成，则关闭订单。如已完成支付则忽略
:::

```java
@RequestMapping("/delay")
public String delayMsg(String text) throws RemotingException, InterruptedException, MQClientException {
    // key是唯一的，一般是订单号等，这里仅做测试，生产者根据key进行消息重投，默认次数为2
    Message message = new Message(JmsConfig.TOPIC, "tag1","1234", ("Hello rocketmq = " + text).getBytes());
    // 5s后被消费
    message.setDelayTimeLevel(2);

    payProducer.getProducer().send(message, new SendCallback() {
        @Override
        public void onSuccess(SendResult sendResult) {
            System.out.printf("发送结果 %s， msg=%s", sendResult.getSendStatus(), sendResult.toString());
        }

        @Override
        public void onException(Throwable throwable) {
            throwable.printStackTrace();
            //补偿机制，根据业务情况查看是否需要进行重试
        }
    });
    return "";
}
```

