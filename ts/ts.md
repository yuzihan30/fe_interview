<!--
 * @Author: your name
 * @Date: 2022-04-15 13:46:56
 * @LastEditTime: 2022-05-07 10:02:25
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/ts/ts.md
-->
编译：tsc xx.ts -> xx.js
1. 对象类型限制
let a: {name: string, age?: number} 问号表示属性有也行，没有也行
let a: {name: string, [propName: string]: any} 表示后面可以有任意多的任意类型的其他属性
2. 函数类型限制
let d: (a: number, b: number) => number
3. 数组常用语限定数组元素类型，let e: string[] 字符串数组，或者 let e:Array<string>
限定类型不建议用any, 尽量明确
4. ts基于js扩展的类型，元组：长度固定的数组，存储效率要高些
let h: [string, string]
5. enum Gender {
    male, // 默认会设置成0, 可以手动设置其他值，但是没必要
    female // 默认会设置成1
}
6. 或，与
let i : string | number
let j : { name: string } & { age: number }
j = {
    name: 'jame',
    age: 18
}
7. 类型别名(简化类型使用): type myType = 1 | 2 | 3
8. 编译选项，tsc xx.ts -w 监控文件的变化，如果变化自动执行编译
tsconfig.json配置文件可以配置监控所有文件，即使里面没有内容比如{}，执行tsc -w 也能监控所有ts文件。通常的json文件是不能写注释的，但tsconfig.json可以写注释
{
    "include": [
        "./src/**/*" // 两星任意目录，一星任意文件
    ], // include置顶哪些ts文件需要被编译
    "exclude": [
        "./src/hello/**/*"
    ], // exclude指不需要被编译的文件目录，一般不用设置，默认值是["node_modules", "bower_components"]
    "extends": "./configs/base", // 继承的外部文件xx.json，类似于import的外部文件
    "files": [], 类似于include, 只是files直接设置哪些文件，include是哪些目录下的文件，files用着比较麻烦一般用在项目比较小，只有很少的ts文件
}

9. ts编辑只做一些简单的转换，promise等新语法的转换需要用到babel, @babel/preset-env兼容不同浏览器，core-js提供运行js的虚拟环境， loader加载器的执行顺序是从后往前执行（ts-loader放后面先把ts转为js，babel-loader把新js转为旧的js）,chrome新浏览器对ES6的兼容性比较好， IE11支持不太好比如不支持const、箭头函数等

10. 实例属性前加readonly会变成只读，属性前加static会变成静态属性，可以一起用，但顺序只能是static readonly
实例方法，sayHello() {}, 前面也可以加static, 静态方法用的不多
创建不同的实例需要name:string; age:number, constructor(name:string, age:number) { this.name = name; this.age = age }
需要重点记住一个区别，constructor中this指向实例，而实例方法中的this指向方法的调用者（这个调用者可能是实例，也可能是绑定时间的按钮）constructor(name:string, age:number) { this.name = name; this.age = age; this.btn.onclick = this.sing }
