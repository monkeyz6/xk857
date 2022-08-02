---
title: CSS设计模式
date: 2022-08-02 15:06
categories:
- css
tags:
- css
---

后端常见的有23种设计模式，这是一种规范，能够规范我们的代码让我们能够写出更加符合逻辑的代码，那么前端有没有类似的规范呢，答案是有的不止JS有CSS同样也有。
<!-- more -->

::: tip
思考：如何在不改动原有代码的基础上修改样式？
:::

首先我个人是主学`java`的，所以用`java`来举例，尝试用后端的思想来理解前端。`java`是一门面向对象的语言，在`java`中我们可以使用继承来实现，不修改原有代码，对功能进行增强。
```java
class Father {
    void sleep(){}
    void eat(){}
}

class child1 extends Father {
    // 对原有功能进行修正
    void eat(){}
    // 增加新功能
    void a(){}
}
```

在不改动原有样式代码的情况下，将下面第一个`div`的字体颜色改成红色。
```html
<div class="menu"></div>
<div class="menu"></div>
<div class="menu"></div>

<style>
    .menu {
        color: green;
        font-size: 14px;
    }
</style>
```

思考：可能很多小伙伴第一个想到的就是使用`选择器`，选择第一个合作。但如果你们团队的其他人“一不小心”在第一个`div`上又加了一个呢？使用css选择器固然能简化开发，但是多人合作的情况下也容易出现问题，因此引用面向对象的方式来理解，就是使用下面这种方式。
```html
<div class="menu fix"></div>
<div class="menu"></div>
<div class="menu"></div>

<style>
    .menu {
        color: green;
        font-size: 14px;
    }
    .fix {
        color: red;
    }
</style>
```



## OOCSS

其实平时开发中，我们或多或少都是按照这样的方式去开发的，只是没有注意到还有这样的思想，例如vue中的组件，在今后的项目开发中我们可以有意识的使用这种方式。（注：oo是面向对象的意思）


- 原则一:容器与内容分离，直接上例子说明

  ```html
  <div class="post">
      <p class="me"></p>
  </div>
  <div class="get">
      <p class="me"></p>
  </div>
  
  // 错误写法
  .post .me{}
  
  // 正确写法
  .post{}
  .me{}
  ```

- 原则二:结构(基础对象)与皮肤分离

  拿上面那个例子说明，menu就是基础对象，fix就相当于是皮肤，基础对象一般不能改，通过添加皮肤对象修改样式

  ```html
  <div class="menu fix"></div>
  <div class="menu"></div>
  <div class="menu"></div>
  
  <style>
      .menu {
          color: green;
          font-size: 14px;
      }
      .fix {
          color: red;
      }
  </style>
  ```


## BEM的组成与作用

BEM由三部分构成：

- Block：块，最外面的的块级元素
- Elmenet（`__`）：元素，使用 “`__`”分割，描述单个元素的样式
- Modifier（--）：修饰符，使用“--`”分割，更细致的样式优化

举例说明：

```html
<div class="menu">
    <div class="menu__tab menu__tab--style1"></div>
    <div class="menu__tab menu__tab--style1"></div>
    <div class="menu__tab menu__tab--style1"></div>
    <div class="menu__tab menu__tab--style1"></div>
</div>
<div class="menu">
    <div class="menu__tab menu__tab--style2"></div>
    <div class="menu__tab menu__tab--style2"></div>
    <div class="menu__tab menu__tab--style2"></div>
    <div class="menu__tab menu__tab--style2"></div>
</div>
```
::: tip
作用：命名规范，让页面结构更加清晰。可以理解为进阶版的`OOCSS`，`oocss`没有相关命名规范的说法，而BEM进行补充。
:::
更加详细的说明，详见官网，[点击跳转到BEM官网](https://en.bem.info/methodology/quick-start/)


## SMACSS
- 分类：Base、Layout、Modules、State、Theme
    - Base：浏览器默认样式进行重写，例如默认滚动条，还有不同状态的a标签等等
    - Layout：页面布局相关，例如大名鼎鼎的栅格布局等。命名规范：前缀为`l`，例如`.l-main`、`.l-footer`
    - Modules：公共复用的模块
    - State：管理模块不同的状态的样式，例如按钮显示与隐藏的样式。命名规范：前缀为 `is`
    - Theme：不同的皮肤，例如网站春节主题色换成红色。命令规范：前缀为`theme`
- 作用：易维护、易复用、易扩展 ...
- 使用：一般在网站的 `style/base` 目录下，新建这五个目录。如果有哪个不需要可以不用，按项目需求来。


## ITCSS

如果说SMACSS对css 做了一个分类，则ITCSS 则是对css做了一个分层。

区别：比 smacss 分的更细了。

![ITCSS](https://xk857.com/typora/2021/05ITCSS.png)

::: tip
smacss和itcss命名可以混着用，具体看项目，灵活运用，很多开源项目都是两者结合使用的。
:::


## ACSS

- 一个样式属性一个类
- 作用：极强的复用性、维护成本低
- 缺点：破坏了css的语义化，就是一个div需要很多的类名去修饰，我们单独去看一个被修饰的div，无法轻易得知他是干嘛的。
- 例如：`.float-right`代表的就是 `float: right`，

个人吐槽：我主要是后端开发者，对我来说非常不喜欢这个方式，不如使用基本的css去定义，有很多框架就是这种设计，一般不需要我们自己写，引入框架就行，我感觉这是增加了学习成本，不过一些特别常用的倒是可以提取出来。



