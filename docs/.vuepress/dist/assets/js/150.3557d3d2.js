(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{532:function(t,s,v){"use strict";v.r(s);var c=v(2),_=Object(c.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("UUID是通用唯─识别码的缩写，其目的是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。\n")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("p",[t._v("答：集群环境下（分布式），使用"),s("code",[t._v("UUID")]),t._v("，单机使用自增即可。如果系统可能在未来使用分布式，请直接用UUID。")])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"title"}),s("p",[t._v("问：是不是什么情况下都使用"),s("code",[t._v("UUID")]),t._v("就OK了？")]),t._v(" "),s("p",[t._v("答：不是的。"),s("code",[t._v("UUID")]),t._v("查询速度慢，不是顺序增长，作为主键，数据写入"),s("code",[t._v("IO")]),t._v("随机性很大，且更加占用存储空间。主键自增的"),s("code",[t._v("IO")]),t._v("连续性写入较好，"),s("code",[t._v("MYSQL")]),t._v("检索数字的速度要远大于字符串，占用的存储空间也更小。")])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("p",[t._v("问：分布式情况下一定要使用"),s("code",[t._v("UUID")]),t._v("吗，有没有方法使用主键自增的同时保证集群数据库主键不冲突？")]),t._v(" "),s("p",[t._v("答：使用数据库中间件，例如"),s("code",[t._v("MyCat")]),t._v("能实现分布式环境下的主键自增。")])])])}),[],!1,null,null,null);s.default=_.exports}}]);