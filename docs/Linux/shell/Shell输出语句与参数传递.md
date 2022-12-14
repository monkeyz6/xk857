---
title: Shell输出语句与参数传递
date: 2021-08-10 15:52
categories:
- Shell脚本
tags:
- Linux
- Shell脚本
---

我们在调用shell脚本时，经常会对其传递参数，我们可以获取到从shell脚本外部传递过去的参数
<!-- more -->
## Shell参数

1. 位置参数：如给一个脚本传递一个参数，我们可以在 Shell 脚本内部获取传入的位置参数，通过 `$1`、`$2`、`$3`这种方式获取，$0是脚本的名称
2. 特殊参数：在 Shell 中也存在特殊含义的参数如下表：

| 变量  | 含义                                            |
|:----|:----------------------------------------------|
| $#  | 传递给脚本或函数的参数个数总和                               |
| $*  | 传递给脚本或函数的所有参数，当被双引号 `" "` 包含时，所有的位置参数被看做一个字符串 |
| $@  | 传递给脚本或函数的所有参数，当被双引号 `" "` 包含时，每个位置参数被看做独立的字符串 |
| $?  | 上个命令的退出状态，或函数的返回值，0 为执行成功，非 0 则为执行失败          |
| $$  | 当前 Shell 进程 ID。对于 Shell 脚本，就是这些脚本所在的进程 ID。    |


## 输出语句
输出语句分为echo和printf两种，还能控制输出文字的颜色与背景色以及识别转义字符等

### 1.echo输出语句使用方式
- 默认输出：`echo 'hello'`
- 不换行输出：`echo -n 'hello'`
- 单引号原样输出：`echo '${str}'`
- 双引号输出变量值：`echo '${str}'`

### 2.echo开启转义识别
- 使用 -e 开启转义，可处理特殊字符，例如`\n`是换行符号：`echo -e 'hello\nshell'`

  | 符号 | 含义                          |
| ---- | ----------------------------- |
  | \n   | 换行符号                      |
  | \t   | 制表符，也就是按我们的 tab 键 |
  | \r   | 回车键                        |
  | \a   | 从系统喇叭送出铃声            |
  | `\\` | 显示反斜线本身                |
  | \f   | FORMFEED，换页字符            |
  | \E   | ESCAPE，跳脱键                |

### 3.输出内容到文件中
- 把字符输入到文件中，如果没有此文件会自动创建：`echo 'hello' > test.sh`，此时如果文件有内容会被替换
- 清空文件内容：`echo > test.sh`


### 4.控制输出文字的颜色与背景色
在 Shell 中我们有时候需要与用户进行交互式操作，如果输出的内容有颜色，对于用户识别更为明显。Shell 中 echo 可以对字体颜色 / 背景 / 显示方式进行控制，如下表：

| 字体颜色          | 字体背景颜色                             | 显示方式     |
|:--------------|:-----------------------------------|:---------|
| 30：黑          | 40：黑                               |          |
| 31：红          | 41：深红                              | 0：终端默认设置 |
| 32：绿          | 42：绿                               | 1：高亮显示   |
| 33：黄          | 43：黄色                              | 4：下划线    |
| 34：蓝色         | 44：蓝色                              | 5：闪烁     |
| 35：紫色         | 45：紫色                              | 7：反白显示   |
| 36：深绿         | 46：深绿                              | 8：隐藏     |
| 37：白色         | 47：白色                              |          |
| 格式：           |                                    |          |
| \033[1;31;40m | # 1 是显示方式，可选。31 是字体颜色。40m 是字体背景颜色。 |          |
| \033[0m       | # 恢复终端默认颜色，即取消颜色设置。                |          |

字体颜色案例

```shell
for i in {30..37};do echo -e "\033[$i;40m hello shell \033[0m";done 
```

背景颜色案例

```shell
for i in {40..47};do echo -e "\033[47;${i}m hello shell \033[0m";done
```

### 5.pritf语句的使用

- 打印普通字符串：`printf 'hello shell'`，如果需要换行，需要手动显式添加 `\n`。

- 格式化字符串，例如 `printf "hello %s\n" shell` 输出`hello shell`

  ```
  %c ASCII字符.显示相对应参数的第一个字符
  %d,%i 十进制整数（常用）
  %e 浮点格式([-d].precisione [+-dd])
  %E 浮点格式([-d].precisionE [+-dd])
  %g %e或%f转换,看哪一个较短,则删除结尾的零
  %G %E或%f转换,看哪一个较短,则删除结尾的零
  %s 字符串（常用）
  %u 不带正负号的十进制值
  %x 不带正负号的十六进制.使用a至f表示10至15
  %% 字面意义的%
  %X 不带正负号的十六进制.使用A至F表示10至15
  ```

- printf中单双引号没有区别

