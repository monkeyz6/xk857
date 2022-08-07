---
title: Swagger3的引入及配置
date: 2021-04-16 19:34
categories:
- SpringBoot
tags:
- SpringBoot
- Swagger
---

### 公共模块引入

```xml
<!--swagger ui接口文档依赖-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
</dependency>
```

### 配置基本信息和分组

```java
@Data
@Component
@EnableOpenApi
public class SwaggerConfiguration {

    @Bean
    public Docket webArticleApiDoc() {
        return new Docket(DocumentationType.OAS_30)
                .groupName("文章接口文档")
                .pathMapping("/")
                // 定义是否开启swagger，false为关闭，可以通过变量控制，线上关闭
                .enable(true)
                // 配置api文档元信息
                .apiInfo(apiInfo())
                // 选择哪些接口作为swagger的doc发布
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.xk857"))
                // 正则匹配请求路径，并分配至当前分组
                .paths(PathSelectors.ant("/api/article/**"))
                .build();
    }


    @Bean
    public Docket webUserApiDoc() {
        return new Docket(DocumentationType.OAS_30)
                .groupName("用户接口文档")
                .pathMapping("/")
                // 定义是否开启swagger，false为关闭，可以通过变量控制，线上关闭
                .enable(true)
                // 配置api文档元信息
                .apiInfo(apiInfo())
                // 选择哪些接口作为swagger的doc发布
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.xk857"))
                // 正则匹配请求路径，并分配至当前分组
                .paths(PathSelectors.ant("/api/system/**"))
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("星空小屋-接口文档")
                .description("微服务接口文档")
                .contact(new Contact("cv大魔王", "https://xk857.com", "1919301983@qq.com"))
                .version("12")
                .build();
    }
}
```



### 2.2 配置通用参数

```java
 @Bean
    public Docket webApiDoc(){
        return new Docket(DocumentationType.OAS_30)
            .groupName("用户端接口文档")
            .pathMapping("/")
            // 定义是否开启swagger，false为关闭，可以通过变量控制，线上关闭
            .enable(true)
            //配置api文档元信息
            .apiInfo(apiInfo())
            // 选择哪些接口作为swagger的doc发布
            .select()
            .apis(RequestHandlerSelectors.basePackage("net.xdclass"))
            //正则匹配请求路径，并分配至当前分组
            .paths(PathSelectors.ant("/api/**"))
            //正则匹配请求路径，并分配至当前分组，当前所有接口
            .paths(PathSelectors.any())
            .build()
            //新版swagger3.0配置
            .globalRequestParameters(getGlobalRequestParameters())
            .globalResponses(HttpMethod.GET, getGlobalResponseMessage())
            .globalResponses(HttpMethod.POST, getGlobalResponseMessage());
    }
    
   
   /**
     * 生成全局通用参数, 支持配置多个响应参数
     * @return
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("token")
                .description("登录令牌")
                .in(ParameterType.HEADER)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());

//        parameters.add(new RequestParameterBuilder()
//                .name("version")
//                .description("版本号")
//                .required(true)
//                .in(ParameterType.HEADER)
//                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
//                .required(false)
//                .build());
        return parameters;
    }

    /**
     * 生成通用响应信息
     * @return
     */
    private List<Response> getGlobalResponseMessage() {
        List<Response> responseList = new ArrayList<>();
        responseList.add(new ResponseBuilder().code("4xx").description("请求错误，根据code和msg检查").build());
        return responseList;
    }
}
```

