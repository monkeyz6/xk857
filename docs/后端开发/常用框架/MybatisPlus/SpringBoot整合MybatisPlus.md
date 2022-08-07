---
title: SpringBoot整合MybatisPlus
date: 2021-05-29 16:53
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

MyBatis-Plus是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生，支持多种数据库MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
<!-- more -->

SpringBoot项目引入依赖
```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.4.2</version>
</dependency>
```

然后在application.yml配置文件中配置数据库地址，这些就不罗嗦了。先建立pojo类

```java
@Data
@TableName("tb_user") // 设置表名
public class User {

    //主键自增，我这里使用的是mysql，支持自增
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("user_name") // 字段名称，默认开启驼峰转换，即数据库"user_name"会自动映射为"userName"
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}
```

编写Mapper
```java 
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
```

service
```java 
public interface UserService {

    //查询所有用户
    List<User> findAll();
}
```

serviceImpl
```java 
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userMapper.selectList(null);
    }
}
```


Controller
```java 
@RestController
@RequestMapping("api/vi/pub/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("all")
    public List<User> findAll(){
        return userService.findAll();
    }
}
```

::: tip
基本使用就写到这里了，注意@Mapper注解不能少，也可以在启动类使用`@MapperScan("com.xk857.mapper")`扫描包，这样就不用每个mapper都写注解了，下一篇介绍核心注解。
:::
