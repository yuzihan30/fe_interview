普通函数的this都是在函数执行时动态确定的
1. 默认绑定，独立调用，指向window, 特殊情况有对象方法里又定义一个函数并执行（指向window）, 对象方法里又定义一个自执行函数直接执行也是指向window; 定时器里的this可以理解为独立调用，指向window
2. 隐式绑定，典型的对象调用，谁调用指向谁，特殊情况有隐式丢失（对象的方法赋值给变量，或者函数赋值给变量，变成独立调用了，这时就指向window）、参数赋值(也会造成隐式丢失，对象方法以参数的方式传递给函数形参，这时指向window, 不过父函数可以决定子函数的this绑定，比如父函数可以通过call修改this指向；引申出来arr.forEach, arr.sort, setInternal中子函数this指向，api文档会指明this指向，但如果没指定，就指向window, 比如arr.forEach第2个参数可以传个对象绑定this)
3. 显式绑定， call、apply、bind (第一个参数传对象，如果传1、true, 会转化为包装类，但null、undefined绑定不成功会绑到window)
4. new绑定， 特殊情况如果构造函数自己返回一个1或者其他基本数据类型会被默认的return this覆盖掉（也就是这种情况里面this依然指向实例对象，但如果return引用数据类型就会改变覆盖掉return this），所以构造函数里面一般不会手写返回值的，而且限定使用new来调用，new绑定优先级大于显式绑定
5. 上面4种情况优先级依次递增，辅助记忆，new专门搞个关键字所以优先级最高，显式绑定你专门调用方法去修改，隐式调用规则相当于偷偷给你改的（本来window调用，偷偷改为对象调用）

6. 独立调用的内层函数使用外层this的方式：
```
function foo() {
    var that = this  // 外层函数的this指向obj1, 典型的隐式绑定
    function bar() {
        console.log(this)  // 内层的this指向window, 典型的独立调用
        // 方法1： 内层函数使用that就能使用外层的this
    }
    bar()
    // 方法2：使用显式绑定，bar.call(this)
    // 方法3：使用箭头函数，箭头函数本身是没有this的，拿的是父级作用域的this
    var baz = () => {
        console.log(this)
    }
    baz()
}

obj1 = {
    a: 1,
    foo: foo
}
obj1.foo()
```
7. 普通函数的绑定规则不适用于箭头函数，箭头函数的this取决于父环境的this指向
```
function foo() {
    var baz = () => {
        console.log(this)
    }
    return baz
}
var obj1 = {
    a: 1,
    foo: foo
}
obj1.foo()()  // a: 输出obj，说明独立调用无法改变this指向，即说明默认绑定规则无效
foo().call(obj1) // b: 输出window, 说明显式绑定规则无效

var obj2 = {
    a: 2,
    foo: () => {
        console.log(this)  // var定义只有函数类块级作用域，外层作用域就是全局作用域， 所以this是指向window
    }
}
obj2.foo()  // c: 输出window, 说明隐式绑定规则无效
```
```
var foo = () => {
    console.log(this)
}
new foo()  // d: 会报错，说明箭头函数不能作为构造函数来使用
```
```
ES6对象方法的简化写法：
var obj = {
    a: 0,
    foo() {

    }
}
等价于
var obj = {
    a: 0,
    foo: function foo() {

    }
    // 或者
    foo: function () {

    }
}
```
8. 练习题
```
var a = 'window'
var obj = {
    a: 0,
    f1: function () {
        return () => console.log(this.a)
    }
}
var obj1 = {
    a: 1
}
obj.f1()()  // 0, 注意箭头函数的父环境
obj.f1().call(obj1)  // 0
obj.f1.call(obj1)()  // 1

```
new的特例，new Date 等价于new Date() 

9. 特例：事件绑定中的this问题
在element上内联方式绑定事件，this指向window
js绑定onclick事件，this指向该元素 document.getElementById('').onclick = function() {}
addEventListener绑定事件，this指向该元素，IE中attachEvent(),this指向window
jQuery中的bind, click, on事件绑定均指向该元素