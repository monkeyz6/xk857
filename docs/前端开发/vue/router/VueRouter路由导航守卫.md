---
title: VueRouter路由导航守卫
date: 2022-08-06 23:23
categories:
- VueRouter
- vue3
tags:
- VueRouter
- vue3
- vite
---

VueRouter路由导航守卫分为前置守卫与后置守卫，其中常用来判断用户是否登录，后置守卫和前置守卫结合可以设置一个全局Loading
<!-- more -->

## 路由导航-前置守卫

路由跳转前进行判断，常用来判断用户是否登录，在src/router/index.js中进行书写，注意如果重写了这个方法及时没有逻辑`next()`也一定不要省略

```javascript
router.beforeEach((to, form, next) => {
    console.log(to, form);
    next()
})
```

每个守卫方法接收三个参数：

- to: Route， 即将要进入的目标 路由对象；
- from: Route，当前导航正要离开的路由；
- next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
- next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

案例

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    // ……
})


const whileList = ['/']

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({
            path:'/'
        })
    }
})

export default router
```





## 路由导航-后置守卫

使用场景一般可以用来做loadingBar，你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```javascript
router.afterEach((to,from)=>{

})
```












