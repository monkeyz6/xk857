(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{433:function(v,_,e){"use strict";e.r(_);var i=e(2),l=Object(i.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("汇总消息队列的常见概念、基础编程模型以及RocketMQ的特点和概念等，在学习前可以有个简要了解，学习后可以加深理解。\n")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("常见概念")]),v._v(" "),_("ul",[_("li",[v._v("JMS提供者：连接面向消息中间件的，JMS接口的一个实现，RocketMQ,ActiveMQ,Kafka等等")]),v._v(" "),_("li",[v._v("JMS生产者(Message Producer)：生产消息的服务")]),v._v(" "),_("li",[v._v("JMS消费者(Message Consumer)：消费消息的服务")]),v._v(" "),_("li",[v._v("JMS消息：数据对象")]),v._v(" "),_("li",[v._v("JMS队列：存储待消费消息的区域")]),v._v(" "),_("li",[v._v("JMS主题：一种支持发送消息给多个订阅者的机制")]),v._v(" "),_("li",[v._v("JMS消息通常有两种类型：点对点（Point-to-Point)、发布/订阅（Publish/Subscribe）")])])]),v._v(" "),_("li",[_("p",[v._v("基础编程模型")]),v._v(" "),_("ul",[_("li",[v._v("MQ中需要用的一些类")]),v._v(" "),_("li",[v._v("ConnectionFactory ：连接工厂，JMS 用它创建连接")]),v._v(" "),_("li",[v._v("Connection ：JMS 客户端到JMS Provider 的连接")]),v._v(" "),_("li",[v._v("Session： 一个发送或接收消息的线程")]),v._v(" "),_("li",[v._v("Destination ：消息的目的地;消息发送给谁.")]),v._v(" "),_("li",[v._v("MessageConsumer / MessageProducer： 消息消费者，消息生产者")])])])]),v._v(" "),_("h2",{attrs:{id:"rocketmq概述"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#rocketmq概述"}},[v._v("#")]),v._v(" RocketMQ概述")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("特点")]),v._v(" "),_("ul",[_("li",[v._v("支持Broker和Consumer端消息过滤")]),v._v(" "),_("li",[v._v("支持发布订阅模型，和点对点，")]),v._v(" "),_("li",[v._v("支持拉pull和推push两种消息模式")]),v._v(" "),_("li",[v._v("单一队列百万消息、亿级消息堆积")]),v._v(" "),_("li",[v._v("支持单master节点，多master节点，多master多slave节点")]),v._v(" "),_("li",[v._v("任意一点都是高可用，水平拓展，Producer、Consumer、队列都可以分布式")]),v._v(" "),_("li",[v._v("消息失败重试机制、支持特定level的定时消息")]),v._v(" "),_("li",[v._v("新版本底层采用Netty")]),v._v(" "),_("li",[v._v("4.3.x支持分布式事务")]),v._v(" "),_("li",[v._v("适合金融类业务，高可用性跟踪和审计功能。")])])]),v._v(" "),_("li",[_("p",[v._v("概念")]),v._v(" "),_("ul",[_("li",[v._v("Producer:消息生产者")]),v._v(" "),_("li",[v._v("Producer Group:消息生产者组，发送同类消息的一个消息生产组")]),v._v(" "),_("li",[v._v("Consumer:消费者")]),v._v(" "),_("li",[v._v("Consumer Group:消费同类消息的多个实例")]),v._v(" "),_("li",[v._v("Tag:标签，子主题（二级分类）对topic的进一步细化,用于区分同一个主题下的不同业务的消息")]),v._v(" "),_("li",[v._v("Topic:主题, 如订单类消息，queue是消息的物理管理单位，而topic是逻辑管理单位。一个topic下可以有多个queue，\n默认自动创建是4个，手动创建是8个")]),v._v(" "),_("li",[v._v("Message：消息,每个message必须指定一个topic")]),v._v(" "),_("li",[v._v("Broker：MQ程序，接收生产的消息，提供给消费者消费的程序")]),v._v(" "),_("li",[v._v("Name Server：给生产和消费者提供路由信息，提供轻量级的服务发现、路由、元数据信息，可以多个部署，互相独立（比zookeeper更轻量）")]),v._v(" "),_("li",[v._v("Offset: 偏移量，可以理解为消息进度")]),v._v(" "),_("li",[v._v("commit log: 消息存储会写在Commit log文件里面")])])])])])}),[],!1,null,null,null);_.default=l.exports}}]);