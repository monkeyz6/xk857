---
title: Dockerfile构建镜像
date: 2020-11-10 16:10
categories:
- docker
tags:
- Linux
- docker
---

Dockerfile 是一个文本文件，其内包含了一条条的指令(Instruction)，用于构建镜像。每一条指令构建一层镜像，因此每一条指令的内容，就是描述该层镜像应当如何构建。
<!-- more -->
dockerHub官网：[Docker Hub](https://hub.docker.com/)
常用命令如下：
- **FROM**：基于哪个镜像
- **MAINTAINER**：注明作者
- **COPY**：复制文件进入镜像（只能用相对路径，不能用绝对路径）
- **ADD**：复制文件进入镜像（假如文件是.tar.gz文件会解压）
- **WORKDIR**：指定工作目录，假如路径不存在会创建路径
- **ENV**：设置环境变量
- **EXPOSE**：暴露容器端口
- **RUN**：在构建镜像的时候执行，作用于镜像层面
- **ENTRYPOINT**：在容器启动的时候执行，作用于容器层，dockerfile里有多条时只允许执行最后一条
- **CMD**：在容器启动的时候执行，作用于容器层，
    - dockerfile里有多条时只允许执行最后一条。
    - 容器启动后执行默认的命令或者参数，允许被修改
- 命令格式：
    - shell命令格式：RUN yum install -y net-tools
    - exec命令格式：RUN [ "yum","install" ,"-y" ,"net-tools"]


## 1.基础镜像的选择

基本原则如下

- 官方镜像优于非官方的镜像，如果没有官方镜像，则尽量选择Dockerfile开源的
- 固定版本tag而不是每次都使用latest `FROM nginx:1.21.0-alpine`
- 尽量选择体积小的镜像
- 如何区分官方镜像？ —— 搜索后的前几个（verified content下的都是）



实践练习：

假如我们有一个 `index.html` 文件

```html
<h1>Hello Docker</h1>
```

准备一个Dockerfile

```dockerfile
FROM nginx:1.21.0-alpine

ADD index.html /usr/share/nginx/html/index.html
```

构建命令

```shell
docker image build -t 镜像名称
```



## 2.通过RUN执行命令

`RUN` 主要用于在Image里执行指令，比如安装软件，下载文件等。

```shell
apt-get update
apt-get install wget
wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz
tar zxf ipinfo_2.0.1_linux_amd64.tar.gz
mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo
rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

### 2.1 举例说明

说明：下面这种写法是有问题的，虽然可以执行，但是每一行的RUN命令都会产生一层image layer, 导致镜像的臃肿。

```dockerfile
FROM ubuntu:21.04
RUN apt-get update
RUN apt-get install -y wget
RUN wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz
RUN tar zxf ipinfo_2.0.1_linux_amd64.tar.gz
RUN mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo
RUN rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

### 2.2 构建命令改进

```
FROM ubuntu:21.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```





## 3.文件复制和目录操作

往镜像里复制文件有两种方式，`COPY` 和 `ADD` 都可以把local的一个文件复制到镜像里，如果目标目录不存在，则会自动创建

```dockerfile
FROM python:3.9.5-alpine3.13
COPY hello.py /app/hello.py
```

比如把本地的 hello.py 复制到 /app 目录下。 /app这个folder不存在，则会自动创建



### 3.1 复制压缩文件

`ADD` 比 COPY高级一点的地方就是，如果复制的是一个gzip等压缩文件时，ADD会帮助我们自动去解压缩文件。

```dockerfile
FROM python:3.9.5-alpine3.13
ADD hello.tar.gz /app/
```

因此在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD。



## 4. 构建参数和环境变量

`ARG` 和 `ENV` 是经常容易被混淆的两个Dockerfile的语法，都可以用来设置一个“变量”。 但实际上两者有很多的不同。

首先看使用前的镜像构建，注意2.0.1

```dockerfile
FROM ubuntu:21.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

### 4.1 ENV方式

```dockerfile
FROM ubuntu:21.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

### 4.2 ARG方式

```dockerfile
FROM ubuntu:21.04
ARG VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

### 4.3 区别

- ARG：构建镜像后，遍历不存在
- ENV：构建镜像后，存在系统变量中，进入镜像容器中，输入env可以看到环境变量

![img](https://dockertips.readthedocs.io/en/latest/_images/docker_environment_build_args.png)



## 5.容器启动命令 CMD

CMD可以用来设置容器启动时默认会执行的命令。

- 容器启动时默认执行的命令
- 如果docker container run启动容器时指定了其它命令，则CMD命令会被忽略
- 如果定义了多个CMD，只有最后一个会被执行。
- 容器启动后执行默认的命令或者参数，允许被修改

```dockerfile
FROM ubuntu:21.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
CMD ["echo","containe1r","starting..."]
```



## 6.容器启动命令 ENTRYPOINT

ENTRYPOINT 也可以设置容器启动时要执行的命令，但是和CMD是有区别的。

- `CMD` 设置的命令，可以在docker container run 时传入其它命令，覆盖掉 `CMD` 的命令，但是 `ENTRYPOINT` 所设置的命令是一定会被执行的。
- `ENTRYPOINT` 和 `CMD` 可以联合使用，`ENTRYPOINT` 设置执行的命令，CMD传递参数

```dockerfile
FROM centos:7
RUN echo "images building!"
CMD ["echo","container","starting..."]
ENTRYPOINT ["echo","container","starting ！！！"]
```

运行举例：同样的命令，如果使用`RUN`, `echo "hello world"` 会将其覆盖，但是使用`ENTRYPOINT`则不会受到影响

```shell
docker container run -it --rm demo-cmd echo "hello world"
```



## 7.Shell 格式和 Exec 格式

### 7.1 Shell格式

```
CMD echo "hello docker"
ENTRYPOINT echo "hello docker"
```

### 7.2 Exec格式

以可执行命令的方式

```dockerfile
ENTRYPOINT ["echo", "hello docker"]
CMD ["echo", "hello docker"]
```

注意shell脚本的问题

```shell
FROM ubuntu:21.04
ENV NAME=docker
CMD echo "hello $NAME"
```

假如我们要把上面的CMD改成Exec格式，下面这样改是不行的, 大家可以试试。

```dockerfile
FROM ubuntu:21.04
ENV NAME=docker
CMD ["echo", "hello $NAME"]
```

它会打印出 `hello $NAME` , 而不是 `hello docker` ,那么需要怎么写呢？ 我们需要以shell脚本的方式去执行

```dockerfile
FROM ubuntu:21.04
ENV NAME=docker
CMD ["sh", "-c", "echo hello $NAME"]
```







