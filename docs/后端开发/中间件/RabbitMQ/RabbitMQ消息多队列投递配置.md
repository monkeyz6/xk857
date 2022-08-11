---
title: RabbitMQ消息多队列投递配置
date: 2022-01-13 17:17
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

当我们需要再SpringBoot项目中，需要投递消息到不同的队列中去，此时的MQ配置文件该如何编写呢？只改变队列名称和交换机名称可行吗？
<!-- more -->

### 项目中有多个队列/交换机时的配置

直接复制只改变交换机和队列名称会报错，因为交换机和队列我们之前已经注入过了，因此创建多个需要指定Bean的名称，先修改RabbitMQConfig

```java
@Configuration
public class RabbitMQConfig {

    /**
     * 交换机名称
     */
    public static final String EXCHANGE_NAME = "order_exchange";

    /**
     * 队列名称
     */
    public static final String QUEUE = "order_queue";


    @Bean(name = "orderExchange")
    public Exchange orderExchange() {
        // 创建交换机，durable代表持久化，使用Bean注入
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(true).build();
    }

    @Bean(name = "orderQueue")
    public Queue orderQueue() {
        // 创建队列，使用Bean注入
        return QueueBuilder.durable(QUEUE).build();
    }

    /**
     * 交换机和队列绑定关系
     * @param queue 上面注入的队列Bean，如果你的项目又多个，记得给Bean取名字
     * @param exchange 上面注入的交换机Bean
     */
    @Bean
    public Binding orderBinding(@Qualifier("orderQueue") Queue queue, @Qualifier("orderExchange") Exchange exchange) {
        // with是绑定的路由键，
        return BindingBuilder.bind(queue).to(exchange).with("order.#").noargs();
    }
}
```

然后创建RabbitMQ2Config

```java
@Configuration
public class RabbitMQ2Config {

    /**
     * 交换机名称
     */
    public static final String EXCHANGE_NAME = "order_refund_exchange";

    /**
     * 队列名称
     */
    public static final String QUEUE = "order_refund_queue";


    @Bean("orderExchange2")
    public Exchange orderExchange2() {
        // 创建交换机，durable代表持久化，使用Bean注入
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(true).build();
    }

    @Bean("orderQueue2")
    public Queue orderQueue2() {
        return QueueBuilder.durable(QUEUE).build();
    }

    @Bean
    public Binding orderBinding2(@Qualifier("orderQueue2") Queue queue,@Qualifier("orderExchange2") Exchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("order.#").noargs();
    }
}
```



### 发送消息到不同队列

发送消息是如何发送的呢？我们需要将消息发送到指定的交换机即可。

```java {10}
@SpringBootTest
class RabbitmqDemoApplicationTests {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    void send() {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, "order.new", "我是订单队列的消息");
        // 注意看不同的地方，RabbitMQ2Config.EXCHANGE_NAME
        rabbitTemplate.convertAndSend(RabbitMQ2Config.EXCHANGE_NAME, "order.new", "我是退款的消息");
    }
}
```



### 消息消费者分别监听不同队列的消息

监听 `order_queue` 队列中的消息

```java
@Component
@RabbitListener(queues = "order_queue") // 监听的队列名称
public class OrderMQListener {

    @RabbitHandler
    public void releaseCouponRecord(String msg, Message message) throws IOException {
        log.info("order_queue监听到消息：消息内容，msg={}", msg);
    }
}

```

监听 `order_refund_queue` 队列的消息

```java
@Component
@RabbitListener(queues = "order_refund_queue") // 监听的队列名称
public class OrderMQ2Listener {

    @RabbitHandler
    public void releaseCouponRecord(String msg, Message message) throws IOException {
        log.info("order_refund_queue监听到消息：消息内容，msg={}", msg);
    }
}
```



