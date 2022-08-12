(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{498:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("当要更新一条记录的时候，希望这条记录没有被别人更新，此时我们就可以使用乐观锁来进行判断。\n")]),t._v(" "),s("h3",{attrs:{id:"乐观锁实现方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#乐观锁实现方式"}},[t._v("#")]),t._v(" 乐观锁实现方式")]),t._v(" "),s("ul",[s("li",[t._v("取出记录时，获取当前version")]),t._v(" "),s("li",[t._v("更新时，带上这个version")]),t._v(" "),s("li",[t._v("执行更新时， set version = newVersion where version = oldVersion")]),t._v(" "),s("li",[t._v("如果version不对，就更新失败")])]),t._v(" "),s("h3",{attrs:{id:"_1-配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-配置"}},[t._v("#")]),t._v(" 1.配置")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//乐观锁配置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Bean")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("OptimisticLockerInterceptor")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("optimisticLockerInterceptor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("OptimisticLockerInterceptor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-注解实体字段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-注解实体字段"}},[t._v("#")]),t._v(" 2.注解实体字段")]),t._v(" "),s("p",[t._v("需要为实体字段添加"),s("code",[t._v("@Version")]),t._v("注解。")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("为表添加version字段，并且设置初始值为1；")])]),t._v(" "),s("li",[s("p",[t._v("为User实体对象添加version字段，并且添加@Version注解；")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Version")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);