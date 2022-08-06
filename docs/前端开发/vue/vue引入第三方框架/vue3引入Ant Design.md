---
title: vue3引入Ant Design
date: 2021-08-03 14:51
categories:
- vue3
tags:
- vue3
- vite
---



[Ant Design](https://www.antdv.com/docs/vue/introduce-cn)属于UI框架，同样非常适合后台管理系统或客户端的开发，但是不适合用到移动端，如果您想开发移动端项目，建议使用Vant.
<!-- more -->

安装：
```shell
npm install ant-design-vue --save
```

从使用角度来说，我认为ElementPlus更适合初学者使用，但是从开发效率来说，Ant Design确实能加快我的开发进度，那么我们直接来看按需加载，同样非常简单。
## 按需加载
安装插件：

```shell
npm install babel-plugin-import --save-dev
```
然后 vite.config.js 插入如下代码
```javascript
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
})
```
