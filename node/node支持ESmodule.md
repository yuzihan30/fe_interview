<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-15 20:44:48
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-15 20:47:21
 * @FilePath: /fe_interview/node/node支持ESmodule.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
AMD和CMD适用于浏览器端的javascript模块化
Commonjs适用于服务器端的javascript模块化
ES6模块化规范时浏览器端与服务器端通用的模块化开发规范
1)每个js文件都是一个独立的模块
2)导入其他模块成员使用import关键字
3)向外共享模块成员使用expor关键字
node.js中仅支持Commonjs模块化,使用ES6模块化语法需要配置
1.安装了V14.15.1或更高版本的node.js
2.在package.json的根节点中添加"type":"module"节点
ES6模块化主要包含3种用法:
1.默认导出与默认导入
export default{ } // m1.js 中导出
import m1 from './m1.js' //导入 m1.js
每个模块只允许使用一次export default,否则会报错
默认接收名称可以任意,只要是合法的成员名称
2.按需导出与按需导入
export let s1 ='aaa'
export let s2='bbb'
export function say(){  }
import { s1,s2,say } from ' ./m2.js'
每个模块可以使用多次按需导出
按需导入的成员名称必须和导出的名称保持一致
可以使用as关键字进行重命名
按需导入可以和默认导入一起使用
3.直接导入并执行模块中的代码
只想单纯地执行某个模块中的代码,不需要得到模块中向外共享的成员,可以直接导入并执行模块代码
在"m3.js"文件模块中执行一个for循环操作
for(let i=0; i<3; i++ ){
    console.log(i)
}
import ('./m3.js')
// 符合写法  导入了又想导出
import {a,b,c} from '路径'
export {a,b,c}
// 简写
export {a,b,c} from '路径'