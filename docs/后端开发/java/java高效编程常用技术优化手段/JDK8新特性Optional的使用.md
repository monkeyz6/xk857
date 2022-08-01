---
title: JDK8新特性Optional使用
date: '2021-08-01'
categories:
- java
- 后端开发技巧
tags:
- java
- jdk新特性
- 后端开发技巧
---

Optional类是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。Optional类的引入很好的解决空指针异常。
<!-- more -->


### 三种创建optional对象方式

```java
public void test01(){
    // 1.创建空optional
    Optional.empty();

    // 2.使用非null值创建optional对象，使用null会报错
    Optional.of("test");

    // 3.可以使用任意值创建
    Optional.ofNullable(null);
}
```



### 正常引用和引用缺失情况下的使用

```java
public void test01() {
    Optional<Object> optional = Optional.of("I love java");
    /**
      * 如果 optional 不为空才会执行 ifPresent 中的方法
      * 类似的方法：map filter flatMap
      */
    optional.ifPresent(System.out::println);


    //当optional引用缺失时，赋值给一个默认值
    optional.orElse("引用缺失");
    optional.orElseGet(() -> {
        // TODO 业务处理代码
        return "自定义引用缺失";
    });
    optional.orElseThrow(() -> {
        throw new RuntimeException("当引用缺少时，自定义抛出一个异常");
    });
}
```



### 编码实战

观察下面的代码，很简单遍历传递过来的集合并打印。

问题：如果传递过来的是 `null` 改如何处理，可以使用 `if `判断，但结合 `steam` 有更好的方式，使用 `optionsl`

```java
public static void testFor(List<String> list) {
    list.forEach(System.out::println);
}
```

改进后代码

```java
public static void testFor(List<String> list) {
    // Stream::empty 代表创建一个空流，可以理解成 () -> Stream.empty()
    Optional.ofNullable(list).map(List::stream).orElseGet(Stream::empty).forEach(System.out::print);
}
```
