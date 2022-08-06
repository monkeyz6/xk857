---
title: pinia的使用方式
date: 2020-9-06 22:16
categories:
- pinia
- vue3
tags:
- pinia
- vue3
- vite
---

vue3的默认状态管理工具已经更换为pinia框架，那么接下来我们就来看看pinia是如何进行管理的，和vuex有何不同？又做了哪些改进？
<!-- more -->

先来看看此时`src/stores/counter.js`文件

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
    name: "cv大魔王"
  }),
  // 修饰一些值，可以理解为computed
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // 做一些同步、异步的操作，类似于methods,提交state
  actions: {
    increment() {
      this.count++
    }
  }
})
```



## 1. 获取state值

pinia对CompositionAPI有着非常明显的优化，因此我这里直接在stup函数中使用，两步即可完成

```vue
<template>
  <van-button type="primary">主要按钮{{Counter.count}}</van-button>
</template>


<script setup>
// 1.引入js文件
import {useCounterStore} from '@/stores/counter.js'
// 2.使用函数的形式创建
const  Counter = useCounterStore()
</script>
```



## 2. 修改state的值

### 2.1 直接修改

State 是允许直接修改值的，例如current++，这在vuex中是不允许的。

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{Counter.count}}</van-button>
</template>

<script setup>
// 1.引入js文件
import {useCounterStore} from '@/stores/counter.js'
// 2.使用函数的形式创建
const  Counter = useCounterStore()
</script>
```



### 2.2 批量修改

在他的实例上有**$patch**方法可以批量修改多个值

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
const Counter = useCounterStore()

const toPath1 = () => {
  Counter.$patch({
    count: Counter.count + 100,
    name: "星空小屋"
  })
}
</script>
```



### 2.3 批量修改-函数形式

推荐使用函数形式，可以自定义修改逻辑

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
const Counter = useCounterStore()

const toPath1 = () => {
  Counter.$patch((state) => {
        state.count += 100
        state.name = "星空小屋"
      }
  )
}
</script>
```



### 2.4 通过原始对象修改整个实例

`$state`您可以通过将store的属性设置为新对象来替换store的整个状态，缺点就是必须修改整个对象的所有属性，一般仅在特殊情况下使用。

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
// 1.引入js文件
import {useCounterStore} from '@/stores/counter.js'
// 2.使用函数的形式创建
const Counter = useCounterStore()
const toPath1 = () => {
  Counter.$state = {
    count: Counter.count + 100,
    name: "星空小屋"
  }
}
</script>
```



### 2.5 通过actions修改

定义Actions，在actions 中直接使用this就可以指到state里面的值，在上面我们已经定义了increment方法，直接使用即可

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
// 1.引入js文件
import {useCounterStore} from '@/stores/counter.js'
// 2.使用函数的形式创建
const Counter = useCounterStore()
const toPath1 = () => {
  Counter.increment()
}
</script>
```



## 3. 解构store

在Pinia是不允许直接解构是会失去响应性的，你可以试试下面这串代码，看看在页面上是什么效果

```vue
<template>
  <van-button type="primary" @click="count++">主要按钮{{ count }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
// 1.直接结构赋值，点击后页面并不会发送变化
const {count} = useCounterStore()

// 2.下面这种写法也不行哦
const Counter = useCounterStore()
const {count} = Counter
</script>
```

正确是使用方式是使用storeToRefs，而且不能直接使用，来看看使用方式

```vue
<script setup>
import {useCounterStore} from '@/stores/counter.js'
import { storeToRefs } from 'pinia'

const Counter = useCounterStore()
// 注意看这里是如何使用的
const {count} = storeToRefs(Counter)
</script>
```





## 4. Actions的使用方式

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        count: 0
    }),
    // 做一些同步、异步的操作，类似于methods,提交state
    actions: {
        increment() {
            this.count++
        }
    }
})
```

### 4.1 同步方式

直接调用即可，就像我们上面的使用那样，看看使用方式，直接调用即可

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
const Counter = useCounterStore()

const toPath1 = () => {
  // Actions同步使用方式，直接调用
  Counter.increment()
}
</script>
```



### 4.2 异步方式

结合async，await 修饰使用，和常规方法相比没什么区别

```javascript
import { defineStore } from 'pinia'
impore api from '@/api/word.js'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        count: 0
    }),
    actions: {
        // 和使用常规方法，没有什么不同
        async increment2() {
            const {data} = await 
            this.count = data
        }
    }
})
```

方法中直接调用即可

```vue
<template>
  <van-button type="primary" @click="Counter.count++">主要按钮{{ Counter.count }}</van-button>
  <van-button type="primary" @click="toPath1">{{ Counter.name }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
const Counter = useCounterStore()

const toPath1 = () => {
  // Actions异步使用方式，也可以直接调用
  Counter.increment2()
}
</script>
```



## 5. getters的使用

使用箭头函数不能使用this this指向已经改变指向undefined 修改值请用state，主要作用类似于computed 数据修饰并且有缓存

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        count: 0,
        name: "cv大魔王"
    }),
    // 修饰一些值，可以理解为computed
    getters: {
        doubleCount: (state) => state.count * 2
    }
})
```

使用时可以直接使用getters的名称进行调用

```vue
<template>
  <van-button type="primary">主要按钮{{ Counter.doubleCount }}</van-button>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter.js'
const Counter = useCounterStore()
</script>
```


::: tip
不得不说，pinia的改动真是改到我心里去了，以前用vuex不爽的点，在pinia中都得到了很好的解决，用起来简直不要太爽。
:::
