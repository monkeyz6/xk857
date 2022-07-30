# java高效编程常用技术优化手段

## 资源关闭优化方案

### 传统的资源关闭写法

先来体验一下传统的资源关闭方式，注意 `finally` 类中的代码，其繁琐程度大家体验一下

```java
@Test
public void copyFile() {
    // 定义输入路径和输出路径
    String originalUrl = "lib/FileCopyTest.java";
    String targetUrl = "targetTest/target.txt";

    // 声明文件输入流，文件输出流
    FileInputStream originalFileInputStream = null;
    FileOutputStream targetFileOutputStream = null;

    try {
        // 实例化文件流对象
        originalFileInputStream = new FileInputStream(originalUrl);
        targetFileOutputStream = new FileOutputStream(targetUrl);

        // 读取的字节信息
        int content;
        // 迭代，读取/写入字节
        while ((content = originalFileInputStream.read()) != -1) {
            targetFileOutputStream.write(content);
        }
    }  catch (IOException e) {
        e.printStackTrace();
    } finally {
        // 关闭流资源
        if (targetFileOutputStream != null) {
            try {
                targetFileOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (originalFileInputStream != null) {
            try {
                originalFileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### TWR方式优化资源关闭

`TWR` 是简写，全称是 `try-with-resource` ，直接上代码体会一下

```java
@Test
public void copyFile2() {
    // 先定义输入/输出路径
    String originalUrl = "lib/NewFileCopyTest.java";
    String targetUrl = "targetTest/new.txt";

    // 初始化输入/输出流对象
    try (
        FileInputStream originalFileInputStream = new FileInputStream(originalUrl);
        FileOutputStream targetFileOutputStream = new FileOutputStream(targetUrl);
    ) {
        int content;
        // 迭代，拷贝数据
        while ((content = originalFileInputStream.read()) != -1) {
            targetFileOutputStream.write(content);
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

解析： 在 `try()` 中定义的资源不需要关闭，`jdk` 自动帮我们处理了

注意：这种写法 `jdk7` 才开始支持，不会有执行效率上的提升，是 `jdk` 的语法糖，简化开发代码的。

 



## JDK8新特性Optional使用详解

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







## 拯救垃圾代码使用Guava工具类

使用前请先引用依赖

```xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>30.1.1-jre</version>
</dependency>
```



### 不可变集合

> 创建对象的不可变拷贝是一项很好的防御性编程技巧。
>
> 优点：
>
> - 当对象被不可信的库调用时，不可变形式是安全的
> - 不可变对象被多个线程调用时，不存在竞态条件问题
> - 不可变集合不需要考虑变化，因此可以节省时间和空间。
> - 不可变对象因为有固定不变，可以作为常量来安全使用。

三种创建方式

```java
public void immutable() {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);

    // 方式一：通过已经存在的方式创建
    ImmutableSet<Integer> immutableSet1 = ImmutableSet.copyOf(list);

    // 方式二：通过初始值直接创建集合
    ImmutableSet<Integer> immutableSet2 = ImmutableSet.of(1,2,3);

    // 方式三：通过追加的形式闯将
    ImmutableSet<Object> immutableSet3 = ImmutableSet.builder().add(1).addAll(Sets.newHashSet(2, 3)).add(4).build();

    // 使用方式和正常集合一样，add和remove等改变数据的方式不可用。

}
```





## Multiset可重复无序集合

`Set`：不重复的无序集合

`List`：可重复的有序集合

`Multiset`：`Guava` 提供的可重复无序集合，可以将它看成，没有元素顺序限制的ArrayList

### 使用方式

> 为了方便理解，我们对 `API` 进行不同角度的拆解辅助理解

从 `ArrayList` 角度理解

| 方法       | 说明                                                   |
| ---------- | ------------------------------------------------------ |
| add(T)     | 添加单个给定元素                                       |
| iterator() | 返回一个迭代器，包含 `Multiset` 所有元素，包括重复元素 |
| size()     | 元素总个数，包括重复元素                               |

从 `Map` 角度理解

| 方法          | 说明                                                      |
| ------------- | --------------------------------------------------------- |
| count(Object) | 返回指定元素的个数，例如传入“A”，则返回集合中“A”的个数    |
| entrySet()    | 返回 `Set<Multiset.Entry<E>>`，和 `Map`的``entrySet` 类似 |
| elementSet()  | 返回所有不重复元素的 `Set<E>`，和 `Map` 的 `KeySet` 类似  |



### 实战演练

实战:使用 `Multiset` 集合类，实现统计篇文章中文字出现次数功能。

```java
private static final String text =
    "玉楼春·己卯岁元日" +
    "毛滂 〔宋代〕" +
    "一年滴尽莲花漏。碧井酴酥沉冻酒。晓寒料峭尚欺人，春态苗条先到柳。" +
    "佳人重劝千长寿。柏叶椒花芬翠袖。醉乡深处少相知，只与东君偏故旧。";

@Test
public void test01() {
    Multiset<Object> multiset = HashMultiset.create();
    // 将string转换成char数组
    char[] chars = text.toCharArray();
    Chars.asList(chars).stream().forEach(multiset::add);

    // 总共多少字符
    System.out.println("size:"+multiset.size());
    // 查询“人”出现了几次
    System.out.println("count:"+multiset.count('人'));
}
```



## 集合工具类

> `setls` 工具类的常用方法：并集 / 交集 / 差集 / 分解集合中的所有子集 / 求两个集合的笛卡尔积
> `Lists` 工具类的常用方式：反转 / 拆分

`Set` 集合相关方法

```java
private static final Set set1 = Sets.newHashSet(1,2,3);
private static final Set set2 = Sets.newHashSet(3,4,5);

@Test
public void text02(){
    // 并集 [1, 2, 3, 4, 5]
    Set<Integer> set = Sets.union(set1, set2);

    // 交集 [3]
    Set<Integer>  intersection = Sets.intersection(set1, set2);

    // 差集：元素属于A不属于B [1, 2]
    Set<Integer> difference = Sets.difference(set1, set2);

    // 将set拆成所有可能性的子集合
    Set<Set<Integer>> powerSet = Sets.powerSet(set1);
    // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
    System.out.println(JSON.toJSONString(powerSet));

    // 计算两个集合的笛卡尔积
    Set<List<Integer>> product = Sets.cartesianProduct(set1,set2);
    // [[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,3],[3,4],[3,5]]
    System.out.println(JSON.toJSONString(product));
}
```



`List` 集合

```java
@Test
public void text03() {
    ArrayList<Integer> list = Lists.newArrayList(1, 2, 3, 4, 5, 6, 7);

    // 拆分：每3个一组 [[1,2,3],[4,5,6],[7]]
    List<List<Integer>> partition = Lists.partition(list, 3);

    // 反转
    List<Integer> reverse = Lists.reverse(list);
}
```



### 参数校验

### 前言
在日常的接口开发中，经常要对接口的参数做校验，例如，登录的时候要校验用户名密码是否为空。但是这种日常的接口参数校验太烦锁了，代码繁琐又多。

Spring Validator 框架就是为了解决开发人员在开发的时候少写代码，提升开发效率的;它专门用来做接口参数的校验的，例如：email校验、用户名长度必须位于6到12之间等等。

> 注意，`SpringBoot` 最新版本已经移除了自带的 `Validator` 依赖，因此发现没有该依赖后请导入以下依赖。
```xml
<!-- validation依赖 -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-validation</artifactId>
   <version>2.3.4.RELEASE</version>
</dependency>
```



### 使用解析

汇总解析：

- 空值校验类：`@Null`，`@NotNull`，`@NotEmpty`，`@NotBlank`
- 范围校验类：`@Min`，`@Size`，`@Digits`，`@Future`，`Negative`
- 其他校验类：`@Email`，`@URL`，`@AssertTrue`，`Pattern`





























































































































































































