## 学习指南

服务端开发
底层平台
周边生态
课程内容：node.js 基础(API) Express&Kpa2 MongoDB & MySQL 全栈项目 即时通讯 测试框架（Mocha）
课程特点：内容新（基于最新版 v16.13） 内容最全（官网+周边生态） 项目实战（前端+后端的全栈开发）
课程收获：编写 Restful Api 接口 动态 web 网站的开发 即时通讯应用的开发

## node.js 基础

1. 认识 node.js
   V8 引擎解析，底层靠 C++支撑

- 特性：js 语法，超强高并发，开发学习成本低
- 需要了解多少 js，官方 node 的文档有介绍
- 浏览器环境 和 node 环境对比
  浏览器中：v8 只能解析 js 代码；Blink 内核做排版解析，对 DOM 和 CSS DOM 做解析，确定每个元素的位置，再通过中间层应用安装在我们的操作系统中
  Node 中：只裁剪了 js 部分，DOM 是访问不到的，DOM、BOM 没有；通过中间层 libuv 的加持实现传统浏览器不能实现的功能，读取硬盘文件、跨域请求，前端不是 js，是浏览器为安全考虑做了限制了；文件读写，进程管理（可以创建多个进程，多个进程实例实现集群）；网络通信（http/https），没有任何的跨域限制

2. 环境搭建
   如果 window 安装包右键->常规->安全如果有提示需要打勾解除锁定
   安装完后 shift+鼠标右键有个 powershell，这个比 cmd 工具更高级一些，或者在浏览器文件夹窗口直接敲命令 cmd 回车
   node --version
   建 hello.js 右键打开终端，VScode 集成了自己的终端，node + 输入 01 tab 键自动补全
3. 模块-包-Commonjs
   为了 js 代码的复用性，功能分离

- 为什么要用模块化开发
  传统浏览器端拆成多个 js 的开发方式弊端是依赖关系、命名空间和代码组织方面，有纠结的编程体验, 比如创建完文件后，右键 html 文件 liver server 查看；依赖关系保证要用的必须在前面加载
  定义->暴露接口->引入
  前端开发中，要想模块化开发需要引入一些外部工程化的工具，比如 webpack，node 中则没法选择，只能使用模块化规则，拆成多个文件，然后在一个入口文件中把这些文件进行引入、聚合，再通过 node 命令执行
- commonjs 规范

## node版本管理
https://www.jianshu.com/p/00ba8285fbf5
切换node版本
sudo n 14.4.0 即可切换node版本
指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
波浪号（tilde）+指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
插入号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
latest：安装最新版本。
package.json文件可以手工编写，也可以使用npm init命令自动生成。
4."lint-staged":
 "lint-staged": {
     "*.{js,ts,vue}": "eslint --fix"
  }
git commit时触发pre-commit钩子，运行lint-staged命令，对*.js,ts,vue，.执行eslint命令。eslint要提前配置好
5.private
,如果你在你的package.json中设置了“private”：true，那么npm将拒绝发布它。 这是防止私人存储库意外发布的一种方法。
6.repository
包的仓库地址
"repository": {
    "url": "https://dev.ywsoftware.com:9443/ywsoftware/redcat-pro-snapshot/_git/redcat-pro-app"
  }
