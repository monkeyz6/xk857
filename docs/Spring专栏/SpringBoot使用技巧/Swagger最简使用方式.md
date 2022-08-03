---
title: Swagger最简使用方式
date: 2021-08-03 19:59
categories:
- SpringBoot
tags:
- SpringBoot
---

springBoot使用swagger太麻烦，每次都需要编写config？如果我告诉你有这么一种方式，你只需要配置yml文件，你学还是不学？
<!-- more -->
### 整合Swagger

```xml
<!-- Swagger -->
<dependency>
    <groupId>com.battcn</groupId>
    <artifactId>swagger-spring-boot-starter</artifactId>
    <version>2.1.5-RELEASE</version>
</dependency>
```

我这里的Swagger大家应该也发现了，并非是官方的，这个是第三方整合的，配置更加简单。



### 配置详解
```yml
spring:
  swagger:
    enabled: true
    title: 标题
    description: 描述信息
    version: 系统版本号
    contact:
      name: 维护者信息
    base-package: swagger扫描的基础包，默认：全扫描(分组情况下此处可不配置)
    #全局参数,比如Token之类的验证信息可以全局话配置
    global-operation-parameters:
    -   description: 'Token信息,必填项'
        modelRef: 'string'
        name: 'Authorization'
        parameter-type: 'header'
        required: true
    groups:
      basic-group:
        base-package: com.battcn.controller.basic
      system-group:
        base-package: com.battcn.controller.system
```

我的配置

```yml
spring:
  swagger:
    title: 星空小屋 - 文章微服务接口
    description: 文章微服务相关接口，包括文章、模块、知识点管理等
    version: 1.0.0 - SNAPSHOT
    contact:
      name: cv大魔王
      email: 1919301983@qq.com
    host: localhost
    enabled: true
    security:
      filter-plugin: true # 配置账号密码
      username: root
      password: root
```

配置拦截器，后面有拦截器配置，如果有读者需要在自己的项目使用，请原有的拦截器配置中修改，忽略掉以下路径，以免被拦截导致无法访问。“swagger-ui.html”, “static/css/**", "static/js/**”, “swagger-resources”, “/**/error”, “v2/api-docs”



#### 测试使用

运行项目，访问`IP+端口号/swagger-ui.html`，例如在浏览器访问：http://127.0.0.1:13001/swagger-ui.html

![image-20210221184645521](https://img-blog.csdnimg.cn/img_convert/a5847be4cbdf763191c79fe2e5980819.png)

登录后的效果：

![image-20210221184734860](https://img-blog.csdnimg.cn/img_convert/6685b41d328e37cef6a0fc7a79267159.png)

### 复习——常用注解

::: tip
**@Api**：用在 Controller 类上，描述该类的作用
  1. value="描述信息"
  2. description="详细描述该类的作用"
:::

**@ApiOperation**：用在 Controller 请求方法上，描述方法的作用。

**@ApiModel**：用在请求参数是对象上，描述该对象类的作用

```java
// 在对象类上使用@ApiModel
@ApiModel(value="CategoryREQ对象", description="类别查询条件")
   public class CategoryREQ extends BaseRequest<Category> {
}
```

::: tip
**@ApiModelProperty**：用在请求参数是对象的属性上，描述对象属性的作用。
1. value：属性的描述 
2. hidden：是否是查询条件属性, false:(默认值)在api文档显示，作为查询条件；true 隐藏，不是条件属性
:::


```java
// 请求方法参数是 CategoryREQ 对象
public Result search(@RequestBody CategoryREQ req) {}

@ApiModel(value="CategoryREQ对象", description="类别查询条件")
public class CategoryREQ extends BaseRequest<Category> {
    
    @ApiModelProperty(value = "分类名称")
    private String name;

    @ApiModelProperty(value="状态(1:正常，0:禁用)")
    private Integer status;
}
```





::: tip
**@ApiResponses**：用在请求的方法上，用于表示一组响应

**@ApiResponse**：用在 @ApiResponses 中，一般用于表达一个错误的响应信息，注解参数：
-  code：数字，如 400
-  message：信息，如 “参数填写错误”
-  response：抛出异常的类
:::


**@ApiIgnore**: 使用该注解忽略这个 API




::: tip
**@ApiImplicitParams**：用在请求方法上，对多个请求参数增加描述

**@ApiImplicitParam**：可单独使用，或在 @ApiImplicitParams 中使用，给方法的一个请求参数增加描述。
 1. name：参数名
 2. value：描述参数的作用
 3. dataType：参数类型，参数类型，默认String，其它值 dataType="Integer"
 4. defaultValue：参数默认值
 5. required：参数是否必传（true/false）
 6. paramTpye：指定参数放在哪些地方（header/query/path/body/form）
:::


header：参数在request headers 里边提交 @RequestHeader

query：直接跟参数完成自动映射赋值 @RequestParam

path：以路径变量的形式提交数据 @PathVariable

body：以流的形式提交 仅支持POST（不常用）

form：以form表单的形式提交 仅支持POST （不常用）


### 请求使用参考

```java
// 请求方法有多个请求参数 size， current
@ApiImplicitParams({
    @ApiImplicitParam(name="current", value="页码", required=true, paramType="path",dataType="int"),
    @ApiImplicitParam(name="size", value="每页记录数", required=true, paramType="path",dataType="int")
})
@ApiOperation("根据分类名称与状态查询分类列表接口")
@PostMapping("/search/{current}/{size}")
Result search(@RequestBody CategoryREQ req, @PathVariable int current, @PathVariable int size);
```
