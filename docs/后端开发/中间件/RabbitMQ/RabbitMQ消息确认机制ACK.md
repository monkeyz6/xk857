---
title: RabbitMQ消息确认机制ACK
date: 2022-01-13 17:15
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

消费者从RabbitMQ收到消息并处理完成后，反馈给RabbitMQ，RabbitMQ收到反馈后才将此消息从队列中删除
<!-- more -->

- 消费者在处理消息出现了网络不稳定、服务器异常等现象，那么就不会有ACK反馈，RabbitMQ会认为这个消息没有正常消费，会将消息重新放入队列中
- 只有当消费者正确发送ACK反馈，RabbitMQ确认收到后，消息才会从RabbitMQ服务器的数据中删除。
- 消息的ACK确认机制默认是打开的，消息如未被进行ACK的消息确认机制，这条消息被锁定Unacked

我们也可以将其改成手工确认模式

```yaml
spring:
  rabbitmq:
    #开启手动确认消息，如果消息重新入队，进行重试
    listener:
      simple:
        acknowledge-mode: manual
```

重写之前的Handler

```java
@RabbitHandler
public void releaseCouponRecord(String body, Message message, Channel channel) throws IOException {
    long msgTag = message.getMessageProperties().getDeliveryTag();
    System.out.println("msgTag="+msgTag);
    System.out.println("message="+message.toString());
    System.out.println("body="+body);

    //成功确认，使用此回执方法后，消息会被 rabbitmq broker 删除
    //channel.basicAck(msgTag,false); // 正常返回ACK确认信息
    //channel.basicNack(msgTag,false,true); // 告诉broker，消息拒绝确认，最后一个true代表返回队列，为False代表丢弃
}
```
