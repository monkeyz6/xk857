---
title: MybatisPlus之分页操作
date: 2021-05-29 17:13
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---


<!-- more -->

### 创建配置类
创建配置类配置好分页插件，MybatisPlus的分页功能才能正常使用。
```java 
@Configuration
public class MyBatisConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```


**Service**
```java
public interface UserService {

    /**
     * 分页查询所有用户
     * @param current 第几页
     * @param size 多少条信息
     * @return 分页User对象
     */
    Page<User> selectPage(Integer current,Integer size);
}
```
**ServiceImpl**
```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Page<User> selectPage(Integer current,Integer size) {
        Page<User> page = new Page<>(current,size);
        return userMapper.selectPage(page, null);
    }
}
```


**Controller
```java
@RestController
@RequestMapping("api/vi/pub/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("page/{current}/{size}")
    public Page<User> selectPage(@PathVariable Integer current,@PathVariable Integer size){
        return userService.selectPage(current,size);
    }

}
```

> 访问：http://localhost:端口号/api/vi/pub/user/page/2/2
