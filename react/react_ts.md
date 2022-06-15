## TS
### react引入TS
> 参考资料：https://blog.csdn.net/weixin_44892714/article/details/109090852
> 最佳实践： https://zzfzzf.com/article/1465585026269933570
1. 使用脚手架create-react-app 创建新的ts react 项目
npx create-react-app my-app --typescript
或者
yarn create react-app my-app --typescript
2. 将现有的js react 项目改造成ts
先执行
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
或者
yarn add typescript @types/node @types/react @types/react-dom @types/jest
然后将.js文件重命名改为.tsx，再重新运行项目就可以了

react-router-dom
注意安装@types/react-router-dom
npm i react-router-dom @types/react-router-dom

注意：
要想使用typescript，在安装一些react常用工具的时候，别忘了安装对应额ts 包，@types/包名
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
### 语法
1. 基本类型
一开始赋值为什么类型，后面就是什么类型；但以后显示定义好，不要隐式推断
var name = 'xx'

2. 数组
- 第一种写法
var list3:(number | string)[] = [1,2,'xx']
- 泛型写法
let mylist1: Array<string | number> = ['x', 'y', 'z', 1]

3. 对象
ts文件要有export, 导入时可以直接import '.ts'
let obj1 = { // 这样是默认推断的情况，隐式推断有什么属性及属性类型
    name: "aa",
    age:100
}
export default {} 
// 通过接口来描述对象的形状，接口不在于实现过程，只在于大体描述轮廓(只描述了有什么属性及属性类型)
interface IObj {
    name: string,
    age: number,
    location?: string, // 可选属性
    [propName: string]: any, // 适用于后台接口返回很多字段，我只要某几个；不关心其他属性值，也不想都写一遍；表示属性名是字符串类型，接收这个值爱是什么类型是什么类型
}
let obj1: IObj = {

}
4. 函数
不写返回值，返回void
function test(a: string, c?: number): string {} // 问号可选参数
第二种写法：接口
interface IFunc {
    (a: string, c?: number): string
} 
let test: IFunc = function test1(a: number, ...) {}
上面这种场景用的少一些，更多是讲属性、函数组合到一个接口里面来限制对象
interface IObj {
    name: string,
    age: number,
    getName: (name: string) => string
}
let obj:IObj = {
    name: 'xx',
    age: 10,
    getName: (name: string) => {
        return name
    }
}
5. Toast
Cinemas.js
if (list.length === 0) {
    Toast.show({ // Toast只是一个对象，不是一个组件； duration设置为0就不会自动消失
        icon: 'loading',
        content: '加载中...',
        duration: 0
    })
    // action.js中拿到数据后隐藏掉，Toast因为不是一个组件，完全可以脱离组件库去使用
}
优化方案：
请求发送前加载，请求成功或者失败后隐藏；就在axios拦截器里做
项目目录->util->request.js
加请求拦截器和响应拦截器
import {Toast} from 'antd-mobile'
Toast.show({ // 放到请求拦截器
    icon: 'loading',
    content: '加载中...',
    duration: 0
})
响应拦截器中，成功和失败都要放 Toast.clear(), return 之前放

App.js中引入
import './util/request'

6. 类、类加接口
interface Ifunc {
    getName: () => string
}
A implements Ifunc {
    A1,
    A2,
    getName() {

    }
}
B implements Ifunc {
    B1,
    B2,
    getName() {
        
    }
}
function init(obj: Ifunc) {
    obj.getName()
}
接口约束类，要这样实现和这样调用

7. TS类组件
最多的就是接口类型的应用，限制组件状态属性符合接口
state = { name: 'xx' }
setState({
    name: 100 // 这个值如果是后台返回的，你不知道类型，运行时才能看到报错；或者调用别人的函数的返回结果
})
换种写法再试试
interface IState {
    name: string
}
export ...
state: IState = { name: 'xx' }
// 
setState({ // 此时这样改并不会提示，因为不是直接改, this.state.name = 100这样才有提示
    name: 100 
}