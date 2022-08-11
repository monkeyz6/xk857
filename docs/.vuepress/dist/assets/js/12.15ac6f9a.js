(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{392:function(t,s,a){"use strict";a.r(s);var v=a(2),_=Object(v.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("前面小节介绍如何创建文件、移动文件、删除文件，但之前都没有介绍如何修改文件内容，本小节介绍如何使用 vim 编辑器对文件内容进行修改，另外介绍 vim 编辑器的安装和使用。\n")]),t._v(" "),s("p",[t._v("如果您的Linux系统没有按照vim，使用如下命令进行安装")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("yum -y "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v("\n")])])]),s("h3",{attrs:{id:"vim-编辑器三种模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vim-编辑器三种模式"}},[t._v("#")]),t._v(" vim 编辑器三种模式")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("普通模式")]),t._v("：当你刚开始进入 vim编辑器的时候默认会进入普通模式；")]),t._v(" "),s("li",[s("strong",[t._v("插入模式")]),t._v("：在 vim 普通模式的时候，按下 "),s("strong",[t._v("i")]),t._v(" 键就可以进入插入模式，插入模式才能操作文本内容，若想从插入模式回到普通模式，可以按下 "),s("code",[t._v("ESC")]),t._v(" 键；")]),t._v(" "),s("li",[s("strong",[t._v("命令模式")]),t._v("：在普通模式下按下 "),s("strong",[t._v(":")]),t._v(" 键（Shift + ：），若想从命令模式回到普通模式，可以按下ESC 键。")])]),t._v(" "),s("h3",{attrs:{id:"命令行模式下的命令介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令行模式下的命令介绍"}},[t._v("#")]),t._v(" 命令行模式下的命令介绍")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("q")]),t._v("：表示退出，若有修改内容按 q，则会提示 "),s("code",[t._v("E37: 已修改但尚未保存 (可用 ! 强制执行)")]),t._v("；")]),t._v(" "),s("li",[s("strong",[t._v("q!")]),t._v("：表示强制退出，不会保存修改的内容；")]),t._v(" "),s("li",[s("strong",[t._v("w")]),t._v("：表示对修改的内容保存；")]),t._v(" "),s("li",[s("strong",[t._v("wq")]),t._v("：表示保存并退出。")])]),t._v(" "),s("h3",{attrs:{id:"使用cat查看文件内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用cat查看文件内容"}},[t._v("#")]),t._v(" 使用cat查看文件内容")]),t._v(" "),s("p",[t._v("很多时候我们不想修改文件，例如查看日志时，只想查看最近50行，那么可以使用如下命令")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" 文件名称 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tail")]),t._v(" -n "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=_.exports}}]);