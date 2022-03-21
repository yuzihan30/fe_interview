<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-03-21 22:38:06
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

防抖是事件触发n秒后才会执行，多次触发会重新计时，比如用在防止频繁点击多次发请求；节流是间隔一段时间只能触发一次，比如用在滚动事件上，降低事件触调用频率
实现上区别是：防抖是设置定时器之前判断存在定时器就清除（节流就直接返回）


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
8. 跨域
协议、域名、端口不同会出现跨域问题

9. reduce当没有提供初始值时，prev会代表第一个元素，cur会代表第二个元素

10. shift从数组头部移出一个值，并返回该值；unshift往数组头部增加一个或者多个值，返回更新后的数组长度

11. js中两次取反~~可以把浮点数变成整数

12. no-store和no-cache区别：no-store浏览器和代理服务器都不能缓存，no-cache都能缓存只是需要服务器验证

13. fileName.split('.').pop()获取文件后缀名，lastIndexOf()、正则也可以

14. concat()会拷贝原数组的副本

########## js数据类型相关 ########
1. js数据类型的判断
原始类型：string, number, boolean, undefined, null, symbol, bigint
引用类型：Object (Array, Function, RegExp, Date)
a: typeof BigInt('111')、typeof 111n 都会返回bigint
typeof Func会返回function, 后面是其它引用类型都返回object
typeof 原始类型除null返回object外都返回对应类型
b: [].constructor === Array  alert.constructor === Function null和undefined为无效对象无constructor, 存在问题：自定义对象的重写prototype后，会导致constructor引用丢失, 不建议使用
c: instanceof判断引用数据类型，判断构造函数的原型是否出现对象的原型链上，[] instanceof Array为true, 存在问题：iframe中的数组传到主页面会出现无法判断为Array的问题，所以用Array.isArray()
d: Object.prototype.toString.call(XX) 能准确判断准确所有类型

2. js对象的遍历
Object.keys(), Object.values(), Object.entries()遍历自身可枚举属性，不包括symbol属性，搭配forEach或者for of用
for in 遍历对象及原型链上的可枚举属性，不包括symbol属性
Object.getOwnPropertyNames()遍历自身属性（枚举+非枚举）
Object.getOwnPropertySymbols()遍历自身symbol属性（枚举+非枚举）


########## 事件循环 #########
1. 浏览器和node事件队列区别
浏览器有一个宏任务队列和多个微任务队列，每个宏任务会对应一个微任务队列，执行当前宏任务会清空当前宏任务下的微任务队列
node有6个宏任务和6个微任务队列，按优先级执行，一个宏任务队列的全部执行完成后，才会去清空改宏任务队列搭配的微任务队列；6个宏任务按优先级分阶段执行，完成一个循环，常用宏任务有Timers、Poll(Io事件)、Check(setImmediate), 微任务有process.nextTick,process.then

Vue中的nextTick就是下轮宏任务开启之后要执行的操作，created中如果有dom操作需要放到nextTick执行；数据变化会推到本轮微任务队列里（比如Promise.then），nextTick才能获取本轮微任务导致的dom变化
执行一个宏任务->执行当前宏任务下的所有微任务->DOM渲染->下一轮循环

2. 为什么区别宏任务和微任务
给一些任务插队执行的机会



########## 模块化相关 #########
1. export 和 export default的去别：
export可以先定义再导出，也可以直接导出，导入时import {x, y} from module或者import * as obj from module
export default只能直接导出且只能存在一个，导入时import x from module
二者在一个文件里不要同时使用


########## http协议 #########
1. cookie属性：名、值、域名、路径、大小、httponly(为true, http请求头会有cookie信息，但不能通过document.cookie访问)、secure(设置是否只能通过https传递)、expires/Max-Age(不设置的话默认和session一起失效，浏览器关闭失效)


########## 跨域 #########
带有src属性的标签都有跨域能力，比如script,img,link,video、audio、iframe
jsonp只支持get请求，CORS支持所有的请求方式
```
// jsonp的使用示例
<script>
const callback = (data) => {
    console.log(data)
}
</script>
<script src="https://xxx.com?page=1&callback=callback" />
// 手写实现jsonp(json with padding, 就是入参是json的回调函数)
// 使用示例: myJsonp('https://xxx.com?page=1', { name: 'yu' })

const myJsonp = (url = '', params = {}, callback = () => {}) => {
    // 1. 初始化 数组和字符串都有includes方法
    // 创建url和参数之间的拼接符，url中如果有'?'说明已经有url里包含一部分参数，
    // 后面只需要'&'拼接符，否则需要'?'拼接符拼接后面参数
    let queryChar = url.includes('?') ? '&' : '？'
    let paraArr = []
    for (let [key, value] of params.entries) {
        paraArr.push(`${key}=${value}`)
    }
    // 设置回调函数名
    let cbName = cb + Math.random().toString().replace('.', '')
    paraArr.push(`callback=$cbName`)
    let src = url + paraArr.join('&')

    // 2. 创建scripNode
    let scripNode = document.createNode('script')
    scripNode.src = src

    // 3. 绑定全局回调 jsonp传参回调函数需要是全局的，因为script就是在html文档最外层
    window[cbName] = (data) => {
        callback(data)
        document.body.removeChild(scripNode)
    }

    // 4. 添加scriptNode
    document.body.appendChild(scripNode)
}

```


