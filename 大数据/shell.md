## 概述

- 课程内容
  概述、解析器、脚本入门、变量、运算符、条件判断、流程控制、read 读取控制台输入、函数、shell 工具（重点，cut、sed、awk、sort）、面试题
- 为何学 shell?
  看懂运维人员写的 shell 程序
  编写 shell 管理集群，提高开发效率
- 外层应用程序-shell(cd、ls...)-操作内核-驱动硬件
  shell 是一个命令解释器，接收应用程序或者用户命令，然后调用操作系统内核
  shell 还是一个功能相当强大的编程语言，易编写、易调试、灵活性强; python 在可读性和编写上要强大很多，结合了 shell 的优点避开了 shell 的缺点

## shell 解析器

sudo cat /etc/shells, tab 一下是补全命令，tab 两下查看命令
/bin/sh /bin/bash /sbin/nologin /bin/dash /bin/tcsh /bin/csh
6 种 shell 解析器， 常用前两种，位于系统 bin 目录
cd /bin -> ll | grep shell 可以看出来 sh 最终调用的还是 bash
查看系统默认解析器： echo $SHELL->/bin/shell

## shell 脚本入门

- 脚本格式
  脚本以#！/bin/bash 开头（/bin/bash 就是指定的解析器），写#！/bin/sh 也是一样的，#在这里不是注释，而是个命令
- shell 脚本示例
  echo "helloworld"
  把它放到脚本里， cd 默认切换到家目录， mkdir datas, cd datas
  touch helloworld.sh 创建 shell 文件，写上.sh 更语义化
  vim helloworld.sh 编辑 helloworld.sh

  ```shell
  #!/bin/bash

  echo "hello shell"
  ```

  执行脚本：sh helloworld.sh 或者 bash helloworld.sh 也可以
  ./helloworld.sh 执行的时候提示权限不够， 之前是 shell 解析器帮你执行
  而./helloworld.sh 是自己调用执行，需要自己有执行权限
  chmod 777 helloworld.sh, ./相对路径这种方式以后用的多

- 多命令处理案例
  来到某个目录创建文本文件，在文本文件中增加"like shell"
  touch batch.sh -> vim batch.sh

```shell
#!/bin/bash

cd /home/yu/
touch bigdata.txt
echo "I love big data" >> bigdata.txt
```

ll 查看有无执行权限，没有执行权限则执行 bash batch.sh
执行完后查看 cat bigdata.txt

## 变量

系统变量和自定义变量

1. 系统变量

- 常用系统变量
  $HOME、$PWD、$SHELL、$USER， 方便写脚本的时候快速获取想要的东西
  echo $HOME 得到家目录
  echo $PWD 得到当前目录
  echo $SHELL 得到当前解析器
  echo $USER 得到当前用户

2. 自定义变量
   不用生命，直接定义一个变量赋值就行:变量=值
   num=1 // 等号左右不能有空格，后面还有一些地方要求必须有空格
   echo $num
   撤销变量: unset num 查看 echo $num 就变成空了
   生命静态变量，英文翻译就是只读 readonly
   readonly sum=6, echo $sum, unset sum 取消(会提示只读变量不能取消)，虚拟机重新启动就能取消了

- 变量定义规则
  字母数字下划线组成，不能以数字开头，环境变量名建议大写
  变量默认都是字符串类型，无法直接进行数值运算
  sum=1+1 echo $sum 得到 1+1
  变量的值如果有空格，需要用双引号或者单引号括起来
  可以把变量提升为全局环境变量，供其他 shell 使用
  vim helloworld.sh 修改编辑 helloworld.sh

  ```shell
  #!/bin/bash

  echo "hello shell"

  echo $sum
  ```

  执行./helloworld.sh 却打印不出来 1+1， $sum 在这个文件里，而当前定义的 sum 是在控制台上，二者不在一个进程里面，属于定义的局部变量，如果控制台上 export sum,相当于晋升为全局变量，然后再执行./helloworld.sh 就能打印出来 1+1
  各种 home 变量，kafka_home、hadoop_home 都需要是全局有效的

3. 特殊变量
   linux 系统给提供的几个特殊变量$n、$#、$*、$@、$?

- $n
n为数字，$0代表该脚本名称，$1-$9代表第一到第九个参数，十以上的参数是采用大括号的方式${10}，一般情况下脚本要求的输入不能超过 10 个，超过 5 个参数就不太合适
  touch parameter.sh
  vim parameter.sh

```shell
#!/bin/bash
echo "$0 $1 $2"

```

bash parameter.sh 或者
chmod 777 parameter.sh

bash parameter.sh aaa 输出 parameter.sh aaa

- $#获取所有输入参数的个数，常用于循环

```shell
#!/bin/bash
echo "$0 $1 $2"

echo $#

```

测试 bash parameter.sh aa bb cc 就会得到 3

- $*、$@
  $*代表命令行中所有参数，把所有参数看成一个整体
$@代表命令行中所有参数，不过$@把每个参数区分对待

```shell
#!/bin/bash
echo "$0 $1 $2"

echo $#
echo $*
echo $@

```

测试 bash parameter.sh aa bb cc 二者都输出 aa bb cc

- $?
  判断上一条命令是否正确执行
  最后一次执行的命令的返回状态，如果这个变量值为 0，证明上一个命令正确执行，
  非 0（具体哪个数，由命令自己来决定），则证明上一个命令执行不正确了
  测试：先执行 ./helloworld.sh 然后执行 echo $?得到 0

## 运算符

如何进行加减乘除的运算
`$((运算表达式))或者$[运算表达式]`
或者 `expr +,-,\*,/,% 加减乘（乘是斜杠*）除取余`
expr 运算符间要有空格

expr 3+2 输出 3+2； expr 3 +2 语法错误； expr 3 + 2 得到 5
（2+3）\*4

```shell
expr `expr 2 + 3` \* 4

```

`s=$[(2+3)*4] 然后 echo s 结果一样` 运算符两边空格可有可无

## 条件判断

> [ condition ] condition 的前后都要有空格，条件非空即为 true
> []返回 false

1. 常用判断条件

- = 等号是字符串的比较
- 整数比较
  -lt 小于 （less than） -le 小于等于（less equal）-eq 等于(equal) -gt
  大于（greater than）-ge 大于等于（greater equal）-ne 不等于（Not equal）
- 按照文件权限进行判断
  -r 有读的权限（read） -w 有写的权限（write） -x 有执行的权限（execute）
- 按照文件类型进行判断
  -f 文件存在并且是一个常规的文件(file) -e 文件存在（existence）-d 文件存在并是一个目录

2. 使用示例

- [ 20 -ge 10 ] 然后 echo $?返回 0 说明上条指令正确执行了
   [ 20 -le 10 ] 然后 echo $?返回 1 错的就不等于0了，其实$?使用解释可以修正一下
  $?代表上条指令返回 true, 返回非 0 即为 false
- [ -w parameter.sh ]判断文件是否有写权限， echo $?得到 0
- 判断目录中文件是否存在
  [ -e /home/yu/aaa.txt ] echo $?返回 1 说明文件不存在，存在的话$?结果是 0
- 多条件判断
  逻辑与&&，前面一个条件是错的，后面的不会再看了；前面如果成功，后面继续执行判断
  逻辑或||,前面一个如果失败，后面一个必须判断；前面如果成功，后面就不看了
  [ condition ]非空即为 true
  [ condition ] && echo OK || echo notok

## 流程控制

1. if 判断

- 条件判断表达式两边必须有空格， if 后面也需要空格

```shell
if [ 条件判断表达式 ];then
    程序
fi
```

或者

```shell
if [ 条件判断表达式 ]
    then
        程序
fi
```

- 实例
  touch if.sh
  vim if.sh

```shell
#!/bin/bash
# if [ $1 -eq 1 ];then
if [ $1 -eq 1 ]
then
        echo "aaa"
elif [ $1 -eq 2 ]
then
        echo "bbb"
fi
```

bash if.sh // 没有写参数，也没有对参数进行合法性检查
bash if.sh 1 // aaa
bash if.sh 2 // bbb
bash if.sh 3 //

2. case 语句

- 语法

```shell
case $变量名 in
    "值1"）
        如果变量值为1则执行
        ；；
    ...
    *)
        上面都不是
        ;;
esac
```

- 示例
  touch case.sh
  vim case.sh

```shell
#!/bin/bash
case $1 in
1)
    echo "aaa"
;;
2)
    echo "bbb"
;;
*)
    echo "ccc"
esac
```

sh case.sh 1 // aaa

3. for 循环

- 语法

```
for(( 初始值；循环控制条件；变量变化 ))
    do
        程序
    done
```

- 示例
  touch for.sh
  vim for.sh

```shell
#!/bin/bash
s=0
for((i=1;i<=100;i++)) // i不需要定义
do
    s=$[$s+$i]// 不支持s+=
done
echo $s
```

bash for.sh // 5050

- for 循环的另一种语法
  顺便使用一下`$*、$@`

```shell
for 变量 in 值1 值2 值3
    do
        程序
    done
```

touch for2.sh
vim for2.sh

```shell
#!/bin/bash
for i in $*
do
    echo "para is $i"
done

for j in $@
do
    echo "para is $j"
done
```

bash for2.sh aa bb cc // 输出没区别
引号引起来变成一个整体

```shell
#!/bin/bash
for i in "$*"
do
    echo "para is $i"
done

for j in "$@"
do
    echo "para is $j"
done
```

bash for2.sh aa bb cc
`"$*"` 整体一次会把所有参数输出,代表循环了一次 para is aa bb cc
`"$@"` 输入多少参数还是会循环多少次

4. while 循环

```shell
while [ 条件表达式 ]
    do
        程序
    done

```

touch while.sh
vim while.sh

```shell
#!/bin/bash
# 变量的值小于100, 变量的值$i，取值的话需要先定义

i=1
s=0
while [ $i -le 100 ]
do
    s=$[$s + $i]
    i=$[$i + 1]
done
echo $s
```

bash while.sh

## read 读取控制台输入

主要用于后面自定义函数的时候用到的一些命令
read(选项)（参数）
选项：-p 指定读取时的提示符；-t 指定读取时等待的时间（秒）
参数：变量指定读取值的变量名

touch read.sh
vim read.sh

```shell
#!/bin/bash
read -t 5 -p "Enter your name in 5 s" name
echo $name
```

`$name` 也可以作为后续函数的参数

## 函数

1. 系统函数

- basename 基本名称
  basename[string/pathname][suffix] 中括号可选项，可有可无
  string/pathname 字符或者路径名称， suffix 后缀，basename 命令会删掉所有的前缀
  包括最后一个（'/'）字符，然后将字符串显示出来
  选项 suffix, basename 会讲 pathname 或者 string 中的 suffix 去掉

```shell
basename /home/yu/parameter.sh
# 结果得到parameter.sh
basename /home/yu/parameter.sh .sh
# 结果得到parameter
```

- dirname 目录名称
  dirname 文件绝对路径
  功能：从给定的包含绝对路径的文件名中去除文件名（非目录部分），然后返回剩下的路径（目录部分）

```shell
dirname /home/yu/parameter.sh
# 结果 /home/yu
```

2. 自定义函数
   中括号括的都是可选项, 一般写上去可读性会好一些
   一般不会采用 return int 这种方式，会使用`$?`的方式

```shell
[ function ] funname[()]
{
    Action;
    [return int;]
}
funname
```

必须在调用函数地址之前先声明函数，shell 脚本是逐行执行，不像其他有的语言会先编译
函数返回值只能通过`$?`系统变量获得，可以显式的加 return 返回，
如果不加 return 将以最后一条命令运行结果作为返回值，return 后跟数值 n(0-255)

- 示例
  touch sum.sh
  vim sum.sh

```shell
#!/bin/bash
function sum()
{
    s=0
    s=$[$1+$2]
    echo $s
}
read -p "input your parameter1:" p1
read -p "input your parameter2:" p2

sum $p1 $p2
```

bash sum.sh

## shell 工具

只列举常用工具和参数，更多内容可以查看相关的 shell 手册

1. cut
   在文件中负责剪数据的，从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出
   cut [选项参数] filename
   -f 列号，提取第几列；-d 分隔符，默认是制表符，空格、冒号、分号
   touch cut.txt
   vim cut.txt
   第一行 1 个空格，二三行两个空格

```
aa aaa
bb  bbb
cc  ccc
```

- 切割第一列
  cut -d " " -f 1 cut.txt
  输出
  aa
  bb
  cc
- 切割第二、三列
  cut -d " " -f 2,3 cut.txt
- 切割出 aa
  cat cut.txt | grep aa // aa aaa 过滤出 aa 开头的行
  cat cut.txt | grep aa | cut -d " " -f 1 // aa
- 选取系统 PATH 变量值，第 2 个":"开始后的所有路径
  echo $PATH | cut -d : -f 3- // 3 后不加横杠表示第三列，加横杠表示第三列后所有的
  并没有改变原文件
- 切割 ifconfig 后打印的 IP 地址
  应用场景，切割日志文件，有一列有 ip，将该 ip 地址的访问日志切出来
  ifconfig eth0 | grep "inet addr" // 过滤出一行
  ifconfig eth0 | grep "inet addr" | cut -d : -f 2 | cut -d " " -f 1

2. sed
   sed 是一种流编辑器，一次处理一行内容，处理时将当前处理的行存储在临时缓冲区中，称为“模式空间”
   接着用 sed 处理缓冲区的内容，处理完后将缓冲区的内容发往屏幕，接着处理下一行，不断重复，
   直到文件末尾，文件内容并没有改变，除非使用重定向存储输出
   sed [选项参数] ‘command’ filename
   选项参数-e，直接在指令列模式上进行 sed 的动作编辑, 只执行一条命令的时候不需要
   命令 a, 新增，a 的后面可以接字符串，在下一行出现
   命令 d, 删除; s, 查找并替换

- 示例
  touch sed.txt
  vim sed.txt

```
aa aaa
bb  bbb
cc  ccc
```

将"BB BBB"插入到 sed.txt 第二行下
sed "2a BB BBB" sed.txt // a 是增加，第二行是 2a, 原文件并不会改变
删除 sed.txt 中有 cc 的行
`sed "/BB/d" sed.txt`
将 sed.txt 中 aa 替换为 AA
`sed "s/aa/AA/g" sed.txt` // 加 g 是全局替换
将第二行删除，并将 cc 替换为 CC
`sed -e "2d" -e "s/cc/CC/g" sed.txt`

3. awk
   强大的文本分析工具，把文件逐行读入，以空格为分割符将每行切片，切开的部分再进行分析处理
   `awk [选项参数] 'pattern1{action} pattern2{action2}...' filename`
   pattern 表示 AWK 在数据中查找的内容，就是匹配模式,就是正则匹配
   action 在找到匹配内容时所执行的一系列命令，主要是 print 打印操作
   选项：-F 指定输入文件的分割符，就是用什么来切；-v 赋值一个用户定义变量 比如-v a=1

示例
`sudo cp /etc/passwd ./`

- 输出 passwd 文件以 root 关键字开头的所有行，并输出该行的第七列

  > 把切换用户的命令为 su username，接着从普通用户切换到 root 用户，还可以使用命令 sudo su，最后在终端输入 exit 或 logout 或使用快捷方式 ctrl 加 d，可以退回到原来用户; root 设置用户密码，passwd 用户， 查看密码状态，passwd -S 用户
  > 改变文件的所有者和所属组，sudo chown yu:yu passwd
  > `awk -F : '/^root/ {print $7}' passwd`

- 搜索 passwd 文件以 root 关键字开头的所有行，并输出该行的第一列和第七列，中间以逗号分割
  `awk -F : '/^root/ {print $1","$7}' passwd`
- 只显示/etc/passwd 的第一列和第七列，以逗号分割，且在所有行前面添加列名 user、shell,在最后一行添加“yu, /bin/yuyu”
  `awk -F : 'BEGIN{print "user,shell"} {print $1","$7} END{print "yu, /bin/yuyu"}' passwd` // 第二个 action 没有正则条件
- 将 passwd 文件中的用户 id 增加数值 1 并输出
  `awk -F : -v i=1 '{print $3+i}' passwd` // 这个地方比较特殊用 i 而不是$i

内置变量
FILENAME 文件名; NR 已读记录数; NF 浏览记录的域的个数（切割后，列的个数）

- 统计 passwd 文件名，每行的行号，每列的列数
  `awk -F : '{print FILENAME "," NR "," NF}' passwd`
- 切割 IP
  `ifconfig eth0 | grep "inet addr" | awk -F : '{print $2}' | awk -F " " '{print $1}'`
- 查询 sed.txt 中空行所在的行号
  `awk '/^$/{print NR}' sed.txt`

4. sort
   对文件进行排序，并将排序结果标准输出，比如统计本月销售最多的商品
   sort(选项)（参数）
   选项：-n 依照数值的大小排序， -r 以相反的顺序排序，-t 设置排序的分割字符，-k 指定需要排序的列
   `sort -t : -nrk 2 sort.sh`
