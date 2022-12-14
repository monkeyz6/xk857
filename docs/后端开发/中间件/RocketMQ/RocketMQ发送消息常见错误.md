---
title: RocketMQ发送消息常见错误
date: 2021-07-31 19:58
categories:
- 中间件
- SpringBoot
tags:
- 消息队列
- RocketMQ
- SpringBoot
- 中间件
---


上文写了如何在SpringBoot项目中如何发送消息，但是RocketMQ在整合时经常出现各种问题，这里列出常见错误及解决方案
<!-- more -->


### 常见错误一：云服务器部署网卡问题

常见错误一 ：org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException:sendDefaultImpl call timeout
::: tip
原因：阿里云/腾讯云存在多网卡，rocketmq都会根据当前网卡选择一个IP使用，当你的机器有多块网卡时，很有可能会有问题。
:::

比如，我遇到的问题是我机器上有两个IP，一个公网IP，一个私网IP, 因此需要配置broker.conf 指定当前的公网ip, 然后重新启动broker

新增配置：conf/broker.conf  (属性名称brokerIP1=broker所在的公网ip地址 )

新增这个配置：brokerIP1=120.76.62.13

启动命令：nohup sh bin/mqbroker -n localhost:9876  -c ./conf/broker.conf &


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


### 常见错误二：Broker禁止自动创建Topic
常见错误二：MQClientException: No route info of this topic, TopicTest1
::: tip
原因：Broker 禁止自动创建 Topic，且用户没有通过手工方式创建 此Topic, 或者broker和Nameserver网络不通
:::
解决： 通过 sh bin/mqbroker -m  查看配置

autoCreateTopicEnable=true 则自动创建topic

Centos7关闭防火墙  systemctl stop firewalld


### 常见错误三：控制台查看不了数据，提示连接 10909错误
::: tip
原因：Rocket默认开启了VIP通道，VIP通道端口为10911-2=10909
:::
解决：阿里云安全组需要增加一个端口 10909


其他错误:

https://blog.csdn.net/qq_14853889/article/details/81053145

https://blog.csdn.net/wangmx1993328/article/details/81588217#%E5%BC%82%E5%B8%B8%E8%AF%B4%E6%98%8E

https://www.jianshu.com/p/bfd6d849f156

https://blog.csdn.net/wangmx1993328/article/details/81588217
![home.png](https://oss.xk857.com/images/20220811/home.png)
