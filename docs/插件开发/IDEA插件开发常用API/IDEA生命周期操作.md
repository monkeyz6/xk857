---
title: IDEA生命周期操作
date: 2021-08-03 21:16
categories:
- 插件开发
tags:
- 插件开发
---

官方文档：[JetBrains插件开发生命周期](https://github.com/JetBrains/intellij-community/blob/master/platform/service-container/overview.md#startup-activity)
<!-- more -->
### 1.IDEA预加载

```xml
<extensions defaultExtensionNs="com.intellij">
  <preloadingActivity implementation="com.example.CatPreloadingActivity"/>
</extensions>
```

### 2.IDEA启动时

```xml
<extensions defaultExtensionNs="com.intellij">
    <startupActivity implementation="com.example.plugin_demo.MyApplicationComponent"/>
</extensions>
```

```java
public class MyApplicationComponent implements StartupActivity {
    @Override
    public void runActivity(@NotNull Project project) {

    }
}
```

### 3.IDEA启动后

```xml
<extensions defaultExtensionNs="com.intellij">
  <postStartupActivity implementation="com.example.CatStartupActivity"/>
</extensions>
```

```java
public class MyApplicationComponent extends ShelveChangesManager.PostStartupActivity {
    @Override
    public void runActivity(@NotNull Project project) {
        System.out.println("启动成");
        firstPluginTest1.notify(project,"启动成功", NotificationType.INFORMATION);
    }
}
```
