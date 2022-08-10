(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{395:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("Shell是一种脚本语言，又是一种命令语言。可以通俗一点来讲，Shell脚本就是一系列命令的集合，可以在Unix/linux上面直接使用，也可以写一些常用的小工具，小脚本来实现想要的功能，实现自动化运维。\n")]),t._v(" "),s("h3",{attrs:{id:"helloword"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#helloword"}},[t._v("#")]),t._v(" HelloWord")]),t._v(" "),s("p",[t._v("第一行是"),s("strong",[t._v("解释器")]),t._v("这是必不可少的，后面"),s("code",[t._v("#")]),t._v("开头的都是注释信息，一般为作者信息，echo是输出语句")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token shebang important"}},[t._v("#!/bin/env bash")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Description: /mybin/myvim scripts")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Auth: CV大魔王")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Email: 199301983@qq.com")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Date: 2022-08-08 13:36")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Version: 1.0")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWord!!!"')]),t._v("\n")])])]),s("h3",{attrs:{id:"变量的定义及使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#变量的定义及使用"}},[t._v("#")]),t._v(" 变量的定义及使用")]),t._v(" "),s("p",[t._v("定义：")]),t._v(" "),s("ol",[s("li",[s("strong",[t._v("直接赋值")]),t._v("：a=tmp，a是变量名，tmp是值，注意这种定义方式不可有空格")]),t._v(" "),s("li",[s("strong",[t._v("单引号赋值")]),t._v("：a='Hello World'，这种方式可以有空格")]),t._v(" "),s("li",[s("strong",[t._v("双引号赋值")]),t._v("：这种方式也可以有空格，同时会解析引号内的变量或执行命令。")])]),t._v(" "),s("p",[t._v("使用：$变量名")]),t._v(" "),s("p",[t._v("删除：unset 变量名称")]),t._v(" "),s("h3",{attrs:{id:"shell数组"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shell数组"}},[t._v("#")]),t._v(" Shell数组")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("直接定义：每个元素使用空格分割，Shell 是弱类型的，数组中元素的类型可以不一样")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("array1")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello Shell"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("单元素定义：Shell 中数组下标从 0 开始，利用单个元素来定义数组。")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("array2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\narray2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\narray2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello Shell"')]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("获取单个元素："),s("code",[t._v("${array1[0]}")])])]),t._v(" "),s("li",[s("p",[t._v("获取全部元素："),s("code",[t._v("${array1[*]}")]),t._v(" 或 "),s("code",[t._v("${array1[@]}")])])]),t._v(" "),s("li",[s("p",[t._v("获取数组长度："),s("code",[t._v("${#array1[*]}")]),t._v(" 或 "),s("code",[t._v("${#array1[@]}")])])]),t._v(" "),s("li",[s("p",[t._v("修改单个元素：和单元素定义相同，"),s("code",[t._v("array2[0]=2")])])]),t._v(" "),s("li",[s("p",[t._v("删除数组元素："),s("code",[t._v("unset array1[3]")]),t._v("，删除对应下标的数组元素，如果不带下标则删除数组的全部元素")])]),t._v(" "),s("li",[s("p",[t._v("数组截取："),s("code",[t._v("${array1[*]:0:2}")]),t._v("，从第1个元素往后2个元素进行截取")])])]),t._v(" "),s("h3",{attrs:{id:"shell函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shell函数"}},[t._v("#")]),t._v(" Shell函数")]),t._v(" "),s("p",[t._v("函数的定义如下：function 可以省略，下面是标准写法")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" 函数名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t// 你的逻辑\n\t"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"当前用户为:'),s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$USER")]),t._v('"')]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("调用函数")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("函数名 参数1 参数2 参数3\n")])])]),s("p",[t._v("函数获取参数")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-name function"}},[t._v("f1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"函数的第一个参数为: '),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${1}")]),t._v('"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"函数的第二个参数为: '),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${2}")]),t._v('"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"函数的第三个参数为: '),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${3}")]),t._v('"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 调用函数")]),t._v("\nf1 "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n")])])]),s("h4",{attrs:{id:"特殊参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特殊参数"}},[t._v("#")]),t._v(" 特殊参数")]),t._v(" "),s("p",[t._v("在 Shell 中也存在特殊含义的参数如下表：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("变量")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("含义")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("$#")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("传递给函数的参数个数总和")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("$*")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("传递给脚本或函数的所有参数，当被双引号 "),s("code",[t._v('" "')]),t._v(" 包含时，所有的位置参数被看做一个字符串")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("$@")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("传递给脚本或函数的所有参数，当被双引号 "),s("code",[t._v('" "')]),t._v(" 包含时，每个位置参数被看做独立的字符串")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("$?")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("$?")]),t._v(" 表示函数的退出状态，返回为 0 为执行成功，非 0 则为执行失败")])])])])])}),[],!1,null,null,null);s.default=n.exports}}]);