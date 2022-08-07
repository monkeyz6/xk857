---
title: MybatisPlus之代码生成器
date: 2021-06-02 17:43
categories:
- java
- MybatisPlus
- SpringBoot
tags:
- MybatisPlus
- java
- SpringBoot
---

这是个好东西，mp自带的代码生成器，只能生成基本的模板代码，没有实现增删改查接口，如果需要可以自己编写模板。
<!-- more -->

## 依赖导入
在你的项目下新建一个 generator 模块，maven依赖如下，注意不需要耦合父工程。
```xml
<dependencies>
    <!-- 代码生成器核心依赖 -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
        <version>3.4.1</version>
    </dependency>
    <dependency>
        <groupId>org.freemarker</groupId>
        <artifactId>freemarker</artifactId>
    </dependency>
</dependencies>
```

## 代码生成器代码
配置好你的数据库名称、地址、密码、还有你要生成的模块名称后，控制台输入要生成的表明，点击回车就生成啦。

```java 
package generator;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import org.apache.commons.lang3.StringUtils;

import java.util.Scanner;

/**
 * 执行 main 方法控制台输入模块表名回车自动生成对应项目目录中
 */
public class CodeGenerator {

    /**
     * 生成的代码放到哪个工程中
     */
    public static final String PROJECT_NAME = "card-core";

    /**
     * 数据库名称
     */
    public static final String DATABASE_NAME = "qq-card";

    /**
     * 子包名
     */
    public static final String MODULE_NAME = "word";

    /**
     * 去掉表前缀
     */
    public static final String REMOVE_TABLE_PREFIX = "tb_";

    /**
     * ip地址
     */
    public static final String MY_IP = "localhost";

    /**
     * 端口号
     */
    public static final String MY_PORT = "3306";

    /**
     * 账号
     */
    public static final String MY_USERNAME = "root";

    /**
     * 密码
     */
    public static final String MY_PASSWORD = "root";

    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://"+MY_IP+":"+MY_PORT+"/"+ DATABASE_NAME +"?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername(MY_USERNAME);
        dsc.setPassword(MY_PASSWORD);
        mpg.setDataSource(dsc);

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir") + "/";
        gc.setOutputDir(projectPath + PROJECT_NAME +"/src/main/java");
        // 分布式id
        gc.setIdType(IdType.ASSIGN_ID);
        gc.setAuthor("cv大魔王");
        //覆盖现有的
        gc.setFileOverride(true);
        //是否生成后打开
        gc.setOpen(false);
        gc.setDateType(DateType.ONLY_DATE);
        //实体属性 Swagger2 注解
        gc.setSwagger2(true);
        mpg.setGlobalConfig(gc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        //父包名
        pc.setParent("com.card");
        // com.card.aritcle.controller
        pc.setController(MODULE_NAME+".controller");
        pc.setService(MODULE_NAME+".service");
        pc.setServiceImpl(MODULE_NAME+".service.impl");
        pc.setMapper(MODULE_NAME+".mapper");
        pc.setXml(MODULE_NAME+".mapper.xml");
        //实体类存储包名 com.card.modules.system.entities
        pc.setEntity(MODULE_NAME+".entities");
        mpg.setPackageInfo(pc);


        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        //使用lombok
        strategy.setEntityLombokModel(true);
        // 实体类的实现接口Serializable
        strategy.setEntitySerialVersionUID(true);
        // @RestController
        strategy.setRestControllerStyle(true);
        strategy.setInclude(scanner("表名，多个英文逗号分割").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        // 去掉表前缀
        strategy.setTablePrefix(REMOVE_TABLE_PREFIX);
        mpg.setStrategy(strategy);

        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }


    /**
     *
     * 读取控制台内容
     *
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入").append(tip).append("：");
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotBlank(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

}
```
