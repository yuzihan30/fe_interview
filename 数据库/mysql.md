<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-19 21:05:44
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-19 21:12:05
 * @FilePath: /fe_interview/数据库/mysql.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# mysql
## 常用命令
启动：net start mySql;
mysql -u root -p root --登陆用户是root 密码是root 需要配置环境变量，要是在cmd命令进去mysql命令窗体的话
--->在我的电脑或者win7(计算机)右击我的属性，进入环境变量的path，然后拷贝你安装mysql的命令用 ;结束
-->C:\Program Files\MySQL\MySQL Server 5.0\bin 追加在path的路径重启window cmd命令窗体然后敲上, mysql -uroot -proot
-->即可进入mysql命令窗体-
　　进入：mysql -u root -p/mysql -h localhost -u root -p databaseName;
　　列出数据库：show databases;
　　选择数据库：use databaseName;
　　列出表格：show tables；
　　显示表格列的属性：show columns from tableName；
　　建立数据库：source fileName.txt;
　　匹配字符：可以用通配符_代表任何一个字符，％代表任何字符串;
　　增加一个字段：alter table tabelName add column fieldName dateType;
　　增加多个字段：alter table tabelName add column fieldName1 dateType,add columns fieldName2 dateType;
　　多行命令输入:注意不能将单词断开;当插入或更改数据时，不能将字段的字符串展开到多行里，否则硬回车将被储存到数据中;
　　增加一个管理员帐户：grant all on *.* to user@localhost identified by "password";
　　每条语句输入完毕后要在末尾填加分号';'，或者填加'g'也可以；
　　查询时间：select now();
　　查询当前用户：select user();
　　查询数据库版本：select version();
　　查询当前使用的数据库：select database();