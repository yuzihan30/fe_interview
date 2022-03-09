<!--
 * @Author: your name
 * @Date: 2022-03-09 11:17:22
 * @LastEditTime: 2022-03-09 11:57:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/this指向系列.md
-->
1. 默认绑定，独立调用，指向window, 特殊情况有对象方法里又定义一个函数并执行（指向window）, 对象方法里又定义一个自执行函数直接执行也是指向window
2. 隐式绑定，典型的对象调用，谁调用指向谁，特殊情况有隐式丢失（对象的方法赋值给变量，变成独立调用了，这时就指向window）、参数赋值(对象方法以参数的方式传递给函数形参，这时指向window, 不过父函数可以决定子函数的this绑定，比如父函数可以通过call修改this指向；引申出来arr.forEach, arr.sort, setInternal中子函数this指向，api文档会指明this指向，但如果没指定，就指向window, 比如arr.forEach第2个参数可以传个对象绑定this)
3. 显式绑定， call、apply、bind (第一个参数传对象，如果传1、true, 会转化为包装类，但null、undefined绑定不成功会绑到window)
4. new绑定， 特殊情况如果构造函数自己返回一个1或者其他基本数据类型会被默认的return this覆盖掉（也就是这种情况里面this依然指向实例对象，但如果return引用数据类型就会改变覆盖掉return this），所以构造函数里面一般不会手写返回值的，而且限定使用new来调用，new绑定优先级大于显式绑定
5. 上面4种情况优先级依次递增，辅助记忆，new专门搞个关键字所以优先级最高，显式绑定你专门调用方法去修改，隐式调用规则相当于偷偷给你改的（本来window调用，偷偷改为对象调用）