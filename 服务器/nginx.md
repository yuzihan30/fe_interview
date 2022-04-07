<!--
 * @Author: your name
 * @Date: 2022-04-05 22:22:11
 * @LastEditTime: 2022-04-05 22:25:42
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