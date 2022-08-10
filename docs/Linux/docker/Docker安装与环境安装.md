---
title: Docker安装与环境安装
date: 2020-11-10 16:01
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

在Centos7上配置使用环境与安装docker，并设置Docker下载镜像地址为阿里云镜像，以及Nginx部署案例
<!-- more -->

- 依次运行以下命令添加更新yum源。

```shell
yum update
yum install epel-release -y
yum clean all
yum list
```

- 安装并运行Docker

```shell
yum install docker-io -y
systemctl start docker
```

- 检查安装结果

```shell
docker info
```

- 启动使用Docker

```shell
systemctl start docker     #运行Docker守护进程
systemctl stop docker      #停止Docker守护进程
systemctl restart docker   #重启Docker守护进程
```

- 一个命令部署Nginx

```shell
docker run --rm --name nginx-xdclass -p 8080:80 -d nginx

docker run --name nginx-xdclass -p 8080:80 -d nginx

--rm：容器终止运行后，自动删除容器文件。
--name nginx-xdclass：容器的名字叫做nginx-xdclass,名字自己定义.
-p: 端口进行映射，将本地 8080 端口映射到容器内部的 80 端口
-d：容器启动后，在后台运行

docker ps 查看容器
docker stop 容器id
```

- 修改镜像仓库，[容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors)

```shell
vim /etc/docker/daemon.json
#改为下面内容，然后重启docker
{
  "registry-mirrors": ["https://whti7a4f.mirror.aliyuncs.com"]
}
# 重启Docker
systemctl daemon-reload && systemctl restart docker
#查看信息
docker info
```

