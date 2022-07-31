
## 延迟消息-电商应用场景




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























































































