---
title: MybatisPlus核心注解
date: 2021-05-29 17:03
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

注意到POJO类的注解了吗，这里介绍一下注解的含义。
<!-- more -->

### 表名注解：@TableName

|       属性        |    类型    | 必须指定 | 默认值 | 描述                     |
|:---------------:|:--------:|:----:|:---:|------------------------|
|      value      |  String  |  否   | ""  | 表名                     |
| excludeProperty | String[] |  否   | {}  | 需要排除的属性名(@since 3.3.1) |


### 主键注解：@TableId
|  属性   |   类型   | 必须指定 |     默认值     |  描述   |
|:-----:|:------:|:----:|:-----------:|:-----:|
| value | String |  否   |     ""      | 主键字段名 |
| type  |  Enum  |  否   | IdType.NONE | 主键类型  |


#### 主键生成方式：IdType
|       值       |                                                                      描述                                                                      |
|:-------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
|     AUTO      |                                                                   数据库ID自增                                                                    |
|     NONE      |                                                   无状态,该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT)                                                    |
|     INPUT     |                                                               insert前自行set主键值                                                                |
|   ASSIGN_ID   | 分配ID(主键类型为Number(Long和Integer)或String) <br> (since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId` <br> (默认实现类为`DefaultIdentifierGenerator`雪花算法) |
|  ASSIGN_UUID  |                          分配UUID,主键类型为String(since 3.3.0), <br> 使用接口`IdentifierGenerator`的方法`nextUUID`(默认default方法)                           |
|   ID_WORKER   |                                                   分布式全局唯一ID 长整型类型(please use `ASSIGN_ID`)                                                    |
|     UUID      |                                                     32位UUID字符串(please use `ASSIGN_UUID`)                                                     |
| ID_WORKER_STR |                                                   分布式全局唯一ID 字符串类型(please use `ASSIGN_ID`)                                                    |


### 字段注解(非主键)：@TableField

|      属性      |   类型    | 必须指定 |        默认值        |       描述       |
|:------------:|:-------:|:----:|:-----------------:|:--------------:|
|    value     | String  |  否   |        ""         |     数据库字段名     |
|    exist     | boolean |  否   |       true        |   是否为数据库表字段    |
|     fill     |  Enum   |  否   | FieldFill.DEFAULT |    字段自动填充策略    |
|    select    | boolean |  否   |       true        | 是否进行 select 查询 |
| numericScale | String  |  否   |        ""         |  指定小数点后保留的位数   |


#### 字段填充策略：FieldFill
|       值       |     描述     |
|:-------------:|:----------:|
|    DEFAULT    |   默认不处理    |
|    INSERT     |  插入时填充字段   |
|    UPDATE     |  更新时填充字段   |
| INSERT_UPDATE | 插入和更新时填充字段 |


### @Version
描述：乐观锁注解、标记 @Verison 在字段上


### @EnumValue
描述：通枚举类注解(注解在枚举字段上)


