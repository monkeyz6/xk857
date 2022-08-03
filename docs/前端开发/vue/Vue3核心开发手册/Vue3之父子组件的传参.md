---
title: Vue3之父子组件的传参
date: 2021-08-03 09:46
categories:
- vue
tags:
- vue
- vite
---

父子组件的传参即字面意思，实际开发中父组件需要获取子组件的数据，反之亦然，相较于vue2，vue3的写法上有所改变
<!-- more -->


## 子组件获取父组件的值（子传父）

先来看一下子组件是如何通过defineProps接受父组件传过来的值的。
```vue
<template>
  <button>{{ title }}</button>
</template>

<script setup>
defineProps({
  title: {
    type: String, // 参数类型
    default: '你好', //默认值
    required: true, //是否必传
  }
})
</script>
```
上面一串代码相信很好理解，那么父组件传值就更加简单了，import引入组件后直接在页面使用即可，不需要像Vue2一样要在components注册下页面才能使用，注意引入是**.vue**的后缀不能少。
```vue
<template>
  <title-child :title="title"></title-child>
</template>


<script setup>
import TitleChild from '../components/Title.vue'
import {ref} from "vue";

const title = ref("我是父组件传入子组件的标题")
</script>
```
