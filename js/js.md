<!--
 * @Author: your name
 * @Date: 2022-03-08 09:51:39
 * @LastEditTime: 2022-04-09 16:57:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/js题库.md
-->
1. js数据类型
1.1 通常认为会有10种
1.2 js7种基本数据类型：Undefined, Null, Number, String, Boolean,  Symbol(Es6), BigInt(Es10)
1.3 3种引用数据类型：Function, Array, Object，其实Array、Date、RegExp等数据类型都可以理解成Object类型的子类
1.4 Symbol: 类似字符串的唯一标识（唯一性），可用于标识对象属性，即使两次调用传参相同值也不同，要想保证相同两次都调用Symbol.for('name')；隐藏性，Object.keys()、for...in无法访问, Object.getOwnPropertySymbols()可访问(返回所有Symbol属性的数组)
1.5 BigInt可以安全的存储和处理任意精度的整数
1.6 基本数据类型存储在栈中，占据空间小、大小固定，属于频繁使用的数据；引用数据类型存储在堆中，占据空间大，大小不固定，解释器查找时，会先找栈中存储的堆地址

2. 栈、堆，及二者联系区别？
2.1 在数据结构中，栈先进后出；堆是树形数据结构
2.2 在操作系统中，栈区由编译器自动分配释放，常用于存储函数的局部变量和参数等；堆区由程序员分配释放，如果不主动释放，可能会在程序结束时由垃圾回收机制处理
2.3 缓存方式：栈使用一级缓存，一般函数调用完毕立即释放；堆使用二级缓存，生命周期由垃圾回收算法决定，速度慢一些

3. 内部属性[[Class]]
3.1 所有typeof 返回值为”object“的对象都有[[Class]]的内部属性，可以看做一种对象的分类方式，区别于面向对象的类
3.2 访问方式，无法直接访问，一般通过Object.prototype.toString(..)来访问，例如Object.prototype.toString.call(/../i)返回"[object RegRex]"
3.3 自定义的类访问返回默认的Object标签，例如Object.prototype.toString(new Class1())返回”[object, Object]“;若需要访问自定类的定制内部属性[[Cladd]], 需要在类内增加方法
```
class Class1 {
    get [Symbol.toStringTag]() {
        return "Class1"
    }
}
```
4. js内置对象
程序执行前由js定义的全局值属性（Infinity, NaN, undefined等）、函数（eval、ParseInt、ParseFloat）和构造函数(Date、Object), 还有提供数学计算的单体内置对象如Math对象

5. undefined和undeclared的区别？
5.1 undefined声明了但未定义（或者叫未赋值）；undeclared表示变量未声明
5.2 未声明的变量，引用后会报错，ReferenceError: .. is not defined; typeof 未声明的变量或者已声明未定义的变量会返回undefined

6. null和undefined的区别
6.1 Null和Undefined都是基本数据类型，都有唯一值null和undefined
6.2 undefined代表变量声明但未定义；null代表空对象，常用于初始化可能是对象的变量
6.3 typeof null得到"object"
6.4 二者双等号返回true，三等号返回false
6.5 undefined在js不是保留字，但不要声明变量名为undefined(目前测试chrome控制台内不能定义undefined为变量名，会报错); void 0可以得到undefined值

7. 如何安全的获取undefined值？
表达式void ...没有返回值，返回结果是undefined, 通常用void 0来获取undefined 

8. js原型、原型链？及特点？
js原型：构造函数有个属性叫prototype, 该属性是个对象，包含构造函数创建的实例所共享的属性和方法；实例有个__proto__属性指向原型，浏览器都实现了这个属性，但不属于规范中规定的属性，不建议使用；ES5中Object.getPrototypeOf(..)可以获得实例的原型
原型链：访问对象的属性时，若对象内部不存在这个属性，则在原型里找，原型里找不到的，继续在原型的原型里找，一直找到原型链的尽头Object.prototype为止
特点：构造函数创建对象时，不会创建原型的副本，所以我们修改原型时，相关对象或者实例也会集成这些修改。

9. toFixed从小数点开始四舍五入取整，toPrecision从第一个不为零的数开始四舍五入，Math.round四舍五入到整数
1.278.toFixed(2)
'1.28'
Math.round(1.278)
1
Math.round(1.578)
2
1.278.toPrecision(2)
'1.3'