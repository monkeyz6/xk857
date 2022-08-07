---
title: SpringCache缓存框架入门及准备操作
date: 2022-08-01 22:28
categories:
- java
- Redis
- SpringBoot
tags:
- java
- SpringBoot
- Redis
- SpringCache
- java注解
---

SpringBoot通过注解优雅的使用Redis进行缓存，利用的就是SpringCache缓存框架，本篇文章带你走入注解式缓存的世界。
<!-- more -->

## SpringCache简介

- 文档：https://spring.io/guides/gs/caching/
- 自Spring 3.1起，提供了类似于@Transactional注解事务的注解Cache支持，且提供了Cache抽象
- 提供基本的Cache抽象，方便切换各种底层Cache
- 只需要更少的代码就可以完成业务数据的缓存
- 提供事务回滚时也自动回滚缓存，支持比较复杂的缓存逻辑
- 核心
    - 一个是Cache接口，缓存操作的API；
    - 一个是CacheManager管理各类缓存，有多个缓存框架的实现



## 基本使用方式
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

- 配置文件指定缓存类型
```
spring:
  cache:
    type: redis
```

- 启动类开启缓存注解
```java
@EnableCaching
```

::: tip
说明：使用前需要您配置好SpringBoot并引入Redis，保障项目能够进行正常开发，如果您还没有引入Redis可以参考文章：[Redis概述及基本使用](/后端开发/redis专栏/高阶使用技巧/Redis概述及基本使用)
:::


## 前提配置：SpringBoot整合MyBatisPlus
少量数据并不能解释清楚框架的API是如何使用的，文章是配合MyBatisPlus对数据库进行增删改查来进行讲解的。我更建议您可以在学习的过程中，使用自己的项目来进行更改，本小节的目的是加深读者对下一小节的理解。

依赖

```xml
<!--mybatis plus和springboot整合-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.0</version>
</dependency>

<!--数据库驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.15</version>
</dependency>
```

配置

```java
spring:
  redis:
    host: ip
    port: 6379
    password: 密码
  cache:
    type: redis
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/rdis6?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: xk857.com
  #配置plus打印sql日志
  mybatis-plus:
    configuration:
      log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```



配置MyBatisPlus分页

```java
@Configuration
@MapperScan("com.xk857.mapper")
public class MyBatisConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```



创建数据库

```mysql
CREATE TABLE `product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL COMMENT '标题',
  `cover_img` varchar(128) DEFAULT NULL COMMENT '封面图',
  `detail` varchar(256) DEFAULT '' COMMENT '详情',
  `amount` int(10) DEFAULT NULL COMMENT '新价格',
  `stock` int(11) DEFAULT NULL COMMENT '库存',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
```

填充数据

```java
INSERT INTO `redis6`.`product` (`id`, `title`, `cover_img`, `detail`, `amount`, `stock`, `create_time`) VALUES (1, '李宁短袖男士旗舰官方BADFIVE篮球男装夏季宽松纯棉T恤圆领运动服', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/92688455/O1CN01T2SulH2CKRPooOUXV-92688455.jpg_430x430q90.jpg', '//gdp.alicdn.com/imgextra/i4/92688455/O1CN015ptmSW2CKRPvritGg_!!92688455.jpg', 213, 100, '2021-09-12 00:00:00');
INSERT INTO `redis6`.`product` (`id`, `title`, `cover_img`, `detail`, `amount`, `stock`, `create_time`) VALUES (2, '优衣库 男装亲子装(UT)ULTRAMAN印花T恤(奥特英雄系列短袖)438340', 'https://img.alicdn.com/imgextra/i1/196993935/O1CN0110HkIq1ewHBtmX8aX_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i3/196993935/O1CN01DLn7VI1ewHBorNeqY_!!196993935.jpg', 42, 100, '2021-03-12 00:00:00');
INSERT INTO `redis6`.`product` (`id`, `title`, `cover_img`, `detail`, `amount`, `stock`, `create_time`) VALUES (3, 'Hazzys哈吉斯珠地棉夏季POLO衫男士短袖轻薄凉感T恤男装体恤上衣', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/1910887896/O1CN01szBuiA28CPzj8Ine3_!!1910887896.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i1/1910887896/O1CN01szBuiA28CPzj8Ine3_!!1910887896.jpg_430x430q90.jpg', 12, 20, '2021-03-22 00:00:00');
INSERT INTO `redis6`.`product` (`id`, `title`, `cover_img`, `detail`, `amount`, `stock`, `create_time`) VALUES (4, '男士短袖t恤2021新款纯棉上衣服体桖潮流半袖潮牌夏装冰丝男装白T', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/874506242/O1CN01qYi8Q21vysk0qHzUR_!!874506242.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/874506242/O1CN01qYi8Q21vysk0qHzUR_!!874506242.jpg_430x430q90.jpg', 14, 20, '2022-11-12 00:00:00');
```



实体类

```java
@Data
@TableName("product")
public class ProductDO implements Serializable  {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 封面图
     */
    private String coverImg;

    /**
     * 详情
     */
    private String detail;

    /**
     * 新价格
     */
    private Integer amount;

    /**
     * 库存
     */
    private Integer stock;

    /**
     * 创建时间
     */
    private Date createTime;
}
```

Service

```java
public interface IProductService{

    int save(ProductDO product);

    int delById(int id);

    int updateById(ProductDO product);

    ProductDO findById(int id);
    
    IPage<ProductDO> page(int page, int size);
}
```

ServiceImpl

```java
@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public int save(ProductDO productDO) {
        return productMapper.insert(productDO);
    }

    @Override
    public int delById(int id) {
        return productMapper.deleteById(id);
    }

    @Override
    public int updateById(ProductDO productDO) {
        return productMapper.updateById(productDO);
    }

    @Override
    public ProductDO findById(int id) {
        return productMapper.selectById(id);
    }
    
    @Override
    public IPage<ProductDO> page(int page, int size) {
        Page<ProductDO> pageInfo = new Page<>(page, size);
        return productMapper.selectPage(pageInfo, null);
    }
}
```



Controller

```java
@RestController
@RequestMapping("/api/video")
public class ProductController {

    @Autowired
    private IProductService productService;


    @PostMapping("add")
    public JsonData add(@RequestBody ProductDO productDO) {
        productDO.setCreateTime(new Date());
        int save = productService.save(productDO);
        return JsonData.buildSuccess(save);
    }


    @PutMapping("update")
    public JsonData update(@RequestBody ProductDO productDO) {
        productService.updateById(productDO);
        return JsonData.buildSuccess();
    }


    @DeleteMapping("delete/{id}")
    public JsonData delete(@PathVariable int id) {
        productService.delById(id);
        return JsonData.buildSuccess();
    }


    @GetMapping("/{id}")
    public JsonData findById(@PathVariable int id) {
        ProductDO productDO = productService.findById(id);
        return JsonData.buildSuccess(productDO);
    }
    
    
    @GetMapping("/page/{page}/{size}")
    public JsonData findPage(@PathVariable int page,@PathVariable int size) {
        IPage<ProductDO> page1 = productService.page(page, size);
        return JsonData.buildSuccess(page1);
    }
}
```

使用PostMan自行进行测试，保障项目能够正常运行，如果您的项目已经有增删改查的部分，请忽略此小结。

