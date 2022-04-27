<!--
 * @Author: your name
 * @Date: 2022-04-05 22:22:11
 * @LastEditTime: 2022-04-27 21:30:39
 * @LastEditors: Please set LastEditors
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
whereis nginx 查看nginx的安装的位置 （nginx 默认安装到 /usr/local/nginx目录下）
./nginx   #进入 sbin目录下执行命令 启动nginx cd /usr/local/nginx/sbin
./nginx -s stop # 关闭
./nginx -s quit # 退出
./nginx -s reload # 修改配置文件之后需要重新加载
ps -aux | grep nginx # 查看nginx的进程

service firewalld start  #开启
service firewalld restart #重启
service firewalld stop #关闭
firewall-cmd --list-all #查看防火墙规则
firewall-cmd --query-port=8080/tcp #查询端口是否开放
firewall-cmd --permanent --add-port=80/tcp #开放80端口
firewall-cmd --permanent --remove-port=8080/tcp #移除端口

firewall-cmd --reload #重启防火墙（修改配置后要重启防火墙）