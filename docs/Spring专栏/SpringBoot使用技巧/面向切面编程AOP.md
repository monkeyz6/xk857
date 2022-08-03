---
title: 面向切面编程AOP
date: 2021-08-03 19:34
categories:
- SpringBoot
tags:
- SpringBoot
---


什么是利用面向切面编程AOP？AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。常见的使用场景是日志记录，性能统计，安全控制，事务处理，异常处理……
<!-- more -->

## 核心概念

横切关注点：对哪些方法进行拦截，拦截后怎么处理，这些就叫横切关注点。比如 权限认证、日志、事物

通知Advice：在特定的切入点上执行的增强处理，有5种通知。做啥？比如记录日志，控制事务 ，提前编写好通用的模块，需要的地方直接调用

连接点 JointPoint：要用通知的地方，业务流程在运行过程中需要插入切面的具体位置，一般是方法的调用前后，全部方法都可以是连接点，只是概念，没啥特殊的。


切入点 Pointcut：不能全部方法都是连接点，通过特定的规则来筛选连接点, 就是Pointcut，选中那几个你想要的方法。在程序中主要体现为书写切入点表达式（通过通配、正则表达式）过滤出特定的一组JointPoint连接点，过滤出相应的 Advice 将要发生的joinpoint地方。

- 切面 Aspect：通常是一个类，里面定义 **切入点+通知**，定义在什么地方，什么时间点、做什么事情
  - **通知 advice指明了时间和做的事情（前置、后置等）**
  - **切入点 pointcut 指定在什么地方干这个事情**
  - web接口设计中，web层->网关层->服务层->数据层，每一层之间也是一个切面，对象和对象，方法和方法之间都是一个个切面


目标target：目标类，真正的业务逻辑，可以在目标类不知情的条件下，增加新的功能到目标类的链路上

织入Weaving：把切面（某个类）应用到目标函数的过程称为织入

AOP代理：AOP框架创建的对象，代理就是目标对象的加强，Spring中的AOP代理可以使JDK动态代理，也可以是CGLIB代理



### 通知类型

- `@Before`前置通知：在执行目标方法之前运行
- `@After`后置通知：在目标方法运行结束之后
- `@AfterReturning`返回通知：在目标方法正常返回值后运行
- `@AfterThrowing`异常通知：在目标方法出现异常后运行
- `@Around`环绕通知：在目标方法完成前、后做增强处理 ,环绕通知是最重要的通知类型 ,像事务,日志等都是环绕通知,注意编程中核心是一个`ProceedingJoinPoint`，需要手动执行`joinPoint.procced() `



### 切入点表达式

- 除了返回类型、方法名和参数外，其它项都是可选的 (修饰符基本都是省略不写)

```java
访问修饰符       返回值类型（必填）     包和类       方法（必填）
@Pointcut("execution(public int net.xdclass.sp.service.VideoOrderService.*(..))")
```

#### 常见匹配语法

- *：匹配任何数量字符，单个；
- ..：匹配任何数量字符，可以多个，在类型模式中匹配任何数量子包；在方法参数模式中匹配任何数量参数

  ```
  () 匹配一个不接受任何参数的方法
  (..) 匹配一个接受任意数量参数的方法
  (*) 匹配了一个接受一个任何类型的参数的方法
  (*,Integer) 匹配了一个接受两个参数的方法，其中第一个参数是任意类型，第二个参数必须是Integer类型
  ```



- 常见例子

    - 任意公共方法

      ```
      execution（public * *（..））
      ```

    - 任何一个名字以“save”开始的方法

      ```
      execution（* save*（..））
      ```

    - VideoService接口定义的任意方法（识别）

      ```
      execution（* net.xdclass.service.VideoService.*（..））
      ```

    - 在service包中定义的任意方法（识别）

      ```
      execution（* net.xdclass.service.*.*（..））
      ```

    - 匹配 service 包,子孙包下所有类的所有方法（识别）

      ```
      execution（* net.xdclass.service..*.*（..））
      ```





### AOP注解

步骤：

1. 开启SpringAOP注解配置

   ```java
   @Configuration
   @ComponentScan("net.xdclass")
   @EnableAspectJAutoProxy  //开启了spring对aspect的支持
   public class AnnotationAppConfig {
   
   }
   ```



2. 配置切入点和通知

   ```java
   @Component
   @Aspect  //告诉spring，这个一个切面类，里面可以定义切入点和通知
   public class LogAdvice {
   
   
       //切入点表达式
       @Pointcut("execution(* net.xdclass.sp.service.VideoServiceImpl.*(..))")
       public void aspect(){
   
       }
   
       //前置通知
       @Before("aspect()")
       public void beforeLog(JoinPoint joinPoint){
           System.out.println("LogAdvice  beforeLog");
       }
   
   
       //后置通知
       @After("aspect()")
       public void afterLog(JoinPoint joinPoint){
           System.out.println("LogAdvice  afterLog");
       }
   
   }
   ```


## PropertySource注解

- PropertySource，指定加载配置文件
    - 配置文件映射到实体类
- 使用@Value映射到具体的java属性

```java
@Configuration
@PropertySource(value = {"classpath:config.properties"})
public class CustomConfig {

    @Value("${server.host}")
    private String host;

    @Value("${server.port}")
    private int port;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
```

## 开启事务

1. 在入口类使用注解@EnableTransactionManagement开启事务
2. 类或方法上加@Transactional
