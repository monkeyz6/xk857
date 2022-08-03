---
title: vue3之组件插槽
date: 2021-08-03 11:05
categories:
- vue
tags:
- vue
- vite
---

插槽就是子组件中的提供给父组件使用的一个占位符，父组件可以在这个占位符中填充任何模板代码，如HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。
<!-- more -->


## 匿名插槽
1. 在子组件放置一个插槽
```vue
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

2. 父组件使用插槽，在父组件给这个插槽填充内容
```vue
<Dialog>
   <template v-slot>
       <div>2132</div>
   </template>
</Dialog>
```



## 具名插槽
具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中
```vue
<div>
    <slot name="header"></slot>
    <!--如果插槽不指定名称，默认会出现在这里-->
    <slot></slot>
    <slot name="footer"></slot>
</div>
```
我们来看看父组件是如何使用插槽的吧
```vue
<Dialog>
    <template #header>
       <div>1</div>
   </template>
   <template #default>
       <div>2</div>
   </template>
   <template #footer>
       <div>3</div>
   </template>
</Dialog>
```


## 作用域插槽
在子组件动态绑定参数 派发给父组件的slot去使用，下面是子组件的内容
```html
<div>
    <slot name="header"></slot>
    <div>
        <div v-for="item in 100">
            <slot :data="item"></slot>
        </div>
    </div>
    <slot name="footer"></slot>
</div>
```
注意看父组件default是如何使用子组件参数的
```vue
<Dialog>
    <template #header>
        <div>1</div>
    </template>
    <template #default="{ data }">
        <div>{{ data }}</div>
    </template>
    <template #footer>
        <div>3</div>
    </template>
</Dialog>
```


## 动态插槽
插槽可以是一个变量名
```vue
<Dialog>
    <template #[name]>
      <div>
        23
      </div>
    </template>
</Dialog>
```
```javascript
const name = ref('header')
```
