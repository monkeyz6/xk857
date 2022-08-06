---
title: pinia安装及初始化
date: 2022-08-06 23:17
categories:
- VueRouter
- vue3
tags:
- VueRouter
- vue3
- vite
---

Vue3默认的全局状态管理工具已经从Vuex更换为[Pinia](https://pinia.vuejs.org/)，相比较于上一代全局状态管理工具Pinia有着完整的 ts 的支持，压缩后体积更小只有1kb左右。
<!-- more -->

主要的变化的特点如下：

- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

可以发现，通过这些特点让pinia在使用上更加简单和合理化，除了[官方文档](https://pinia.vuejs.org/)外，还有一个翻译过来的[Pinia 中文文档](https://pinia.web3doc.top/)不确定和官方有没有关系，我是按照这个文档学的，翻译的还可以，不过中文搜索不好用，不知道是不是翻译的缘故。

## Pinia安装及初始化

```shell
npm install pinia
```

### Vue3引入并注册Pinia

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
```

### 初始化仓库Store

创建文件及目录 `src/stores/counter.js` ，我使用脚手架时选择了Pinia这个是官方的脚手架给我生成的js文件。

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0
  }),
  // 修饰一些值，可以理解为computed
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // 做一些同步、异步的操作，类似于methods,提交state
  actions: {
    increment() {
      this.count++
    }
  }
})
```


### 补充说明

使用最新的vue脚手架生成vite构建的vue3项目，会默认在vite.config.js中配置路径别名

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

我使用webstome进行开发时，我的编辑器并不能识别路径，因此在项目根目录（vite.config.js同级目录）添加`jsconfig.json`文件，编辑器会自动识别

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
}
```

其他编辑器，例如vscode我没有试过，可以百度查询解决方案
