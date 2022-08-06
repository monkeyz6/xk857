---
title: VueRouter的安装及定义
date: 2022-08-06 23:17
categories:
- VueRouter
- vue3
tags:
- VueRouter
- vue3
- vite
---

本章主要讲解vue3路由是如何安装并导入的，以及路由是如何定义的，包含子路由的定义，以及router-link和router-view是什么。

<!-- more -->
vue3使用以下命令安装

```shell
npm install vue-router@4
```

创建文件 src/router/index.js

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') // 推荐使用这种方式引入，相当于懒加载模式，会优化首页打开速度
    }
  ]
})

export default router
```

main.js中引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```





### router-link

不使用常规的 `a` 标签，而是使用一个自定义组件 `router-link` 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。





### router-view

router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。





### 嵌套路由的定义

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如后台管理系统一般是左侧导航栏+右侧展示数据形式。

下面代码footer我们理解为底部的版权信息等，这是每个页面都需要的，children默认会渲染到router-view中去。

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    path: "/user",
    component: () => import('../components/footer.vue'),
    children: [
        {
            path: "",
            name: "Login",
            component: () => import('../components/login.vue')
        },
        {
            path: "reg",
            name: "Reg",
            component: () => import('../components/reg.vue')
        }
    ]
})
```
