---
title: setup语法糖之计算属性与侦听器
date: 2021-08-02 22:01
categories:
- vue
tags:
- vue
- vite
---

计算属性就是当依赖的属性的值发生变化的时候才会触发他的更改，如果依赖的值不发生变化使用的是缓存中的属性值。
<!-- more -->

## vue3中的computed计算属性

1. 函数形式
```vue
<template>
  <button>{{ m }}</button>
</template>
<script setup>
  import { computed, reactive, ref } from 'vue'
  let price = ref(0) //$0

  let m = computed(()=>{
  return `$` + price.value
})
  price.value = 500
</script>
```
上述页面显示”$500“

2. 对象形式
```vue
<template>
  <div>{{ mul }}</div>
  <div @click="mul = 100">click</div>
</template>

<script setup>
import { computed, ref } from 'vue'
let price = ref(1)//$0
let mul = computed({
  get: () => {
    return price.value
  },
  set: (value) => {
    price.value = 'set' + value
  }
})
</script>
```


## Vue3中的watch侦听器
watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用

- watch第一个参数监听源 
- watch第二个参数回调函数cb（newVal,oldVal） 
- watch第三个参数一个options配置项是一个对象，是否立即调用一次和是否开启深度监听
```javascript
{
  immediate: true //是否立即调用一次
  deep: true //是否开启深度监听
}
```


### 1.侦听ref
```javascript
import { ref, watch } from 'vue'
 
let message = ref("a")
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
},{
    immediate:true,
    deep:true
})
```

### 2.侦听多个ref
```javascript
import { ref, watch ,reactive} from 'vue'
 
let message = ref('')
let message2 = ref('')
 
watch([message,message2], (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

### 3.侦听reactive
```javascript
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
  name: ""
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

::: tip
使用reactive监听深层对象开启和不开启deep 效果一样
:::

### 4.侦听reactive单一值

```javascript
import { ref, watch ,reactive} from 'vue'
let message = reactive({
    name:"",
    name2:""
})
watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```
