---
title: Shell编程入门与基础语法
date: 2022-08-08 20:15
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

Shell是一种脚本语言，又是一种命令语言。可以通俗一点来讲，Shell脚本就是一系列命令的集合，可以在Unix/linux上面直接使用，也可以写一些常用的小工具，小脚本来实现想要的功能，实现自动化运维。
<!-- more -->
### HelloWord

第一行是**解释器**这是必不可少的，后面`#`开头的都是注释信息，一般为作者信息，echo是输出语句

```shell
#!/bin/env bash
# Description: /mybin/myvim scripts
# Auth: CV大魔王
# Email: 199301983@qq.com
# Date: 2022-08-08 13:36
# Version: 1.0
echo "HelloWord!!!"
```

