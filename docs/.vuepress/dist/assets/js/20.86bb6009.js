(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{399:function(t,e,a){"use strict";a.r(e);var l=a(2),s=Object(l.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("我们在调用shell脚本时，经常会对其传递参数，我们可以获取到从shell脚本外部传递过去的参数\n")]),t._v(" "),e("h2",{attrs:{id:"shell参数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#shell参数"}},[t._v("#")]),t._v(" Shell参数")]),t._v(" "),e("ol",[e("li",[t._v("位置参数：如给一个脚本传递一个参数，我们可以在 Shell 脚本内部获取传入的位置参数，通过 "),e("code",[t._v("$1")]),t._v("、"),e("code",[t._v("$2")]),t._v("、"),e("code",[t._v("$3")]),t._v("这种方式获取，$0是脚本的名称")]),t._v(" "),e("li",[t._v("特殊参数：在 Shell 中也存在特殊含义的参数如下表：")])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("变量")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("含义")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("$#")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("传递给脚本或函数的参数个数总和")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("$*")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("传递给脚本或函数的所有参数，当被双引号 "),e("code",[t._v('" "')]),t._v(" 包含时，所有的位置参数被看做一个字符串")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("$@")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("传递给脚本或函数的所有参数，当被双引号 "),e("code",[t._v('" "')]),t._v(" 包含时，每个位置参数被看做独立的字符串")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("$?")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("上个命令的退出状态，或函数的返回值，0 为执行成功，非 0 则为执行失败")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("$$")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("当前 Shell 进程 ID。对于 Shell 脚本，就是这些脚本所在的进程 ID。")])])])]),t._v(" "),e("h2",{attrs:{id:"输出语句"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#输出语句"}},[t._v("#")]),t._v(" 输出语句")]),t._v(" "),e("p",[t._v("输出语句分为echo和printf两种，还能控制输出文字的颜色与背景色以及识别转义字符等")]),t._v(" "),e("h3",{attrs:{id:"_1-echo输出语句使用方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-echo输出语句使用方式"}},[t._v("#")]),t._v(" 1.echo输出语句使用方式")]),t._v(" "),e("ul",[e("li",[t._v("默认输出："),e("code",[t._v("echo 'hello'")])]),t._v(" "),e("li",[t._v("不换行输出："),e("code",[t._v("echo -n 'hello'")])]),t._v(" "),e("li",[t._v("单引号原样输出："),e("code",[t._v("echo '${str}'")])]),t._v(" "),e("li",[t._v("双引号输出变量值："),e("code",[t._v("echo '${str}'")])])]),t._v(" "),e("h3",{attrs:{id:"_2-echo开启转义识别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-echo开启转义识别"}},[t._v("#")]),t._v(" 2.echo开启转义识别")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("使用 -e 开启转义，可处理特殊字符，例如"),e("code",[t._v("\\n")]),t._v("是换行符号："),e("code",[t._v("echo -e 'hello\\nshell'")])]),t._v(" "),e("p",[t._v("| 符号 | 含义                          |\n| ---- | ----------------------------- |\n| \\n   | 换行符号                      |\n| \\t   | 制表符，也就是按我们的 tab 键 |\n| \\r   | 回车键                        |\n| \\a   | 从系统喇叭送出铃声            |\n| "),e("code",[t._v("\\\\")]),t._v(" | 显示反斜线本身                |\n| \\f   | FORMFEED，换页字符            |\n| \\E   | ESCAPE，跳脱键                |")])])]),t._v(" "),e("h3",{attrs:{id:"_3-输出内容到文件中"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-输出内容到文件中"}},[t._v("#")]),t._v(" 3.输出内容到文件中")]),t._v(" "),e("ul",[e("li",[t._v("把字符输入到文件中，如果没有此文件会自动创建："),e("code",[t._v("echo 'hello' > test.sh")]),t._v("，此时如果文件有内容会被替换")]),t._v(" "),e("li",[t._v("清空文件内容："),e("code",[t._v("echo > test.sh")])])]),t._v(" "),e("h3",{attrs:{id:"_4-控制输出文字的颜色与背景色"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-控制输出文字的颜色与背景色"}},[t._v("#")]),t._v(" 4.控制输出文字的颜色与背景色")]),t._v(" "),e("p",[t._v("在 Shell 中我们有时候需要与用户进行交互式操作，如果输出的内容有颜色，对于用户识别更为明显。Shell 中 echo 可以对字体颜色 / 背景 / 显示方式进行控制，如下表：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("字体颜色")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("字体背景颜色")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("显示方式")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("30：黑")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("40：黑")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}})]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("31：红")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("41：深红")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("0：终端默认设置")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("32：绿")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("42：绿")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("1：高亮显示")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("33：黄")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("43：黄色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("4：下划线")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("34：蓝色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("44：蓝色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("5：闪烁")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("35：紫色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("45：紫色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("7：反白显示")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("36：深绿")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("46：深绿")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("8：隐藏")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("37：白色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("47：白色")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}})]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("格式：")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}}),t._v(" "),e("td",{staticStyle:{"text-align":"left"}})]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("\\033[1;31;40m")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("# 1 是显示方式，可选。31 是字体颜色。40m 是字体背景颜色。")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}})]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("\\033[0m")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("# 恢复终端默认颜色，即取消颜色设置。")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}})])])]),t._v(" "),e("p",[t._v("字体颜色案例")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[t._v("i")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("37")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" -e "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),e("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v("["),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$i")]),t._v(";40m hello shell "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v('[0m"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("done")]),t._v(" \n")])])]),e("p",[t._v("背景颜色案例")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[t._v("i")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("40")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("47")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" -e "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),e("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v("[47;"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${i}")]),t._v("m hello shell "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\033"}},[t._v("\\033")]),t._v('[0m"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("done")]),t._v("\n")])])]),e("h3",{attrs:{id:"_5-pritf语句的使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-pritf语句的使用"}},[t._v("#")]),t._v(" 5.pritf语句的使用")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("打印普通字符串："),e("code",[t._v("printf 'hello shell'")]),t._v("，如果需要换行，需要手动显式添加 "),e("code",[t._v("\\n")]),t._v("。")])]),t._v(" "),e("li",[e("p",[t._v("格式化字符串，例如 "),e("code",[t._v('printf "hello %s\\n" shell')]),t._v(" 输出"),e("code",[t._v("hello shell")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("%c ASCII字符.显示相对应参数的第一个字符\n%d,%i 十进制整数（常用）\n%e 浮点格式([-d].precisione [+-dd])\n%E 浮点格式([-d].precisionE [+-dd])\n%g %e或%f转换,看哪一个较短,则删除结尾的零\n%G %E或%f转换,看哪一个较短,则删除结尾的零\n%s 字符串（常用）\n%u 不带正负号的十进制值\n%x 不带正负号的十六进制.使用a至f表示10至15\n%% 字面意义的%\n%X 不带正负号的十六进制.使用A至F表示10至15\n")])])])]),t._v(" "),e("li",[e("p",[t._v("printf中单双引号没有区别")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);