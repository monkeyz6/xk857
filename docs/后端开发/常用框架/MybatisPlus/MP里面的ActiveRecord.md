---
title: MP里面的ActiveRecord
date: 2021-05-29 17:27
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

ActiveRecord（简称AR）一直广受动态语言（PHP、Ruby等）的喜爱，而Java作为准静态语言，对于ActiveRecord往往只能感叹其优雅，所以我们也在AR道路上进行了一定的探索，喜欢大家能够喜欢。
<!-- more -->
::: tip
ActiveRecord也属于ORM（对象关系映射）层，由Rails最早提出，遵循标准的ORM模型：表映射到记录，记录映射到对象，字段映射到对象属性。配合遵循的命名和配置惯例，能够很大程度的快速实现模型的操作，而且简洁易懂。
:::


ActiveRecord的主要思想是：
- 每一个数据库表对应创建一个类，类的每一个对象实例对应于数据库中表的一行记录；通常表的每个字段在类中都有相应的Field；
- ActiveRecord同时负责把自己持久化，在ActiveRecord中封装了对数据库的访问，即CURD;
- ActiveRecord是一种领域模型(Domain Model)，封装了部分业务逻辑；<br>


## 开始使用
在MP中，开启AR非常简单，只需要将实体对象继承Model即可。

```java
@Data
@TableName("tb_user")
public class User extends Model<User> {

    @TableId(type = IdType.AUTO)
    private Long id;
    @TableField("user_name")
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}

```

### 1.根据主键查询
```java
public User selectOne(User user) {
    return user.selectById();
}
```

### 2.新增数据
```java
public User saveUser(User user) {
    user.insert();
    //此时返回user会返回User自动生成的id，MyBatisPlus已经帮我们做好了相关工作
    return user;
}
```

### 3.更新操作
```java
public void updateUserById(User user) {
    user.updateById();
}
```

### 4.删除操作
```java
public void deleteById(Integer id) {
    User user = new User();
    user.setId(id);
    user.deleteById();
}
```


### 5.根据条件查询
```java
public List<User> findAll() {
    User user = new User();
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.le("age","20");
    List<User> users = user.selectList(wrapper);
    return users;
}
```
