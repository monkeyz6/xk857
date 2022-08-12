(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{537:function(s,t,a){"use strict";a.r(t);var e=a(2),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"安装docker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装docker"}},[s._v("#")]),s._v(" 安装Docker")]),s._v(" "),t("p",[s._v("依次运行以下命令添加yum源")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("yum update\nyum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" epel-release -y\nyum clean all\nyum list\n")])])]),t("p",[s._v("安装并运行Docker。")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("yum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" docker-io -y\nsystemctl start "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("\n")])])]),t("p",[s._v("检查安装结果。")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" info\n")])])]),t("p",[s._v("启动使用Docker")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("systemctl start "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("     "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#运行Docker守护进程")]),s._v("\nsystemctl stop "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#停止Docker守护进程")]),s._v("\nsystemctl restart "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#重启Docker守护进程")]),s._v("\n")])])]),t("p",[s._v("帮助文档：https://help.aliyun.com/document_detail/51853.html?spm=a2c4g.11186623.6.820.RaToNY")]),s._v(" "),t("h3",{attrs:{id:"使用docker安装mysql5-7"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用docker安装mysql5-7"}},[s._v("#")]),s._v(" 使用Docker安装MySQL5.7")]),s._v(" "),t("p",[s._v("首先是拉去镜像")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull mysql:5.7\n")])])]),t("p",[s._v("然后运行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /mydata/mysql/log:/var/log/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /mydata/mysql/data:/var/lib/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /mydata/mysql/conf:/etc/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-d mysql:5.7\n")])])]),t("h3",{attrs:{id:"参数说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参数说明"}},[s._v("#")]),s._v(" 参数说明")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("-p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\t\t\t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将容器的3306端口映射到主机的3306端口，'\\'指换行符，下同")]),s._v("\n-v /mydata/mysql/log:/var/log/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将配置文件夹挂载到主机,冒号左边为Linux的目录结构，右边为docker内部的")]),s._v("\n-v /mydata/mysql/data:/var/lib/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将日志文件夹挂戟到主机")]),s._v("\n-v /mydata/mysql/conf:/etc/mysql "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将配置文件夹挂载到主机")]),s._v("\n-e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\t\t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 初始化root用户的密码为：123456")]),s._v("\n-d mysql:5.7\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);