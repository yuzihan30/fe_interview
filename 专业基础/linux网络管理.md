## 配置静态地址

nmcli 命令来配置网卡信息
服务器信息表
名称： Server
root 密码: redhat
IP 地址：192.168.1.10/24
网关地址： 192.168.1.254
DNS 地址： 119.6.6.6

1. mmcli 命令介绍

- centos7 中默认使用 NetworkManager 守护进程来监控和管理网络设置
- nmcli 是命令行管理 NetworkManager 的工具
- nmcli 会自动把配置写到/etc/sysconfig/network-scripts/目录下面
- 在 centos7 中对网络的配置是基于连接会话（connection）的
  一个网卡可以有多个会话，但是同时只允许一个会话出于激活（active）状态

2. nmcli 命令
   nmcli 后两次 tab,看到 device 是与硬件相关的设置，connection 是与逻辑相关的配置
   配置 ip 地址是跟逻辑相关的配置
   nmcli 两次 tab 后的提示信息，add 表示添加一个会话，delete 表示删除一个会话，edit 编辑一个会话，
   show 显示系统当前的会话信息，down 停掉一个会话，modify 修改一个会话，up 启用一个会话
3. nmcli 命令配置网络地址
   nmcli connection add con-name static ifname ens33 type ethernet
   ip4 "192.168.1.10/24" gw4 192.168.1.254 ipv4.method manual ipv4.dns 119.6.6.6
   connection 可简写为 con, con-name 会话名，这里我们是 static
   ifname 接口的名字,这里我们使用 ens33 这张网卡 type 网卡的类型，这里是使用 ethernet 以太网卡,ip4 和 gw4 是 ip 地址和官网地址的配置选项, /24 是网络前缀，在写 ip 地址的时候一定要跟上，否则系统会默认填成/32,那么这个地址就不可用了, ipv4.method 是指的我们当前的会话配置方式,
   这里我们选择的是 manual，是指手动、即静态地址，如果是动态获取可以设置成 auto；ipv4.dns 是指 DNS 的服务器地址

4. 启用会话
   nmcli connection up static

5. 查看配置结果
   nmcli connection show
   static 7aa1d... 802-3-ethernet ens33
   static 会话名，后面跟着是网卡的 uuid 802-3-ethernet 网卡的类型 ens33 网卡的设备名称

6. 实际操作一下
   su root 切换成 root 用户并输入密码
   nmcli connection show 查看一下当前网络会话， virbr0 是 CenOS7 系统自动生成的，因为在安装系统中用到了相关的服务，如果不需要可以把它关掉，这里我们暂时忽略它，现在需要创建我们自己的网卡会话
   nmcli connection add con-name static ifname 两个 tab 键可以看到当前系统识别到的网卡信息有四条 ens33 lo virbr0 virbr0-nic,我们真正的网卡是 ens33,我们这里用 ens33, 接下来网卡的类型
   nmcli connection add con-name static ifname ens33 type 两个 tab 键就可以看到 centos 支持的网卡类型，我们这里用的是以太网选 ethernet,接下来就可以配置 ip 信息了, ip 地址网关地址 dns 地址
   nmcli connection add con-name static ifname ens33 type ethernet ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.254 ipv4.dns
   119.6.6.6
   回车就会有提示配置成功的信息，因为我们配置的是静态地址，因此我们还需要把 static 的配置方式设置成手动
   nmcli connection modify static ipv4.method manual 修改 static 会话要让它是静态配置，要用 ipv4.method 这个选项，静态参数是 manual 回车就好了
   nmcli connection show 查看或者加上会话名查看详细配置信息
7. 小结
   两次 tab 键获得提示
