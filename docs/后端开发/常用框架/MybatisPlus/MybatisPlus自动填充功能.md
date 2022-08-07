---
title: MybatisPlus自动填充功能
date: 2021-06-02 17:33
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

我们可以给某些字段赋一个初始值，使用场景例如新用户注册或者添加用户时，默认密码相同。当然你也可以使用数据库的默认值功能，但是如果你没有修改数据库的权限或者你使用的数据库不支持这个功能，那么这个功能就非常有用了。
<!-- more -->

- 减低代码的耦合度，多人合作不容易出现BUG。
- 对插入的数据进行增强操作，例如密码加密。

### 添加@TableField注解

```java
//插入数据时进行填充 
@TableField(fill = FieldFill.INSERT) 
private String password;
```

FieldFill提供了多种模式选择：
```java
public enum FieldFill { 

    /*** 默认不处理 */ 
    DEFAULT, 
    
    /*** 插入时填充字段 */ 
    INSERT, 
    
    /*** 更新时填充字段 */ 
    UPDATE, 
    
    /*** 插入和更新时填充字段 */ 
    INSERT_UPDATE 
}
```

### 编写MyMetaObjectHandler

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    
    /** 插入数据时填充 */
    @Override
    public void insertFill(MetaObject metaObject) {
        // 获取password的值，如果为空则填充，不为空不做处理
        Object password = getFieldValByName("password", metaObject);
        if (null == password) {
            //字段为空，可以进行填充 
            setFieldValByName("password", "123456", metaObject);
        }
    }

    /** 更新数据时填充*/
    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
```
