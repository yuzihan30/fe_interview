## TS
### typescript
现在的js是动态类型，写完代码在浏览器中是边解析边执行，出了错编译器发现不了，只有执行的时候才能看到
1. TS定位是静态语言类型，在写代码阶段就能检查错误，而非运行阶段
2. 类型系统是最好的文档，增加了代码的可读性和可维护性
vscode是react结合electron实现的
### 安装
基于最新的脚手架重新生成一版基于TS的配置代码就行，而在原来的基础上升级很麻烦
create-react-app myappts --template typescript
--template typescript 意思是加载script模板
create-react-app需要5以上的版本才行， npm i -g create-react-app将最新的create-react-app安装一遍
之前脚手架比较能容忍，jsx文件写.js扩展名也行；现在ts的是tsx扩展名
index.tsx中先把<React.StrictMode>注释掉
document.get... // 警告，找不到“document”, 因为TS版本太老的问题（比如4.0.1），新版本的VSCODE不会有这个问题，要么升级vscode要么com+shift+P点使用工作区版本（使用的是脚手架安装的ts）,但又提示找不到路径，需要把项目拖到VScode的根目录下才行
npm start启动， 3000端口