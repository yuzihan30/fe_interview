<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-14 16:59:40
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-06-10 13:27:42
 * @FilePath: /fe_interview/工具/mac.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

1. mac 中查找某个文件
   which 命令只是根据 PATH 环境变量查找。
   whereis 命令只是根据标准可执行文件路径进行查找。
   如果要找的不是可执行文件，而且想在整个系统上找，怎么办？
   find / -name xxx
   但这样速度太慢，因为它会遍历整个文件系统上的每个文件进行匹配
   mac 下，有个 locate 命令，它自动建立和维护文件的索引，所以找起来非常快
   mdfind 命令也很好用
   mdfind -name xxx
   不同命令对应不同应用场景，可以多试试，多测测

2. mac M1 芯片就是 arm64 架构

## ISP

Mac 电脑关闭 SIP 系统完整性保护详细教程
如果你也经常遇到"xxx 已损坏，无法打开，你应该将它移到废纸篓解决办法", "打不开 xxx，因为它来自身份不明的开发者", "打不开 xxxx，因为 Apple 无法检查其是否包含恶意软件"。多数可以通过下面的教程关闭 SIP 来解决，但是非常不推荐这种做法，后面会解释原因。
下面这些类似的问题都可以在这篇文章中找到答案。
关闭 SIP 有什么影响？
M1 如何关闭 SIP？
Monterey 上如何关闭 SIP？
什么是 SIP？
苹果的官方解释，System Integrity Protection 翻译过来就是系统完整性保护，这是 macOS 的一项安全技术，防止潜在的恶意软件修改 Mac 上受保护的资源，比如文件或者文件夹等。甚至是 root 用户，也受到这个限制。类似像是系统提供的终极底层安全保护，所以这个除非必要不要随便关闭。虽然很多盗版软件，破解包都需要关闭这个才能运行，但是这个其实是非常危险的行为。除非必要，真的不要做这个动作。
关闭 SIP 后，很多盗版程序是可以运行了，但是 Mac 系统本身也就不会去检查签名/公正，如果这个程序有恶意代码，他可以操作你机器上的任何文件，而且不需要你的任何授权。
强烈推荐下载正版软件，保护自己，不需要关闭任何安全选项。
针对安全问题再多讲几句，Mac 系统的安全设计很好，如果想要最安全的应用，一定要从 Mac AppStore 下载，因为商店里的应用不仅受到 SIP 的安全限制，还有一个沙盒安全机制，更加严格的管理应用的权限，一旦这个应用有问题，苹果直接吊销证书，封杀。
当然我明白国内目前的生态，正版意识还没有那么强，如果你用盗版，就一定要确保下载来源吧，虽然大部分来源都无法保证安全。
如何关掉 SIP
检查 SIP 状态
在 sip 系统完整性关闭前，我们先检查是否启用了 SIP 系统完整性保护。
打开终端输入以下命令并回车(可以通过点击屏幕右上角的搜索图标，输入终端快速运行)：
csrutil status
你会看到以下信息中的一个，指示 SIP 状态
未关闭 enabled:
System Integrity Protection status: enabled.
已关闭 disabled:
System Integrity Protection status: disabled
如果是未关闭状态就需要关闭 SIP 了!
关闭 SIP 步骤
关机，然后重新启动你的 Mac 电脑，在开机时一直按住 Command+R 迸入 Recovery 模式。（如果是 Apple Silicon M1 芯片的电脑，只需要先关机再长按开机键，根据屏幕文字提示选择松手时机，就可以进入恢复模式了）
进入 Recovery 模式后在实用工具菜单中打开终端。
在终端上输入命令 csrutil disable 然后回车。
csrutil disable
最后点击左上角苹果图标  ，再点击重新启动就可以了。

## 格式化

第一步：电脑关机
第二步：按住 command+option+R 键，然后按一下开机键，不要松手，直到出现界面放手，M1 也是一样的操作
第三步：显示地球画面后，连接上你的无线网
第四部 改成简体中文
进入下一个页面->选择磁盘工具，显示所有设备->点显示所有设备后会显示以下界面->然后点击左上角 APPLE SSD 选择当前硬盘，选择抹掉->
待抹掉完成后，进行以下四步操作
1：左上角，磁盘工具，退出
2：点重新安装 MACOS，点继续
3：继续 同意，选择未命名 ， 安装
新的 MAC 流程差不多，可以参考执行
Mac OSMonterey

## 命令不识别问题

1. zsh: command not found: brew

- Mac 系统下的环境变量
  a. /etc/profile
  b. /etc/paths
  、
  c. ~/.bash_profile
  d. ~/.bash_login
  e. ~/.profile
  f. ~/.bashrc
  说明：
  1、其中 a 和 b 是系统级别的，系统启动就会加载，其余是用户接别的。
  2、c,d,e 按照从前往后的顺序读取，如果 c 文件存在，则后面的几个文件就会被忽略不读了，以此类推。
  3、~/.bashrc 没有上述规则，它是 bash shell 打开的时候载入的。
  4、建议在 c 中添加环境变量，以下也是以在 c 中添加环境变量来演示的。
- 添加环境变量
  安装完成后的提示中会给出解决方案，如下 ⬇️：
  具体步骤：
  命令行输入：sudo vim ~/.bash_profile
  在该文件中添加一行（命令行模式下点“i”插入）：export PATH="/opt/homebrew/bin:\$PATH"
  保存文件并退出（命令行模式下输入:wq 保存退出）
  命令行输入，激活文件：source ~/.bash_profile

## 提示：“打不开 xxx，因为它来自身份不明的开发者” “ xxx 已损坏，你应该将它移到废纸篓”的解决方法

场景比如：无法打开“福昕阅读器”，因为无法验证开发者
当提示：
1，“打不开 xxx，因为它来自身份不明的开发者”
2，“ xxx 已损坏，你应该将它移到废纸篓”
这个提示不代表软件本身问题，
而是 Mac 系统阻止了对不明来源开发者和没有签名的\*\*软件的访问。
这种情况，只需设置下系统即可简单解决！
设置方法如下：
1，系统偏好设置--->安全性与隐私--->选择“任何来源”即可。
2，终端执行代码：sudo spctl --master-disable 即可。重点

## 调整程序坞的位置

右键程序坞呼出菜单

## mac中shell怎么给linux服务器传文件
使用scp命令

（1）使用ssh命令登录Linux服务器。

（2）

上传mac本地文件至Linux服务器：scp localfiledirectory username@ip:remotefiledirectory

下载Linux服务器文件至mac本地：scp username@ip:remotefiledirectory localfiledirectory

