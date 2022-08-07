---
title: 如何抵御XSS攻击?
date: 2021-04-16 19:19
categories:
- MySQL
tags:
- MySQL
---

XSS(跨站脚本)攻击，是让浏览器渲染DOM的时候意外的执行了恶意JS代码。XSS攻击的原理是在网页中嵌入一个恶意脚本
<!-- more -->
::: danger
浏览器是一个沙箱环境，JavaScript不可以读写本地文件、不可以连接数据库、不可以创建线程。XSS不会对系统造成破坏，但是却可以盗用帐户信息。
:::

举个例子，你注册`csdn`邮箱的信息，被黑客的脚本检测到了，通过ajax发送到黑客手中，你说：`csdn`被盗了没关系问题不大，如果你的`csdn`密码和你的支付宝密码相同呢？

我们需要防止用户上传例如文章等信息中的内容是否包含恶意脚本，如果有该怎么办。

因为我是专注于java的，因此这里只给出java的解决方案，使用 `AntiSamy`，依赖如下：

```xml
<dependency>
    <groupId>org.owasp.antisamy</groupId>
    <artifactId>antisamy</artifactId>
    <version>1.6.4</version>
</dependency>
```
这个用起来还是比较麻烦的，我这里有个简单的用法，我是按照黑马的教程来的，[原视频链接](https://www.bilibili.com/video/BV1tw411f79E?p=61&spm_id_from=pageDriver)点击后可进行跳转。

### 1.引入依赖
```xml
<dependencies>
    <dependency>
        <groupId>com.itheima</groupId>
        <artifactId>pd-tools-xss</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

### 2.直接使用
```java 
@RestController
@RequestMapping("/xss")
public class XSSController {
    @GetMapping("/get")
    public String get(String text){
        return "处理之后的文本内容为：" + text;
    }
}
```

如果包含特殊标签，会被xss直接处理掉。
