---
title: SpringCache框架常用注解
date: 2022-08-01 22:39
categories:
- java
- SpringBoot
- Redis
tags:
- java
- SpringBoot
- Redis
- SpringCache
- java注解
---

常用注解无外乎增删改查操作，让我们来看看框架的增删改查分别对应的哪些注解，以及其使用方式和注意事项吧。
<!-- more -->

::: warning
注意：使用前请先在启动类加上 **@EnableCaching** 注解
:::

## @Cacheable
::: tip
- 标记在一个方法上，也可以标记在一个类上，一般都是标注在方法上
- 缓存标注对象的返回结果，标注在方法上缓存该方法的返回值，标注在类上缓存该类所有的方法返回值
- value 缓存名称，可以有多个
- key 缓存的key规则，可以用springEL表达式，默认是方法参数组合
- condition 缓存条件，使用springEL编写，返回true才缓存
:::


案例演示：

```java
@Override
@Cacheable(value = {"product"},key = "#root.args[0]") // product::1
public ProductDO findById(int id) {
    return productMapper.selectById(id);
}

@Override
@Cacheable(value = {"product_page"},key = "#root.methodName+'_'+#page+'_'+#size") //product_page::page_1_5
public IPage<ProductDO> page(int page, int size) {
    Page<ProductDO> pageInfo = new Page<>(page, size);
    return productMapper.selectPage(pageInfo, null);
}
```

Spring为我们提供了一个root对象可以用来生成key。通过该root对象我们可以获取到以下信息，重点关注 methodName和 args ，这两个可以满足绝大多数使用场景。

| 属性名称    | 描述                        | 示例                 |
| ----------- | --------------------------- | -------------------- |
| methodName  | 当前方法名                  | #root.methodName     |
| method      | 当前方法                    | #root.method.name    |
| target      | 当前被调用的对象            | #root.target         |
| targetClass | 当前被调用的对象的class     | #root.targetClass    |
| args        | 当前方法参数组成的数组      | #root.args[0]        |
| caches      | 当前被调用的方法使用的Cache | #root.caches[0].name |

::: tip
思考，发现什么问题没有?
1. 没有对Redis进行序列化不方便程序员查看，在[自定义配置和过期时间](/后端开发/redis专栏/SpringCache框架/自定义配置和过期时间)中讲述了Redis的序列化，经过序列化后的数据能够让程序员直观的看到。
2. 没有过期时间永久生效，容易造成内存泄漏，[解决方案](/后端开发/redis专栏/SpringCache框架/自定义配置和过期时间)
3. key的定义在团队合作中可能会出现不规范的情况，每次编写略显繁琐，[解决方案](/后端开发/redis专栏/SpringCache框架/自定义缓存KeyGenerator)
:::
后面会对问题进行解决。



## @CachePut

在支持Spring Cache的环境下，对于使用@Cacheable标注的方法，Spring在每次执行前都会检查Cache中是否存在相同key的缓存元素，如果存在就不再执行该方法，而是直接从缓存中获取结果进行返回，否则才会执行并将返回结果存入指定的缓存中。

@CachePut也可以声明一个方法支持缓存功能。与@Cacheable不同的是使用@CachePut标注的方法在执行前不会去检查缓存中是否存在之前执行过的结果，而是每次都会执行该方法，并将执行结果以键值对的形式存入指定的缓存中。类似于更新操作

使用案例

```java
@Override
@CachePut(value = {"product"},key = "#productDO.id",cacheManager = "cacheManager1Hour")
public ProductDO updateById(ProductDO productDO) {
    int i = productMapper.updateById(productDO);
    return productDO;
}
```

注意：我们这里将返回值的int改为对象，这样存储到redis中的才是对象，才能达到根据id查询，一切正常的效果



## @CacheEvict

- CacheEvict
    - 从缓存中移除相应数据, 触发缓存删除的操作
    - value 缓存名称，可以有多个
    - key 缓存的key规则，可以用springEL表达式，默认是方法参数组合
    - beforeInvocation = false
        - 缓存的清除是否在方法之前执行 ,默认代表缓存清除操作是在方法执行之后执行;
        - 如果出现异常缓存就不会清除
    - beforeInvocation = true
        - 代表清除缓存操作是在方法运行之前执行，无论方法是否出现异常，缓存都清除

使用案例：

```java
@CacheEvict(value = {"product"},key = "#root.args[0]")
public int delById(int id) {
    return productMapper.deleteById(id);
}
```



### @Caching

- 组合多个Cache注解使用
- 允许在同一方法上使用多个嵌套的@Cacheable、@CachePut和@CacheEvict注释

```java
@Caching(
    cacheable = {
        @Cacheable(value = "product",keyGenerator = "xdclassKeyGenerator")
    },
    put = {
        @CachePut(value = "product",key = "#id"),
        @CachePut(value = "product",key = "'stock:'+#id")
    }
)
```

