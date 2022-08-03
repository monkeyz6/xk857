---
title: Vue3定义全局函数和变量
date: 2021-08-03 12:03
categories:
- vue
tags:
- vue
- vite
---

Vue3没有Prototype属性，使用app.config.globalProperties代替，然后去定义变量和函数。
<!-- more -->

Vue2
```javascript
Vue.prototype.$http = () => {}
```

Vue3的写法，一般写在main.js中
```javascript
const app = createApp({})
app.config.globalProperties.$http = () => {}
```
