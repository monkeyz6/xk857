---
title: 使用Vite创建vue3项目
date: 2021-08-02 17:23
categories:
- vue3
tags:
- vue3
- vite
---

为什么抛弃了webpack转而使用Vite呢？当你使用Vite开发过项目你就明白使用Vite有多爽了，1s项目就构建完毕本地就能访问了，不需要像webpack那样构建几十秒才行。
<!-- more -->

## 项目初始化步骤
1. 创建vue3项目：npm init vue@latest
2. 它会提示你需要安装以下包：Need to install the following packages:create-vite@latest 
   - Ok to proceed? (y)  输入y即可
3. Project name: >> 输入你的项目名称
4. Add TypeScript? » No / Yes #是否是TS项目，你可以进行选择 
5. Add JSX Support? » No / Yes #是否使用JSX如果看不懂就选NO
6. Add Vue Router for Single Page Application development? » No / Yes #是否添加路由
7. Add Pinia for state management? » No / Yes #是否添加Pinia作为状态管理科，代替了之前的Vuex
8. Add Vitest for Unit Testing? » No / Yes #是否启用Vitest测试,不懂就选NO，剩下的都选NO 
9. Add Cypress for both Unit and End-to-End testing? » No / Yes
10. Add ESLint for code quality? » No / Yes #专业前端还是开启吧，我就关闭了
11. npm install

::: tip
完成上述步骤后，输入npm run dev即可运行项目，[全新的Vue3官方文档](https://staging-cn.vuejs.org/)
:::

![项目运行成功截图](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/image-20220802181028026.png)


## Vue指令


v- 开头都是vue 的指令，网上已经由大量的文章、教程，这里就不做过多描述

v-text 用来显示文本

v-html 用来展示富文本

v-if 用来控制元素的显示隐藏（切换真假DOM）

v-else-if 表示 v-if 的“else if 块”。可以链式调用

v-else v-if条件收尾语句

v-show 用来控制元素的显示隐藏（display none block Css切换）

v-on 简写@ 用来给元素添加事件

v-bind 简写:  用来绑定元素的属性Attr

v-model 双向绑定

v-for 用来遍历元素

v-on修饰符 冒泡案例


::: tip
说明：本系列文章不适用于零基础的Vue开发人员查阅，是专门为之前用vue2想快速掌握vue3的开发人员所编写的，如有不全欢迎评论指出，文章参考[小满zs的CSDN文章](https://blog.csdn.net/qq1195566313/category_11618172.html?spm=1001.2014.3001.5482)
:::
