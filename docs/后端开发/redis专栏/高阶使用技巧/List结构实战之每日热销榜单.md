---
title: List结构实战之每日热销榜单
date: 2022-08-01 15:07
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
---

List数据结构适合非实时更新的榜单，像商城热卖榜单，每天更新一次，以及需要支持人工运营替换榜单位置等
<!-- more -->

::: tip
- 需求
  - 商城热卖榜单，每天更新一次
  - 需要支持人工运营替换榜单位置
- 企业中流程
  - 定时任务计算昨天售卖最多的商品
  - 晚上12点到1点更新到榜单上
  - 预留一个接口，支持人工运营
:::


模拟一个视频实体类：
```java
@Data
@AllArgsConstructor
public class VideoDO implements Serializable {

    private int id;

    private String title;

    private String img;

    private int price;
}
```

构建模拟数据，实际环境可以使用异步任务每日刷新榜单

```java
@Test
public void saveRank() {
    String DAILY_RANK_KEY = "video:rank:daily";
    VideoDO video1 = new VideoDO(3,"视频1","xk857",1099);
    VideoDO video2 = new VideoDO(5,"视频2","xk857",59);
    VideoDO video3 = new VideoDO(53,"视频3","xk857",49);
    VideoDO video4 = new VideoDO(15,"视频4","xk857",49);
    VideoDO video5 = new VideoDO(45,"视频5","xk857",89);
    redisTemplate.opsForList().leftPushAll(DAILY_RANK_KEY,video4,video5,video3,video2,video1);
}
```

请求数据接口

```java
@RestController
@RequestMapping("/api/rank")
public class RankController {

    @Autowired
    private RedisTemplate redisTemplate;

    private static final String DAILY_RANK_KEY = "video:rank:daily";

    @RequestMapping("daily_rank")
    public JsonData videoDailyRank(){
        List<VideoDO> list = redisTemplate.opsForList().range(DAILY_RANK_KEY, 0 , -1);
        return JsonData.buildSuccess(list);
    }

}
```

人工替换预留接口
```java
@Test
public void replaceRank(){
    String DAILY_RANK_KEY = "video:rank:daily";
    VideoDO video = new VideoDO(42,"视频100","https://uw76.cc/ccc",89);
    //在集合的指定位置插入元素,如果指定位置已有元素，则覆盖，没有则新增
    redisTemplate.opsForList().set(DAILY_RANK_KEY,1,video);
}
```

