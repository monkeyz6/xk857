---
title: uniapp引入彩色图标iconfont
date: 2021-08-03 22:30
categories:
- 插件开发
tags:
- 插件开发
---

1. 进入阿里巴巴矢量图标库https://www.iconfont.cn/，添加图标到项目，然后下载至本地
![阿里巴巴下载图标](https://oss.xk857.com/images/20220803/9186e35bc84f4fcca798aa28002c3200.png)

2. 对下载的文件进行解压，命令行进入解压后的文件下，执行一下命令，全局安装iconfont-tools工具
    ```shell
    npm install -g iconfont-tools
    ```

3. 再执行如下命令，然后回车。
   ```shell
   iconfont-tools 
   ```

![](https://oss.xk857.com/images/20220803/3aa40f56f27c4b8e81df6b55c01fee33.png)

4. 执行完毕后，会出现一个文件夹，iconfont-xk857，进入iconfont-xk857文件夹下，复制iconfont-xk857-icon.css到项目`/static/icon`目录下

![](https://oss.xk857.com/images/20220803/3b30b1eda7c84661b3fe32dd96e24320.png)

5. 然后在 App.vue 引入该文件
   ```vue
   <style>
   /* 彩色的图标*/
   @import url("~@/static/icon/iconfont-weapp-icon.css");
   </style>
   ```

6. 使用：其中xk857-icon开头是必须的，彩色图标当前对 vue文件有效，控制台会关于backgroud的相关警告，可忽略它
   ```html
   <text class="xk857-icon icon-sheji-xianxing"></text>
   ```
