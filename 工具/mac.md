<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-14 16:59:40
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-06-04 19:53:04
 * @FilePath: /fe_interview/工具/mac.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. mac中查找某个文件
which命令只是根据PATH环境变量查找。
whereis命令只是根据标准可执行文件路径进行查找。
如果要找的不是可执行文件，而且想在整个系统上找，怎么办？
find / -name xxx
但这样速度太慢，因为它会遍历整个文件系统上的每个文件进行匹配
mac下，有个locate命令，它自动建立和维护文件的索引，所以找起来非常快
mdfind 命令也很好用
mdfind -name xxx
不同命令对应不同应用场景，可以多试试，多测测

2. mac M1芯片就是arm64架构

## ISP
Mac电脑关闭SIP系统完整性保护详细教程
如果你也经常遇到"xxx已损坏，无法打开，你应该将它移到废纸篓解决办法", "打不开 xxx，因为它来自身份不明的开发者", "打不开xxxx，因为 Apple 无法检查其是否包含恶意软件"。多数可以通过下面的教程关闭SIP来解决，但是非常不推荐这种做法，后面会解释原因。
下面这些类似的问题都可以在这篇文章中找到答案。
关闭SIP有什么影响？
M1如何关闭SIP？
Monterey上如何关闭SIP？
什么是SIP？
苹果的官方解释，System Integrity Protection翻译过来就是系统完整性保护，这是macOS的一项安全技术，防止潜在的恶意软件修改Mac上受保护的资源，比如文件或者文件夹等。甚至是root用户，也受到这个限制。类似像是系统提供的终极底层安全保护，所以这个除非必要不要随便关闭。虽然很多盗版软件，破解包都需要关闭这个才能运行，但是这个其实是非常危险的行为。除非必要，真的不要做这个动作。
关闭SIP后，很多盗版程序是可以运行了，但是Mac系统本身也就不会去检查签名/公正，如果这个程序有恶意代码，他可以操作你机器上的任何文件，而且不需要你的任何授权。
强烈推荐下载正版软件，保护自己，不需要关闭任何安全选项。
针对安全问题再多讲几句，Mac系统的安全设计很好，如果想要最安全的应用，一定要从Mac AppStore下载，因为商店里的应用不仅受到SIP的安全限制，还有一个沙盒安全机制，更加严格的管理应用的权限，一旦这个应用有问题，苹果直接吊销证书，封杀。
当然我明白国内目前的生态，正版意识还没有那么强，如果你用盗版，就一定要确保下载来源吧，虽然大部分来源都无法保证安全。
如何关掉SIP
检查 SIP 状态
在sip系统完整性关闭前，我们先检查是否启用了SIP系统完整性保护。
打开终端输入以下命令并回车(可以通过点击屏幕右上角的搜索图标，输入终端快速运行)：
csrutil status
你会看到以下信息中的一个，指示SIP状态
未关闭 enabled:
System Integrity Protection status: enabled.
已关闭 disabled:
System Integrity Protection status: disabled
如果是未关闭状态就需要关闭SIP了!
关闭SIP步骤
关机，然后重新启动你的Mac电脑，在开机时一直按住Command+R迸入Recovery模式。（如果是Apple Silicon M1芯片的电脑，只需要先关机再长按开机键，根据屏幕文字提示选择松手时机，就可以进入恢复模式了）
进入Recovery模式后在实用工具菜单中打开终端。
在终端上输入命令 csrutil disable然后回车。
csrutil disable
最后点击左上角苹果图标  ，再点击重新启动就可以了。