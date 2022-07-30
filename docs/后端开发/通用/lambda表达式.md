# JDK8新特性Lambda表达式

## 0.自定义函数式接口

jdk自带的一些常用的一些接口Callable、Runnable、Comparator等在JDK8中都添加了@FunctionalInterface注解。

![image-20210717102035113](https://xk857.com/typora/2021/05image-20210717102035113.png)

### 说明

1. 该注解只能标记在"有且仅有一个抽象方法"的接口上。
2. JDK8接口中的静态方法和默认方法，都不算是抽象方法。
3. 接口默认继承java.lang.Object，所以如果接口显示声明覆盖了Object中方法，那么也不算抽象方法。
4. 该注解不是必须的，如果一个接口符合"函数式接口"定义，那么加不加该注解都没有影响。
5. 为了规范，建议给所有需要使用函数式编程的接口都加上注解。



### 解析

1、只有一个抽象方法的情况

```java
@FunctionalInterface
public interface MyInterface {
    
    int test(int i);
}
```

2、有多个方法，但只有一个抽象方法，其他方法有默认实现

```java
@FunctionalInterface
public interface MyInterface {

    int test(int i);

    default int add(int a, int b) {
        return a + b;
    }

    default void sum(int a, int b) {
        System.out.println("sum:" + a + b);
    }
}
```



### 使用

为了方便理解，我们使用一下，看看效果

```java
public static void main(String[] args) {
    // 使用lombda实现test方法
    MyInterface myInterface = i -> i*2;
    
    // 调用刚刚实现的方法
    System.out.println(myInterface.test(22));
    
    // 调用默认重写的方法
    System.out.println(myInterface.add(10,20));
    myInterface.sum(100,20);
}
```

结果

```shell
44
30
sum:10020
```





## 1.将接口用于方法参数

> 需求：新建一个类，传入余额。类中定义一个方法，方法参数为接口，自定义余额格式化信息。



自定义接口

```java
@FunctionalInterface
public interface SecondInterface {

    /**
     * 格式化金额
     */
    String format(int i);

}
```

格式化金额类

```java
class MyMoney{
    private final int money;

    public MyMoney(int money) {
        this.money = money;
    }

    public void printMoney(SecondInterface secondInterface){
        System.out.println("我的存款："+secondInterface.format(this.money));
    }
}
```

使用：

```java
public static void main(String[] args) {
    MyMoney myMoney = new MyMoney(999999);
    myMoney.printMoney(i -> new DecimalFormat("#,###").format(i));
}
```



>结论：我们使用lombda不需要关心接口名称是什么，只要关心传入的参数是什么，想让参数变成什么类型。







## 2.jdk自带函数接口

| 接口              | 输入参数 | 返回类型 | 使用说明                     |
| ----------------- | -------- | -------- | ---------------------------- |
| Predicate<T>      | T        | boolean  | 断言                         |
| Consumer<T>       | T        | /        | 消费一个数据                 |
| Function<T,R>     | T        | R        | 输入T输出R的函数             |
| Supplier<T>       | /        | T        | 提供一个数据                 |
| UnaryOperator<T>  | T        | T        | 一元函数（输入输出类型相同） |
| BiFunction<T,U,R> | (T,U)    | R        | 两个输入的函数               |
| BinaryOperator<T> | (T,T)    | T        | 二元函数（输入输出类型相同） |



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





## 3.方法引用符 ::

> 方法引用符 `::`



先来简单体验一下

```java
public static void main(String[] args) {
    Consumer<String> consumer1 = s -> System.out.println(s);
    consumer1.accept("张三");

    Consumer<String> consumer2 = System.out::println;
    consumer2.accept("张三");
}
```





### 静态方法的方法引用

`类名::方法名`

新建 `dog`类

```java
public class Dog {

    private String name;

    public Dog(String name) {
        this.name = name;
    }
    public static void bark(Dog dog) {
        System.out.println(dog.name + "叫了");
    }
}
```

引用静态方法 “`bark`”

```java
public static void main(String[] args) {
    Consumer<Dog> consumer = Dog::bark;
    consumer.accept(new Dog("哮天犬"));
}
```

控制台输出：`哮天犬叫了`





### 非静态方法使用对象实例引用

改变 `Dog` 类中的 `bark` 方法

```java
public class Dog {

    private String name;

    public Dog(String name) {
        this.name = name;
    }
    public void bark(Dog dog) {
        System.out.println(dog.name + "叫了");
    }
}
```

使用：

```java
public static void main(String[] args) {
    Dog dog = new Dog("张三");
    Consumer<Dog> consumer = dog::bark;
    consumer.accept(dog);
}
```

控制台输出：`张三叫了`





### 无参构造方法的引用

```java
public class Dog {

    private String name;
    
    // 无参构造
    public Dog() {}

    public void bark(Dog dog) {
        System.out.println(dog.name + "叫了");
    }
}
```

使用

```java
public static void main(String[] args) {
    Supplier<Dog> supplier = Dog::new;
    Dog dog = supplier.get();
}
```



### 有参构造方法的引用

```java
public class Dog {

    private String name;


    // 有参构造
    public Dog(String name) {
        this.name = name;
    }

    public void bark(Dog dog) {
        System.out.println(dog.name + "叫了");
    }
}
```

使用

```java
public static void main(String[] args) {
    // 接收string，输出Dog，jdk会自动找到有参构造
    Function<String,Dog> function = Dog::new;
    Dog dog = function.apply("张三");
    dog.bark(dog);
}
```

控制台输出：`张三叫了`





# Stream流编程

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
