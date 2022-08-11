---
title: RabbitMQ实现延时队列
date: 2022-01-13 21:08
categories:
- SpringBoot
- RabbitMQ
tags:
- SpringBoot
- RabbitMQ
- 中间件
---

什么是延迟队列？Producer将消息发送到消息队列服务端，但并不期望这条消息立马投递，而是推迟到在当前时间点之后的某一个时间投递到Consumer进行消费，该消息即定时消息。例如超时关单、优惠券回收等场景会用到。
<!-- more -->

RabbitMQ本身是不支持延迟队列的，我们可以通过死信队列的特性来实现延时队列。

![image-20220811111213039](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220811111213039.png)


### 创建延时队列配置类

说明：创建死信队列和创建延时队列没什么不同，当成正常的队列创建就行了。

```java
@Configuration
public class RabbitMQTTLConfig {

    /**
     * 死信队列
     */
    public static final String LOCK_MERCHANT_DEAD_QUEUE = "lock_merchant_dead_queue";

    /**
     * 死信交换机
     */
    public static final String LOCK_MERCHANT_DEAD_EXCHANGE = "lock_merchant_dead_exchange";

    /**
     * 进入死信队列的路由key
     */
    public static final String LOCK_MERCHANT_ROUTING_KEY = "lock_merchant_routing_key";


    /**
     * 创建死信交换机
     */
    @Bean("lockMerchantDeadExchange")
    public Exchange lockMerchantDeadExchange() {
        return new TopicExchange(LOCK_MERCHANT_DEAD_EXCHANGE, true, false);
    }

    /**
     * 创建死信队列
     */
    @Bean("lockMerchantDeadQueue")
    public Queue lockMerchantDeadQueue() {
        return QueueBuilder.durable(LOCK_MERCHANT_DEAD_QUEUE).build();
    }

    /**
     * 绑定死信交换机和死信队列，和创建普通队列没什么区别
     */
    @Bean
    public Binding lockMerchantBinding(@Qualifier("lockMerchantDeadQueue") Queue queue, @Qualifier("lockMerchantDeadExchange") Exchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(LOCK_MERCHANT_ROUTING_KEY).noargs();
    }
    
    
    

    /**
     * 普通队列，绑定的个死信交换机
     */
    public static final String NEW_MERCHANT_QUEUE = "new_merchant_queue";

    /**
     * 普通的topic交换机
     */
    public static final String NEW_MERCHANT_EXCHANGE = "new_merchant_exchange";

    /**
     * 路由key
     */
    public static final String NEW_MERCHANT_ROUTTING_KEY = "new_merchant_routing_key";


    /**
     * 创建普通交换机
     */
    @Bean("newMerchantExchange")
    public Exchange newMerchantExchange() {
        return new TopicExchange(NEW_MERCHANT_EXCHANGE, true, false);
    }

    /**
     * 创建普通队列
     */
    @Bean("newMerchantQueue")
    public Queue newMerchantQueue() {
        Map<String, Object> args = new HashMap<>(3);
        //消息过期后，进入到死信交换机
        args.put("x-dead-letter-exchange", LOCK_MERCHANT_DEAD_EXCHANGE);
        //消息过期后，进入到死信交换机的路由key
        args.put("x-dead-letter-routing-key", LOCK_MERCHANT_ROUTING_KEY);
        //过期时间，单位毫秒，10秒
        args.put("x-message-ttl", 10000);
        return QueueBuilder.durable(NEW_MERCHANT_QUEUE).withArguments(args).build();
    }

    /**
     * 绑定交换机和队列
     */
    @Bean
    public Binding newMerchantBinding(@Qualifier("newMerchantQueue") Queue queue, @Qualifier("newMerchantExchange") Exchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(NEW_MERCHANT_ROUTTING_KEY).noargs();
    }
}
```

### 延时队列-发送消息

思考一下，发送消息是发给谁的？发送消息是发给普通队列的，普通队列的消息过期会进入死信队列，然后我们监听死信队列的消息，但是发送消息是发给普通队列的。这次发消息不使用测试类发送了，换成发送

```java
@RestController("/")
public class TestController {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/send/ttl/{msg}")
    public boolean sendTTLMsg(@PathVariable String msg) {
        rabbitTemplate.convertAndSend(RabbitMQTTLConfig.NEW_MERCHANT_EXCHANGE, RabbitMQTTLConfig.NEW_MERCHANT_ROUTTING_KEY, 
                                      "超时关单信息，10秒后接收订单信息，" + msg);
        return true;
    }

}
```

### 延时队列-接收消息

消息消费者写法上没有不同，注意监听的是死信队列即可

```java
@Component
@RabbitListener(queues = "lock_merchant_dead_queue") // 监听的队列名称是死信队列的名称
public class TTLMQListener {
    
    @RabbitHandler
    public void releaseCouponRecord(String msg, Message message) throws IOException {
        log.info("监听到延迟消息：消息内容，msg={}", msg);
    }
}
```







