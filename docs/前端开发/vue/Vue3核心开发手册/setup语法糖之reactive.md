---
title: setup语法糖之reactive
date: 2021-08-02 20:23
categories:
- vue
tags:
- vue
- vite
---

reactive用来绑定复杂的数据类型，例如对象、数组等。注意reactive不可以绑定普通的数据类型这样是不允许的，会有警告信息。
<!-- more -->

::: tip
和ref的区别是使用reactive去修改值无须.value
:::

基本使用如下所示，没什么难点，但是更改数据需要一个个更改，不要从接口获取数据直接赋值，这样的话还不如用ref
```javascript
import { reactive } from 'vue'
let person = reactive({
   name: "张三"
})
person.name = "李四"
```

## 数组异步赋值问题

这样赋值页面不会变化，因为会脱离响应式，这个setTimeout是模拟的请求，获取请求后这样赋值也是不允许的。
```javascript
let person = reactive<number[]>([])
setTimeout(() => {
  person = [1, 2, 3]
  console.log(person);
  
},1000)
```


### 1.使用push进行解决
```javascript
import { reactive } from 'vue'
let person = reactive([])
setTimeout(() => {
  const arr = [1, 2, 3]
  person.push(...arr)
},1000)
```


### 2.包裹一层对象
```javascript
let person = reactive({
   list:[]
})

setTimeout(() => {
  const arr = [1, 2, 3]
  person.list = arr;
},1000)
```


