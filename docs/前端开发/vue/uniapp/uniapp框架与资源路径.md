---
title: uniapp框架与资源路径
date: 2020-11-06 17:09
categories:
- uniapp
- vue
tags:
- uniapp
- vue
---

不需要专门去学习小程序的语法，uni-app使用的是vue的语法，不是小程序自定义的语法。
<!-- more -->


## 资源路径说明
vue组件中引入静态资源，template内引入静态资源，如image、video等标签的src属性时，可以使用相对路径或者绝对路径，形式如下
```html
<!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
<image class="logo" src="/static/logo.png"></image>
<image class="logo" src="@/static/logo.png"></image>
<!-- 相对路径 -->
<image class="logo" src="../../static/logo.png"></image>
```
::: danger
支付宝小程序使用image时不可使用相对路径，所以项目中全部使用绝对路径，推荐以@开头。模板中的标签属性在引入图片、视频资源时，使用以@开头的绝对路径，而引入js文件时不能使用/开头的方式，所以**项目中全部使用绝对路径**，推荐以**@**开头。
:::


### js文件引入
js文件或script标签内（包括renderjs等）引入js文件时，可以使用相对路径和绝对路径，形式如下
```javascript
// 绝对路径，@指向项目根目录，在cli项目中@指向src目录
import add from '@/common/add.js'
// 相对路径
import add from '../../common/add.js'
```


### css引入静态资源
css文件或style标签内引入css文件时（scss、less文件同理），可以使用相对路径或绝对路径
```vue
<style>
/* 绝对路径 */
@import url('/common/uni.css');
@import url('@/common/uni.css');
/* 相对路径 */
@import url('../../common/uni.css');
</style>
```
