---
title: vue3引入移动端组件库vant
date: 2021-08-03 15:13
categories:
- vue3
tags:
- vue3
- vite
---

[vant](https://vant-contrib.gitee.io/vant/#/zh-CN)是我的心目中是最棒的移动端UI组件库了，在2020年的适合网络上有大量的组件库，当时我还初学前端不知道有vant框架的存在，我当时用的两款效果都非常烂，在这里我肯定不能说是那两款，但是vant作为移动端的组件库，目前来说在国内我感觉还没有什么有力的竞争对手，
<!-- more -->


安装：
```shell
npm i vant
```

## 按需引入组件
```shell
npm i unplugin-vue-components -D
```
配置插件，和前面两款组件相比，没有什么差别，只是下载的插件不同。
```javascript
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```
