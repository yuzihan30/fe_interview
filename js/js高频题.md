<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-02-28 18:14:19
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


