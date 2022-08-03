---
title: CloudAlibaba基本环境准备
date: 2021-08-03 21:28
categories:
- 插件开发
tags:
- 插件开发
---

SpringCloudAlibaba如果没有数据，是无法讲述清楚使用方式的，因此特地增加了此章节，来记录基本环境的准备，各位看官可根据自己的项目需求进行更改。
<!-- more -->



## 数据库准备

- 新建数据库cloud_video，新建video表

```sql
CREATE TABLE `video` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(524) DEFAULT NULL COMMENT '视频标题',
  `summary` varchar(1026) DEFAULT NULL COMMENT '概述',
  `cover_img` varchar(524) DEFAULT NULL COMMENT '封面图',
  `price` int(11) DEFAULT NULL COMMENT '价格,分',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `point` double(11,2) DEFAULT '8.70' COMMENT '默认8.7，最高10分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
```

```sql
INSERT INTO `video` (`id`, `title`, `summary`, `cover_img`, `price`, `create_time`, `point`)
VALUES
  (30, '互联网架构之JAVA虚拟机JVM零基础到高级实战', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/maven/%E8%AF%A6%E6%83%85%E5%9B%BE.png', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/maven/%E5%AE%98%E7%BD%91%E4%B8%BB%E5%9B%BE-mawen.png', 3980, '2021-06-24 22:14:00', 9.10),
  (40, '全新微信小程序零基础到项目实战', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%AF%A6%E6%83%85%E5%9B%BE.png', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%AE%98%E7%BD%91%E4%B8%BB%E5%9B%BE-%E5%B0%8F%E7%A8%8B%E5%BA%8F.png', 5980, '2021-01-18 22:14:00', 9.10),
  (41, '玩转搜索框架ElasticSearch7.x实战', 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_backend/elasticsearch7_detail.jpeg', 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/video/2019_backend/elasticsearch7.png', 4880, '2021-01-10 22:14:00', 8.70),
  (45, 'Docker实战视频教程入门到高级dockerfile/compose-Harbor', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/Docker/%E8%AF%A6%E6%83%85%E5%9B%BE.jpeg', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/Docker/%E5%AE%98%E7%BD%91%E4%B8%BB%E5%9B%BE-docker.png', 5980, '2021-01-10 22:14:00', 9.30),
  (46, '新版javase零基础到高级教程小白自学编程', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/%E6%96%B0%E7%89%88javase/%E8%AF%A6%E6%83%85%E5%9B%BE.png', 'https://file.xdclass.net/video/2020/%E6%96%B0%E7%89%88javase/%E5%AE%98%E7%BD%91%E4%B8%BB%E5%9B%BE-javase.png', 3980, '2021-01-24 22:14:00', 8.80),
  (47, 'Nodejs教程零基础入门到项目实战前端视频教程', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/node/%E5%AE%98%E7%BD%91%E8%AF%A6%E6%83%85%E5%9B%BE-node.png', 'https://xdvideo-file.oss-cn-shenzhen.aliyuncs.com/video/2020/node/%E5%AE%98%E7%BD%91%E4%B8%BB%E5%9B%BE-node.png', 6980, '2021-01-24 22:14:00', 8.90);

```





- 新建数据库cloud_user，新建user表

```
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(32) DEFAULT NULL,
  `pwd` varchar(128) DEFAULT NULL,
  `sex` int(2) DEFAULT NULL,
  `img` varchar(128) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `role` int(11) DEFAULT NULL COMMENT '1是普通用户，2是管理员',
  `username` varchar(128) DEFAULT NULL,
  `wechat` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
```

```sql
INSERT INTO `user` (`id`, `phone`, `pwd`, `sex`, `img`, `create_time`, `role`, `username`, `wechat`)
VALUES
  (1, '123', '666', 1, 'xdclass.net', '2021-09-09 00:00:00', 1, 'jack', 'xdclass6'),
  (2, '2323432', '794666918', 1, 'wwwww', '2020-05-20 04:54:01', 1, '小滴Anna姐姐', 'xdclass-anna'),
  (3, '2323432', 'xdclass-lw', 1, 'wwwww', '2020-05-20 04:54:42', 1, '二当家小D', 'xdclass1'),
  (4, '2323432', '3232323', 1, 'wwwww', '2020-05-20 04:55:07', 1, '老王', 'xdclass-lw');

```


- 新建数据库cloud_order，新建video_order表

```
CREATE TABLE `video_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `out_trade_no` varchar(64) DEFAULT NULL COMMENT '订单唯一标识',
  `state` int(11) DEFAULT NULL COMMENT '0表示未支付，1表示已支付',
  `create_time` datetime DEFAULT NULL COMMENT '订单生成时间',
  `total_fee` int(11) DEFAULT NULL COMMENT '支付金额，单位分',
  `video_id` int(11) DEFAULT NULL COMMENT '视频主键',
  `video_title` varchar(256) DEFAULT NULL COMMENT '视频标题',
  `video_img` varchar(256) DEFAULT NULL COMMENT '视频图片',
  `user_id` int(12) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
```



## 使用Maven创建聚合工程

- maven聚合工程
    - xk857-common
    - xk857-video-service
    - xk857-user-service
    - xk857-order-service


### 第一步：创建聚合工程

注意：聚合工程不需要src目录，直接删除即可

- pom文件示例

```xml
<groupId>com.xk857</groupId>
<artifactId>xk857-cloud</artifactId>
<version>1.0-SNAPSHOT</version>
<!-- 一般来说父级项目的packaging都为pom，packaging默认类型jar类型-->
<packaging>pom</packaging>

<!-- JDK版本等配置信息信息 -->
<properties>
    <java.version>1.8</java.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>


<!-- 锁定版本 -->
<dependencyManagement>
    <dependencies>
        <!--SpringBoot-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.3.3.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!--SpringCloud版本-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR8</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!--AlibabaCloud版本-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.1.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <fork>true</fork>
                <addResources>true</addResources>
            </configuration>
        </plugin>
    </plugins>
</build>
```



### 第二步：创建工具模块

> xk857-common

```xml
<dependencies>
    <!-- lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.16.18</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```



### 第三步：创建3个子项目

添加子项目依赖

```java
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.xk857</groupId>
            <artifactId>xk857-common</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
```



## 引入Mybatis

在common中创建实体类,例

```java
@Data
public class VideoOrder {
    private Integer id;
    private String outTradeNo;
    private Integer state;
    private Date createTime;
    private Integer totalFee;
    private Integer videoId;
    private String videoTitle;
    private String videoImg;
    private Integer userId;
}
```


### 在聚合工程添加Mybatis依赖

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.2</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```


### 在3个子工程添加依赖

```xml
<!-- MyBatis -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
<!-- 数据库驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 三个子项目新建application.yml配置数据库连接

```yml
server:
  port: 9000

spring:
  application:
    name: xk857-video-service
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://47.100.177.78:12345/cloud_video?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: root

# 控制台输出sql、下划线转驼峰
mybatis:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
```


### 创建启动类

```java
@SpringBootApplication
@MapperScan("com.xk857.dao")
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class,args);
    }
}
```

