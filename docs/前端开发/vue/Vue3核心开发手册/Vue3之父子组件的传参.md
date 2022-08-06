---
title: Vue3之父子组件的传参
date: 2021-08-03 09:46
categories:
- vue3
tags:
- vue3
- vite
---

父子组件的传参即字面意思，实际开发中父组件需要获取子组件的数据，反之亦然，相较于vue2，vue3的写法上有所改变
<!-- more -->


## 子组件获取父组件的值（父传子）

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

## 父组件获取子组件的数据（子传父）
同样是上述逻辑，当我们点击子组件，更新父组件的内容，先来看一下子组件是如何传递数据的，defineEmits派发一个事件，调用emit函数会通知到父组件并把数据传递过去。
```vue
<template>
  <button @click="clickEmit">{{ title }}</button>
</template>

<script setup>
import {ref} from "vue";
defineProps({
  title: String //简单写法
})

const e = ref("我是子组件的数据，父组件获取到子组件的数据啦")
// defineEmits派发一个事件，调用emit函数会通知到父组件并把数据传递过去
const emit = defineEmits(['my-click'])
const clickEmit = () => {
  emit('my-click', e.value)
}
</script>
```


父组件是如何接收子组件传递过来的数据呢？我们从title-child组件接受子组件派发的事件my-click，后面是我们自己定义的函数名称emitClick会把参数返回过来
```vue
<template>
  <!--注意这里的emitClick不要携程emitClick(t)-->
  <title-child :title="title" @my-click="emitClick"></title-child>
</template>

<script setup>
import TitleChild from '../components/Title.vue'
import {ref} from "vue";

const title = ref("我是默认的父组件数据")
const emitClick = (t) => {
  title.value = t
}
</script>
```
