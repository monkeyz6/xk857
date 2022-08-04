(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{396:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("什么是利用面向切面编程AOP？AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。常见的使用场景是日志记录，性能统计，安全控制，事务处理，异常处理……\n")]),t._v(" "),s("h2",{attrs:{id:"核心概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心概念"}},[t._v("#")]),t._v(" 核心概念")]),t._v(" "),s("p",[t._v("横切关注点：对哪些方法进行拦截，拦截后怎么处理，这些就叫横切关注点。比如 权限认证、日志、事物")]),t._v(" "),s("p",[t._v("通知Advice：在特定的切入点上执行的增强处理，有5种通知。做啥？比如记录日志，控制事务 ，提前编写好通用的模块，需要的地方直接调用")]),t._v(" "),s("p",[t._v("连接点 JointPoint：要用通知的地方，业务流程在运行过程中需要插入切面的具体位置，一般是方法的调用前后，全部方法都可以是连接点，只是概念，没啥特殊的。")]),t._v(" "),s("p",[t._v("切入点 Pointcut：不能全部方法都是连接点，通过特定的规则来筛选连接点, 就是Pointcut，选中那几个你想要的方法。在程序中主要体现为书写切入点表达式（通过通配、正则表达式）过滤出特定的一组JointPoint连接点，过滤出相应的 Advice 将要发生的joinpoint地方。")]),t._v(" "),s("ul",[s("li",[t._v("切面 Aspect：通常是一个类，里面定义 "),s("strong",[t._v("切入点+通知")]),t._v("，定义在什么地方，什么时间点、做什么事情\n"),s("ul",[s("li",[s("strong",[t._v("通知 advice指明了时间和做的事情（前置、后置等）")])]),t._v(" "),s("li",[s("strong",[t._v("切入点 pointcut 指定在什么地方干这个事情")])]),t._v(" "),s("li",[t._v("web接口设计中，web层->网关层->服务层->数据层，每一层之间也是一个切面，对象和对象，方法和方法之间都是一个个切面")])])])]),t._v(" "),s("p",[t._v("目标target：目标类，真正的业务逻辑，可以在目标类不知情的条件下，增加新的功能到目标类的链路上")]),t._v(" "),s("p",[t._v("织入Weaving：把切面（某个类）应用到目标函数的过程称为织入")]),t._v(" "),s("p",[t._v("AOP代理：AOP框架创建的对象，代理就是目标对象的加强，Spring中的AOP代理可以使JDK动态代理，也可以是CGLIB代理")]),t._v(" "),s("h3",{attrs:{id:"通知类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#通知类型"}},[t._v("#")]),t._v(" 通知类型")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("@Before")]),t._v("前置通知：在执行目标方法之前运行")]),t._v(" "),s("li",[s("code",[t._v("@After")]),t._v("后置通知：在目标方法运行结束之后")]),t._v(" "),s("li",[s("code",[t._v("@AfterReturning")]),t._v("返回通知：在目标方法正常返回值后运行")]),t._v(" "),s("li",[s("code",[t._v("@AfterThrowing")]),t._v("异常通知：在目标方法出现异常后运行")]),t._v(" "),s("li",[s("code",[t._v("@Around")]),t._v("环绕通知：在目标方法完成前、后做增强处理 ,环绕通知是最重要的通知类型 ,像事务,日志等都是环绕通知,注意编程中核心是一个"),s("code",[t._v("ProceedingJoinPoint")]),t._v("，需要手动执行"),s("code",[t._v("joinPoint.procced()")])])]),t._v(" "),s("h3",{attrs:{id:"切入点表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#切入点表达式"}},[t._v("#")]),t._v(" 切入点表达式")]),t._v(" "),s("ul",[s("li",[t._v("除了返回类型、方法名和参数外，其它项都是可选的 (修饰符基本都是省略不写)")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("访问修饰符       返回值类型（必填）     包和类       方法（必填）\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Pointcut")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"execution(public int net.xdclass.sp.service.VideoOrderService.*(..))"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h4",{attrs:{id:"常见匹配语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见匹配语法"}},[t._v("#")]),t._v(" 常见匹配语法")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("*：匹配任何数量字符，单个；")])]),t._v(" "),s("li",[s("p",[t._v("..：匹配任何数量字符，可以多个，在类型模式中匹配任何数量子包；在方法参数模式中匹配任何数量参数")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("() 匹配一个不接受任何参数的方法\n(..) 匹配一个接受任意数量参数的方法\n(*) 匹配了一个接受一个任何类型的参数的方法\n(*,Integer) 匹配了一个接受两个参数的方法，其中第一个参数是任意类型，第二个参数必须是Integer类型\n")])])])]),t._v(" "),s("li",[s("p",[t._v("常见例子")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("任意公共方法")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("execution（public * *（..））\n")])])])]),t._v(" "),s("li",[s("p",[t._v("任何一个名字以“save”开始的方法")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("execution（* save*（..））\n")])])])]),t._v(" "),s("li",[s("p",[t._v("VideoService接口定义的任意方法（识别）")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("execution（* net.xdclass.service.VideoService.*（..））\n")])])])]),t._v(" "),s("li",[s("p",[t._v("在service包中定义的任意方法（识别）")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("execution（* net.xdclass.service.*.*（..））\n")])])])]),t._v(" "),s("li",[s("p",[t._v("匹配 service 包,子孙包下所有类的所有方法（识别）")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("execution（* net.xdclass.service..*.*（..））\n")])])])])])])]),t._v(" "),s("h3",{attrs:{id:"aop注解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aop注解"}},[t._v("#")]),t._v(" AOP注解")]),t._v(" "),s("p",[t._v("步骤：")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("开启SpringAOP注解配置")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Configuration")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@ComponentScan")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"net.xdclass"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@EnableAspectJAutoProxy")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//开启了spring对aspect的支持")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AnnotationAppConfig")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("配置切入点和通知")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Component")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Aspect")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//告诉spring，这个一个切面类，里面可以定义切入点和通知")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("LogAdvice")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//切入点表达式")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Pointcut")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"execution(* net.xdclass.sp.service.VideoServiceImpl.*(..))"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("aspect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//前置通知")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Before")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"aspect()"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beforeLog")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JoinPoint")]),t._v(" joinPoint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LogAdvice  beforeLog"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//后置通知")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@After")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"aspect()"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("afterLog")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JoinPoint")]),t._v(" joinPoint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"LogAdvice  afterLog"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"propertysource注解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#propertysource注解"}},[t._v("#")]),t._v(" PropertySource注解")]),t._v(" "),s("ul",[s("li",[t._v("PropertySource，指定加载配置文件\n"),s("ul",[s("li",[t._v("配置文件映射到实体类")])])]),t._v(" "),s("li",[t._v("使用@Value映射到具体的java属性")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Configuration")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@PropertySource")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"classpath:config.properties"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CustomConfig")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${server.host}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" host"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${server.port}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getHost")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" host"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setHost")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" host"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("host "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" host"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPort")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPort")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("port "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"开启事务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开启事务"}},[t._v("#")]),t._v(" 开启事务")]),t._v(" "),s("ol",[s("li",[t._v("在入口类使用注解@EnableTransactionManagement开启事务")]),t._v(" "),s("li",[t._v("类或方法上加@Transactional")])])])}),[],!1,null,null,null);s.default=e.exports}}]);