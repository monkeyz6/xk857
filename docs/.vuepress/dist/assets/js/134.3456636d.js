(window.webpackJsonp=window.webpackJsonp||[]).push([[134],{513:function(t,s,i){"use strict";i.r(s);var n=i(2),e=Object(n.a)({},(function(){var t=this._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[t("p",[this._v("逻辑删除：定义一个字段，0代表删除，1代表正常，后端所有的查询都加上一个该字段等于1的限制条件，前台就看不到删除的数据，但是数据库还存在数据。\n")]),this._v(" "),t("p",[this._v("物理删除：使用delete等语句直接删除。")]),this._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[this._v("核心业务表的数据不建议做物理删除，只做状态变更。比如订单作废、账号禁用、优惠券作废等等。\n既不删除数据，又能缩小数据表体积，可以把记录转移到历史表。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);