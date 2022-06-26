## 查看 centos 版本

1.cat /etc/issue cat /etc/issue 执行这个命令,可以看到。
2.cat /etc/redhat-release cat /etc/redhat-release 因为 CentOS 它是来自于 Red Hat Enterprise Linux 依照开放源代码规定释出的源代码所编译而成。
3.cat /proc/version cat /proc/version 这个命令可以看到 Linux 内核的具体信息, 但是不能看出是 CentOS 的哪个版本。
4.uname -a uname -a 然后我们可以看到。

查看 centos 版本
第一种方式：cat /proc/version
第二种方式：uname -a
第三种方式：uname -r
查看 linux 版本
第一种方式使用这个命令查看 lsb_release -a
第二种方式使用这个命令查看 cat /etc/issue（仅适用于 linux）
第三种方式使用这个命令查看 执行 cat /etc/redhat-release

cat 缩写 concatenate cat 命令可以用来显示、合并文件。

CentOS release 6.6 (Final)

CentOS 发行版 6.6

etc 初期 etc 的英文名字缩写为 etcetera ，后来大家更习惯称为 Editable Text Configuration。ETC 为系统配置文件目录，该目录包含系统启动脚本、启动配置文件、用户登陆配置文件、网络配置文件、httpd 配置文件、IPSec 配置文件和其他文件等。

cat /etc/redhat-release 这条命令管用查看 centos 版本
