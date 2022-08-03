---
title: 使用Docker部署分布式组件
date: 2021-08-03 21:26
categories:
- 插件开发
tags:
- 插件开发
---


现在都流行容器化部署，究其原因就是其便利性，也更方便后期的管理与扩容，配合K8S基本上就组成了企业级开发的基本运维架构。
<!-- more -->

### 部署Nacos

- 拉取镜像：docker pull nacos/nacos-server
- 查看镜像：docker images
- 启动Nacos：docker run --env MODE=standalone --name xk857-nacos -d -p 8848:8848 ef8e53226440 (镜像id)
- 访问Nocos：http://公网ip:8848/nacos

### 部署Sentinel

- docker拉取镜像：docker pull bladex/sentinel-dashboard:latest
- 查看镜像：docker images
- 启动Sentinel：docker run --name sentinel -d -p 8858:8858  镜像id
- 访问Sentinel：http://公网ip:8858。 
- 登录密码默认sentinel/sentinel
