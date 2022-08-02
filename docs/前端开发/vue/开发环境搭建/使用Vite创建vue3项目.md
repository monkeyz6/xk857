---
title: 使用Vite创建vue3项目
date: 2021-08-02 17:23
categories:
- vue
tags:
- vue
- vite
---

为什么抛弃了webpack转而使用Vite呢？当你使用Vite开发过项目你就明白使用Vite有多爽了，1s项目就构建完毕本地就能访问了，不需要像webpack那样构建几十秒才行。
<!-- more -->

## 项目初始化步骤
1. 创建vite项目： npm create vite@latest
2. 它会提示你需要安装以下包：Need to install the following packages:create-vite@latest 
   - Ok to proceed? (y)  输入y即可
3. 项目名称：Project name: >> 输入你的项目名称
4. 选择你的项目框架：Select a framework: 按上下箭头，选择vue
5. 选择你的项目框架：Select a variant：按上下箭头选择vue或者vue-ts
6. 执行npm install安装依赖

::: tip
完成上述步骤后，输入npm run dev即可运行项目，[官方文档](https://vitejs.bootcss.com/guide/#trying-vite-online)
:::
