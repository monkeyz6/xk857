---
title: Docker常用命令合集
date: 2020-11-10 16:04
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

嫌手册查找麻烦，教程查询啰嗦？来看看整理好的命令吧
<!-- more -->

- 构建容器：docker run -itd --name=mycentos centos:7
    - **-i** ：表示以交互模式运行容器（让容器的标准输入保持打开）
    - **-d**：表示后台运行容器，并返回容器ID
    - **-t**：为容器重新分配一个伪输入终端 { "registry-mirrors": ["https://5xok66d4.mirror.aliyuncs.com"] }
    - **--name**：为容器指定名称 查看本地所有的容器：docker ps -a
- 查看本地所有的容器：**docker ps -a**
- 查看本地正在运行的容器：**docker ps**
- 停止容器：**docker stop id或name**
- 一次性停止所有容器：**docker stop $(docker ps -a -q)**
- 启动容器：**docker start id或name****
- 重启容器：**docker restart id或name**
- 删除容器：**docker rm  id或name**
- 强制删除容器：**docker rmi -f  id或name**
- 查看容器详细信息：**docker inspect id或name**
- 进入容器：**docker exec -it id /bin/bash**
- 获取所有容器的id：**docker ps -a -q** 或 **docker ps -aq**


