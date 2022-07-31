---
title: 使用Docker安装RabbitMQ
date: 2021-07-31 19:36
categories:
- 中间件
tags:
- 消息队列
- RabbitMQ
- 中间件
---



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
