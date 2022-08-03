---
title: SpringBoot异步任务
date: 2021-08-03 19:54
categories:
- SpringBoot
tags:
- SpringBoot
---

在绝大多数的java应用中，很多场景都是采用的是同步的方式交互，那么一旦如果有第三方进行交互，则很有可能就会产生交互延迟的问题，那么这种时候就得考虑使用多线程，但是在Spring3以后它就已经内置了异步任务供我们使用。
<!-- more -->
### 异步任务 EnableAsync

::: tip
什么是异步任务和使用场景：适用于处理log、发送邮件、短信……等
:::



1. 启动类里面使用@EnableAsync注解开启功能，自动扫描
2. 定义异步任务类并使用@Component标记组件被容器扫描,异步方法加上@Async


```java
@Component
@Async
public class AsyncTask {

    public void task1(){
        try {
            Thread.sleep(4000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(" task 1 ");
    }

}
```



### Future

定义异步任务类需要获取结果

- 注意点：
    - 要把异步任务封装到类里面，不能直接写到Controller
    - 增加 Future<String> 返回结果 AsyncResult("task执行完成");
    - 如果需要拿到结果 需要判断全部的 task.isDone()

```java
@Component
@Async
public class AsyncTask {
    
    public Future<String> task4(){
        try {
            Thread.sleep(4000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(" task 4 ");
        return new AsyncResult<String>("task4");
    }

    public Future<String> task5(){
        try {
            Thread.sleep(4000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(" task 5 ");
        return new AsyncResult<String>("task5");
    }
    
}
```



