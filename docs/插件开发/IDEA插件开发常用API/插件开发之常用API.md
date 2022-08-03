---
title: 插件开发之常用API
date: 2021-08-03 21:14
categories:
- 插件开发
tags:
- 插件开发
---

和vue一样，插件开发常用的API和vue相似，都有本地存储，同时还有一个专属于编辑器的选中文本API，这个在UI界面不常用，但是在编辑器的插件开发中却经常用到。

<!-- more -->

### 1.本地存储

```java
// 获取本地数据 
String token = PropertiesComponent.getInstance().getValue("key","默认数据");
// 存储数据到本地 
String token = PropertiesComponent.getInstance().setValue("key","value");
```

### 2.获取选中文本

```java
public void actionPerformed(AnActionEvent e) {
    Editor editor = e.getRequiredData(CommonDataKeys.EDITOR);
    SelectionModel selectionModel = editor.getSelectionModel();
    String text = selectionModel.getSelectedText();
    // 以通知的形式打印获取到的文本
    firstPluginTest1.notify(e.getProject(),text, NotificationType.INFORMATION);
}
```
