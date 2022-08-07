---
title: Set结构实战之京豆抽奖
date: 2022-08-01 19:35
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
---

Set结构的特点是无序不重复，那为什么set集合适用于抽奖呢？因为set集合还支持随机获取元素。
<!-- more -->

::: tip
**具体的技术方案**：采用set集合的 `srandmember` 命令来实现，随机返回set的一个元素
:::

数据准备：

```java
@Component
public class JdTask {

    @Autowired
    private RedisTemplate redisTemplate;

    public static final String PRIZE_KEY = "jd:goods";

    /**
     *提前先把数据刷新到redis缓存中。
     */
    @PostConstruct
    public void init(){
        boolean bo=redisTemplate.hasKey(PRIZE_KEY);
        if(!bo){
            List<String> crowds=this.prize();
            crowds.forEach(t->redisTemplate.opsForSet().add(PRIZE_KEY,t));
        }
    }

    /**
     * 按一定的概率初始化奖品
     * 因为Set有不可重复的特点，所以要防止重复
     */
    public List<String> prize() {
        List<String> list=new ArrayList<>();
        //10个京豆，概率10%
        for (int i = 0; i < 10; i++) {
            list.add("10-"+i);
        }
        //5个京豆，概率20%
        for (int i = 0; i < 20; i++) {
            list.add("5-"+i);
        }
        //1个京豆，概率60%
        for (int i = 0; i < 60; i++) {
            list.add("1-"+i);
        }
        //0个京豆，概率10%
        for (int i = 0; i < 10; i++) {
            list.add("0-"+i);
        }
        return list;
    }

}
```

接口开发：

```java
@RestController
@RequestMapping("/api/jd")
public class JdController {

    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping(value = "/prize")
    public String prize() {
        String result = "";
        //随机取1次。
        String object = (String) redisTemplate.opsForSet().randomMember(JdTask.PRIZE_KEY);
        if (!StringUtils.isEmpty(object)) {
            //截取序列号 例如10-1
            int temp = object.indexOf('-');
            int no = Integer.valueOf(object.substring(0, temp));
            switch (no) {
                case 0:
                    result = "谢谢参与";
                    break;
                case 1:
                    result = "获得1个京豆";
                    break;
                case 5:
                    result = "获得5个京豆";
                    break;
                case 10:
                    result = "获得10个京豆";
                    break;
                default:
                    result = "谢谢参与";
            }
        }
        return result;
    }
}
```
