(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{416:function(s,a,t){"use strict";t.r(a);var e=t(2),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("RocketMQ通过源码的方式安装，在centos7中依次安装JDK8、Maven、RocketMQ4以及控制台。\n")]),s._v(" "),a("h3",{attrs:{id:"centos7安装jdk8"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#centos7安装jdk8"}},[s._v("#")]),s._v(" centos7安装JDK8")]),s._v(" "),a("p",[s._v("官网下载linux.tar.gz版本，上传至云服务器 /usr/local/software/ 目录下")]),s._v(" "),a("p",[s._v("点击下载 https://xk857.com/t/jdk-8u201-linux-x64.tar.gz")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("解压：tar -zxvf jdk-8u201-linux-x64.tar.gz\n重命名：mv jdk1.8.0_201 jdk8\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/profile\n加入\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_HOME")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/software/jdk8\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/bin:"),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CLASSPATH")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(".:"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/dt.jar:"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/tools.jar\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" JAVA_HOME "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")]),s._v(" CLASSPATH\n使用 "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" /etc/profile   让配置立刻生效\n")])])]),a("h3",{attrs:{id:"linux服务器下安装maven"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux服务器下安装maven"}},[s._v("#")]),s._v(" Linux服务器下安装Maven")]),s._v(" "),a("p",[s._v("点击下载：https://xk857.com/t/apache-maven-3.6.0-bin.tar.gz，上传至 /usr/local/software/ 目录下")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("解压：tar -zxvf apache-maven-3.6.0-bin.tar.gz\n重命名： "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" apache-maven-3.6.0 maven\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/profile\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/software/maven/bin:"),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),s._v("\n\n立刻生效：source /etc/profile\n查看版本： mvn -v\n")])])]),a("h3",{attrs:{id:"linux服务器下源码部署rocketmq4-x"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux服务器下源码部署rocketmq4-x"}},[s._v("#")]),s._v(" Linux服务器下源码部署RocketMQ4.X")]),s._v(" "),a("p",[s._v("进入官网，点击进行下载，"),a("a",{attrs:{href:"https://rocketmq.apache.org/docs/quick-start/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Quick Start - Apache RocketMQ"),a("OutboundLink")],1)]),s._v(" "),a("p",[a("img",{attrs:{src:"https://xk857.com/typora/2021/05image-20210526103741006.png",alt:"image-20210526103741006"}})]),s._v(" "),a("p",[s._v("第二步，点击下载")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://xk857.com/typora/2021/05image-20210526103819998.png",alt:"image-20210526103819998"}})]),s._v(" "),a("p",[s._v("直接下载：https://xk857.com/t/rocketmq-all-4.8.0-source-release.zip")]),s._v(" "),a("p",[s._v("上传至 /usr/local/software/")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Liunx 解压安装")]),s._v("\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 解压")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" rocketmq-all-4.8.0-source-release.zip\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重命名")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" rocketmq-all-4.8.0-source-release rocketmq\n\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" rocketmq\nmvn -Prelease-all -DskipTests clean "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -U\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" distribution/target/rocketmq-4.8.0/rocketmq-4.8.0\n")])])]),a("p",[s._v("启动")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/\n\n启动 mqnamesrv\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("nohup")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" bin/mqnamesrv "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tail")]),s._v(" -f ~/logs/rocketmqlogs/namesrv.lo\n\n启动 broker\n")])])]),a("p",[s._v("可能会出现报错，下面列出解决方案。")]),s._v(" "),a("p",[s._v("内存不够怎么处理? 找到 runserver.sh 修改 JAVA_OPT")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" bin/runserver.hs\n\n进入后修改：\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_OPT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${JAVA_OPT}")]),s._v(' -server -Xms1g -Xmx1g -Xmn512m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"')]),s._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://xk857.com/typora/2021/05image-20210526114831424.png",alt:"image-20210526114831424"}})]),s._v(" "),a("p",[s._v("broker内存不足解决办法")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/rocketmq/distribution/target/rocketmq-4.8.0/rocketmq-4.8.0/\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" bin/runbroker.sh\n\n修改配置\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_OPT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${JAVA_OPT}")]),s._v(' -server -Xms1g -Xmx1g -Xmn512m"')]),s._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://xk857.com/typora/2021/05image-20210526120235989.png",alt:"image-20210526120235989"}})]),s._v(" "),a("p",[s._v("验证")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NAMESRV_ADDR")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("localhost:9876\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" bin/tools.sh org.apache.rocketmq.example.quickstart.Producer SendResult "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("sendStatus"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("SEND_OK, "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("msgId")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer ConsumeMessageThread_%d Receive New Messages: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("MessageExt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])])]),a("h2",{attrs:{id:"rocketmq源码方式安装控制台"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rocketmq源码方式安装控制台"}},[s._v("#")]),s._v(" RocketMQ源码方式安装控制台")]),s._v(" "),a("p",[s._v("下载地址：https://github.com/apache/rocketmq-externals")]),s._v(" "),a("p",[s._v("码云同步访问仓库：https://gitee.com/monkeyz6/rocketmq-externals.git")]),s._v(" "),a("p",[s._v("将下载后的zip文件，上传到 /usr/local/software/ ，下面的命令文件名可能有所差异，注意辨别")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/\n解压\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" monkeyz6-rocketmq-externals-master.zip\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" rocketmq-externals\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" rocketmq-console\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改 applicatiuon.properties")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/rocketmq-externals/rocketmq-console/src/main/resources\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" application.properties\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置地址")]),s._v("\nrocketmq.config.namesrvAddr"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:9876\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/software/rocketmq-externals/rocketmq-console/\n编译打包\nmvn clean package -Dmaven.test.skip"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" target/\n")])])]),a("ul",[a("li",[s._v("进入target目录 ，启动 java -jar rocketmq-console-ng-2.0.0.jar")]),s._v(" "),a("li",[s._v("守护进程方式启动  nohup java -jar rocketmq-console-ng-2.0.0.jar &")])]),s._v(" "),a("p",[s._v("默认8080端口，访问：ip:8080")])])}),[],!1,null,null,null);a.default=n.exports}}]);