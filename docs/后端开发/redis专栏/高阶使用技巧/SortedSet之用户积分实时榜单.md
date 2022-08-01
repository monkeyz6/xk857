---
title: SortedSet之用户积分实时榜单
date: 2022-08-01 15:44
categories:
- java
- Redis
tags:
- java
- Redis
---

实时榜单就很常见了，游戏对战平台积分实时榜单、双11热卖榜等等，都有实时榜单。SortedSet结构是有序不重复集合，能够设置排名并根据排名获取元素，非常适合用于各类实时榜单中。
<!-- more -->

- 用户玩游戏-积分实时榜单
- IT视频热销实时榜单
- 电商商品热销实时榜单
- 一般的排行榜读多写少，可以对 master 进行写入操作，然后多个 slave 进行读取操作。
- 如果是对象记得重写HashCode与Equals方法

积分对象

```java
/**
 * 积分对象
 * @author cv大魔王
 * @version 1.0
 * @date 2021/5/21 15:37
 */
@Data
public class UserPointVO implements Serializable {

    public UserPointVO(String username, String phone) {
        this.username = username;
        this.phone = phone;
    }

    private String username;

    private String phone;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPointVO that = (UserPointVO) o;
        return Objects.equals(username, that.username) && Objects.equals(phone, that.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, phone);
    }
}

```

模拟数据

```java
@Test
public void testData() {
    UserPointVO p1 = new UserPointVO("老王", "13113");
    UserPointVO p2 = new UserPointVO("老A", "324");
    UserPointVO p3 = new UserPointVO("老B", "242");
    UserPointVO p4 = new UserPointVO("老C", "542345");
    UserPointVO p5 = new UserPointVO("老D", "235");
    UserPointVO p6 = new UserPointVO("老E", "1245");
    UserPointVO p7 = new UserPointVO("老F", "2356432");
    UserPointVO p8 = new UserPointVO("老G", "532332");

    BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
    operations.add(p1, 888);
    operations.add(p2, 5456);
    operations.add(p3, 589);
    operations.add(p4, 17);
    operations.add(p5, 569);
    operations.add(p6, 742);
    operations.add(p7, 333);
    operations.add(p8, 267);
}
```



### 实时榜单接口开发

```java
 /**
     * 返回榜单信息前五
     * @return
     */
    @RequestMapping("real_rank1")
    public JsonData realRank() {
        BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
        // 只要前五，如果返回全部则是0 -1
        Set<UserPointVO> set = operations.reverseRange(0, 4);
        return JsonData.buildSuccess(set);
    }

    /**
     * 返回榜单信息后五
     * @return
     */
    @RequestMapping("real_rank2")
    public JsonData realRank2() {
        BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
        // 只要前五，如果返回全部则是0 -1
        Set<UserPointVO> set = operations.range(0, 4);
        return JsonData.buildSuccess(set);
    }


    /**
     * 查看某个用户的排名
     * @return
     */
    @RequestMapping("real_rank3")
    public JsonData realRank3(String phone,String name) {
        BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
        UserPointVO vo = new UserPointVO(name, phone);
        Long rank = operations.reverseRank(vo);
        return JsonData.buildSuccess(++rank);
    }

    /**
     * 给用户加积分
     * @return
     */
    @RequestMapping("uprank")
    public JsonData upRank(String phone,String name,int point) {
        BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
        UserPointVO vo = new UserPointVO(name, phone);

        operations.incrementScore(vo,point);
        return JsonData.buildSuccess();
    }



    /**
     * 查看某个用户积分
     * @return
     */
    @RequestMapping("mypoint")
    public JsonData myPoint(String phone,String name) {
        BoundZSetOperations<String, UserPointVO> operations = redisTemplate.boundZSetOps("point:rank:real");
        UserPointVO vo = new UserPointVO(name, phone);

        Double score = operations.score(vo);
        return JsonData.buildSuccess(score);
    }

```
