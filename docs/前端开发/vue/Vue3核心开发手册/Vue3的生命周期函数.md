---
title: Vue3的生命周期函数
date: 2021-08-03 09:33
categories:
- vue3
tags:
- vue3
- vite
---

组件的生命周期简单来说就是一个组件从创建到销毁的过程，在我们使用Vue3组合式API是没有beforeCreate和created这两个生命周期的。从某种意义上说，setup就相当与created生命周期。
<!-- more -->

下面是实例生命周期表。你不需要完全理解当前正在进行的所有事情，但随着你学习和构建更多内容，它将是一个有用的参考。
![vue3的生命周期](https://student-xk857.oss-cn-shanghai.aliyuncs.com/typora/2022/07/lifecycle.16e4c08e.png)


## 常用的生命周期函数及组合式API对应钩子函数
- **onBeforeMount()**：在组件DOM实际渲染安装之前调用。在这一步中，根元素还不存在。
- **onMounted()**：在组件的第一次渲染后调用，该元素现在可用，允许直接DOM访问
- **onBeforeUpdate()**：数据更新时调用，发生在虚拟 DOM 打补丁之前。
- **updated()**：DOM更新后，updated的方法即会调用。
- **onBeforeUnmount()**：在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。
- **onUnmounted()**：卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。



|     选项式 API     |   Hook inside setup   |
|:---------------:|:---------------------:|
|     created     | 无对应函数，此逻辑直接写道setup中即可 |
|   beforeMount   |     onBeforeMount     |
|     mounted     |       onMounted       |
|  beforeUpdate   |    onBeforeUpdate     |
|     updated     |       onUpdated       |
|  beforeUnmount  |    onBeforeUnmount    |
|    unmounted    |      onUnmounted      |
|  errorCaptured  |    onErrorCaptured    |
|  renderTracked  |    onRenderTracked    |
| renderTriggered |   onRenderTriggered   |
|    activated    |      onActivated      |
|   deactivated   |     onDeactivated     |


