<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-04-27 22:55:02
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
vue源码工具方法判断isPrimitive原始数据类型只包括string, number, boolean,symbol
引用类型：Object (Array, Function, RegExp, Date)
判断是否是对象isObject(obj), obj !== null && typeof obj === 'object'
vue源码中isPlainObject就是自己构造的对象，而不是函数、date、正则等
undefined == null 返回 true, undefined === null返回false, 应用：if (a == null)能兼顾两种情况的判断
undefined ==或者=== undefined返回true
null ==或者=== null都返回true
NaN ==或者=== NaN都返回false  NaN是js中唯一自己和自己不相等的数据
注意区分对象相同和相等的概念
js中判断两个对象是否相等，属性名值相同认为对象是相等的，不能只用==、===, ==、===比较的是地址，需要用==、===(说明两个是相同对象),结合遍历a对象，是否a对象的每个属性都在b对象中且值相等，遍历b对象，是否b对象的每个属性都在a对象中且值相等, 如果属性时引用类型需要递归判断。建议参考vue源码，方法更简洁合理，但vue的源码是为了服务vue的，并未考虑正则表达式相等的情况
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

3. js函数的5中调用模式
a: 普通方式， 声明一个函数，然后调用
b: 函数表达式
// 使用函数的lambda表达式定义函数, 然后调用
let func = function() {}， func()里面的this指向全局对象，浏览器端指向window
c: 方法调用模式
将一个函数赋值给一个对象的成员后就叫方法了
d: 构造函数调用模式
e: apply、call调用模式


########## js运算符 #########
1. ??空值合并操作符，当左侧为null或者undefined，返回右侧值，否则返回左侧值
|| 当左侧为假时返回右侧，0、''也是假
?.可选链，就是obj $$ obj.a的语法糖

2. 逗号运算符，每个表示式都会执行，逗号运算符的结果是最后一个表达式的值


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
export default只能直接导出且只能存在一个，导入时import x(这个名字可以和默认导出的不同) from module
二者在一个文件里不要同时使用

2. commonjs node服务端同步加载， module.exports, require();require方法是同步的,这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

amd: RequireJS实现;RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器;尝试让第三方库修改自身来支持RequireJS；没有明显的bug；源码中预留接口的形式;依赖前置，加载完模块后执行回调，不阻塞后续代码的执行
cmd: SeaJS实现，专注于web浏览器端，通过web扩展的方式可以支持node服务器端；SeaJS自主封装;明显没有bug;SeaJS通过插件对调试支持程度好；就近依赖
umd是commonjs和amd的结合，支持node和浏览器端


########## http协议 #########
1. cookie属性：名、值、域名、路径、大小、httponly(为true, http请求头会有cookie信息，但不能通过document.cookie访问)、secure(设置是否只能通过https传递)、expires/Max-Age(不设置的话默认和session一起失效，浏览器关闭失效)

2. http请求：
http1定义了get\post\head
http1.1新增了options、put、delete、trace、connect
get请求指定的页面信息，并返回实体主题；get请求应该只是检索数据，并且不对数据产生其他影响；GET请求可以缓存，浏览器历史记录可以查找GET请求；GET请求有长度限制，仅用于请求数据；处理敏感数据不能用get请求
HEAD类似于get请求，只不过返回的响应中没有具体内容，用于获取报头；可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。
POST用于提交数据，例如提交表单或者上传文件，数据被包含在请求体中，POST请求可能会导致新的资源建立或者已有资源修改；POST请求不会被缓存，对数据长度没有限制，无法从浏览器历史记录中查到POST请求
PUT用发送的数据取代指定文档的内容；发送数据到服务器以创建或者更新资源，将包含的元素放在所提供的URI下，如果URI指示的是当前资源，则会被改变，如果URI未指示当前资源，则服务器可以使用该URI创建资源

DELETE请求服务器删除URI指定的资源

CONNECT是1.1中预留给将连接改为管道方式的代理服务器

OPTIONS允许客户端查看服务器的性能；返回服务器针对特定资源所支持的HTTP请求方法，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性；就是预检请求，用于检测服务器允许的http方法；发跨域请求前先发OPTIONS请求，即CORS预检请求，服务器接受该跨域请求，浏览器才继续发起正式请求；客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为"*"）使用该方法；不会触发CORS预检的请求成为简单请求，否则就是复杂请求

TRACE用于回显服务器的请求，主要用于测试或者诊断；用于沿着目标资源的路径执行环回测试

1）方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码501（Not Implemented）。
2）HTTP服务器至少应该实现GET和HEAD/POST方法，其他方法都是可选的，此外除上述方法，特定的HTTP服务器支持扩展自定义的方法。

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
########## 浏览器的垃圾回收机制 #########
1. 浏览器内存，64位的话1.4G, 新生代64M(From 和 To分别为32M), 32位的都减半
新生代使用copy的方式，使From和To互换，用空间换时间
老生态使用标记清除或者标记整理（内存空间整理，有引用的对象在内存中变连续，覆盖垃圾对象）
之前V8引擎使用的是全停顿标记法（垃圾回收一次全部标记，阻塞主线程时间就会比较久），现在使用增量标记和黑白灰三色标记法（一次只标记比如一层的少量对象，以前全停顿标记将存在引用的对象直接置黑，现在是每次少量一层的置灰，儿子置黑下次判断要不要置灰，下次扫描将上次灰色的地方作为临时根节点，从下一个黑色的地方开始扫描，将当前黑色置灰，并将和当前灰色关联的几个兄弟节点置黑、父节点置白，最终在使用对象都变白），这样垃圾回收和js主线程切换就变得频繁，每次时间垃圾回收时间都很短，页面无感知
老的IE用过引用计数法，这个存在很多问题

手机的碎片整理，也是标记整理，堆是连续空间，大数组也会占用连续空间

2. 新生代如何晋升老年代
From中的对象有没经过scavenge回收也就是copy过一次（node是1次，JVM就是15次），如果没有copy过一次就会被copy到To 这个半空间里；如果copy过一次，且To空间使用超过25%的容量（也就是8M）,满足了这两个条件，才会真正晋升到老生代，进入老生代就会比较稳定，一般情况就不会被清楚掉

3. 程序员到了一定年限要研究底层、源码，不能只是做做界面

4. V8是如何处理变量（内存）的
浏览器端查看内存指令：window.performance.memory
node端：process.memoryUsage() node的内存可以扩展，但扩展的不是V8的内存，而是C++内存；如果使用超过2G，会爆掉，提示内存分配失败，javascript heap out of memory 

5. V8引擎优化，全局变量不能被清除，怎么解除V8内存的限制，max-old-space-size=2048M(默认值),例如改为4096；max-new-space-size=102400KB（新生代用的是KB）,很少改新生态的内存
示例： node --max-old-space-size=4096 XX.js
场景：上传大文件超过2G,超过V8引擎限制会失败；npm run build打包超过内存限制时，package.json中script可以使用"build": node max-old-space-size=4096 build/build.js也可以突破内存2G的限制，一般只能接受空闲内存的75%

6. 全局变量和局部变量的区别：局部变量当程序执行结束，没有引用的时候就会消失；全局变量始终存活直到程序运行结束,也就是进程结束；多个大数组定义成局部变量就可以解决内存溢出的问题
局部变量所在函数执行完后，先被标记，当内存不够时就会被整理
程序执行的时候会看到卡顿的状态，就是GC的整理清除流程

