---
title: 自定义缓存KeyGenerator
date: 2022-08-01 22:54
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

在团队中使用注解缓存不能够像代码一样通过枚举类等方式限定Key的指定，那么我们通过配置的方式限定Key的默认构成，通过反射获取类名、方法名和参数名称共同组成key。
<!-- more -->



```java
import org.springframework.cache.interceptor.KeyGenerator;

/**
  * 自定义缓存Key规则
  * @return
*/
@Bean
public KeyGenerator springCacheDefaultKeyGenerator(){
    // 类名_方法名_参数名称
    return new KeyGenerator() {
        @Override
        public Object generate(Object o, Method method, Object... objects) {
            return o.getClass().getSimpleName() + "_"
                + method.getName() + "_"
                + StringUtils.arrayToDelimitedString(objects, "_");
        }
    };
}
```



使用：

```java
// @Cacheable(value = {"product_page"},key = "#root.methodName+'_'+#page+'_'+#size") // 默认一天
@Cacheable(value = {"product_page"},keyGenerator = "springCacheDefaultKeyGenerator") // 默认一天
public IPage<ProductDO> page(int page, int size) {
    Page<ProductDO> pageInfo = new Page<>(page, size);
    return productMapper.selectPage(pageInfo, null);
}
```
