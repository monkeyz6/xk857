---
title: uni-app路由与页面跳转
date: 2020-9-06 17:12
categories:
- uniapp
- vue
tags:
- uniapp
- vue
---

我认为uniapp的路由设计甚至比vue更加简单，有种约定大于配置的感觉，和微信小程序很像。由框架统一管理，开发者需要在pages.json里配置每个路由页面的路径及页面样式。
<!-- more -->

uni-app 有两种页面路由跳转方式：调用API跳转、navigator组件跳转，[官方文档](https://uniapp.dcloud.net.cn/api/router.html#navigateto)写的也很好，我这里提供一下案例辅助回忆复习。

### 1. 跳转到非tabBar页面：uni.navigateTo

保留当前页面，跳转到应用内的某个**非 tabBar** 的路径页面，使用`uni.navigateBack`可以返回到原页面，参数说明：

| 参数                | 类型       | 必填  | 默认值    | 说明                                                                                                  |
|:------------------|:---------|:----|:-------|:----------------------------------------------------------------------------------------------------|
| url               | String   | 是   |        | 需要跳转的应用内非 tabBar 的页面的路，路径后可以带参数。如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 |
| animationType     | String   | 否   | pop-in | 窗口显示的动画效果，仅APP可用，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router#animation)                       |
| animationDuration | Number   | 否   | 300    | 窗口动画持续时间，仅APP可用，单位为 ms                                                                              |
| events            | Object   | 否   |        | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。                                                            |
| success           | Function | 否   |        | 接口调用成功的回调函数                                                                                         |
| fail              | Function | 否   |        | 接口调用失败的回调函数                                                                                         |
| complete          | Function | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）                                                                            |

1. 页面跳转，带参数

```javascript
uni.navigateTo({
    url: '/pages/auth/login?id=1&name=meng', // 目标页面，注意：页面要在 pages.json 的 pages
    数组中配置了
    animationType: "slide-in-bottom", // 打开页面动画，仅App支持。当前 从下往上 打开
    animationDuration: 300, // 窗口动画持续时间，单位为 ms, 默认300ms
})
// login.vue 页面接收参数
export default {
    onLoad(option) { //option为object类型，会序列化上个页面传递的参数
        console.log(option.id); //打印出上个页面传递的参数。
        console.log(option.name); //打印出上个页面传递的参数。
    }
}
```

2. 传递对象时，转JSON字符串

```javascript
const params = {id: 1, name: 'cv大魔王'}
uni.navigateTo({
    url: '/pages/auth/login?params=' + JSON.stringify(params)
})
// login.vue 页面接收对象参数
onLoad(option) {
    const params = JSON.parse( option.params )
    console.log(params.id, params.name)
}
```

3. url有长度限制，太长的字符串会传递失败，使用encodeURIComponent方式解决：

```javascript
const params = {id: 1, name: 'cv大魔王', desc: 'xxxxxxxxxx'}
uni.navigateTo({
    url: '/pages/auth/login?params=' + encodeURIComponent(JSON.stringify(params))
})
// login.vue 页面接收参数
onLoad (option) {
    const params = JSON.parse(decodeURIComponent(option.params))
    console.log(params.id, params.name, params.desc)
}
```



### 2. 重定向页面：uni.redirectTo

关闭当前页面，跳转到应用内的某个页面，**返回不到原页面**，参数和上面相似只是没有动画，就不列举了直接看案例：

```javascript
uni.redirectTo({ 
    url: '/pages/order/order?params=' + JSON.stringify(params)
})
```





### 3. 关闭之前页面：uni.reLaunch

关闭所有页面，打开到应用内的某个页面，导航<后退按钮，无法后退。

```javascript
uni.reLaunch({
	url: 'test?id=1'
});
```





### 4. 跳转到 tabBar 页面：uni.switchTab

跳转到tabBar页面，只能使用此API，调用后跳转到目标页面并关闭其他所有非 tabBar 页面。

```json
{ // pages.json
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    },{
      "pagePath": "pages/other/other",
      "text": "其他"
    }]
  }
}
```

调用：

```java
uni.switchTab({
	url: '/pages/index/index'
});
```



### 5. 返回上一级：uni.navigateBack

关闭当前页面，返回上一页面或多级页面。

```javascript
uni.navigateBack({
    delta: 1 // 返回的页面数, 1后退上一页面
    animationType: 'slide-out-bottom', // 后退动画，仅APP有效
    animationDuration: 300
})
```





## 组件跳转：navigator

该组件类似HTML中的`<a>`组件，但只能跳转本地页面。目标页面必须在pages.json中注册，[官方文档](https://uniapp.dcloud.net.cn/component/navigator.html)

```vue
<template>
	<view>
		<view class="page-body">
			<view class="btn-area">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<button type="default">跳转到新页面</button>
				</navigator>
				<navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
					<button type="default">在当前页打开</button>
				</navigator>
				<navigator url="/pages/tabBar/extUI/extUI" open-type="switchTab" hover-class="other-navigator-hover">
					<button type="default">跳转tab页面</button>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
// navigate.vue页面接受参数
export default {
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
		console.log(option.name); //打印出上个页面传递的参数。
	}
}
</script>
```

**open-type 有效值**

| 值            | 说明                            | 平台差异说明                     |
|:-------------|:------------------------------|:---------------------------|
| navigate     | 对应 uni.navigateTo 的功能         |                            |
| redirect     | 对应 uni.redirectTo 的功能         |                            |
| switchTab    | 对应 uni.switchTab 的功能          |                            |
| reLaunch     | 对应 uni.reLaunch 的功能           | 字节跳动小程序与飞书小程序不支持           |
| navigateBack | 对应 uni.navigateBack 的功能       |                            |
| exit         | 退出小程序，target="miniProgram"时生效 | 微信2.1.0+、百度2.5.2+、QQ1.4.7+ |

**属性说明**

| 属性名                    | 类型      | 默认值             | 说明                                                                                                                | 平台差异说明               |
|:-----------------------|:--------|:----------------|:------------------------------------------------------------------------------------------------------------------|:---------------------|
| url                    | String  |                 | 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `.vue` 后缀                                      |                      |
| open-type              | String  | navigate        | 跳转方式                                                                                                              |                      |
| delta                  | Number  |                 | 当 open-type 为 'navigateBack' 时有效，表示回退的层数                                                                          |                      |
| animation-type         | String  | pop-in/out      | 当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router#animation) | App                  |
| animation-duration     | Number  | 300             | 当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间。                                                           | App                  |
| hover-class            | String  | navigator-hover | 指定点击时的样式类，当hover-class="none"时，没有点击态效果                                                                            |                      |
| hover-stop-propagation | Boolean | false           | 指定是否阻止本节点的祖先节点出现点击态                                                                                               | 微信小程序                |
| hover-start-time       | Number  | 50              | 按住后多久出现点击态，单位毫秒                                                                                                   |                      |
| hover-stay-time        | Number  | 600             | 手指松开后点击态保留时间，单位毫秒                                                                                                 |                      |
| target                 | String  | self            | 在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram                                                                          | 微信2.0.7+、百度2.5.2+、QQ |



