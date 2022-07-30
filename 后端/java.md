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

############## 类 #################
1. override注意事项
【1】访问修饰符的限制一定要不小于被重写方法的访问修饰符
比如：Object类有个toString()方法，开始重写这个方法的时候我们总容易忘记Public修饰符，出错的原因就是：没有加任何访问修饰符的方法具有包访问权限，Default访问权限小于Public访问权限，所以编译器出错。
【2】参数列表必须与被重写方法的相同。
【3】重写的方法的返回值必须和被重写的方法的返回一致或者兼容；
【4】重写的方法所抛出的异常必须和被重写方法的所抛出的异常一致，或者是其子类；
【5】被重写的方法不能为private，子类再写一个同名的方法并不是对父类方法进行重写(Override)，而是重新生成一个新的方法；
【6】静态方法不能被重写。

## 异常
程序执行到 try 里面的内容一定会执行 finally 里面的内容。如果在 try 或者 catch 里面遇到return，那么函数在执行完 return 后面的表达式之后，会先去执行 finally 里面的语句块，然后再结束方法体。但有一种特殊情况，如果在try里面有System.exit(0)这样的语句，System.exit(0)是终止Java虚拟机JVM的，连JVM都停止了，所有都结束了，当然 finally 语句也不会被执行到。


