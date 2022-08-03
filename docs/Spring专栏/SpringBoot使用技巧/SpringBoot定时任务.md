---
title: SpringBoot定时任务
date: 2021-08-03 19:42
categories:
- SpringBoot
tags:
- SpringBoot
---

定时任务在项目中被大量使用，例如航班车票初始化、定时推送、定时发邮件等等，在企业开发中，常常使用xxl-job框架来进行处理。
<!-- more -->

### 什么是定时任务，使用场景

- 某个时间定时处理某个任务
- 发邮件、短信等
- 消息提醒
- 订单通知
- 统计报表系统
- ...

### 常见定时任务

- Java自带的`java.util.Timer`类配置比较麻烦，时间延后问题
- Quartz框架: 配置更简单,xml或者注解适合分布式或者大型调度作业
- SpringBoot框架自带


### SpringBoot使用注解方式开启定时任务

::: tip
1. 启动类里面 `@EnableScheduling` 开启定时任务，自动扫描 
2. 定时任务业务类 加注解 `@Component` 被容器扫描 
3. 定时执行的方法加上注解 `@Scheduled(fixedRate=2000)` 定期执行一次
:::


### `cron` 定时任务表达式

- `cron` 定时任务表达式 `@Scheduled(cron="*/1 * * * * *")` 表示每秒
    - `crontab` 工具 https://tool.lu/crontab/
- `fixedRate`: 定时多久执行一次（上一次开始执行时间点后xx秒再次执行；）
- `fixedDelay`: 上一次执行结束时间点后xx秒再次执行
