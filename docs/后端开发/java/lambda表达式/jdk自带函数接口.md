---
title: jdk自带函数接口
date: 2022-07-31 18:21
categories:
- java
tags:
- java
- lambda
---

::: tip
大多数情况下我们不需要自己去撰写函数式接口，因此jdk自带的函数接口应该是日常开发中，使用频率最高的函数式接口了，这里已经整理成表格的形式。
:::

| 接口              | 输入参数 | 返回类型 | 使用说明                     |
| ----------------- | -------- | -------- | ---------------------------- |
| `Predicate<T>`      | T        | boolean  | 断言                         |
| `Consumer<T> `      | T        | /        | 消费一个数据                 |
| `Function<T,R>`     | T        | R        | 输入T输出R的函数             |
| `Supplier<T>`       | /        | T        | 提供一个数据                 |
| `UnaryOperator<T>`  | T        | T        | 一元函数（输入输出类型相同） |
| `BiFunction<T,U,R>` | (T,U)    | R        | 两个输入的函数               |
| `BinaryOperator<T>` | (T,T)    | T        | 二元函数（输入输出类型相同） |



使用

```java
public static void main(String[] args) {
    // 断言
    Predicate<Integer> predicate = i -> i > 0;
    System.out.println(predicate.test(-1));

    // 消费
    Consumer<String> consumer = s -> System.out.println(s);
    consumer.accept("张三");

    // 输入T输出R
    Function<Integer, String> function = i -> i >= 0 ? "正数" : "负数";
    function.apply(7);

    // 提供一个数据
    Supplier<String> stringSupplier = () -> "测试";
    System.out.println(stringSupplier.get());

    // 一元函数
    UnaryOperator<String> unaryOperator = s -> "处理后" + s;
    System.out.println(unaryOperator.apply("Test"));

    // 两个输入的函数
    BiFunction<String,Boolean,Integer> biFunction = (s, b) -> {
        // 如果b为true，返回0；如果s为test返回1，否则返回-1
        if (b){
            return 0;
        }
        if ("test".equals(s)){
            return 1;
        }
        return -1;
    };
    System.out.println(biFunction.apply("test", false));

    // 二元函数
    BinaryOperator<String> binaryOperator = (s, s2) -> s+s2;
    System.out.println(binaryOperator.apply("雷军", "666"));
}
```



结果

```java
false
张三
测试
处理后Test
1
雷军666
```
