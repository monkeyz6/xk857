---
title: OneWay消息及多种场景对比
date: 2021-07-31 20:12
categories:
- 中间件
tags:
- 消息队列
- RocketMQ
- 中间件
---

消息队列的发送方式一般有三种，同步发送、异步发送、无需要等待响应。下面详细列举了不同发送方式的主要特点及应用场景。
<!-- more -->

::: tip
- **SYNC**：**同步发送**，重要通知邮件、报名短信通知、营销短信系统等
- **ASYNC**：**异步发送**，对RT时间敏感，可以支持更高的并发，回调成功触发相对应的业务，比如注册成功后通知积分系统发放优惠券 
- **ONEWAY**：**无需要等待响应**，主要是日志收集，适用于某些耗时非常短，但对可靠性要求并不高的场景, 也就是LogServer, 只负责发送消息，不等待[服务器](https://www.baidu.com/s?wd=服务器&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)回应且没有回调函数触发，即只发送请求不等待应答
:::

| 发送方式 | 发送 TPS | 发送结果反馈 | 可靠性   |
| :------- | :------- | :----------- | :------- |
| 同步发送 | 快       | 有           | 不丢失   |
| 异步发送 | 快       | 有           | 不丢失   |
| 单向发送 | 最快     | 无           | 可能丢失 |

### 发送OneWay消息

```java
@RequestMapping("/async")
public String sendOnWayMsg(String text) throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    Message message = new Message(JmsConfig.TOPIC, "tag1","1234", ("Hello rocketmq = " + text).getBytes());
    payProducer.getProducer().sendOneway(message);
    return "";
}
```

