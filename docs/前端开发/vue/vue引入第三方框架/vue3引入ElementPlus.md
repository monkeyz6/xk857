---
title: vue3引入ElementPlus
date: 2021-08-03 14:26
categories:
- vue
tags:
- vue
- vite
---


[ElementPlus](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)属于UI框架，非常适合后台管理系统或客户端的开发，不适合用到移动端，如果您想开发移动端项目，建议使用Vant.
<!-- more -->



安装：
```shell
npm install element-plus --save
```


## 完整引入
很多视频教程都不建议这样引入，但是我认为初学者使用这种方式更好，第一是作为过度，第二对于初学者而言快速开发出一个产品更加重要，而不是一步到位的去优化，这样少了思考的过程。

个人网站也可以样引入，引入个人网站一般访问量少，不用特别在意访问速度，当然如果您的个人网站访问量非常大的话，那么还是建议按需导入。

```js
// main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```


## 按需导入（自动导入）
首先你需要安装unplugin-vue-components和unplugin-auto-import这两款插件
```shell
npm install -D unplugin-vue-components unplugin-auto-import
```
然后把下列代码插入到你的 Vite配置文件中
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
// ...
plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
],
})
```

来看一下我此时的配置文件，大家可以作为一个参考
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

::: tip
按需自动引入配置完之后，在组件中可直接使用，不需要引用和注册，这里已经实现了按需自动移入Element-plus组件。
:::

是不是发现也很简单，但是初学者因为开发环境、版本的不同，可能会出现各种各样的问题，这个后期优化也没有影响，我认为学习阶段应该尽量避开自己可能无法解决的问题，不要让BUG影响自己的学习热情和效率。

还有一种导入方式是手动导入，在前端快速发展的今天，ElementUI也经历了多年发展，我认为从某种意义上来说，那已经被时代所抛弃，除了能够深度优化的大神，我们正常开发使用自动导入是最好的选择。
