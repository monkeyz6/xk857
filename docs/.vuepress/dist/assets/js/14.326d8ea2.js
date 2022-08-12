(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{397:function(s,t,a){"use strict";a.r(t);var e=a(2),r=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("Dockerfile 是一个文本文件，其内包含了一条条的指令(Instruction)，用于构建镜像。每一条指令构建一层镜像，因此每一条指令的内容，就是描述该层镜像应当如何构建。\n"),s._v("\ndockerHub官网："),t("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker Hub"),t("OutboundLink")],1),s._v("\n常用命令如下：")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("FROM")]),s._v("：基于哪个镜像")]),s._v(" "),t("li",[t("strong",[s._v("MAINTAINER")]),s._v("：注明作者")]),s._v(" "),t("li",[t("strong",[s._v("COPY")]),s._v("：复制文件进入镜像（只能用相对路径，不能用绝对路径）")]),s._v(" "),t("li",[t("strong",[s._v("ADD")]),s._v("：复制文件进入镜像（假如文件是.tar.gz文件会解压）")]),s._v(" "),t("li",[t("strong",[s._v("WORKDIR")]),s._v("：指定工作目录，假如路径不存在会创建路径")]),s._v(" "),t("li",[t("strong",[s._v("ENV")]),s._v("：设置环境变量")]),s._v(" "),t("li",[t("strong",[s._v("EXPOSE")]),s._v("：暴露容器端口")]),s._v(" "),t("li",[t("strong",[s._v("RUN")]),s._v("：在构建镜像的时候执行，作用于镜像层面")]),s._v(" "),t("li",[t("strong",[s._v("ENTRYPOINT")]),s._v("：在容器启动的时候执行，作用于容器层，dockerfile里有多条时只允许执行最后一条")]),s._v(" "),t("li",[t("strong",[s._v("CMD")]),s._v("：在容器启动的时候执行，作用于容器层，\n"),t("ul",[t("li",[s._v("dockerfile里有多条时只允许执行最后一条。")]),s._v(" "),t("li",[s._v("容器启动后执行默认的命令或者参数，允许被修改")])])]),s._v(" "),t("li",[s._v("命令格式：\n"),t("ul",[t("li",[s._v("shell命令格式：RUN yum install -y net-tools")]),s._v(" "),t("li",[s._v('exec命令格式：RUN [ "yum","install" ,"-y" ,"net-tools"]')])])])]),s._v(" "),t("h2",{attrs:{id:"_1-基础镜像的选择"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-基础镜像的选择"}},[s._v("#")]),s._v(" 1.基础镜像的选择")]),s._v(" "),t("p",[s._v("基本原则如下")]),s._v(" "),t("ul",[t("li",[s._v("官方镜像优于非官方的镜像，如果没有官方镜像，则尽量选择Dockerfile开源的")]),s._v(" "),t("li",[s._v("固定版本tag而不是每次都使用latest "),t("code",[s._v("FROM nginx:1.21.0-alpine")])]),s._v(" "),t("li",[s._v("尽量选择体积小的镜像")]),s._v(" "),t("li",[s._v("如何区分官方镜像？ —— 搜索后的前几个（verified content下的都是）")])]),s._v(" "),t("p",[s._v("实践练习：")]),s._v(" "),t("p",[s._v("假如我们有一个 "),t("code",[s._v("index.html")]),s._v(" 文件")]),s._v(" "),t("div",{staticClass:"language-html extra-class"},[t("pre",{pre:!0,attrs:{class:"language-html"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("h1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("Hello Docker"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("h1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])])]),t("p",[s._v("准备一个Dockerfile")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" nginx:1.21.0-alpine")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),s._v(" index.html /usr/share/nginx/html/index.html")]),s._v("\n")])])]),t("p",[s._v("构建命令")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" image build -t 镜像名称\n")])])]),t("h2",{attrs:{id:"_2-通过run执行命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-通过run执行命令"}},[s._v("#")]),s._v(" 2.通过RUN执行命令")]),s._v(" "),t("p",[t("code",[s._v("RUN")]),s._v(" 主要用于在Image里执行指令，比如安装软件，下载文件等。")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" update\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" zxf ipinfo_2.0.1_linux_amd64.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -rf ipinfo_2.0.1_linux_amd64.tar.gz\n")])])]),t("h3",{attrs:{id:"_2-1-举例说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-举例说明"}},[s._v("#")]),s._v(" 2.1 举例说明")]),s._v(" "),t("p",[s._v("说明：下面这种写法是有问题的，虽然可以执行，但是每一行的RUN命令都会产生一层image layer, 导致镜像的臃肿。")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get update")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get install -y wget")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" tar zxf ipinfo_2.0.1_linux_amd64.tar.gz")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" rm -rf ipinfo_2.0.1_linux_amd64.tar.gz")]),s._v("\n")])])]),t("h3",{attrs:{id:"_2-2-构建命令改进"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-构建命令改进"}},[s._v("#")]),s._v(" 2.2 构建命令改进")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("FROM ubuntu:21.04\nRUN apt-get update && \\\n    apt-get install -y wget && \\\n    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \\\n    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \\\n    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \\\n    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz\n")])])]),t("h2",{attrs:{id:"_3-文件复制和目录操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-文件复制和目录操作"}},[s._v("#")]),s._v(" 3.文件复制和目录操作")]),s._v(" "),t("p",[s._v("往镜像里复制文件有两种方式，"),t("code",[s._v("COPY")]),s._v(" 和 "),t("code",[s._v("ADD")]),s._v(" 都可以把local的一个文件复制到镜像里，如果目标目录不存在，则会自动创建")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" python:3.9.5-alpine3.13")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("COPY")]),s._v(" hello.py /app/hello.py")]),s._v("\n")])])]),t("p",[s._v("比如把本地的 hello.py 复制到 /app 目录下。 /app这个folder不存在，则会自动创建")]),s._v(" "),t("h3",{attrs:{id:"_3-1-复制压缩文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-复制压缩文件"}},[s._v("#")]),s._v(" 3.1 复制压缩文件")]),s._v(" "),t("p",[t("code",[s._v("ADD")]),s._v(" 比 COPY高级一点的地方就是，如果复制的是一个gzip等压缩文件时，ADD会帮助我们自动去解压缩文件。")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" python:3.9.5-alpine3.13")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),s._v(" hello.tar.gz /app/")]),s._v("\n")])])]),t("p",[s._v("因此在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD。")]),s._v(" "),t("h2",{attrs:{id:"_4-构建参数和环境变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-构建参数和环境变量"}},[s._v("#")]),s._v(" 4. 构建参数和环境变量")]),s._v(" "),t("p",[t("code",[s._v("ARG")]),s._v(" 和 "),t("code",[s._v("ENV")]),s._v(" 是经常容易被混淆的两个Dockerfile的语法，都可以用来设置一个“变量”。 但实际上两者有很多的不同。")]),s._v(" "),t("p",[s._v("首先看使用前的镜像构建，注意2.0.1")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get update && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    apt-get install -y wget && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz")]),s._v("\n")])])]),t("h3",{attrs:{id:"_4-1-env方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-env方式"}},[s._v("#")]),s._v(" 4.1 ENV方式")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENV")]),s._v(" VERSION=2.0.1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get update && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    apt-get install -y wget && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    wget https://github.com/ipinfo/cli/releases/download/ipinfo-"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("/ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    tar zxf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    mv ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64 /usr/bin/ipinfo && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    rm -rf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz")]),s._v("\n")])])]),t("h3",{attrs:{id:"_4-2-arg方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-arg方式"}},[s._v("#")]),s._v(" 4.2 ARG方式")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ARG")]),s._v(" VERSION=2.0.1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get update && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    apt-get install -y wget && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    wget https://github.com/ipinfo/cli/releases/download/ipinfo-"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("/ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    tar zxf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    mv ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64 /usr/bin/ipinfo && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    rm -rf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz")]),s._v("\n")])])]),t("h3",{attrs:{id:"_4-3-区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-区别"}},[s._v("#")]),s._v(" 4.3 区别")]),s._v(" "),t("ul",[t("li",[s._v("ARG：构建镜像后，遍历不存在")]),s._v(" "),t("li",[s._v("ENV：构建镜像后，存在系统变量中，进入镜像容器中，输入env可以看到环境变量")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://dockertips.readthedocs.io/en/latest/_images/docker_environment_build_args.png",alt:"img"}})]),s._v(" "),t("h2",{attrs:{id:"_5-容器启动命令-cmd"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-容器启动命令-cmd"}},[s._v("#")]),s._v(" 5.容器启动命令 CMD")]),s._v(" "),t("p",[s._v("CMD可以用来设置容器启动时默认会执行的命令。")]),s._v(" "),t("ul",[t("li",[s._v("容器启动时默认执行的命令")]),s._v(" "),t("li",[s._v("如果docker container run启动容器时指定了其它命令，则CMD命令会被忽略")]),s._v(" "),t("li",[s._v("如果定义了多个CMD，只有最后一个会被执行。")]),s._v(" "),t("li",[s._v("容器启动后执行默认的命令或者参数，允许被修改")])]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENV")]),s._v(" VERSION=2.0.1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" apt-get update && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    apt-get install -y wget && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    wget https://github.com/ipinfo/cli/releases/download/ipinfo-"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("/ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    tar zxf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    mv ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64 /usr/bin/ipinfo && "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("\\")]),s._v("\n    rm -rf ipinfo_"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${VERSION}")]),s._v("_linux_amd64.tar.gz")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CMD")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"containe1r"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"starting..."')]),s._v("]")]),s._v("\n")])])]),t("h2",{attrs:{id:"_6-容器启动命令-entrypoint"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-容器启动命令-entrypoint"}},[s._v("#")]),s._v(" 6.容器启动命令 ENTRYPOINT")]),s._v(" "),t("p",[s._v("ENTRYPOINT 也可以设置容器启动时要执行的命令，但是和CMD是有区别的。")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("CMD")]),s._v(" 设置的命令，可以在docker container run 时传入其它命令，覆盖掉 "),t("code",[s._v("CMD")]),s._v(" 的命令，但是 "),t("code",[s._v("ENTRYPOINT")]),s._v(" 所设置的命令是一定会被执行的。")]),s._v(" "),t("li",[t("code",[s._v("ENTRYPOINT")]),s._v(" 和 "),t("code",[s._v("CMD")]),s._v(" 可以联合使用，"),t("code",[s._v("ENTRYPOINT")]),s._v(" 设置执行的命令，CMD传递参数")])]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" centos:7")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RUN")]),s._v(" echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"images building!"')])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CMD")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"container"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"starting..."')]),s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENTRYPOINT")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"container"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"starting ！！！"')]),s._v("]")]),s._v("\n")])])]),t("p",[s._v("运行举例：同样的命令，如果使用"),t("code",[s._v("RUN")]),s._v(", "),t("code",[s._v('echo "hello world"')]),s._v(" 会将其覆盖，但是使用"),t("code",[s._v("ENTRYPOINT")]),s._v("则不会受到影响")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" container run -it --rm demo-cmd "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello world"')]),s._v("\n")])])]),t("h2",{attrs:{id:"_7-shell-格式和-exec-格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-shell-格式和-exec-格式"}},[s._v("#")]),s._v(" 7.Shell 格式和 Exec 格式")]),s._v(" "),t("h3",{attrs:{id:"_7-1-shell格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-1-shell格式"}},[s._v("#")]),s._v(" 7.1 Shell格式")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('CMD echo "hello docker"\nENTRYPOINT echo "hello docker"\n')])])]),t("h3",{attrs:{id:"_7-2-exec格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-2-exec格式"}},[s._v("#")]),s._v(" 7.2 Exec格式")]),s._v(" "),t("p",[s._v("以可执行命令的方式")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENTRYPOINT")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello docker"')]),s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CMD")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello docker"')]),s._v("]")]),s._v("\n")])])]),t("p",[s._v("注意shell脚本的问题")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("FROM ubuntu:21.04\nENV "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NAME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("docker\nCMD "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello '),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$NAME")]),s._v('"')]),s._v("\n")])])]),t("p",[s._v("假如我们要把上面的CMD改成Exec格式，下面这样改是不行的, 大家可以试试。")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENV")]),s._v(" NAME=docker")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CMD")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello $NAME"')]),s._v("]")]),s._v("\n")])])]),t("p",[s._v("它会打印出 "),t("code",[s._v("hello $NAME")]),s._v(" , 而不是 "),t("code",[s._v("hello docker")]),s._v(" ,那么需要怎么写呢？ 我们需要以shell脚本的方式去执行")]),s._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" ubuntu:21.04")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ENV")]),s._v(" NAME=docker")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token instruction"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CMD")]),s._v(" ["),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sh"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-c"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"echo hello $NAME"')]),s._v("]")]),s._v("\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);