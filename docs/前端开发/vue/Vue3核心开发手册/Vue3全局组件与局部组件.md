---
title: Vue3全局组件与局部组件
date: 2021-08-03 10:34
categories:
- vue
tags:
- vue
- vite
---

vue3组件相较于vue2在使用方式上差别不大，但是在组件注册上略有所区别，因此单独出一章来讲解。
<!-- more -->

## 配置全局组件

组件使用频率非常高（table，Input，button，等）这些组件几乎每个页面都在使用，那么便可以封装成全局组件，我这儿封装一个Card组件想在任何地方去使用
```vue
<template>
  <div class="card">
     <div class="card-header">
         <div>标题</div>
         <div>副标题</div>
     </div>
     <div v-if='content' class="card-content">
         {{content}}
     </div>
  </div>
</template>
 
<script setup>
defineProps({
  content:string
})
</script>
```

使用方法：在main.js引入我们的组件跟随在createApp(App)后面，切记不能放到mount后面，这是一个链式调用用。
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/reset/index.less'
import Card from './components/Card/index.vue'

createApp(App).component('Card',Card).mount('#app')
```
使用方法：直接在其他vue页面立即使用即可，无需引入
```vue
<template>
 <Card></Card>
</template>
```



## 配置局部组件
这个拿上篇文章的代码来说一下，通过import去引入别的组件称之为局部组件，注意.vue后缀不能省略，然后直接调用即可。
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
