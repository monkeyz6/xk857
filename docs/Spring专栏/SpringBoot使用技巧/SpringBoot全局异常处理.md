---
title: SpringBoot全局异常处理
date: 2021-08-03 19:45
categories:
- SpringBoot
tags:
- SpringBoot
---

和定时任务不同，全局异常处理一般在项目准备工作时，就已经撰写好配置类了，所以严格意义上来说，使用的频率不高，因为配置一次后多个项目用一样的配置也是可以的。
<!-- more -->

- 类添加注解
    - @ControllerHandler，如果需要返回数据，方法需要添加@ResponseBody
    - @RestControllerAdvice，默认返回json数据，方法不需要添加@ResponseBody
- 方法添加处理器
    - 捕获全局异常，处理所有不可知的异常
    - @ExceptionHandler(value=Exception.class)

```java
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public JsonData handle(Exception e){
        return JsonData.buildError("全局异常，未知错误");
    }
}
```


## 项目实战：自定义异常与全局异常处理器搭配使用

步骤1：封装自定义异常
```java
public class CarStatusException extends RuntimeException {

    protected Integer code;
    protected String message;

    public CarStatusException(int code, String msg) {
        this.code = code;
        this.message = msg;
    }

}
```


步骤2：自定义异常集成到全局异常处理器
```java
@RestControllerAdvice
@Slf4j
public class CustomExceptionHandler {

    /**
     * 处理运行时异常
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = Throwable.class)
    public Result handle(Throwable e, HttpServletRequest request) {
        log.error("系统异常", request.getRequestURI(), e);
        return Result.buildError(e);
    }

    /**
     * 自定义异常：小车参数不正确
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = CarStatusException.class)
    public Result handleCarStatusException(CarStatusException e, HttpServletRequest request){
        log.error("业务异常",request.getRequestURI(), e);
        return new Result(false, StatusCode.CAR_STATUS_ERROR,"参数异常");
    }

}
```

步骤3：使用
```java
 //参数不正确则抛出异常
if (car == null || (!"Start".equals(car.getCarAction()) && !"Stop".equals(car.getCarAction()))) {
    throw new CarStatusException(StatusCode.CAR_STATUS_ERROR,"参数不正确");
}
```

::: danger
在企业项目中自定义异常一般使用枚举类来规范，我在个人开发的适合喜欢使用这种方式，因为方便，只用传递字符串说明提示信息即可。
:::
