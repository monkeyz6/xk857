---
title: RocketMQ源码方式安装
date: 2021-07-31 19:54
categories:
- 中间件
tags:
- 消息队列
- RocketMQ
- 中间件
---

RocketMQ通过源码的方式安装，在centos7中依次安装JDK8、Maven、RocketMQ4以及控制台。
<!-- more -->

### centos7安装JDK8

官网下载linux.tar.gz版本，上传至云服务器 /usr/local/software/ 目录下

点击下载 https://xk857.com/t/jdk-8u201-linux-x64.tar.gz

```shell
解压：tar -zxvf jdk-8u201-linux-x64.tar.gz
重命名：mv jdk1.8.0_201 jdk8
vim /etc/profile
加入
export JAVA_HOME=/usr/local/software/jdk8
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME PATH CLASSPATH
使用 source /etc/profile   让配置立刻生效
```



### Linux服务器下安装Maven

点击下载：https://xk857.com/t/apache-maven-3.6.0-bin.tar.gz，上传至 /usr/local/software/ 目录下

```shell
解压：tar -zxvf apache-maven-3.6.0-bin.tar.gz
重命名： mv apache-maven-3.6.0 maven
vim /etc/profile
export PATH=/usr/local/software/maven/bin:$PATH

立刻生效：source /etc/profile
查看版本： mvn -v
```



### Linux服务器下源码部署RocketMQ4.X

进入官网，点击进行下载，[Quick Start - Apache RocketMQ](https://rocketmq.apache.org/docs/quick-start/)

![image-20210526103741006](https://xk857.com/typora/2021/05image-20210526103741006.png)

第二步，点击下载

![image-20210526103819998](https://xk857.com/typora/2021/05image-20210526103819998.png)

直接下载：https://xk857.com/t/rocketmq-all-4.8.0-source-release.zip

上传至 /usr/local/software/

```shell
# Liunx 解压安装
yum install unzip 
# 解压
unzip rocketmq-all-4.8.0-source-release.zip
# 重命名
mv rocketmq-all-4.8.0-source-release rocketmq


cd rocketmq
mvn -Prelease-all -DskipTests clean install -U
cd distribution/target/rocketmq-4.8.0/rocketmq-4.8.0
```

启动

```shell
cd /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/

启动 mqnamesrv
nohup sh bin/mqnamesrv &
tail -f ~/logs/rocketmqlogs/namesrv.lo

启动 broker
```

可能会出现报错，下面列出解决方案。

内存不够怎么处理? 找到 runserver.sh 修改 JAVA_OPT

```shell
cd /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/
vim bin/runserver.hs

进入后修改：
JAVA_OPT="${JAVA_OPT} -server -Xms1g -Xmx1g -Xmn512m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
```

![image-20210526114831424](https://xk857.com/typora/2021/05image-20210526114831424.png)

broker内存不足解决办法

```shell
cd /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/
vim bin/runbroker.sh

修改配置
JAVA_OPT="${JAVA_OPT} -server -Xms1g -Xmx1g -Xmn512m"
```

![image-20210526120235989](https://xk857.com/typora/2021/05image-20210526120235989.png)



验证

```shell
 > export NAMESRV_ADDR=localhost:9876
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer SendResult [sendStatus=SEND_OK, msgId= ...
 > sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```



##  RocketMQ源码方式安装控制台

下载地址：https://github.com/apache/rocketmq-externals

码云同步访问仓库：https://gitee.com/monkeyz6/rocketmq-externals.git

将下载后的zip文件，上传到 /usr/local/software/ ，下面的命令文件名可能有所差异，注意辨别

```shell
cd /usr/local/software/
解压
unzip monkeyz6-rocketmq-externals-master.zip
cd rocketmq-externals
cd rocketmq-console
 
# 修改 applicatiuon.properties
cd /usr/local/software/rocketmq-externals/rocketmq-console/src/main/resources
vim application.properties
# 设置地址
rocketmq.config.namesrvAddr=127.0.0.1:9876

cd /usr/local/software/rocketmq-externals/rocketmq-console/
编译打包
mvn clean package -Dmaven.test.skip=true
cd target/
```

- 进入target目录 ，启动 java -jar rocketmq-console-ng-2.0.0.jar
- 守护进程方式启动  nohup java -jar rocketmq-console-ng-2.0.0.jar &

默认8080端口，访问：ip:8080

