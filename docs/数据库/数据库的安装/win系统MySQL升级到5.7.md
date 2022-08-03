---
title: MySQL5.5升级到MySQL5.7
date: 2021-08-03 18:14
categories:
- MySQL
tags:
- MySQL
---

MySQL5.7是一个非常重要的版本，有很多数据类型是5.7才开始支持的，例如Json格式、datetime类型等等，这些常用的数据类型导致了我们MySQL版本最低都必须为5.7
<!-- more -->

### 卸载MYSQL5.5

1. 服务中，关闭`MYSQL`服务，点击属性，查看mysql安装的位置，先记录，后面用
2. 控制面板里的增加删除程序内进行删除
3. `win+r`-> `regedit` 看看注册表里这几个地方删除没有，我的只找到了第一个，都不要紧的，有就删除，没有就算了
    ::: danger
    - HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\Eventlog\Application\MySQL 
    - HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\Eventlog\Application\MySQL 
    - HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Eventlog\Application\MySQL
    :::
4. 找到 `mysql` 安装的位置，将整个 `mysql`目录删除
5. 这一条是很关键的 `C:\Documents and Settings\All Users\Application Data\MySQL` 这里还有MySQL的文件，必须要删除   　

### 下载MySQL5.7

官网下载：[点击跳转](https://dev.mysql.com/downloads/mysql/)
直接下载：[点击下载](https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.35-winx64.zip)

### 安装MySQL5.7

1. 解压

2. 设置环境变量

3. 新建环境变量

   ![image-20210723133408249](https://img-blog.csdnimg.cn/img_convert/1c5453a938f41dd42caa6dbb0b995c5d.png)

4. 加入到path

   ![image-20210723133438439](https://img-blog.csdnimg.cn/img_convert/da13ac7ed33693fcf2b833a1115e5fcb.png)

5. 根目录下新建 `my.ini`（`mysql-5.7.35-winx64`目录下新建）

   ```ini
   [mysqld]
   port = 3306
   basedir=D:\mysql\mysql-5.7.35-winx64
   datadir=D:\mysql\mysql-5.7.35-winx64/data
   max_connections=150
   character-set-server=utf8
   default-storage-engine=INNODB
   sql_mode=STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION
   event_scheduler=ON
   [mysql]
   ```

6. 使用**管理员**权限打开`cmd`窗口，注意一定要是管理员权限，依次输入如下命令

   ```sql
   mysqld -install
   mysqld --initialize-insecure --user=mysql
   net start mysql
   ```

## 设置密码

此时密码为空，使用navicat设置新密码，navicat为空即可登录数据库

![image-20210723133927643](https://img-blog.csdnimg.cn/img_convert/db9590868c3bcfb257514c4ccee4f2ce.png)
![image-20210723134002458](https://img-blog.csdnimg.cn/img_convert/de17c3924cd0a27ac4085ecaf8d465c1.png)
