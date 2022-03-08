<!--
 * @Author: your name
 * @Date: 2022-03-08 09:51:39
 * @LastEditTime: 2022-03-08 10:40:24
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