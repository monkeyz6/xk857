---
title: Validator参数校验器
date: 2021-08-03 20:13
categories:
- SpringBoot
tags:
- SpringBoot
---

在日常的接口开发中，经常要对接口的参数做校验，例如，登录的时候要校验用户名密码是否为空。但是这种日常的接口参数校验太烦锁了，代码繁琐又多。
<!-- more -->
Validator框架就是为了解决开发人员在开发的时候少写代码，提升开发效率的;它专门用来做接口参数的校验的，例如：
Email校验、用户名长度必须位于6到12之间等等。

注意，SpringBoot最新版本已经移除了自带的Validator依赖，因此发现没有该依赖后请导入以下依赖。
```xml
<!-- validation依赖 -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-validation</artifactId>
   <version>2.3.4.RELEASE</version>
</dependency>
```


### 开始使用
创建一个vo类，用来做参数的注解

```java
@Data
@ApiModel("小车状态")
public class CarStatus {

    @NotEmpty(message = "小车id不能为空")
    @Length(max = 11,message = "id长度不能超过11位")
    @ApiModelProperty("小车id")
    private int CarId;

    @NotEmpty(message = "小车状态不能为空")
    @Pattern(regexp = "",message = "小车状态有误")
    @ApiModelProperty("小车状态")
    private String CarAction;
}
```

使用：

```java
@PostMapping("SetCarMove")
public CarStatus firstQuestion(@RequestBody @Validated CarStatus car) {
    // 相当于省略下面两句话
    /*if (car == null || (!"Start".equals(car.getCarAction()) && !"Stop".equals(car.getCarAction()))) {
        throw new CarStatusException(StatusCode.CAR_STATUS_ERROR,"参数不正确");
    }*/
    System.out.println(car);
    return car;
}
```

## 常用注解

```java
@null           验证对象是否为空
@notnull     验证对象是否为非空
@asserttrue       验证 boolean 对象是否为 true
@assertfalse      验证 boolean 对象是否为 false
@min           验证 number 和 string 对象是否大等于指定的值
@max           验证 number 和 string 对象是否小等于指定的值
@decimalmin    验证 number 和 string 对象是否大等于指定的值，小数存在精度
@decimalmax    验证 number 和 string 对象是否小等于指定的值，小数存在精度
@size           验证对象（array,collection,map,string）长度是否在给定的范围之内
@digits       验证 number 和 string 的构成是否合法
@past           验证 date 和 calendar 对象是否在当前时间之前
@future       验证 date 和 calendar 对象是否在当前时间之后
@pattern     验证 string 对象是否符合正则表达式的规则
@Email     验证邮箱
```

例子

```java
@size (min=3, max=20, message="用户名长度只能在3-20之间")
@size (min=6, max=20, message="密码长度只能在6-20之间")
@pattern (regexp="[a-za-z0-9._%+-]+@[a-za-z0-9.-]+\\.[a-za-z]{2,4}", message="邮件格式错误")
@Length(min = 5, max = 20, message = "用户名长度必须位于5到20之间")  
@Email(message = "比如输入正确的邮箱")  
@NotNull(message = "用户名称不能为空") 
@Max(value = 100, message = "年龄不能大于100岁") 
@Min(value= 18 ,message= "必须年满18岁！" )  
@AssertTrue(message = "bln4 must is true")
@AssertFalse(message = "blnf must is falase")
@DecimalMax(value="100",message="decim最大值是100")
DecimalMin(value="100",message="decim最小值是100")
@NotNull(message = "身份证不能为空") 
@Pattern(regexp="^(\\d{18,18}|\\d{15,15}|(\\d{17,17}[x|X]))$", message="身份证格式错误")
```


## 高阶：自定义validator

因为validator框架支持的注解有限，不可能方方面面都支持，故需要自定义注解。

以手机号码为例子，写一个校验的validator注解。

步骤一：写一个注解

```java
@Documented
@Constraint(validatedBy = CarStateValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CarState {
    String message() default "请输入正确的手机号码";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.METHOD,ElementType.FIELD,ElementType.ANNOTATION_TYPE,ElementType.CONSTRUCTOR,ElementType.PARAMETER})
    @interface List {
        CarState[] value();
    }
}
```

步骤二：写出注解的实现类

```java
public class CarStateValidator implements ConstraintValidator<CarState,String> {

    private static final Pattern CAR_STATE_PATTERN = Pattern.compile("^(Start)|(Stop)$");

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null || s.length() == 0){
            return true;
        }
        Matcher m = CAR_STATE_PATTERN.matcher(s);
        return m.matches();
    }

    @Override
    public void initialize(CarState constraintAnnotation) {

    }
}
```

步骤三：给vo类对应的属性加上注解
```java
@CarState
```

