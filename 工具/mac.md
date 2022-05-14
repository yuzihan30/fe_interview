<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-14 16:59:40
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-14 17:07:35
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