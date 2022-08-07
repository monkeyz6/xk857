---
title: MybatisPlus之逻辑删除
date: 2021-06-02 17:41
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

也是常用的功能，比自己手写逻辑删除要显得更加规范。
<!-- more -->


## 修改表结构

为tb_user表增加deleted字段，用于表示数据是否被删除，1代表删除，0代表未删除。
```java
ALTER TABLE `tb_user` ADD COLUMN `deleted` int(1) NULL DEFAULT 0 COMMENT '1代表删除，0代表未删除' AFTER `version`;
```

同时，也修改User实体，增加deleted属性并且添加@TableLogic注解：
```java
@TableLogic 
private Integer deleted;
```


### 配置
```yml
mybatis-plus:
  global-config:
    db-config:
      # 逻辑已删除值(默认为 1)
      logic-delete-value: 1
      # 逻辑未删除值(默认为 0)
      logic-not-delete-value: 0
```

### 测试
```java
@Test 
public void testDeleteById(){ 
    this.userMapper.deleteById(2L); 
}
```


