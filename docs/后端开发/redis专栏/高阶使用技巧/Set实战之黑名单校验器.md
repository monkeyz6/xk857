---
title: Set实战之黑名单校验器
date: 2022-08-01 19:13
categories:
- java
- Redis
tags:
- java
- Redis
---

Set结构是一个无序不重复集合，用来存储黑名单信息再合适不过，还能通过原生的API查询某数据是否在集合中。
<!-- more -->

::: tip
**场景分析**：淘宝的商品评价功能，不是任何人就能评价的，有一种职业就是差评师。差评师就是勒索敲诈商家，这种差评师在淘宝里面就被设置了黑名单，即使购买了商品，也评价不了。
:::

::: tip
**redis技术解决方案**：黑名单过滤器除了针对上文说的淘宝评价，针对用户黑名单外，其实还有ip黑名单、设备黑名单等。在高并发的情况下，通过数据库过滤明显不符合要求，一般的做法都是通过Redis来实现的。
:::


步骤1：先把数据库的数据同步到redis的set集合中。

```java
/**
 * 向Redis模拟存储黑名单数据
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/23 14:16
 */
@Component
public class TaskService {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * -@PostConstruct该注解被用来修饰一个非静态的void（）方法。
     * 被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器执行一次。
     * PostConstruct在构造函数之后执行，init（）方法之前执行。
     */
    @PostConstruct
    public void init() {
        List<Integer> blankList = this.blackList();
        blankList.forEach(t-> redisTemplate.opsForSet().add("blank:user",t));
    }

    /**
     * 模拟100个黑名单
     * 实际场景应防止到数据库中
     * @return
     */
    public List<Integer> blackList() {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            list.add(i);
        }
        return list;
    }
}
```



步骤2：评价的时候验证是否为黑名单，通过sismember命令来实现。

```java
@RestController
@RequestMapping("/api/blank")
public class BlankController {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 黑名单校验接口
     * @param userId 用户id 实际生产场景可使用token判断
     * @return true 黑名单
     */
    @GetMapping("/isBlacklist")
    public boolean isBlankList(Integer userId) {
        boolean flag = false;
        try {
            flag = this.redisTemplate.opsForSet().isMember("blank:user", userId);
        } catch (Exception e) {
            //这里的异常，一般是redis瘫痪，或redis网络timeoutlog.error( "exception: " , ex) ;
            // TODO 走DB查询
        }
        return flag;
    }
}
```

