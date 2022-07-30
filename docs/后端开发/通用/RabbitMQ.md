# RabbitMQ

## 对比当下主流的消息队列和选择问题

- ActiveMQ：http://activemq.apache.org/

  - Apache出品，历史悠久，支持多种语言的客户端和协议，支持多种语言Java, .NET, C++ 等
  - 基于JMS Provider的实现

  - 缺点：吞吐量不高，多队列的时候性能下降，存在消息丢失的情况，比较少大规模使用

- Kafka：http://kafka.apache.org/

  - 是由Apache软件基金会开发的一个开源流处理平台，由Scala和Java编写。Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理大规模的网站中的所有动作流数据(网页浏览，搜索和其他用户的行动)，副本集机制，实现数据冗余，保障数据尽量不丢失；支持多个生产者和消费者
  - 类似MQ，功能较为简单，主要支持简单的MQ功能

  - 缺点：不支持批量和广播消息，运维难度大，文档比较少, 需要掌握Scala

- RocketMQ：http://rocketmq.apache.org/

  - 阿里开源的一款的消息中间件, 纯Java开发，具有高吞吐量、高可用性、适合大规模分布式系统应用的特点, 性能强劲(零拷贝技术)，支持海量堆积, 支持指定次数和时间间隔的失败消息重发,支持consumer端tag过滤、延迟消息等，在阿里内部进行大规模使用，适合在电商，互联网金融等领域
  - 基于JMS Provider的实现
  - 缺点：社区相对不活跃，更新比较快，纯java支持

- RabbitMQ：http://www.rabbitmq.com/

  - 是一个开源的AMQP实现，服务器端用Erlang语言编写，支持多种客户端，如：Python、Ruby、.NET、Java、C、用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不错
  - 缺点：使用Erlang开发，阅读和修改源码难度大

## Rabbit使用docker方式进行安装

说明：使用源码的方式安装依赖多、且版本和维护相对复杂，需要erlang环境、版本也是有要求，因此不建议在**本地**或**服务器**使用**源码**的方式安装，因为使用RabbitMQ安装erlang环境完全没必要。推荐使用云服务器或虚拟机使用docker安装，可用使用阿里云按量付费，花费几个小时时间进行安装。

- 环境问题说明：Win7、Win8、Win10、Mac、虚拟机等等，可能存在兼容问题。务必使用CentOS 7 以上版本，64位系统！！！！

我这里使用阿里云抢占式实例购买了3台用于学习部署集群使用

![image-20210522190327685](https://xk857.com/typora/2021/05image-20210522190327685.png)

### 安装Docker

依次运行以下命令添加yum源

```shell
yum update
yum install epel-release -y
yum clean all
yum list
```

安装并运行Docker。

```shell
yum install docker-io -y
systemctl start docker
```

检查安装结果。

```shell
docker info
```

启动使用Docker

```shell
systemctl start docker     #运行Docker守护进程
systemctl stop docker      #停止Docker守护进程
systemctl restart docker   #重启Docker守护进程
```

帮助文档：https://help.aliyun.com/document_detail/51853.html?spm=a2c4g.11186623.6.820.RaToNY



### 安装RabbitMQ

账号：admin 密码：password，部署后访问：ip:15672，注意把防火墙和阿里云/腾讯云安全组开放15672端口

```shell
#拉取镜像
docker pull rabbitmq:management

#第一台机子
docker run -d --hostname rabbit_host1 --name xk857_rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=password -p 15672:15672 -p 5672:5672 rabbitmq:management
#第二台机器
docker run -d --hostname rabbit_host2 --name xk857_rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=password -p 15672:15672 -p 5672:5672 rabbitmq:management
#第三台机器
docker run -d --hostname rabbit_host3 --name xk857_rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=password -p 15672:15672 -p 5672:5672 rabbitmq:management


#介绍
-d 以守护进程方式在后台运行
-p 15672:15672 management 界面管理访问端口
-p 5672:5672 amqp 访问端口
--name：指定容器名
--hostname：设定容器的主机名，它会被写到容器内的 /etc/hostname 和 /etc/hosts，作为容器主机IP的别名，并且将显示在容器的bash中

-e 参数
  RABBITMQ_DEFAULT_USER 用户名
  RABBITMQ_DEFAULT_PASS 密码
```

主要端口介绍：

```shell
4369 erlang 发现口
5672 client 端通信口
15672 管理界面 ui 端口
25672 server 间内部通信口
```

- Linux服务器检查防火墙是否关闭
- 云服务器检查网络安全组是否开放端口

```
CentOS 7 以上默认使用的是firewall作为防火墙
查看防火墙状态
firewall-cmd --state

停止firewall
systemctl stop firewalld.service

禁止firewall开机启动
systemctl disable firewalld.service
```



## 搭建RabbitMQ普通集群











































































































































































































































































































