---
title: setup语法糖之ref
date: 2021-08-02 19:45
categories:
- vue
tags:
- vue
- vite
---

相比较与Vue2，我认为Vue3在语法上改变最大的就是setup函数了，它使得vue3的js部分代码书写和vue2相比完全不同。
<!-- more -->


## 响应式对象ref
先来看下面的代码，对msg变量进行双向绑定，点击后切换值，控制台输出更改前后的值。你会发现控制台的数据更改了，但是界面却还是"你好"，这样操作无法改变msg的值因为msg不是响应式的无法被vue跟踪，要改成ref响应式对象才行

```vue
<template>
  <main>
    <button @click="msgChange">{{msg}}</button>
  </main>
</template>


<script setup>
  let msg = "你好"
  const msgChange = () => {
    console.log(msg)
    msg = "OK"
    console.log(msg)
  }
</script>
```
下面是正确的写法，记得导包哦，注意被ref包装之后需要value来进行赋值~~
```vue
<template>
  <main>
    <button @click="msgChange">{{msg}}</button>
  </main>
</template>


<script setup>
  import {ref} from "vue";

  let msg = ref("你好")
  const msgChange = () => {
    msg.value = "OK"
  }
</script>
```


## ref常用API

1. isRef：判断是不是一个ref对象
```vue
<script setup>
import {isRef, ref} from "vue";

let msg = ref("你好")
const msgChange = () => {
  msg.value = "OK"
  isRef(msg)
}
</script> 
```

2. shallowRef：创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的，注意看错误写法。
```vue
<template>
  <main>
    <button @click="msgChange">{{msg.name}}</button>
  </main>
</template>


<script setup>
import {isRef, ref, shallowRef} from "vue";

let msg = shallowRef({name: '你好'})
const msgChange = () => {
  // msg.value.name = "OK"; // 错误写法
  msg.value = {name: 'ok'}
}
</script> 
```

3. triggerRef：强制更新页面DOM，注意看错误写法后使用triggerRef，这样也是可以改变值的，但是用的非常少也不符合规范了解即可。
```vue
<script setup>
import { ref, shallowRef, triggerRef} from "vue";

let msg = shallowRef({name: '你好'})
const msgChange = () => {
  msg.value.name = "OK"; // 错误写法
  triggerRef(msg)
}
</script>
```

4. customRef：自定义ref，是个工厂函数要求我们返回一个对象，并且实现get和set，有点像是java中对象属性的get,set方法。
::: tip
我想到的两个应用场景是格式化数据和处理数据，格式化数据例如我下面的代码，输入数字返回“￥”符号加上数字；处理数据可以是格式化数据，例如小数格式化为两位等~~
:::



```vue
<script setup>
import {customRef, ref, shallowRef, triggerRef} from "vue";


function formatAmountRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return "￥"+value
      },
      set(newVal) {
        value = newVal
        trigger()
      }
    }
  })
}

let money = formatAmountRef(100)
const msgChange = () => {
  money.value = 275; // 错误写法
  console.log(money.value) // ￥275
}
</script>
```
