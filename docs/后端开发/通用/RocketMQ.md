# RocketMQ

## 消息中间件常见概念和编程模型

- 常见概念
  - JMS提供者：连接面向消息中间件的，JMS接口的一个实现，RocketMQ,ActiveMQ,Kafka等等
  - JMS生产者(Message Producer)：生产消息的服务
  - JMS消费者(Message Consumer)：消费消息的服务
  - JMS消息：数据对象
  - JMS队列：存储待消费消息的区域
  - JMS主题：一种支持发送消息给多个订阅者的机制
  - JMS消息通常有两种类型：点对点（Point-to-Point)、发布/订阅（Publish/Subscribe）
- 基础编程模型
  - MQ中需要用的一些类
  - ConnectionFactory ：连接工厂，JMS 用它创建连接
  - Connection ：JMS 客户端到JMS Provider 的连接
  - Session： 一个发送或接收消息的线程
  - Destination ：消息的目的地;消息发送给谁.
  - MessageConsumer / MessageProducer： 消息消费者，消息生产者



## RocketMQ概述

- 特点

  - 支持Broker和Consumer端消息过滤
  - 支持发布订阅模型，和点对点，
  - 支持拉pull和推push两种消息模式
  - 单一队列百万消息、亿级消息堆积
  - 支持单master节点，多master节点，多master多slave节点
  - 任意一点都是高可用，水平拓展，Producer、Consumer、队列都可以分布式
  - 消息失败重试机制、支持特定level的定时消息
  - 新版本底层采用Netty
  - 4.3.x支持分布式事务
  - 适合金融类业务，高可用性跟踪和审计功能。

- 概念

  - Producer:消息生产者

  - Producer Group:消息生产者组，发送同类消息的一个消息生产组

  - Consumer:消费者

  - Consumer Group:消费同类消息的多个实例

  - Tag:标签，子主题（二级分类）对topic的进一步细化,用于区分同一个主题下的不同业务的消息

  - Topic:主题, 如订单类消息，queue是消息的物理管理单位，而topic是逻辑管理单位。一个topic下可以有多个queue，

    默认自动创建是4个，手动创建是8个

  - Message：消息,每个message必须指定一个topic

  - Broker：MQ程序，接收生产的消息，提供给消费者消费的程序

  - Name Server：给生产和消费者提供路由信息，提供轻量级的服务发现、路由、元数据信息，可以多个部署，互相独立（比zookeeper更轻量）

  - Offset: 偏移量，可以理解为消息进度

  - commit log: 消息存储会写在Commit log文件里面





## RocketMQ源码方式安装

### centos7安装JDK8

官网下载linux.tar.gz版本，上传至云服务器 /usr/local/software/ 目录下

点击下载https://xk857.com/t/jdk-8u201-linux-x64.tar.gz

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



# SpringBoot整合RocketMQ入门实战

## RocketMQ实战之发送消息

先开启防火墙端口，10909、8080、10911、9876

搭建 SpringBoot 项目，并加入依赖

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



### 常见错误

常见错误一

> org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException:sendDefaultImpl call timeout
> 原因：阿里云/腾讯云存在多网卡，rocketmq都会根据当前网卡选择一个IP使用，当你的机器有多块网卡时，很有可能会有问题。
>
> 比如，我遇到的问题是我机器上有两个IP，一个公网IP，一个私网IP, 因此需要配置broker.conf 指定当前的公网ip, 然后重新启动broker 
> 新增配置：conf/broker.conf  (属性名称brokerIP1=broker所在的公网ip地址 )
> 新增这个配置：brokerIP1=120.76.62.13  
>
> 启动命令：nohup sh bin/mqbroker -n localhost:9876  -c ./conf/broker.conf &

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

常见错误二

```
MQClientException: No route info of this topic, TopicTest1
原因：Broker 禁止自动创建 Topic，且用户没有通过手工方式创建 此Topic, 或者broker和Nameserver网络不通
解决：
通过 sh bin/mqbroker -m  查看配置
autoCreateTopicEnable=true 则自动创建topic

Centos7关闭防火墙  systemctl stop firewalld
```

常见错误三

```
控制台查看不了数据，提示连接 10909错误

原因：Rocket默认开启了VIP通道，VIP通道端口为10911-2=10909

解决：阿里云安全组需要增加一个端口 10909
```

其他错误:

```
https://blog.csdn.net/qq_14853889/article/details/81053145
https://blog.csdn.net/wangmx1993328/article/details/81588217#%E5%BC%82%E5%B8%B8%E8%AF%B4%E6%98%8E
https://www.jianshu.com/p/bfd6d849f156
https://blog.csdn.net/wangmx1993328/article/details/81588217
```

 

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



## RocketMQ核心配置

生产者常见核心配置

- compressMsgBodyOverHowmuch ：消息超过默认字节4096后进行压缩
- retryTimesWhenSendFailed : 失败重发次数
- maxMessageSize : 最大消息配置，默认128k
- topicQueueNums : 主题下面的队列数量，默认是4
- autoCreateTopicEnable : 是否自动创建主题Topic, 开发建议为true，生产要为false
- defaultTopicQueueNums : 自动创建服务器不存在的topic，默认创建的队列数
- autoCreateSubscriptionGroup: 是否允许 Broker 自动创建订阅组，建议线下开发开启，线上关闭
- brokerClusterName : 集群名称
- brokerId : 0表示Master主节点 大于0表示从节点
- brokerIP1 : Broker服务地址
- brokerRole : broker角色 ASYNC_MASTER/ SYNC_MASTER/ SLAVE
- deleteWhen : 每天执行删除过期文件的时间，默认每天凌晨4点
- flushDiskType ：刷盘策略, 默认为 ASYNC_FLUSH(异步刷盘), 另外是SYNC_FLUSH(同步刷盘)
- listenPort ： Broker监听的端口号
- mapedFileSizeCommitLog ： 单个conmmitlog文件大小，默认是1GB
- mapedFileSizeConsumeQueue：ConsumeQueue每个文件默认存30W条，可以根据项目调整
- storePathRootDir : 存储消息以及一些配置信息的根目录 默认为用户的 ${HOME}/store
- storePathCommitLog：commitlog存储目录默认为${storePathRootDir}/commitlog
- storePathIndex： 消息索引存储路径
- syncFlushTimeout : 同步刷盘超时时间
- diskMaxUsedSpaceRatio ： 检测可用的磁盘空间大小，超过后会写入报错



## 消息常见发送状态

- 消息发送有同步和异步

> Broker消息投递状态
>
> - FLUSH_DISK_TIMEOUT：没有在规定时间内完成刷盘 (刷盘策略需要为SYNC_FLUSH 才会出这个错误)
> - FLUSH_SLAVE_TIMEOUT：主从模式下，broker是SYNC_MASTER, 没有在规定时间内完成主从同步
> - SLAVE_NOT_AVAILABLE：从模式下，broker是SYNC_MASTER, 但是没有找到被配置成Slave的Broker
> - SEND_OK：发送成功，没有发生上面的三种问题



## 生产和消费消息重试及处理

生产者Producer重试（异步和SendOneWay下配置无效）

- 消息重投(保证数据的高可靠性),本身内部支持重试，默认次数是2，
- 如果网络情况比较差，或者跨集群则建改多几次

com.example.rocketmq.jms.PayProducer

```java
@Component
public class PayProducer {

    private String producerGroup = "pay_group";

    private DefaultMQProducer producer;

    public PayProducer() {
        producer = new DefaultMQProducer(producerGroup);
        // 生产者投递消息重试次数
        producer.setRetryTimesWhenSendFailed(3);

        producer.setNamesrvAddr(JmsConfig.NAME_SERVER);
        start();

    }
}
```

com.example.rocketmq.controller.PayController

```java
@RestController
@RequestMapping("/api/pay")
public class PayController {

    @Autowired
    private PayProducer payProducer;

    @RequestMapping("/pay_cb")
    public Object callback(String text) throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
        // key是唯一的，一般是订单号等，这里仅做测试，生产者根据key进行消息重投，默认次数为2
        Message message = new Message(JmsConfig.TOPIC, "tag1","1234", ("Hello rocketmq = " + text).getBytes());
        // 发送消息
        SendResult sendResult = payProducer.getProducer().send(message, 10000);
        System.out.println(sendResult);
        return new HashMap<>();
    }

}
```



消费端重试

- 原因：消息处理异常、broker端到consumer端各种问题，如网络原因闪断，消费处理失败，ACK返回失败等问题。

注意：

- 重试间隔时间配置 ,默认每条消息最多重试 16 次

  `messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h`

- 超过重试次数人工补偿

- 消费端去重

- 一条消息无论重试多少次，这些重试消息的 Message ID，key 不会改变。

- 消费重试只针对集群消费方式生效；广播方式不提供失败重试特性，即消费失败后，失败消息不再重试，继续消费新的消息，

com.example.rocketmq.jms.PayConsumer

![](https://xk857.com/typora/2021/05image-20210527093040432.png)





## RocketMQ异步发送消息和回调 

核心代码

```java
producer.send(message, new SendCallback(){
	onSuccess(){}
	onException(){}
})
```

发送异步消息

```java
@RequestMapping("/async")
public String asyncMsg(String text) throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    // key是唯一的，一般是订单号等，这里仅做测试，生产者根据key进行消息重投，默认次数为2
    Message message = new Message(JmsConfig.TOPIC, "tag1","1234", ("Hello rocketmq = " + text).getBytes());
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





## OneWay消息及多种场景对比

- SYNC ：

  应用场景：重要通知邮件、报名短信通知、营销短信系统等

- ASYNC ：异步

  应用场景：对RT时间敏感，可以支持更高的并发，回调成功触发相对应的业务，比如注册成功后通知积分系统发放优惠券

- ONEWAY : 无需要等待响应

  使用场景：主要是日志收集，适用于某些耗时非常短，但对可靠性要求并不高的场景, 也就是LogServer, 只负责发送消息，不等待[服务器](https://www.baidu.com/s?wd=服务器&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)回应且没有回调函数触发，即只发送请求不等待应答

| 发送方式 | 发送 TPS | 发送结果反馈 | 可靠性   |
| :------- | :------- | :----------- | :------- |
| 同步发送 | 快       | 有           | 不丢失   |
| 异步发送 | 快       | 有           | 不丢失   |
| 单向发送 | 最快     | 无           | 可能丢失 |

发送OneWay消息

```java
@RequestMapping("/async")
public String sendOnWayMsg(String text) throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    Message message = new Message(JmsConfig.TOPIC, "tag1","1234", ("Hello rocketmq = " + text).getBytes());
    payProducer.getProducer().sendOneway(message);
    return "";
}
```





## 延迟消息-电商应用场景

什么是延迟消息：

- Producer 将消息发送到消息队列 RocketMQ 服务端，但并不期望这条消息立马投递，而是推迟到在当前时间点之后的某一个时间投递到 Consumer 进行消费，该消息即定时消息，目前支持固定精度的消息

- 源码：rocketmq-store > MessageStoreConfig.java 属性 messageDelayLevel

  `"1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";`

- 使用message.setDelayTimeLevel(xxx) //xxx是级别，1表示配置里面的第一个级别，2表示第二个级别

使用场景

- 通过消息触发一些定时任务，比如在某一固定时间点向用户发送提醒消息
- 消息生产和消费有时间窗口要求：比如在天猫电商交易中超时未支付关闭订单的场景，在订单创建时会发送一条 延时消息。这条消息将会在 30 分钟以后投递给消费者，消费者收到此消息后需要判断对应的订单是否已完成支付。 如支付未完成，则关闭订单。如已完成支付则忽略

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





## 生产者之MessageQueueSelector

**生产消息使用MessageQueueSelector投递到Topic下指定的queue，**

应用场景：顺序消息，分摊负载

默认topic下的queue数量是4，可以配置

```java
//可以使用Jdk8的lambda表达式，只有一个方法需要被实现
producer.send(message, new MessageQueueSelector(){
    select(List<MessageQueue> mqs, Message msg, Object arg){
        Integer queueNum = (Integer)arg;
        return mqs.get(queueNum);
    }
},0)
```

支持同步，异步发送指定的MessageQueue

选择的queue数量必须小于配置的，否则会出错























































































