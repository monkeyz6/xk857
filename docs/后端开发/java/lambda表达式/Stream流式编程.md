---
title: Stream流式编程
date: 2021-07-31 18:27
categories:
- java
tags:
- java
- lambda
sidebar: true
---

> 本片文章将Steam流拆分成创建操作、中间操作、终止操作、并行流以及收集器来进行讲解，文末将其整理成实战演练带大家体会开发中是如何使用的。

## 1.Stream流创建操作

|        | 相关方法                               |
| ------ | -------------------------------------- |
| 集合   | Collection.stream/parallelStream       |
| 数组   | Arrays.stream                          |
| 数字   | lntStream/LongStream.range/rangeClosed |
| 数字   | Random.ints/longs/doubles              |
| 自定义 | Stream.generate/iterate                |

测试

```java
public static void main(String[] args) {
    // 从集合创建
    ArrayList<String> strings = new ArrayList<>();
    strings.stream();
    strings.parallelStream();

    // 从数组创建
    int[] arr = {1,23,123};
    Arrays.stream(arr);

    // 创建数字流
    IntStream.of(1,2,3);
    IntStream.range(1,10);

    // 创建一个无限流
    new Random().ints().limit(10);

    // 自定义
    Random random = new Random();
    Stream.generate(() -> random.nextInt()).limit(20);
}
```





## 2.Stream流中间操作

![image-20210717171216038](https://xk857.com/typora/2021/05image-20210717171216038.png)

使用演示，`map`、`filter`

```java
public static void main(String[] args) {
    String str = "i love java";

    // 1.打印每个单词的长度
    Stream.of(str.split(" ")).map(s -> s.length()).forEach(System.out::println);

    // 2.打印每个单词的长度，小于等于1的不打印
    Stream
        .of(str.split(" "))
        .map(String::length)
        .filter(length -> length >1)
        .forEach(System.out::println);
}
```

使用演示，`limit`主要用于无限流

```java
 // 产生10个，大于等于1小于100的数
new Random().ints().filter(i-> i>=1 && i<100).limit(10).forEach(System.out::println);
```







## 3.Stream终止操作

![image-20210717211443754](https://xk857.com/typora/2021/05image-20210717211443754.png)

`forEachOrdered`的作用

```java
public static void main(String[] args) {
    String str = "i love java";

    // 使用并行流，forEach遍历顺序会乱
    str.chars().parallel().forEach(value -> System.out.println((char)value));
    // forEachOrdered保证顺序
    str.chars().parallel().forEachOrdered(value -> System.out.println((char)value));
}
```

`collect`

```java
public static void main(String[] args) {
    String str = "i love java";

    List<String> list = Stream.of(str.split(" ")).collect(Collectors.toList());
    System.out.println(list);
}
```

使用 `reduce` 拼接字符串

```java
public static void main(String[] args) {
    String str = "i love java";

    Optional<String> reduce = Stream.of(str.split(" ")).reduce((s, s2) -> s + "|" + s2);
    System.out.println(reduce.orElse("内容为空"));
    // 结果 i|love|java
}
```





## 4.Steam并行流

`parallel`效果演示，具体的效果请各位自行体会。

```java
public class Test {
    public static void debug(int i){
        System.out.println("debug" + i);
        try {
            // 睡眠3秒，方便查看效果
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}


public static void main(String[] args) {
    // 每3秒打印一次
    IntStream.range(1,100).forEach(Test::debug);

    // 每3秒打印8次
    IntStream.range(1,100).parallel().forEach(Test::debug);
}
```

效果查看，gif图片可能存在不能正常播放的情况，建议自行使用代码体会！

![lv_0_20210717213822](https://xk857.com/typora/2021/05lv_0_20210717213822.gif)



> 问题一：面改成并行流后，我们新的需求出现了，先并行执行，然后串行执行。
>
> ```java
> IntStream.range(1,100).parallel().peek(Test::debug).sequential().peek(Test::debug).count();
> ```
>
> `sequential` 代表串行的意思，最终代码以串行执行。结论：多次调用串行并行，以最后一次调用为准

> 问题二：串行执行的线程数可以改变吗？
>
> ```java
> //使用这个属性可以修改默认的线程数
> System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism","20");
> ```





## 5.Steam流收集器

### 准备工作

创建性别枚举类

```java
public enum Gender {

    /**
     * 男
     */
    MALE,

    /**
     * 女
     */
    FEMALE,
}
```

创建班级枚举类

```java
public enum Grade {

    /**
     * 一班
     */
    ONE,

    /**
     * 二班
     */
    TWO,

    /**
     * 三班
     */
    THREE,

    /**
     * 四班
     */
    FOUR
}
```

创建学生类

```java
@Data
@AllArgsConstructor
public class Student {

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 性别
     */
    private Gender gender;

    /**
     * 班级
     */
    private Grade grade;

}
```

初始化数据

```java
public static void main(String[] args) {
    List<Student> students = Arrays.asList(
        new Student("小明", 10, Gender.MALE, Grade.ONE),
        new Student("大明", 9, Gender.MALE, Grade.THREE),
        new Student("小白", 8, Gender.FEMALE, Grade.TWO),
        new Student("小黑", 13, Gender.FEMALE, Grade.FOUR),
        new Student("小红", 7, Gender.FEMALE, Grade.THREE),
        new Student("小黄", 13, Gender.MALE, Grade.ONE),
        new Student("小青", 13, Gender.FEMALE, Grade.THREE),
        new Student("小紫", 9, Gender.FEMALE, Grade.TWO),
        new Student("小王", 6, Gender.MALE, Grade.ONE),
        new Student("小李", 6, Gender.MALE, Grade.ONE),
        new Student("小马", 14, Gender.FEMALE, Grade.FOUR),
        new Student("小刘", 13, Gender.MALE, Grade.FOUR)
    );
}
```



### 实战演练

```java
public static void main(String[] args) {
    List<Student> students = Arrays.asList(
        new Student("小明", 10, Gender.MALE, Grade.ONE),
        new Student("大明", 9, Gender.MALE, Grade.THREE),
        new Student("小白", 8, Gender.FEMALE, Grade.TWO),
        new Student("小黑", 13, Gender.FEMALE, Grade.FOUR),
        new Student("小红", 7, Gender.FEMALE, Grade.THREE),
        new Student("小黄", 13, Gender.MALE, Grade.ONE),
        new Student("小青", 13, Gender.FEMALE, Grade.THREE),
        new Student("小紫", 9, Gender.FEMALE, Grade.TWO),
        new Student("小王", 6, Gender.MALE, Grade.ONE),
        new Student("小李", 6, Gender.MALE, Grade.ONE),
        new Student("小马", 14, Gender.FEMALE, Grade.FOUR),
        new Student("小刘", 13, Gender.MALE, Grade.FOUR)
    );

    // 获取所有学生的年龄列表
    List<Integer> ages = students.stream().map(Student::getAge).collect(Collectors.toList());

    // 获取所有学生的年龄列表(去重)
    Set<Integer> agesSet = students.stream().map(Student::getAge).collect(Collectors.toSet());

    // 统计汇总信息
    IntSummaryStatistics collect = students.stream()
        .collect(Collectors.summarizingInt(Student::getAge));
    System.out.println(collect); // count=12, sum=121, min=6, average=10.083333, max=14

    // 按性别分块-> 根据boolean分块，true为男生，false为女生
    Map<Boolean, List<Student>> genders = students.stream()
        .collect(Collectors.partitioningBy(student -> student.getGender() == Gender.MALE));

    // 按班级分组
    Map<Grade, List<Student>> grades = students.stream().
        collect(Collectors.groupingBy(Student::getGrade));
    
      // 按班级分组，查询每个班级的人数
        Map<Grade, Long> collect1 = students.stream()
            .collect(Collectors.groupingBy(Student::getGrade, Collectors.counting()));
}
```
