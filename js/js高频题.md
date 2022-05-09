<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-05-09 23:05:54
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
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

4. 判断对象是否有某个属性
obj.hasOwnProperty() 自身属性  对应getOwnPropertyNames()
in 自身或者原型链上的属性 对应 for in

########## 函数 ########
1. js中new函数加不加括号没有区别，浏览器会自动解析不加括号的情况
2. 自执行函数
function(){}()  // 错误， ()前需要是函数表达式而不能是
!function(){}()  // !可以将函数声明变成函数表达式，其他+,-都可以，逗号也可以
(function(){})(), // 正确 
(function(){}()), // 正确

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

3. <script type="module"> 
允许在script标签内执行import和export操作，或者src里引入包含import导入的js文件


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

3. http2
新的二进制格式（Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。

多路复用（MultiPlexing），即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。
HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

header压缩，如上文中所言，对前面提到过HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。

服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能。
服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。正因为没有发起请求，建立连接等操作，所以静态资源通过服务端推送的方式可以极大地提升速度

########## 跨域 #########
1. 带有src属性的标签都有跨域能力，比如script,img,link,video、audio、iframe
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
2. CORS流程，JSONP只支持get请求，推荐使用CORS方式跨域，流程：浏览器发头带origin源的请求->服务器看origin字段的请求头后，就在响应中添加Access-Control-Allow-Origin标头，指定请求来源（或者*允许任何来源）->浏览器收到带Access-Control-Allow-Origin标头的响应后，会允许与客户端站点共享响应数据

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

########## 文档对象模型DOM #########
1. dataset自定义属性，html元素上面的自定义属性data开头中划线分割，data-date-of-birth, jsDOM读写的时候驼峰el.dataset.dateOfBirth

########## 浏览器相关BOM #########
1. let start = performance.now(); let end = performance.now()
可用于计算某段代码的执行时间

2. html词法解析器：html解析过程的输入是一串代码，这些代码通过标记化阶段，然后是树构建阶段，输出一个document对象
标记化
词法分析过程，将输入内容解析成多个标记
包括起始标记，结束标记，属性名称，属性值
标记生成器识别标记，传递给树构造器，然后接受下一个字符以识别下一个标记,如此反复直到输入的结束。标记化算法的输出结果是html标记

3. 浏览器内存泄露情况
全局变量：顶层代码window环境下，变量使用后，无需再次使用，然而变量未释放空间；
控制台打印：console.log()也是占用内存空间的；
分离的Dom节点：已删除的dom节点，然而其引用未释放, 我们看到节点innerBox删除后，其引用还存在，应该在删除后将innerBox=null，释放内存；
闭包的不正确使用：将闭包使用后，应正确将其引用释放，赋值为null；
定时器未能及时关闭；
绑定的事件组件卸载后未移除

4. 前端页面卡顿优化
页面前端代码的性能瓶颈大多集中在DOM操作上
首先，DOM操作为什么会影响性能。在浏览器中，DOM的实现和ECMAScript的实现是分离的。例如，在IE中，ECMAScript的实现在jscript.dll中，而DOM的实现在mshtml.dll中；在chrome中使用webkit的WebCore处理DOM和渲染，但ECMAScript是在V8引擎中实现的，其他浏览器的情况类似，所以通过Javascript调用dom接口，是相当于两个模块的交互。相比较在同一模块中的调用，这种跨模块的调用其性能损耗是很高的，但DOM操作对性能影响最大是因为它导致了浏览器的重绘和重排
方法一：合并多此dom操作为单次dom操作
通过class类名来元素的大量样式更改，代码维护性较好。
通过innerHTML接口来修改DOM元素的内容时，以字符串方式拼接好代码后，一次性赋值给
DOM元素的innerHTML接口。
方法二： 把DOM元素离线或隐藏后修改
把元素从页面流中脱离或隐藏，这样处理后，只会在DOM元素脱离或添加时，或者是隐藏或显示时才会造成页面的重绘会重排，对脱离了页面布局的DOM元素操作就不会导致页面的性能问题。
这种方式适合需要大批量修改dom元素的情况。具体方式由三种：
(1) 使用文档片段
文档片段是一个轻量级的document对象，并不会和特定的页面关联，通过在文档片段上进行DOM操作，可以降低DOM操作对页面性能的影响，这种方式是创建一个文档片段，并在此片段上
进行必要的DOM操作，操作完成后将它附加在页面中，对页面的影响只存在于最后把文档片段附加到页面的这一步操作上。
var fragment=document.createDocumentFragment();
//一些基于fragment的大量dom操作
document.getElementById('myElement').appendChild(fragment);
(2)隐藏元素
通过隐藏元素，达到在页面上移除元素的效果，经过大量的DOM操作后恢复元素原来的display样式，只有隐藏和显示元素时会引起页面重绘或重排操作。
var myElement=document.getElementById('myElement')；
myElement.style.display='none';
//dom操作
myElement.style.display='block';
(3)克隆DOM元素到内存中
把页面上的DOM元素克隆一份到内存中，然后在内存中操作克隆的元素，操作完成后使用此克隆元素替换页面中原来的DOM元素，只有替换元素时会影响性能,在内存中操作克隆元素不会引起页面上的性能损耗。
var old=document.getElementById('myElement');
var clone=old.cloneNode(true);
//dom操作
old.parentNode.replaceChild(clone,old);
3.设置具有动画效果的DOM元素的position属性为fixed或absolute
把页面中具有动画效果的元素设置为绝对定位，使得元素脱离页面布局流，从未避免了页面频繁的重排，只涉及动画元素自身的重排。这种做法可以提高动画效果的展示性能。(在动画开始时将其设置为绝对定位，等动画结束后恢复原始的定位设置)。
4.谨慎获得dom元素的布局信息，变量本地化。
把获取到的元素的布局信息值缓存在局部变量中。在有大量的DOM操作时，避免获取dom元素的布局信息，如果需要布局信息，最好在DOM操作之前就取好存放。
5.使用事件托管方式绑定事件
在DOM元素上绑定事件或影响页面的性能，一方面，绑定事件本身会占用处理时间，另一方面，浏览器保存事件绑定也会占用内存。使用事件托管方式，即利用事件冒泡机制，只在父元素上绑定事件处理，用于处理所有子元素的事件，在事件处理函数中根据传入的参数判断事件源元素，针对不同的元素做不同的处理。这种方式有很大的灵活性，可以方便的添加或删除子元素，不需要考虑因元素移除或添加需要修改事件绑定。

########## 前端优化 #########
1. 图片加载过多问题
加载的图片太多或者太大导致页面加载完成慢的问题；图片太多导致向服务器请求的次数太多,图片太大导致每次请求的时间过长,导致用户长时间等待。

一.大量图片加载优化方案
1.将图片服务和应用服务分离(从架构师的角度思考)
对于服务器来说,图片始终是最消耗系统资源的,如果将图片服务和应用服务放在同一服务器的话,应用服务器很容易会因为图片的高I/O负载而崩溃,所以当网站存在大量的图片读写操作时,建议使用图片服务器。浏览器在同一时间对同一域名下的资源的并发请求数目是有限制的,一般在2-6之间,超过限制数目的请求就会被阻塞.
2.图片压缩方案
我们可以借助一些第三方软件来进行压缩,压缩后分辨率不变,肉眼看不失真；
我们项目中对使用的图片基本都会进行压缩再上传。
3.图片懒加载
图片懒加载,简单来说就是在页面渲染过程中,图片不会一次性全部加载,会在需要的时候加载,比如当滚动条滚动到某一个位置时触发事件加载图片。
为优化回流，可以先设置占位符
实现方案一
document.documentElement.clientHeight//获取屏幕可视区域的高度
document.documentElement.scrollTop//获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
element.offsetTop//获取元素相对于文档顶部的高度
如果：clientHeight+scroolTop>offsetTop，则图片进入了可视区内，则被请求。
代码实现：
<script>
    var imgs = document.querySelectorAll('img');

    //offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
    function getTop(e) {
        var T = e.offsetTop;
        while(e = e.offsetParent) {
            T += e.offsetTop;
        }
        return T;
    }

    function lazyLoad(imgs) {
        var H = document.documentElement.clientHeight;//获取可视区域高度
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < imgs.length; i++) {
            if (H + S > getTop(imgs[i])) {
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
        }
    }

    window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
        lazyLoad(imgs);
    }
</script>
实现方案二
getBoundingClientRect()//获取元素的大小及位置
我们滚动条向下滚动的时候，bound.top值会变得越来越小，也就是图片到可视区顶部的距离也越来越小，所以当bound.top == clientHeight时，说明土片马上就要进入可视区了，只要我们在滚动，图片就会进入可视区，那么就需要请求资源了。也就是说，在bound.top<=clientHeight时，图片是在可视区域内的。
代码实现：
var imgs = document.querySelectorAll('img');

        //用来判断bound.top<=clientHeight的函数，返回一个bool值
        function isIn(el) {
            var bound = el.getBoundingClientRect();
            var clientHeight = window.innerHeight;
            return bound.top <= clientHeight;
        } 
        //检查图片是否在可视区内，如果不在，则加载
        function check() {
            Array.from(imgs).forEach(function(el){
                if(isIn(el)){
                    loadImg(el);
                }
            })
        }
        function loadImg(el) {
            if(!el.src){
                var source = el.dataset.src;
                el.src = source;
            }
        }
        window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
            check();
        }
4.小图片比较多时
可以用雪碧图、字体图标、base64等，这样可以有效减少连接数

5.http2解决连接数限制
http2一个站点只有一个连接。每个请求为一个流，每个请求被分为多个二进制帧，不同流中的帧可以交错的发送，实现多路复用。这就解决了连接数限制的问题

2. 图片过大优化方案
如果是相册之类的可以预加载，在展示当前图片的时候，就加载它的前一个和后一个图片
加载的时候可以先加载一个压缩率非常高的缩略图，以提高用户体验,点击再或加载到之后再查看清晰图
使用渐进式jpeg，会提高用户体验
如果展示区域小于图片的真实大小，可以在服务端先压缩到合适的尺寸
通过link标签preload预加载<link rel="preload" href="./img/all.jpg" as="image" />添加上后，浏览器会在渲染前先加载完图片，这样图片在显示时会整张地显示
图片拆分,现在大图片是5MB，可以拆成了9个400多KB的小图片
图片onload前用其他样式代替, img在渲染完成后会触发onload事件，那么我们可以先设置图片为隐藏，放一个图片或者loading进行过渡，然后在图片触发onload事件之后，进行切换
背景颜色,给图片的包裹元素提前设置一个与这个图片整体色调相符的背景颜色
另外有些cdn也可以通过query参数获得模糊的图片，这样我们就可以实现模糊到清晰的渐进加载
转base64，适用于小图片





########## 新概念 #########
1. pnpm新的依赖管理工具，比npm、yarn快两倍

2. Monorepo单体代码仓库


