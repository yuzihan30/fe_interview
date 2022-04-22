<!--
 * @Author: your name
 * @Date: 2022-04-15 13:46:56
 * @LastEditTime: 2022-04-15 19:36:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/ts/ts.md
-->
1. 对象类型限制
let a: {name: string, age?: number} 问号表示属性有也行，没有也行
let a: {name: string, [propName: string]: any} 表示后面可以有任意多的任意类型的其他属性
2. 函数类型限制
let d: (a: number, b: number) => number
3. 数组常用语限定数组元素类型，let e: string[] 字符串数组，或者 let e:Array<string>
限定类型不建议用any, 尽量明确
4. ts基于js扩展的类型，元组：长度固定的数组，存储效率要高些
let h: [string, string]