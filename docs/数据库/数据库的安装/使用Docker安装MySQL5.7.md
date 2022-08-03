---
title: 使用Docker安装MySQL5.7
date: 2021-08-03 19:28
categories:
- MySQL
tags:
- MySQL
---



### 安装Docker
依次运行以下命令添加yum源

```shell
yum update
yum install epel-release -y
yum clean all
yum list
```

安装并运行Docker。

```shell
yum install docker-io -y
systemctl start docker
```

检查安装结果。

```shell
docker info
```

启动使用Docker

```shell
systemctl start docker     #运行Docker守护进程
systemctl stop docker      #停止Docker守护进程
systemctl restart docker   #重启Docker守护进程
```

帮助文档：https://help.aliyun.com/document_detail/51853.html?spm=a2c4g.11186623.6.820.RaToNY


### 使用Docker安装MySQL5.7
首先是拉去镜像
```shell
docker pull mysql:5.7
```

然后运行
```shell
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:5.7
```

### 参数说明
```shell
-p 3306:3306 --name mysql \				# 将容器的3306端口映射到主机的3306端口，'\'指换行符，下同
-v /mydata/mysql/log:/var/log/mysql \	# 将配置文件夹挂载到主机,冒号左边为Linux的目录结构，右边为docker内部的
-v /mydata/mysql/data:/var/lib/mysql \	# 将日志文件夹挂戟到主机
-v /mydata/mysql/conf:/etc/mysql \		# 将配置文件夹挂载到主机
-e MYSQL_ROOT_PASSWORD=123456 \			# 初始化root用户的密码为：123456
-d mysql:5.7
```
