<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-03-01 13:25:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/js高频题.md
-->
1. forEach如果跳出循环？
break, return 无法跳出循环。可以通过try catch, try里面抛出错误

2. js重定向到另一个页面的方法？
location.href = url
location.replace(url)

3. js数组扁平化的方法？
遍历+递归（递归前判断一下元素是否是数组）、while+apply+concat（类似ES6的扩展运算符）、reduce+递归

4. 防抖和节流？
防抖debounce：防止频繁的执行某个操作，可通过反复的清除和创建定时器的方式，来达到过特定的时间之后才会执行某个操作的目的。应用场景：resize，缩放完成后才执行回调; scroll滚动屏幕，超过一定滚动距离才会显示回到顶部按钮; 搜索keyup、keydown事件，输入完成才执行回调。也考查了闭包的知识，闭包可以创建一个不销毁的私有作用域
节流throttle：可以通过设置flag标记的方式(或者判断两次执行的间隔时间)，来达到间隔一定时间才会执行某个操作的目的。应用场景：滚动屏幕加载图片，input框输入后做异步请求；搜索keyup、keydown事件，每隔一定时间才去做请求
二者区别：防抖触发事件时不执行操作
二者相同点：避免频繁调用大量计算或者请求导致的性能或者卡顿问题

5. 将字符串转化为js代码执行的两种方式？
eval，但有安全问题；new Function()可以将字符串转化成一个匿名函数包装下的语句

6. 如何实现一个模板引擎？
模板引擎编译模板得到替换过变量和执行过js的字符串
非变量和非js语句， 变量， js语句，涉及到上面三种情况的处理。核心是通过new Funciton来处理

7. 说一说，如何遍历输出页面中的所有元素?
```
creatNodeIterator
const body = document.getElementByTagName('body')[0]
const it = document.creatNodeIterator(body)
root = it.nextNode()
while (root.next) {
    console.log(root)
    root = it.nextNode()
}
```


