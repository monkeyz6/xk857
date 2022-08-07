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
<!--mybatis-plus-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3.1</version>
</dependency>
```

然后在application.yml配置文件中配置数据库地址等。
```yaml
mybatis-plus:
  # 指定全局配置文件
  config-location: classpath:mybatis-config.xml
  # 配置接口所对应的xml文件
  mapper-locations: classpath*:mybatis/*.xml
  # 指定别名路径 编写xml时resultMap每次都需要写全路径，配置此项后，仅编写对应实体类即可
  type-aliases-package: com.xk857.pojo
  configuration:
    # 关闭自动驼峰映射，该参数不能和mybatis-plus.config-location同时存在
    map-underscore-to-camel-case: false
    # 全局地开启或关闭配置文件中的所有映射器已经配置的任何缓存，默认为 true。
    cache-enabled: false
  global-config:
    db-config:
      # 全局默认主键类型，设置后，即可省略实体对象中的@TableId(type = IdType.AUTO)配置。
      id-type: auto
      # 表名前缀，全局配置后可省略@TableName()配置。
      table-prefix: tb_
```


### 1.建立pojo类
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

### 2.编写Mapper
```java 
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
```

### 3.service
```java 
public interface UserService {

    //查询所有用户
    List<User> findAll();
}
```

### 4.serviceImpl
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


### 5.Controller
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
