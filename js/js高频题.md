<!--
 * @Author: your name
 * @Date: 2022-02-28 15:20:17
 * @LastEditTime: 2022-06-07 18:11:46
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/js高频题.md
-->

1. forEach 如果跳出循环？
   break, return 无法跳出循环。可以通过 try catch, try 里面抛出错误

2. js 重定向到另一个页面的方法？
   location.href = url
   location.replace(url)

3. js 数组扁平化的方法？
   遍历+递归（递归前判断一下元素是否是数组）、while+apply+concat（类似 ES6 的扩展运算符）、reduce+递归

4. 防抖和节流？
   防抖 debounce：防止频繁的执行某个操作，可通过反复的清除和创建定时器的方式，来达到过特定的时间之后才会执行某个操作的目的。应用场景：resize，缩放完成后才执行回调; scroll 滚动屏幕，超过一定滚动距离才会显示回到顶部按钮; 搜索 keyup、keydown 事件，输入完成才执行回调。也考查了闭包的知识，闭包可以创建一个不销毁的私有作用域
   节流 throttle：可以通过设置 flag 标记的方式(或者判断两次执行的间隔时间)，来达到间隔一定时间才会执行某个操作的目的。应用场景：滚动屏幕加载图片，input 框输入后做异步请求；搜索 keyup、keydown 事件，每隔一定时间才去做请求
   二者区别：防抖触发事件时不执行操作
   二者相同点：避免频繁调用大量计算或者请求导致的性能或者卡顿问题

防抖是事件触发 n 秒后才会执行，多次触发会重新计时，比如用在防止频繁点击多次发请求；节流是间隔一段时间只能触发一次，比如用在滚动事件上，降低事件触调用频率
实现上区别是：防抖是设置定时器之前判断存在定时器就清除（节流就直接返回）

5. 将字符串转化为 js 代码执行的两种方式？
   eval，但有安全问题；new Function()可以将字符串转化成一个匿名函数包装下的语句

6. 如何实现一个模板引擎？
   模板引擎编译模板得到替换过变量和执行过 js 的字符串
   非变量和非 js 语句， 变量， js 语句，涉及到上面三种情况的处理。核心是通过 new Funciton 来处理

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

9. reduce 当没有提供初始值时，prev 会代表第一个元素，cur 会代表第二个元素

10. shift 从数组头部移出一个值，并返回该值；unshift 往数组头部增加一个或者多个值，返回更新后的数组长度

11. js 中两次取反~~可以把浮点数变成整数

12. no-store 和 no-cache 区别：no-store 浏览器和代理服务器都不能缓存，no-cache 都能缓存只是需要服务器验证

13. fileName.split('.').pop()获取文件后缀名，lastIndexOf()、正则也可以

14. concat()会拷贝原数组的副本

########## js 数据类型相关 ########

1. js 数据类型的判断
   原始类型：string, number, boolean, undefined, null, symbol, bigint
   vue 源码工具方法判断 isPrimitive 原始数据类型只包括 string, number, boolean,symbol
   引用类型：Object (Array, Function, RegExp, Date)
   判断是否是对象 isObject(obj), obj !== null && typeof obj === 'object'
   vue 源码中 isPlainObject 就是自己构造的对象，而不是函数、date、正则等
   undefined == null 返回 true, undefined === null 返回 false, 应用：if (a == null)能兼顾两种情况的判断
   undefined ==或者=== undefined 返回 true
   null ==或者=== null 都返回 true
   NaN ==或者=== NaN 都返回 false NaN 是 js 中唯一自己和自己不相等的数据
   注意区分对象相同和相等的概念
   js 中判断两个对象是否相等，属性名值相同认为对象是相等的，不能只用==、===, ==、===比较的是地址，需要用==、===(说明两个是相同对象),结合遍历 a 对象，是否 a 对象的每个属性都在 b 对象中且值相等，遍历 b 对象，是否 b 对象的每个属性都在 a 对象中且值相等, 如果属性时引用类型需要递归判断。建议参考 vue 源码，方法更简洁合理，但 vue 的源码是为了服务 vue 的，并未考虑正则表达式相等的情况
   a: typeof BigInt('111')、typeof 111n 都会返回 bigint
   typeof Func 会返回 function, 后面是其它引用类型都返回 object;
   typeof 原始类型除 null 返回 object 外都返回对应类型
   b: [].constructor === Array alert.constructor === Function null 和 undefined 为无效对象无 constructor, 存在问题：自定义对象的重写 prototype 后，会导致 constructor 引用丢失, 不建议使用
   c: instanceof 判断引用数据类型，判断构造函数的原型是否出现对象的原型链上，[] instanceof Array 为 true, 存在问题：iframe 中的数组传到主页面会出现无法判断为 Array 的问题，所以用 Array.isArray()
   d: Object.prototype.toString.call(XX) 能准确判断准确所有类型
   falsy(虚值)是在 Boolean 上下文中已认定可转换为‘假‘的值

2. js 对象的遍历
   Object.keys(), Object.values(), Object.entries()遍历自身可枚举属性，不包括 symbol 属性，搭配 forEach 或者 for of 用
   for in 遍历对象及原型链上的可枚举属性，不包括 symbol 属性
   Object.getOwnPropertyNames()遍历自身属性（枚举+非枚举）
   Object.getOwnPropertySymbols()遍历自身 symbol 属性（枚举+非枚举）

3. js 函数的 5 种调用模式
   a: 普通方式， 声明一个函数，然后调用
   b: 函数表达式
   // 使用函数的 lambda 表达式定义函数, 然后调用
   let func = function() {}， func()里面的 this 指向全局对象，浏览器端指向 window
   c: 方法调用模式
   将一个函数赋值给一个对象的成员后就叫方法了
   d: 构造函数调用模式
   e: apply、call 调用模式

4. 判断对象是否有某个属性
   obj.hasOwnProperty() 自身属性 对应 getOwnPropertyNames()
   in 自身或者原型链上的属性 对应 for in

## 对象

1. 对象和 map 区别：

- Object 无法使用非字符串值作为键名，但 Map 的键名可以是任意类型；
- 常规对象里，为了遍历 keys、values 和 entries，你必须将它们转换为数组，如使用 Object.keys()、Object.values()和 Object.entries()，或使用 for ... in，另外 for ... in 循环还有一些限制：它仅仅遍历可枚举属性、非 Symbol 属性，并且遍历的顺序是任意的，但 Map 可直接遍历，且因为它是键值对集合，所以可直接使用 for…of 或 forEach 来遍历。这点不同的优点是为你的程序带来更高的执行效率
- 对象的 key 无序，map 的 key 有序

2. 判断是否是对象
   一.判断值是否是对象
   1.toString 方式【常用】
   Object.prototype.toString.call(val) === '[object Object]' // true 代表为对象
   注意：这里要使用 call 方法改变作用域
   2.constructor 方式
   val?.constructor === Object // true 代表为对象
   这里使用了 null 传导符(?.) 以防止出错
   3.typeof 与 instanceof
   typeof 与 instanceof 并不能完全判断一个值为对象
   typeof 的取值有：
   "undefined"——如果这个值未定义；
   "boolean"——如果这个值是布尔值；
   "string"——如果这个值是字符串；
   "number"——如果这个值是数值；
   "object"——如果这个值是对象（包括数组）或 null；
   "function"——如果这个值是函数；
   "symbol"——如果这个值是 Symbol
   instanceof 操作符对于数组和对象都返回 true
   [] instanceof Object // true
   new Object instanceof Object // true 4.**proto** 方式【不推荐】
   **proto**属性，用来读取或设置当前对象的 prototype 对象，此属性未纳入标准，不建议使用。
   val.**proto** === Object.prototype // true 代表为对象
   5.Object.getPrototypeOf 方式
   Object.getPrototypeOf()，用来读取对象的 prototype 对象。
   Object.getPrototypeOf(val) === Object.prototype // true 代表为对象

3. weakMap
   当我们对一个不再使用的对象保持引用的时候将会造成内存泄漏，所以如果你不再使用对象，请删除它的任何变量引用。
   使用 weakmap 时我们不应该使用.keys() / .values() /.entries()，因为我们不知道何时垃圾回收器会移除这个对象。
   let obj = { name: 'toto' }
   let arr = [ obj ]
   obj = null // 存在强引用关系，内存泄露

使用 map，对象会占用内存，可能不会被垃圾回收。Map 对一个对象是强引用

let obj = { name: 'toto' }
let mapObj = new Map()
mapObj.set(obj, 'any value')

obj = null
mapObj.size() // 1
Weakmap 则是完全不同的，它不会阻止关键对象的垃圾回收
第一条规则，weakmap 只接受 object 作为 key，第二条规则是它只保存对对象的弱引用。
let obj = { name: 'toto' }
let weakmapObj = new WeakMap()
weakmapObj.set(obj, 'any value')
obj = null
weakmapObj .size() // 0

4. WeakSet
   WeakSet 结构与 Set 类似，但只有 add、delete、has 三个方法
   不同之处：
   WeakSet 的成员只能是对象，并且 WeakSet 不支持 clear 方法，不支持遍历，也没有 forEach 这个方法，没有属性 size
   WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，如果只有 WeakSet 引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存

5. 对象与 json

- JSON 是 JS 对象的字符串表示法。它使用文本表示一个 JS 对象的信息，（JSON）本质是一个字符串。
  如：var obj = {a: 'Hello', b: 'World'}; //这是一个 js 对象，注意 js 对象的键名也是可以使用引号包裹的,这里的键名就不用引号包含
  var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
  JSON（格式字符串） 和 JS 对象（也可以叫 JSON 对象 或 JSON 格式的对象）互转（JSON.parse 和 JSON.stringify）。
  对于对象字面，你需要用引号来包装那些由破折号（-）分隔的字的键；如果你想避免引号，你可以重写键，使用骆驼字母大小写（favoriteGame），或者用下划线来分隔单词（`favorite_game'）
- 你可能会想，如果有 JSON 对象和数组，你就不能在你的程序中像普通的 JavaScript 对象字面或数组一样使用它吗？
  不能这样做的原因是，JSON 实际上只是一个字符串。
  例如，当你在一个单独的文件中写 JSON 时，如上面的 jane-profile.json 或 profiles.json，该文件实际上包含了 JSON 对象或数组形式的文本，它恰好看起来像 JavaScript。
  如果你向 API 发出请求，它将返回类似这样的东西:
  {"name":"Jane Doe","favorite-game":"Stardew Valley","subscriber":false}
  就像文本文件一样，如果你想在你的项目中使用 JSON，你需要把它解析或改变成你的编程语言可以理解的东西。例如，在 Python 中解析一个 JSON 对象将创建一个字典。
- 如何用 fetch 解析 JSON
  从 API 获取数据的最简单方法是使用 fetch，它包括.json()方法，将 JSON 响应自动解析为可用的 JavaScript 对象字面或数组。
  下面是一些代码，使用 fetch 从对一个对开发者免费的 Chuck Norris Jokes API 平台，发出 GET 请求:
  fetch('https://api.chucknorris.io/jokes/random?category=dev')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => console.log(data));
- 参考资料： https://chinese.freecodecamp.org/news/json-stringify-example-how-to-parse-a-json-object-with-javascrip/

6. js 为什么将初始变量赋值为 null?

- 初始赋值为 null 是为了将变量转为 Object 类型
- 之后赋值为 null 使用垃圾回收机制回收

## 数组

1. 判断数组的方法

- 使用 es6： Array.isArray( obj )
- 原型对象判断 obj.**proto** === Array.prototype
  Object.getPrototypeOf( obj ) === Array.Prototype
- 使用 instanceof 操作符 obj instanceof Array
- Array.prototype.isPrototypeOf( obj )
- 使用对象 class 属性： Object.prototype.toString.call( obj ) 返回值 '[object Array]'
  function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
  };

2. js 中 includes()、indexOf()、search()、match()几种方法的区别

- includes()
  includes() 方法用来判断一个数组是否包含一个指定的值，如果是则返回 true，否则返回 false。
  let d = ['a','b','c'].includes('a')
  console.log(d); //true
- indexOf()
  indexOf() 方法可返回数组中某个指定的元素位置。
  该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。
  如果在数组中没找到指定元素则返回 -1。
  let fruits=["Banana","Orange","Apple","Mango","Banana""Orange","Apple"];
  console.log(fruits.indexOf('Apple')); //2
- search()
  search() 方法用于检索字字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
  如果没有找到任何匹配的子串，则返回 -1
  var str="Visit Runoob!";
  var n=str.search("Runoob");
  console.log(n); //6
- match()
  match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
  第一种用法:字符串匹配
  var strs = "hello world";
  var ret = strs.match("hello");
  console.log(ret);
  如果没有匹配到“hello”，则会返回 null
  第二种用法:正则表达式匹配
  var strss="1 plus 2 equal 3";
  var retss= strss.match(/\d+/g)
  console.log(retss);
  注意:正则表达式的后面一定要加上 g，这个标记这个 retss 的值是 1,2,3 匹配所有的数字并用逗号隔开，否则返回 null

########## 变量 ########

1. function foo() { console.log(x) }
   function bar() { var x = 2; foo(); console.log(x) }
   var x = 1
   foo() // 1
   bar() // 1,2 和 python 中类似，foo 打印的 x,取决于 foo 在那定义，而不是在哪调用；函数的外层作用域取决于在哪定义而不是在哪调用
   foo() // 1
2. function f(a){
   a = a+1;
   alert(a)
   }
   var a =1;
   f(a);
   alert(a)
   依次输出 2,1
   解析：函数外的 a 是全局变量，函数 f 中的 a 是参数 a，而不是全局定义里的 a，JavaScript 中作用域是函数级别的，在 f 中不管怎么改变参数 a，都不会影响全局变量 a。
   函数的形参和全局变量重名；既然参数也是局部变量，那函数内部对于 a 的操作都指向局部变量 a 影响不了全局变量 a,
3. function f(a){
   a[0]=a[0]+1;
   alert(a[0])
   }
   var a =[1,2];
   f(a); // 引用数据类型传址
   alert(a[0])
   依次输出 2,2
4. var 和函数的提前声明
   function fn(a) {
   console.log(a);
   var a = 2;
   function a() {}
   console.log(a);
   }
   fn(1);
   依次输出 function a(){console.log(a)},2
   解析：var 和 function 是会提前声明的,但是 function 是优先于 var 声明的（如果同时存在的话），所以提前声明后输出的 a 是个 function，然后代码往下执行 a 进行重新赋值了，故第二次输出是 2。

5. function fn() {
   console.log(a)
   a = 5
   }
   fn()
   VM1723:2 Uncaught ReferenceError: a is not defined // 说明不带 var 定义的变量没有变量提升

6. function fn() {
   console.log(a)
   let a = 5
   }
   fn()
   VM1850:2 Uncaught ReferenceError: Cannot access 'a' before initialization
   根据报错的提示，是不是可以理解为 let 定义的变量提升了，但并未初始化，这样也会报错；或者可以理解为 let 并没有变量提升
7. 变量提升：当栈内存（作用域）形成，JS 代码自上而下执行之前浏览器首先会把所有带“VAR / FUNCTION”
   关键字的进行前的 “声明”和“定义”这种预先处理机制称之为“变量提升”
   【变量提升阶段】
   1、带“VAR”的是只声明未定义
   2、带“FUNCTION”的声明和赋值都完成
   3、变量提升只发生在当前作用域（例如：开始加载页面的时候只对全局作用域下的进行提升 ，因为此时函数中储存的都是字符串而已）
   4、全局作用域下声明的函数或者变量是“全局变量”；同理，在私有作用域下声明的变量是“私有变量”。
   【带 VAR 和 FUNCTION 的才是声明】
   浏览器做过的事情不会重复第二遍，也就是，当代码执行遇到创建函数这部分代码后，直接的跳过即可（因为在提升阶段就已经完成函数的赋值操作了）
   带 var 和不带 var 的区别
   在全局作用域下声明一个变量，也相当于给 window 全局对象设置了一个属性，变量的值就是属性值（私有作用域中声明的私有变量和 window 没啥关系）
   在变量提升阶段，在全局作用域中声明了一个变量 A，此时就已经把 A 当做属性赋值给 window 了只不过此时还没有给 A 赋值，默认值 undefined， in 检测某个属性是否属于这个对象。
   私有作用域带 var 和不带 var 也有区别
   1、带 var 的私有作用域变量提升阶段，都声明为私有变量，和外界没有任何关系。
   2、不带 var 不是私有变量，会向它的上级作用域查找，看是否为上级的变量，不是继续向上查找，一直找到 window 为止（我们把这种查找机制叫做：作用域链），也就是我们在私有作用域中操作的这个非私有变量，一直是别人的变量。

########## 函数 ########

1. js 中 new 函数加不加括号没有区别，浏览器会自动解析不加括号的情况
2. 自执行函数
   function(){}() // 错误， ()前需要是函数表达式而不能是
   !function(){}() // !可以将函数声明变成函数表达式，其他+,-都可以，逗号也可以
   (function(){})(), // 正确
   (function(){}()), // 正确

########## js 运算符 #########

1. ??空值合并操作符，当左侧为 null 或者 undefined，返回右侧值，否则返回左侧值
   || 当左侧为假时返回右侧，0、''也是假
   ?.可选链，就是 obj && obj.a 的语法糖 这种比较新的语法开发中发现vue模板中并不识别，但script代码中可以识别

2. 逗号运算符，每个表示式都会执行，逗号运算符的结果是最后一个表达式的值

########## 事件循环 #########

1. 浏览器和 node 事件队列区别
   浏览器有一个宏任务队列和多个微任务队列，每个宏任务会对应一个微任务队列，执行当前宏任务会清空当前宏任务下的微任务队列
   node 有 6 个宏任务和 6 个微任务队列，按优先级执行，一个宏任务队列的全部执行完成后，才会去清空改宏任务队列搭配的微任务队列；6 个宏任务按优先级分阶段执行，完成一个循环，常用宏任务有 Timers、Poll(Io 事件)、Check(setImmediate), 微任务有 process.nextTick,process.then

Vue 中的 nextTick 就是下轮宏任务开启之后要执行的操作，created 中如果有 dom 操作需要放到 nextTick 执行；数据变化会推到本轮微任务队列里（比如 Promise.then），nextTick 才能获取本轮微任务导致的 dom 变化
执行一个宏任务->执行当前宏任务下的所有微任务->DOM 渲染->下一轮循环

JS执行顺序为同步代码 微任务 DOM渲染 宏任务
alert(``) // 会阻塞后续代码的执行，只有点完确定之后才会执行后面的代码
document.documentElement.style.backgroundColor="green"
click是异步回调，点击之后事件循环进入执行栈，此时执行click里的同步代码，
DOM渲染虽然是同步代码，但执行后不会马上渲染到页面，
然后执行到Promise，把then后的代码添加到微任务队列，
此时微任务队列的优先级高于DOM渲染，所以先执行微任务，
同步代码里的背景颜色还没渲染，就被then里面的代码覆盖了
2. 为什么区别宏任务和微任务
   给一些任务插队执行的机会

########## 模块化相关 #########

1. export 和 export default 的区别：
   export 可以先定义再导出，也可以直接导出，导入时 import {x, y} from module 或者 import \* as obj from module
   export default 只能直接导出且只能存在一个，导入时 import x(这个名字可以和默认导出的不同) from module
   二者在一个文件里不要同时使用

2. commonjs node 服务端同步加载， module.exports, require();require 方法是同步的,这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

amd: RequireJS 实现;RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器;尝试让第三方库修改自身来支持 RequireJS；没有明显的 bug；源码中预留接口的形式;依赖前置，加载完模块后执行回调，不阻塞后续代码的执行
cmd: SeaJS 实现，专注于 web 浏览器端，通过 web 扩展的方式可以支持 node 服务器端；SeaJS 自主封装;明显没有 bug;SeaJS 通过插件对调试支持程度好；就近依赖
umd 是 commonjs 和 amd 的结合，支持 node 和浏览器端
ES6 module: ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西;ES6 模块化在浏览器和 node.js 中都可以用;在 node.js 使用模块化，需要将 CommonJS 脚本的后缀名都改成.cjs，ES6 模块采用.mjs 后缀文件名。或者修改 package.son 里面的文件，type 字段为 module 或 commonjs；CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。注意：CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块；ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require("./lib");

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
//lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。
//这是因为mod.counter是一个原始类型的值，会被缓存。
//除非写成一个函数，才能得到内部变动后的值。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter;
  },
  incCounter: incCounter,
};

///////////////////// ES6 /////////////////////
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from "./lib";
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

3. <script type="module"> 
   允许在script标签内执行import和export操作，或者src里引入包含import导入的js文件


4. import from 和 import 区别

- import from 是静态的，会被 js 引擎静态分析，先于模块内其他语句先执行，不能放到 if 判断或者函数里（会句法报错），所以要放在文件顶部。如果直接 import 'XX.js', 就是直接同步导入并执行
- import()是动态的，js 执行时才会导入； 而且是异步的，返回一个 Promise, 可以和 await 结合使用；和 commonjs 的 require()很像，只是 require()是同步加载的；支持 import 需要 babel 的额外配置；它不需要依赖 type="module" 的 script 标签

```javascript
{
  "plugins": [
    "syntax-dynamic-import"
  ]
}
```

Node.js 要求 ES6 模块采用.mjs 后缀文件名。如果不希望将后缀名改成.mjs，可以在项目的 package.json 文件中，指定 type 字段为 module。{
"type": "module"
}
Node.js 要求 ES6 模块采用.cjs 后缀文件名。
如果不希望将后缀名改成.cjs，可以在项目的 package.json 文件中，指定 type 字段为 commonjs。
{
"type": "commonjs"
}

- react 组件中 css 文件导入用的 import 区别于 js 的 import

5. commonjs
   （1）每个模块内部，module 变量代表当前模块。
   （2）module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。
   （3）加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。
   commonjs 的运行时加载
   // CommonJS 模块
   let { stat, exists, readfile } = require('fs');
   // 等同于
   let \_fs = require('fs');
   let stat = \_fs.stat;
   let exists = \_fs.exists;
   let readfile = \_fs.readfile;
   以上代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（\_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

6. ES6module 的静态加载或者编译时加载
   import { stat, exists, readFile } from 'fs';
   这个代码的实质是从 fs 模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

7. ES6 用法
   export 暴露方式，3 种：

- 分别暴露
  // 分别暴露, m1.js, m1.js
  export let school = 'gc';

export function teach() {
console.log("m1--我们可以教给你很多东西！");
};

- 统一暴露, m2.js
  let school = 'gc';
  function findJob() {
  console.log("m2---我们可以帮助你找工作!!");
  };
  export {school, findJob};
- 默认暴露, m3.js
  export default {
  school: 'ATLUCA',
  change: function(){
  console.log("m3---我们可以改变你!!");
  }
  }

import 导入方式，3 种

- 通用的导入方式
  // 引入 m1.js 模块内容
  import _ as \_m1 from "js/m1.js";
  \_m1.teach();
  // 引入 m2.js 模块内容
  import _ as \_m2 from "js/m2.js";
  \_m2.findJob();
  console.log(\_m2.school);
  // 引入 m3.js
  import \* as \_m3 from "js/m3.js";
  console.log(\_m3);
  \_m3.default.change();
- 解构赋值形式
  // 引入 m1.js 模块内容
  import {school, teach} from "js/m1.js";
  console.log(school);
  // 引入 m2.js 模块内容
  // (1)如果导入的多个文件中，变量名字相同，即会产生命名冲突的问题，
  // (2)为了解决该问题， ES6 为提供了重命名的方法。
  // (3)此处的 school 与 m1.js 的命名相同，所以此处的 school 改为 gc
  import {school as gc, findJob} from "js/m2.js";
  console.log(findJob);
  // 引入 m3.js 模块内容
  import {default as \_m3} from "js/m3.js";
  console.log(\_m3);
- 简便形式, 只针对于默认暴露
  import \_m3 from "js/m3.js";
  console.log(\_m3);

8. ES module 如果只想运行某个模块中的代码，不想得到其中导出的内容，可以直接运行，import 'xx.js'

9. import / export 的限制
   注意，import / export 语句只能在代码的最外层执行，不能在其他作用域内执行，下面的代码会报语法错误
   const a = 10
   if(true) {
   export a;
   }
   同样下面的 import 语句也会报语法错误
   function importSum() {
   import { sum } from './cal.js';
   }
   产生错误的原因是，ES6 的 import / export 只能通过静态方式确定导入或者导出的内容，无法动态引入模块。
   但在 ES2020 中引入了 import()函数，可以支持动态导入模块。

10. ES6module 重新导出
    重新导出导入的模块
    import { sum } from './math.js';
    export { sum };
    下面这个语法等同于上面
    export { sum } from './math.js';
    我们也可以使用别名进行重新导出
    export { sum as add } from './math.js';
    重新导出所有，我们可以使用*号
    export * from './cal.js';
    有的同学可能不知道这重新导出有什么作用，其实这作用还挺大的，比如我们写了 20 个组件，我们不想写 20 条 import 语句，只想写 1 条 import 语句，那么我们就可以建一个中间文件将这个 20 个组件引入，然后全部导出，然后我们在用的时候就一条 import 语句就好了，可以参考 ant design 的组件库的写法。

// 参考：https://github.com/vueComponent/ant-design-vue/blob/next/components/index.ts

import _ as components from './components';
import { default as version } from './version';
export _ from './components';

11. 匿名导入
    有时，我们会开发一个不需要指定名称导入的模块，如果我们想给原生 Array 增加一个方法
    // array.js
    if (!Array.prototype.contain) {
    Array.prototype.contain = function(e) {
    // ...
    }
    }
    接着，我们直接去 import 该模块，然后使用数组的 contain 方法
    import './array.js';
    [1,2,3].contain(2); // true

12. 默认导出
    一个模块只能有一个默认导出，一般来说默认导出更容易被导入，因为我们不需要再去看导入的变量、函数或者类的名称就可以导入，一般来说一个模块若只有一个导出我们可以使用默认导出。
    下面的 sort.js 模块默认导出一个函数
    // sort.js
    export default function(arr) {
    // 给数组排序
    }
    使用 sort.js 模块
    import sort from './sort.js';
    sort([2,1,3]);
    引入的 sort 就相当于 sort.js 模块中导出的默认函数。
    同样，在有默认导出的同时我们也可以导出其他函数
    // sort.js
    export default function(arr) {
    // 给数组排序
    }
    export function heapSort(arr) {
    // 堆排序
    }
    要从模块中导入默认导出和非默认导出我们要遵循下面的规则
    首先，默认导出要在最前面
    其他非默认导出，在后面用花括号导入
    比如这样
    import sort, { heapSort } from './sort.js';
    sort([2,1,3]);
    heapSort([3,1,2]);
    如果要别名默认导出，我们也可以使用 as 关键字，像这样
    import { default as quicksort, heapSort} from './sort.js';

13. AMD 和 CMD 区别

- RequireJS 在主文件里是将所有的文件同时加载，然而 SeaJS 强调一个文件一个模块。
- AMD 推崇依赖前置，CMD 推崇依赖就近。就是 AMD 在定义模块的时候要先声明其依赖的模块，CMD 没有这里严格的要求，它只要依赖的模块在附近就可以了
  // AMD
  define(['jquery'],function($){
    var  backButton=$('.backToTop');
  });
  // CMD
  define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
  // ...
  })
- AMD 和 CMD 最大的区别不是说上面的两点，而是他们俩对依赖模块的执行时机有所不同！！！对依赖模块的执行时机取决于他们的模块定义方式，AMD 推崇依赖前置，因此，JS 可以及其轻巧地知道某个模块依赖的模块是哪一个，因此可以立即加载那个模块；而 CMD 是就近依赖，它要等到所有的模块变为字符串，解析一遍之后才知道他们之间的依赖关系，这在别人看来是牺牲了性能换来开发的便利性。然而我要告诉你的是解析模块用的时间短的可以忽略不计，所以这又有什么关系呢？
  那么说了那么多，他们是怎么执行的呢？
  AMD 加载完模块后，就立马执行该模块；CMD 加载完某个模块后没有立即执行而是等到遇到 require 语句的时再执行。
  所以，他们两者的不同导致各自的优点是 AMD 用户体验好，因为模块提前执行了；CMD 性能好，因为只有用户需要的时候才执行。

########## http 协议 #########

1. cookie 属性：名、值、域名、路径、大小、httponly(为 true, http 请求头会有 cookie 信息，但不能通过 document.cookie 访问)、secure(设置是否只能通过 https 传递)、expires/Max-Age(不设置的话默认和 session 一起失效，浏览器关闭失效)

2. http 请求：
   http1 定义了 get\post\head
   http1.1 新增了 options、put、delete、trace、connect
   get 请求指定的页面信息，并返回实体主题；get 请求应该只是检索数据，并且不对数据产生其他影响；GET 请求可以缓存，浏览器历史记录可以查找 GET 请求；GET 请求有长度限制，仅用于请求数据；处理敏感数据不能用 get 请求
   HEAD 类似于 get 请求，只不过返回的响应中没有具体内容，用于获取报头；可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。
   POST 用于提交数据，例如提交表单或者上传文件，数据被包含在请求体中，POST 请求可能会导致新的资源建立或者已有资源修改；POST 请求不会被缓存，对数据长度没有限制，无法从浏览器历史记录中查到 POST 请求
   PUT 用发送的数据取代指定文档的内容；发送数据到服务器以创建或者更新资源，将包含的元素放在所提供的 URI 下，如果 URI 指示的是当前资源，则会被改变，如果 URI 未指示当前资源，则服务器可以使用该 URI 创建资源
   > idempotent 幂等的
   > 如果一个方法重复执行多次，产生的效果是一样的，那就是 idempotent 的；
   > idempotent 的意思是如果相同的操作再執行第二遍第三遍，結果還是一樣。
   > “Methods can also have the property of ‘idempotence’ in that (aside from error
   > or expiration issues) the side-effects of N > 0 identical requests is the same
   > as for a single request.”

POST 方法
用来创建一个子资源，如 /api/users，会在 users 下面创建一个 user，如 users/1；
POST 方法不是幂等的，多次执行，将导致多条相同的用户被创建（users/1，users/2 …
而这些用户除了自增长 id 外有着相同的数据，除非你的系统实现了额外的数据唯一性检查）

PUT 方法
PUT 比較正確的定義是 Replace (Create or Update)，
例如 PUT /items/1 的意思是替換 /items/1 ，如果已經存在就替換，沒有就新增；
因此，PUT 方法一般会用来更新一个已知资源，除非在创建前，你完全知道自己要创建的对象的 URI

http post put 区别
\*\*在 HTTP 中，PUT 被定义为 idempotent 的方法，POST 则不是，这是一个很重要的区别

举个栗子：
POST /api/articles
PUT /gists/:id/stars
如果产生两个资源，就说明这个服务不是 idempotent（幂等的），因为多次使用产生了副作用；
如果后一个请求把第一个请求覆盖掉了，那这个服务就是 idempotent 的。
前一种情况，应该使用 POST 方法；
后一种情况，应该使用 PUT 方法。

PATCH 方法
PATCH 方法是新引入的，是对 PUT 方法的补充，用来对已知资源进行局部更新
HTTP PATCH method require a feature to do partial resource modification.
The existing HTTP PUT method only allows a complete replacement of a document.

需要注意的地方
**语义**"而非 风格；是语义的问题，换句话说：
也就是这取决于这个 REST 服务的行为是否是 idempotent（幂等的）
// 但是这个只是在语义上，同时不要太苛求语义
DELETE 刪除，無論如何 资源 最後都将不复存在
// PUT 替換(新增或完整更新)
// PATCH 部分更新

DELETE 请求服务器删除 URI 指定的资源

CONNECT 是 1.1 中预留给将连接改为管道方式的代理服务器

OPTIONS 允许客户端查看服务器的性能；返回服务器针对特定资源所支持的 HTTP 请求方法，也可以利用向 web 服务器发送‘_’的请求来测试服务器的功能性；就是预检请求，用于检测服务器允许的 http 方法；发跨域请求前先发 OPTIONS 请求，即 CORS 预检请求，服务器接受该跨域请求，浏览器才继续发起正式请求；客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为"_"）使用该方法；不会触发 CORS 预检的请求成为简单请求，否则就是复杂请求

TRACE 用于回显服务器的请求，主要用于测试或者诊断；用于沿着目标资源的路径执行环回测试

1）方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码 405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码 501（Not Implemented）。
2）HTTP 服务器至少应该实现 GET 和 HEAD/POST 方法，其他方法都是可选的，此外除上述方法，特定的 HTTP 服务器支持扩展自定义的方法。

3. http2
   新的二进制格式（Binary Format），HTTP1.x 的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认 0 和 1 的组合。基于这种考虑 HTTP2.0 的协议解析决定采用二进制格式，实现方便且健壮。

多路复用（MultiPlexing），即连接共享，即每一个 request 都是是用作连接共享机制的。一个 request 对应一个 id，这样一个连接上可以有多个 request，每个连接的 request 可以随机的混杂在一起，接收方可以根据 request 的 id 将 request 再归属到各自不同的服务端请求里面。
HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

header 压缩，如上文中所言，对前面提到过 HTTP1.x 的 header 带有大量信息，而且每次都要重复发送，HTTP2.0 使用 encoder 来减少需要传输的 header 大小，通讯双方各自 cache 一份 header fields 表，既避免了重复 header 的传输，又减小了需要传输的大小。

服务端推送（server push），同 SPDY 一样，HTTP2.0 也具有 server push 功能。
服务端推送能把客户端所需要的资源伴随着 index.html 一起发送到客户端，省去了客户端重复请求的步骤。正因为没有发起请求，建立连接等操作，所以静态资源通过服务端推送的方式可以极大地提升速度

########## 跨域 #########

1. 带有 src 属性的标签都有跨域能力，比如 script,img,link,video、audio、iframe
   jsonp 只支持 get 请求，CORS 支持所有的请求方式

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
    paraArr.push(`callback=${cbName}`)
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

2. CORS 流程，JSONP 只支持 get 请求，推荐使用 CORS 方式跨域，流程：浏览器发头带 origin 源的请求->服务器看 origin 字段的请求头后，就在响应中添加 Access-Control-Allow-Origin 标头，指定请求来源（或者\*允许任何来源）->浏览器收到带 Access-Control-Allow-Origin 标头的响应后，会允许与客户端站点共享响应数据

3. 浏览器直接读取本地文件会存在跨域问题，起个本地服务器可以解决该问题；这是由于浏览器的保护机制，不允许访问本地文件。
   默认情况下，出于安全考虑，浏览器不允许访问本地文件。这是一件好事，你不应该试图绕过这种行为。

########## 浏览器的垃圾回收机制 #########

1. 浏览器内存，64 位的话 1.4G, 新生代 64M(From 和 To 分别为 32M), 32 位的都减半
   新生代使用 copy 的方式，使 From 和 To 互换，用空间换时间
   老生态使用标记清除或者标记整理（内存空间整理，有引用的对象在内存中变连续，覆盖垃圾对象）
   之前 V8 引擎使用的是全停顿标记法（垃圾回收一次全部标记，阻塞主线程时间就会比较久），现在使用增量标记和黑白灰三色标记法（一次只标记比如一层的少量对象，以前全停顿标记将存在引用的对象直接置黑，现在是每次少量一层的置灰，儿子置黑下次判断要不要置灰，下次扫描将上次灰色的地方作为临时根节点，从下一个黑色的地方开始扫描，将当前黑色置灰，并将和当前灰色关联的几个兄弟节点置黑、父节点置白，最终在使用对象都变白），这样垃圾回收和 js 主线程切换就变得频繁，每次时间垃圾回收时间都很短，页面无感知
   老的 IE 用过引用计数法，这个存在很多问题

手机的碎片整理，也是标记整理，堆是连续空间，大数组也会占用连续空间

2. 新生代如何晋升老年代
   From 中的对象有没经过 scavenge 回收也就是 copy 过一次（node 是 1 次，JVM 就是 15 次），如果没有 copy 过一次就会被 copy 到 To 这个半空间里；如果 copy 过一次，且 To 空间使用超过 25%的容量（也就是 8M）,满足了这两个条件，才会真正晋升到老生代，进入老生代就会比较稳定，一般情况就不会被清楚掉

3. 程序员到了一定年限要研究底层、源码，不能只是做做界面

4. V8 是如何处理变量（内存）的
   浏览器端查看内存指令：window.performance.memory
   node 端：process.memoryUsage() node 的内存可以扩展，但扩展的不是 V8 的内存，而是 C++内存；如果使用超过 2G，会爆掉，提示内存分配失败，javascript heap out of memory

5. V8 引擎优化，全局变量不能被清除，怎么解除 V8 内存的限制，max-old-space-size=2048M(默认值),例如改为 4096；max-new-space-size=102400KB（新生代用的是 KB）,很少改新生态的内存
   示例： node --max-old-space-size=4096 XX.js
   场景：上传大文件超过 2G,超过 V8 引擎限制会失败；npm run build 打包超过内存限制时，package.json 中 script 可以使用"build": node max-old-space-size=4096 build/build.js 也可以突破内存 2G 的限制，一般只能接受空闲内存的 75%

6. 全局变量和局部变量的区别：局部变量当程序执行结束，没有引用的时候就会消失；全局变量始终存活直到程序运行结束,也就是进程结束；多个大数组定义成局部变量就可以解决内存溢出的问题
   局部变量所在函数执行完后，先被标记，当内存不够时就会被整理
   程序执行的时候会看到卡顿的状态，就是 GC 的整理清除流程

########## 文档对象模型 DOM #########

1. dataset 自定义属性，html 元素上面的自定义属性 data 开头中划线分割，data-date-of-birth, jsDOM 读写的时候驼峰 el.dataset.dateOfBirth

########## 浏览器相关 #########

1. let start = performance.now(); let end = performance.now()
   可用于计算某段代码的执行时间

2. html 词法解析器：html 解析过程的输入是一串代码，这些代码通过标记化阶段，然后是树构建阶段，输出一个 document 对象
   标记化
   词法分析过程，将输入内容解析成多个标记
   包括起始标记，结束标记，属性名称，属性值
   标记生成器识别标记，传递给树构造器，然后接受下一个字符以识别下一个标记,如此反复直到输入的结束。标记化算法的输出结果是 html 标记

3. 浏览器内存泄露情况
   全局变量：顶层代码 window 环境下，变量使用后，无需再次使用，然而变量未释放空间；
   控制台打印：console.log()也是占用内存空间的；
   分离的 Dom 节点：已删除的 dom 节点，然而其引用未释放, 我们看到节点 innerBox 删除后，其引用还存在，应该在删除后将 innerBox=null，释放内存；
   闭包的不正确使用：将闭包使用后，应正确将其引用释放，赋值为 null；
   定时器未能及时关闭；
   绑定的事件组件卸载后未移除

4. 前端页面卡顿优化
   页面前端代码的性能瓶颈大多集中在 DOM 操作上
   首先，DOM 操作为什么会影响性能。在浏览器中，DOM 的实现和 ECMAScript 的实现是分离的。例如，在 IE 中，ECMAScript 的实现在 jscript.dll 中，而 DOM 的实现在 mshtml.dll 中；在 chrome 中使用 webkit 的 WebCore 处理 DOM 和渲染，但 ECMAScript 是在 V8 引擎中实现的，其他浏览器的情况类似，所以通过 Javascript 调用 dom 接口，是相当于两个模块的交互。相比较在同一模块中的调用，这种跨模块的调用其性能损耗是很高的，但 DOM 操作对性能影响最大是因为它导致了浏览器的重绘和重排
   方法一：合并多此 dom 操作为单次 dom 操作
   通过 class 类名来元素的大量样式更改，代码维护性较好。
   通过 innerHTML 接口来修改 DOM 元素的内容时，以字符串方式拼接好代码后，一次性赋值给
   DOM 元素的 innerHTML 接口。
   方法二： 把 DOM 元素离线或隐藏后修改
   把元素从页面流中脱离或隐藏，这样处理后，只会在 DOM 元素脱离或添加时，或者是隐藏或显示时才会造成页面的重绘会重排，对脱离了页面布局的 DOM 元素操作就不会导致页面的性能问题。
   这种方式适合需要大批量修改 dom 元素的情况。具体方式由三种：
   (1) 使用文档片段
   文档片段是一个轻量级的 document 对象，并不会和特定的页面关联，通过在文档片段上进行 DOM 操作，可以降低 DOM 操作对页面性能的影响，这种方式是创建一个文档片段，并在此片段上
   进行必要的 DOM 操作，操作完成后将它附加在页面中，对页面的影响只存在于最后把文档片段附加到页面的这一步操作上。
   var fragment=document.createDocumentFragment();
   //一些基于 fragment 的大量 dom 操作
   document.getElementById('myElement').appendChild(fragment);
   (2)隐藏元素
   通过隐藏元素，达到在页面上移除元素的效果，经过大量的 DOM 操作后恢复元素原来的 display 样式，只有隐藏和显示元素时会引起页面重绘或重排操作。
   var myElement=document.getElementById('myElement')；
   myElement.style.display='none';
   //dom 操作
   myElement.style.display='block';
   (3)克隆 DOM 元素到内存中
   把页面上的 DOM 元素克隆一份到内存中，然后在内存中操作克隆的元素，操作完成后使用此克隆元素替换页面中原来的 DOM 元素，只有替换元素时会影响性能,在内存中操作克隆元素不会引起页面上的性能损耗。
   var old=document.getElementById('myElement');
   var clone=old.cloneNode(true);
   //dom 操作
   old.parentNode.replaceChild(clone,old); 3.设置具有动画效果的 DOM 元素的 position 属性为 fixed 或 absolute
   把页面中具有动画效果的元素设置为绝对定位，使得元素脱离页面布局流，从未避免了页面频繁的重排，只涉及动画元素自身的重排。这种做法可以提高动画效果的展示性能。(在动画开始时将其设置为绝对定位，等动画结束后恢复原始的定位设置)。 4.谨慎获得 dom 元素的布局信息，变量本地化。
   把获取到的元素的布局信息值缓存在局部变量中。在有大量的 DOM 操作时，避免获取 dom 元素的布局信息，如果需要布局信息，最好在 DOM 操作之前就取好存放。 5.使用事件托管方式绑定事件
   在 DOM 元素上绑定事件或影响页面的性能，一方面，绑定事件本身会占用处理时间，另一方面，浏览器保存事件绑定也会占用内存。使用事件托管方式，即利用事件冒泡机制，只在父元素上绑定事件处理，用于处理所有子元素的事件，在事件处理函数中根据传入的参数判断事件源元素，针对不同的元素做不同的处理。这种方式有很大的灵活性，可以方便的添加或删除子元素，不需要考虑因元素移除或添加需要修改事件绑定。

5. 浏览器从输入 url 到响应经历了什么
   输入::
   用户在地址栏输入内容之后，浏览器会首先判断用户输入的是合法的 URL 还是搜索内容，如果是搜索内容就合成 URL，如果是合法的 URL 就开始进行加载
   发起 URL 请求::
   构建请求行：浏览器进程首先会构建请求行信息，然后通过进程间通信 IPC 将 URL 请求发送给网络进程。
   查找缓存：网络进程获取到 URL 之后，会先去本地缓存中查找是否有缓存资源，如果有则直接将缓存资源返回给浏览器进程，否则进入网络请求阶段。
   DNS 解析：网络进程请求首先会从 DNS 数据缓存服务器中查找是否缓存过当前域名的信息，有则直接返回，否则，会进行 DNS 解析域名对应的 IP 和端口号。
   等待 TCP 队列：chrome 有个机制，同一个域名同时最多只能建立 6 个 TCP 连接，如果超过这个数量的连接必须要进入排队等待状态。
   建立 TCP 连接：通过 TCP 三次握手与服务器建立连接，然后进行数据传输。
   发起 HTTP 请求：浏览器首先会向服务器发送请求行，请求行中包含了请求方法、请求 URI 和 HTTP 版本，还会发送请求头，告诉服务器一些浏览器的相关信息，比如浏览器内核、请求域名、Cookie 等信息。
   服务器处理请求：服务器首先返回相应行，包括协议版本和状态码，然后会返回响应头包含返回的数据类型，服务器要在客户端保存的 Cookie 等。
   断开 TCP 连接：数据传输完成后，通过四次挥手来断开连接。
   准备渲染进程::
   网络进程将获取的数据进行解析，根据响应头中的 Content-type 来判断响应数据的类型，如果是字节流类型，就将该请求交给下载管理器去下载，如果是 text/html 类型，就通知浏览器进程获取到的是 HTML，准备渲染进程。
   一般情况下浏览器的一个 tab 页面对应一个渲染进程，如果从当前页面打开的新页面并且属于同一站点，这种情况会复用渲染进程，其他情况则需要创建新的渲染进程。
   提交文档阶段::
   渲染进程准备好之后，浏览器会发出提交文档的消息给渲染进程，渲染进程收到消息后，会和网络进程建立数据传输的管道，文档数据传输完成后，渲染进程会返回确认提交的消息给浏览器进程。
   浏览器收到确认提交的消息后，会更新浏览器的页面状态，包括了安全状态，地址栏的 URL，前进后退的历史状态，并更新 web 页面为空白。
   页面渲染阶段::
   文档提交之后，渲染进程将开始页面解析并加载子资源。
   构建 DOM 树：HTML 经过解析后输出的是一个以 document 为顶层节点的树状结构的 DOM。
   样式计算：将从 link 标签引入的外部样式，style 标签里的样式和元素身上的样式转换成浏览器能够理解的样式表，然后将样式表中的属性值进行标准化，例如 color:red 转换为 color 的 rgb 形式，然后根据 CSS 的继承和层叠规则计算出 DOM 树种每个节点的具体样式。
   布局阶段：会生成一棵只包含可见元素的布局树，然后根据布局树的每个节点计算出其具体位置和大小。
   分层：对页面种的复杂效果例如 3D 转换，页面滚动或者 z 轴排序等生成图层树。
   绘制：为每个图层生成绘制列表，并将其提交到合成线程中。
   光栅化：优先选择可视窗口内的图块来生成位图数据。
   合成：所有图块都被光栅话之后开始显示页面。

DNS 解析中端口需要 DNS 解析吗？
不需要，因为 HTTP 默认的是 80 端口，HTTPS 默认的是 443 端口，如果要指定端口可以直接在 URL 里面添加。
哪些阶段可以优化？
优化 DNS 查询：DNS 预解析
优化 TCP 连接：可以通过请求头 keep-alive 来优化。
优化 HTTP 响应报文：通过 CDN 和 Gzip 压缩。

########## 前端优化 #########

1. 图片加载过多问题
   加载的图片太多或者太大导致页面加载完成慢的问题；图片太多导致向服务器请求的次数太多,图片太大导致每次请求的时间过长,导致用户长时间等待。

一.大量图片加载优化方案 1.将图片服务和应用服务分离(从架构师的角度思考)
对于服务器来说,图片始终是最消耗系统资源的,如果将图片服务和应用服务放在同一服务器的话,应用服务器很容易会因为图片的高 I/O 负载而崩溃,所以当网站存在大量的图片读写操作时,建议使用图片服务器。浏览器在同一时间对同一域名下的资源的并发请求数目是有限制的,一般在 2-6 之间,超过限制数目的请求就会被阻塞. 2.图片压缩方案
我们可以借助一些第三方软件来进行压缩,压缩后分辨率不变,肉眼看不失真；
我们项目中对使用的图片基本都会进行压缩再上传。 3.图片懒加载
图片懒加载,简单来说就是在页面渲染过程中,图片不会一次性全部加载,会在需要的时候加载,比如当滚动条滚动到某一个位置时触发事件加载图片。
为优化回流，可以先设置占位符
实现方案一
document.documentElement.clientHeight//获取屏幕可视区域的高度
document.documentElement.scrollTop//获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
element.offsetTop//获取元素相对于文档顶部的高度
如果：clientHeight+scrollTop>offsetTop，则图片进入了可视区内，则被请求。
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
我们滚动条向下滚动的时候，bound.top 值会变得越来越小，也就是图片到可视区顶部的距离也越来越小，所以当 bound.top == clientHeight 时，说明土片马上就要进入可视区了，只要我们在滚动，图片就会进入可视区，那么就需要请求资源了。也就是说，在 bound.top<=clientHeight 时，图片是在可视区域内的。
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
可以用雪碧图、字体图标、base64 等，这样可以有效减少连接数

5.http2 解决连接数限制
http2 一个站点只有一个连接。每个请求为一个流，每个请求被分为多个二进制帧，不同流中的帧可以交错的发送，实现多路复用。这就解决了连接数限制的问题

2. 图片过大优化方案
   如果是相册之类的可以预加载，在展示当前图片的时候，就加载它的前一个和后一个图片
   加载的时候可以先加载一个压缩率非常高的缩略图，以提高用户体验,点击再或加载到之后再查看清晰图
   使用渐进式 jpeg，会提高用户体验
   如果展示区域小于图片的真实大小，可以在服务端先压缩到合适的尺寸
   通过 link 标签 preload 预加载<link rel="preload" href="./img/all.jpg" as="image" />添加上后，浏览器会在渲染前先加载完图片，这样图片在显示时会整张地显示
   图片拆分,现在大图片是 5MB，可以拆成了 9 个 400 多 KB 的小图片
   图片 onload 前用其他样式代替, img 在渲染完成后会触发 onload 事件，那么我们可以先设置图片为隐藏，放一个图片或者 loading 进行过渡，然后在图片触发 onload 事件之后，进行切换
   背景颜色,给图片的包裹元素提前设置一个与这个图片整体色调相符的背景颜色
   另外有些 cdn 也可以通过 query 参数获得模糊的图片，这样我们就可以实现模糊到清晰的渐进加载
   转 base64，适用于小图片

## js中错误类型
js中的控制台的报错信息主要分为两大类，第一类是语法错误，这一类错误在预解析的过程中如果遇到，就会导致整个js文件都无法执行。另一类错误统称为异常，这一类的错误会导致在错误出现的那一行之后的代码无法执行，但在那一行之前的代码不会受到影响。

工具/原料
JavaScript
方法/步骤
1
SyntaxError：语法错误

JavaScript中的六种错误类型
2
Uncaught ReferenceError：引用错误

引用一个不存在的变量时发生的错误。将一个值分配给无法分配的对象，比如对函数的运行结果或者函数赋值。

JavaScript中的六种错误类型
3
RangeError：范围错误

RangeError是当一个只超出有效范围时发生的错误。主要的有几种情况，第一是数组长度为负数，第二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。

JavaScript中的六种错误类型
4
TypeError类型错误

变量或参数不是预期类型时发生的错误。比如使用new字符串、布尔值等原始类型和调用对象不存在的方法就会抛出这种错误，因为new命令的参数应该是一个构造函数。

JavaScript中的六种错误类型
5
URIError，URL错误

主要是相关函数的参数不正确。

JavaScript中的六种错误类型
6
URI相关参数不正确时抛出的错误，主要涉及encodeURI、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape(）六个函数。

 EvalError eval()函数执行错误

在ES5以下的JavaScript中，当eval()函数没有被正确执行时，会抛出evalError错误。

例如下面的情况：

JavaScript中的六种错误类型
7
需要注意的是：ES5以上的JavaScript中已经不再抛出该错误，但依然可以通过new关键字来自定义该类型的错误提示。

以上的6种派生错误，连同原始的Error对象，都是构造函数。开发者可以使用它们，认为生成错误对象的实例。

JavaScript中的六种错误类型
8
第一个参数表示错误提示信息，第二个是文件名，第三个是行号。
########## 异常 #########

1. try catch 缺点：只能捕获同步运行时的错误，不能捕获语法级别的错误和异步错误
   try {
   let name = "aaa"
   console.log(nam)
   } catch(e) {
   console.log('捕获到异常', e) // 捕获到异常, ReferenceError
   }
   try {
   let name = "aaa // 注意写字符串的时候写成了单引号，不能捕获语法级别的错误, js 解析器不会执行下面代码块的，catch 不到，window.onerror 也捕获不到；开发阶段编辑器一般会帮我们解决语法错误
   console.log(nam)
   } catch(e) {
   console.log('捕获到异常', e)
   }
   Uncaught SyntaxError:
   try {
   setTimeout(() => { // 对于异步回调来说它是不属于 try catch 块的
   throw new Error('async error')
   } ,1000)
   } catch(e) {
   console.log('捕获到异常', e)
   }
   Uncaught Error:

2. window.onerror 能力强一些，属于一种全局捕获的一种方式，同步异步都能捕获到，获取到的信息比较详细（异常信息，异常文件 url, 行号，列号，异常堆栈信息；但对于跨域的 js 资源，window.onerror 是拿不到详细信息的，需要往这个资源的头部添加一些额外的信息；需要放到 js 文件的最前面，放后面的话前面的异常就捕获不到；另外捕获不到网络异常的错误，比如网络静态资源加载的错误

3. window.addEventListener('error') 信息没有 window.onerror 丰富，常用于捕获网络资源出错的情况，比如监控图片加载异常，js/css 加载异常；window.addEventListener 和 window.onerror 同时用的时候注意异常捕获的去重，因为他们都能捕获 js 异常的错误

4. window.addEventListener('unhandledrejection') 捕获异步错误的一种方式，常用于捕获 promise 没有去 catch 的错误；为了捕获漏掉的 promise 异常，一般要加一个全局异步错误的捕获方式

5. iframe 异常， window.frame[0].onerror

6. 崩溃和卡顿
   卡顿就是 js 不能及时的去执行这些代码，崩溃是网页已经崩了 js 不运行了
   用 load 或者 beforeload 事件，或者 service worker 来执行网页崩溃的监控

7. 第三方库本身的那种异常捕获能力
   Vue.config.errorHandler
   React ErrorBoundary

## jsdom

1. remove
   remove 与 empty 一样，都是移除元素的方法，但是 remove 会将元素自身移除，同时也会移除元素内部的一切，包括绑定的事件及与该元素相关的 jQuery 数据。
   例如一段节点，绑定点击事件
   如果不通过 remove 方法删除这个节点其实也很简单，但是同时需要把事件给销毁掉，这里是为了防止"内存泄漏"，所以前端开发者一定要注意，绑了多少事件，不用的时候一定要记得销毁
   通过 remove 方法移除 div 及其内部所有元素，remove 内部会自动操作事件销毁方法，所以使用使用起来非常简单
2. JS 删除 DOM 元素的两种方法
   删除子节点
   var box=document.getElementById("box");
   box.parentNode.removeChild(box);
   删除自身
   var box=document.getElementById("box");
   box.remove();

## 单点登录

- sso 需要一个独立的认证中心，只有认证中心能接受用户的用户名密码等安全信息，其他系统不提供登录入口，只接受认证中心的间接授权。间接授权通过令牌实现，sso 认证中心验证用户的用户名密码没问题，创建授权令牌，在接下来的跳转过程中，授权令牌作为参数发送给各个子系统，子系统拿到令牌，即得到了授权，可以借此创建局部会话，局部会话登录方式与单系统的登录方式相同。

## 前后端交互

1. 表单数据的「媒体类型」编码一般为 application/x-www-form-urlencoded。
   但包含文件的表单编码为 multipart/form-data

########## 新概念 #########

1. pnpm 新的依赖管理工具，比 npm、yarn 快两倍

2. Monorepo 单体代码仓库
