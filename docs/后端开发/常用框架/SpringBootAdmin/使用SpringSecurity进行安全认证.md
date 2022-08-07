---
title: SpringBootAdmin使用SpringSecurity进行安全认证
date: 2021-10-07 20:39
categories:
- SpringBoot
tags:
- SpringBoot
---

注意：这个是服务端的配置，客户端不需要进行安全认证
<!-- more -->
### 

```xml
<dependencies>
    <!-- 安全认证 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

yml配置如下：

```yml
server:
  port: 13006
  servlet:
    context-path: /blog-admin

spring:
  application:
    name: xk857-admin # 应用名
  security:
    user:
      name: admin
      password: admin
  cloud:
    nacos:
      discovery:
        server-addr: 121.15.111.26:8848
        metadata:
          management:
            context-path: ${server.servlet.context-path}/actuator
          user.name: admin
          user.password: admin

# 暴露端点
management:
  endpoints:
    web:
      exposure:
        include: '*'  # 需要开放的端点。默认值只打开 health 和 info 两个端点。通过设置 *, 可以开放所有端点
  endpoint:
    health:
      show-details: always
```



编写SpringSecurity配置文件

```java
package com.xk857.config;

import de.codecentric.boot.admin.server.config.AdminServerProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * 配置安全认证，让其他微服务可以认证
 * @author cv大魔王
 * @version 1.0
 * @date 2021/10/29 10:30
 */
@Configuration
public class SecuritySecureConfig extends WebSecurityConfigurerAdapter {

    private final String adminContextPath;

    public SecuritySecureConfig(AdminServerProperties adminServerProperties) {
        this.adminContextPath = adminServerProperties.getContextPath();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setTargetUrlParameter("redirectTo");
        successHandler.setDefaultTargetUrl(adminContextPath + "/");

        http.authorizeRequests()
                // 1.配置所有静态资源和登录页可以公开访问
                .antMatchers(adminContextPath + "/assects/**").permitAll()
                .antMatchers(adminContextPath + "/login").permitAll()
                // 2. 其他请求，必须要经过认证
                .anyRequest().authenticated()
                // 3. 配置登录和登出路径
                .and().formLogin().loginPage(adminContextPath + "/login").successHandler(successHandler)
                .and().logout().logoutUrl(adminContextPath + "/logout")
                // 4.开启 httpbasic 支持，其他的服务模块注册时需要使用
                .and().httpBasic()
                // 5.开启基于 cookie 的 csrf 保护
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                // 6.忽略这些路径的csrf 保护以便其他的模块可以实现注册
                .ignoringAntMatchers(
                        adminContextPath + "/instances",
                        adminContextPath + "/actuator/**"
                );
    }
}
```



此时访问 http://localhost:13006/blog-admin 会自动跳转到 http://localhost:13006/blog-admin/login ，如果不能正常跳转，尝试清空浏览器缓存

![image-20211029105156874](https://xk857.com/typora/2021/05image-20211029105156874.png)



