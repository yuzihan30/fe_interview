<!--
 * @Author: your name
 * @Date: 2022-04-16 21:39:28
 * @LastEditTime: 2022-05-14 17:19:05
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/后端/java.md
-->
1. 多态是继承概念的基础上，不同子类对父类同一方法的重写
2. 'x' - '0' 可以将字符串转为数字

3. JDK环境配置(MAC)
查看JDK安装位置
cd /Library/Java/JavaVirtualMachines
ls
打开或者创建环境变量文件
cd /Users/XXX(用户名) 或者cd ~
open .bash_profile 或者touch .bash_profile
配置环境变量
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_281.jdk(换成自己安装的版本号)/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH:.
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
source .bash_profile
echo $JAVA_HOME
检查环境变量
java -version



