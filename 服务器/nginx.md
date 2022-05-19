<!--
 * @Author: your name
 * @Date: 2022-04-05 22:22:11
 * @LastEditTime: 2022-05-19 19:05:16
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/服务器/nginx.md
-->
1. 正向代理客户端，反向代理服务器端
nginx反向代理配置示例：
server {
    listen: 80;
    server_name: hao123.com

    location / {
        proxy_pass: 127.0.0.1:8080;
        index index.html index.htm index.jsp
    }
}

2. nginx常用命令
nginx -v 查看版本号
whereis nginx 查看nginx的安装的位置 （nginx 默认安装到 /usr/local/nginx目录下）
./nginx   #进入 sbin目录下执行命令 启动nginx cd /usr/local/nginx/sbin
./nginx -s stop # 关闭
./nginx -s quit # 退出
./nginx -s reload # 修改配置文件之后需要重新加载
ps -aux | grep nginx # 查看nginx的进程
ps -elf | grep nginx # 查看nginx的进程
root      1042  0.0  0.1 105500  1976 ?        Ss   17:17   0:00 nginx: master process /usr/sbin/nginx
nginx     1047  0.0  0.1 105968  3364 ?        S    17:17   0:00 nginx: worker process
root      2085  0.0  0.0 112828   988 pts/0    R+   17:29   0:00 grep --color=auto nginx // 这条属于执行查看nginx的进程命令产生的进程
默认使用nginx.conf配置只会显示两个进程，一个master进程，一个worker进程，这两个nginx进程都有各自的作用，
"worker"进程天生就是来"干活"的，真正负责处理请求的进程就是你看到的"worker"进程
“master"进程其实是负责管理"worker"进程的，除了管理” worker"进程，master"进程还负责读取配置文件、判断配置文件语法的工作，“master进程"也叫"主进程”，在nginx中，"master"进程只能有一个,而"worker"进程可以有多个，worker"进程的数量可以由管理员自己进行定义

service firewalld start  #开启
service firewalld restart #重启
service firewalld stop #关闭
firewall-cmd --list-all #查看防火墙规则
firewall-cmd --query-port=8080/tcp #查询端口是否开放
firewall-cmd --permanent --add-port=80/tcp #开放80端口
firewall-cmd --permanent --remove-port=8080/tcp #移除端口

firewall-cmd --reload #重启防火墙（修改配置后要重启防火墙）

3. nginx卸载
3.1 检查nginx服务是否运行，如果正在运行则关闭服务。
ps -ef|grep nginx
/usr/local/nginx/sbin/nginx -s stop
3.2 查找并删除nginx相关文件。
whereis nginx 
find / -name nginx 
rm -rf /usr/local/nginx
3.3 卸载nginx依赖。
yum remove nginx
至此，nginx就卸载干净了，就可以重装其他版本nginx服务了
