<!--
 * @Author: your name
 * @Date: 2022-03-08 09:51:39
 * @LastEditTime: 2022-05-30 14:54:35
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/js题库.md
-->

1. js 数据类型
   1.1 通常认为会有 10 种
   1.2 js7 种基本数据类型：Undefined, Null, Number, String, Boolean, Symbol(Es6), BigInt(Es10)
   1.3 3 种引用数据类型：Function, Array, Object，其实 Array、Date、RegExp 等数据类型都可以理解成 Object 类型的子类
   1.4 Symbol: 类似字符串的唯一标识（唯一性），可用于标识对象属性，即使两次调用传参相同值也不同，要想保证相同两次都调用 Symbol.for('name')；隐藏性，Object.keys()、for...in 无法访问, Object.getOwnPropertySymbols()可访问(返回所有 Symbol 属性的数组)
   1.5 BigInt 可以安全的存储和处理任意精度的整数
   1.6 基本数据类型存储在栈中，占据空间小、大小固定，属于频繁使用的数据；引用数据类型存储在堆中，占据空间大，大小不固定，解释器查找时，会先找栈中存储的堆地址

2. 栈、堆，及二者联系区别？
   2.1 在数据结构中，栈先进后出；堆是树形数据结构
   2.2 在操作系统中，栈区由编译器自动分配释放，常用于存储函数的局部变量和参数等；堆区由程序员分配释放，如果不主动释放，可能会在程序结束时由垃圾回收机制处理
   2.3 缓存方式：栈使用一级缓存，一般函数调用完毕立即释放；堆使用二级缓存，生命周期由垃圾回收算法决定，速度慢一些

3. 内部属性[[Class]]
   3.1 所有 typeof 返回值为”object“的对象都有[[Class]]的内部属性，可以看做一种对象的分类方式，区别于面向对象的类
   3.2 访问方式，无法直接访问，一般通过 Object.prototype.toString(..)来访问，例如 Object.prototype.toString.call(/../i)返回"[object RegRex]"
   3.3 自定义的类访问返回默认的 Object 标签，例如 Object.prototype.toString(new Class1())返回”[object, Object]“;若需要访问自定类的定制内部属性[[Class]], 需要在类内增加方法

```
class Class1 {
    get [Symbol.toStringTag]() {
        return "Class1"
    }
}
```

4. js 内置对象
   程序执行前由 js 定义的全局值属性（Infinity, NaN, undefined 等）、函数（eval、ParseInt、ParseFloat）和构造函数(Date、Object), 还有提供数学计算的单体内置对象如 Math 对象
Number("1px")
NaN
Number("1")
1
parseInt("1px")
1
5. undefined 和 undeclared 的区别？
   5.1 undefined 声明了但未定义（或者叫未赋值）；undeclared 表示变量未声明
   5.2 未声明的变量，引用后会报错，ReferenceError: .. is not defined; typeof 未声明的变量或者已声明未定义的变量会返回 undefined

6. null 和 undefined 的区别
   6.1 Null 和 Undefined 都是基本数据类型，都有唯一值 null 和 undefined
   6.2 undefined 代表变量声明但未定义；null 代表空对象，常用于初始化可能是对象的变量
   6.3 typeof null 得到"object"
   6.4 二者双等号返回 true，三等号返回 false
   6.5 undefined 在 js 不是保留字，但不要声明变量名为 undefined(目前测试 chrome 控制台内不能定义 undefined 为变量名，会报错); void 0 可以得到 undefined 值

7. 如何安全的获取 undefined 值？
   表达式 void ...没有返回值，返回结果是 undefined, 通常用 void 0 来获取 undefined

8. js 原型、原型链？及特点？
   js 原型：构造函数有个属性叫 prototype, 该属性是个对象，包含构造函数创建的实例所共享的属性和方法；实例有个**proto**属性指向原型，浏览器都实现了这个属性，但不属于规范中规定的属性，不建议使用；ES5 中 Object.getPrototypeOf(..)可以获得实例的原型
   原型链：访问对象的属性时，若对象内部不存在这个属性，则在原型里找，原型里找不到的，继续在原型的原型里找，一直找到原型链的尽头 Object.prototype 为止
   特点：构造函数创建对象时，不会创建原型的副本，所以我们修改原型时，相关对象或者实例也会集成这些修改。

9. toFixed 从小数点开始四舍五入取整，toPrecision 从第一个不为零的数开始四舍五入，Math.round 四舍五入到整数
   1.278.toFixed(2)
   '1.28'
   Math.round(1.278)
   1
   Math.round(1.578)
   2
   1.278.toPrecision(2)
   '1.3'

本文主要对js中Number()、parseInt()和parseFloat()的区别进行详细介绍。

一：Number()
Number() 函数把对象(Object)的值转换为数字。

语法Number(object)

参数 描述 object 必需，JavaScript 对象。

1、如果是Boolean类型，true和false值将分别被转换为1和0。
2、如果是数字值，只是简单的传入和返回。
3、如果是null值，返回0。
4、如果是undefined，返回NaN。
5、如果是字符串：
如果字符串中只包含数字时，将其转换为十进制数值，忽略前导0；
如果字符串中包含有效浮点格式，如“1.1”，将其转换为对应的浮点数字，忽略前导0；
如果字符串中包含有效的十六进制格式，如“0xf”，将其转换为相同大小的十进制数值；
如果字符串为空，将其转换为0；
如果字符串中包含除上述格式之外的字符，则将其转换为NaN；
6、如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再依照前面的规则转换返回的字符串值。

例：

var num1 = Number("Hello world");　　　　　　 //NaN
var num2 = Number("");　　　　　　　　　　　　//0
var num3 = Number("0000011");　　　　　　　 //11
二：parseInt()
parseInt() 函数将字符串(String)类型转为整数类型。
语法
parseInt(string, radix)
参数 描述
string 必需，要被解析的字符串。
radix 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。
如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
处理整数的时候parseInt()更常用。parseInt()函数在转换字符串时，会忽略字符串前面的空格，直至找到第一个非空格字符。
1、如果第一个字符不是数字或者负号，parseInt() 就会返回NaN，同样的，用parseInt() 转换空字符串也会返回NaN。
2、如果第一个字符是数字字符，parseInt() 会继续解析第二个字符，直到解析完所有后续字符串或者遇到了一个非数字字符。
parseInt()方法还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。
基是由parseInt()方法的第二个参数指定的，所以要解析十六进制的值，当然，对二进制、八进制，甚至十进制（默认模式），都可以这样调用parseInt()方法。

例：

var num1 = parseInt("AF",16);　　　　　　 　　　　// 175
var num2 = parseInt("AF");　　　　　　　　　　// NaN
var num3 = parseInt("10",2);　　　　　 　　 // 2　　(按照二进制解析)
var num4 = parseInt("sdasdad");　　　　　　　// NaN
三：parseFloat()

parseFloat() 函数可解析一个字符串，并返回一个浮点数。

语法
parseFloat(String)
参数 描述
String 必需，要被解析的字符串。
与parseInt() 函数类似，parseFloat() 也是从第一个字符（位置0）开始解析每一个字符。也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。
也就是说，字符串中第一个小数点是有效的，而第二个小数点就是无效的了，它后面的字符串将被忽略。
parseFloat() 只解析十进制，因此它没有第二个参数指定基数的用法。
如果字符串中包含的是一个可解析为正数的数（没有小数点，或者小数点后都是零），parseFloat() 会返回整数。
例：

var num1 = parseFloat("123AF");　　　　　　 　　　　// 123
var num2 = parseFloat("0xA");　　　　　　　　 　　// 0
var num3 = parseFloat("22.5");　　　　　　　　　 // 22.5
var num4 = parseFloat("22.3.56");　　　　　　　　// 22.3
var num5 = parseFloat("0908.5");　　　　　　　　 // 908.5
parseInt() 和parseFloat() 的区别在于：

1、parseFloat() 所解析的字符串中第一个小数点是有效的，而parseInt() 遇到小数点会停止解析，因为小数点并不是有效的数字字符。
2、parseFloat() 始终会忽略前导的零，十六进制格式的字符串始终会被转换成0，而parseInt() 第二个参数可以设置基数，按照这个基数的进制来转换。
## js 数组

1. find()方法用于查找数组中符合条件的第一个元素，如果没有符合条件的元素，则返回 undefined
注意：
find() 对于空数组，函数是不会执行的。
find() 并没有改变数组的原始值。

2. 求数组中最小数的值
Math.min.apply(null, arr)
Math.min(...arr)
求最小项对应的索引
arr.indexOf(Math.min(...arr))

########## Object 方法 #########

1. Object.assign（）用法
   Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
   Object.assign 方法实行的是浅拷贝，而不是深拷贝。目标对象拷贝得到的是这个对象的引用
   语法：Object.assign(target, …sources)
   Object.assign（）合并对象时，若存在键名相同，值不同，则以合并后的值（ccc）该键的值为源对象（bbb）的值，且目标对象（aaa）的值也改变了

########## 字符串 #########

1. js 字符串转数组，'a,b,c'.split(',') ,python 中一样
   js 中数组转字符串，['a', 'b', 'c'].join(','), python 中','.join(['a', 'b', 'c'])
   js 是 A 转 B，都是调用 A 的方法，而 python 中都是调用字符串的方法

## 变量

1. 变量赋值
   给两个变量同时赋值，会先赋值左边第一个，再赋值第二个

```javascript
cache = import.meta.hot.data.cache = {
  amount: import.meta.hot.data.cache ? import.meta.hot.data.cache.account : 0,
};
```

2. 深拷贝
   js 深拷贝 deepCopy：支持循环引用、类型不丢失、可扩展、可定制
   开发中，经常需要对一个对象进行深拷贝操作，目前经常用到的深拷贝的方式有以下几种：
   将对象序列化成 JSON 字符串后，再反序化成对象 let copy = JSON.parse(JSON.stringify(value))
   第三方库提供的深拷贝工具，如 Lodash 的 _.cloneDeep(value) 和 _.cloneDeepWith(value, customizer)
   但这些方法有以下缺点：
   不支持对象成员循环引用
   拷贝后会丢失类型信息，变成了普通的对象
   拷贝后会丢失成员引用关系信息
   不能根据类型自定义拷贝规则
   只能拷贝可枚举的属性
   不能拷贝函数
   不能指定拷贝深度
   为了解决这些问题，deep-copy 就出现了 👏
   deep-copy 是一个深拷贝工具，可对任意数据进行深度拷贝，包括 函数 function、正则 RegExp、Map、Set、Date、Array、URL 等等；支持含循环引用关系的对象的拷贝，并且不会丢失成员的引用关系信息 和 类型信息，支持扩展，可根据数据类型定制拷贝逻辑，也可指定拷贝深度；所以，通过它可实现对任意类型的数据进行任意想要的拷贝；
   具有以下特性：
   支持对象成员循环引用
   拷贝后不会丢失类型信息 和 成员引用关系信息
   可指定拷贝深度
   即能拷贝可枚举的成员，也可拷贝不可枚举的成员
   可拷贝函数
   可根据类型自定义拷贝规则
   支持预设拷贝规则
   支持创建多个不同预设拷贝规则的拷贝函数

## 网络

### socket

1. 什么是 socket?
   独立于具体协议的网络编程接口,在 OSI 模型中主要位于会话层和传输层之间
2. socket 类型

- 流式套接字 （SOCK_STREAM） TCP
  提供一个面向连接、可靠的数据传输服务，数据无差错、无重复发送并按顺序抵达。内设流量控制，避免数据流淹没前面的数据。数据被查看时字节流，无长度限制。
- 数据报套接字（SOCK_DGRAM） UDP
  提供无连接服务，数据包以独立数据包形式被发送，不提供无差错保证，数据有可能丢失或重复到达，顺序发送可能会乱序接收
- 原始套接字（SOCK_RAW）
  可以直接访问较低层次的协议例如 IP\ICMP。

### 端口

用于区分一台主机中接收到的数据包应该转交给哪一个进程进行处理。
TCP 端口号与 UDP 端口号是相互独立的
端口号一般由 IANA(Internet Assigned Numbers Authority) 统一管理
众所周知端口： 1 - 1023 （1-25 之间为众所周知的端口 ， 256 - 1023 为 UNIX 系统占用）
何为总所周知端口其实就是早已固定号的端口比如 80 端口分配给 WWW 服务，21 端口分配给 FTP 服务等
注册端口： 1024 -49151 分配给进程或者应用。这些端口号在还没有被服务器资源占用时，可以由用户的 APP 动态注册获得。
动态端口号：49152 - 65535 被称为动态端口号一般不固定分配某种服务而是动态分配的。一般可以使用 65000 以上的就可以随便用

## 事件

### onload、load、ready 的区别

1. window.load 这个应该只是代表事件方法，但并未执行，好比 hover、click 表示事件，但它并未执行，必须用上 hover、onclick 他才会执行；在页面加载渲染的时候一般会有一个 Loading 效果，这时就能够用它了；$(window).load(function)页面当中的图片和其余资源加载完成以后才会执行
2. window.onload(function)中的这个方法可能会在某些资源（如图片）未加载彻底就执行，且在页面只容许出现一个 onload 函数，由于它可编函数个数只有一个
3. 说完以上还有一个 Jquery 的$(document).ready(function),网页中的全部DOM结构绘制完毕后就执行，可能DOM元素关联的内容没有加载完，例如图片以及设置的相关高度宽度等，这时能够考虑jquery中的load方法规避;另外$(document).ready(function)可编写函数不限

## 浏览器渲染

引入
面试中可能会经常会碰到怎么解决动画卡顿的问题，然后会引导到硬件加速。那么究竟什么是硬件加速，为什么它可以提高咱们的动画效率？我们今天就来一探究竟。
首先，我们先从 CPU 和 GPU 开始了解。
CPU 和 GPU 的区别
CPU 即中央处理器，GPU 即图形处理器。
CPU 是计算机的大脑，它提供了一套指令集，我们写的程序最终会通过 CPU 指令来控制的计算机的运行。它会对指令进行译码，然后通过逻辑电路执行该指令。整个执行的流程分为了多个阶段，叫做流水线。指令流水线包括取指令、译码、执行、取数、写回五步，这是一个指令周期。CPU 会不断的执行指令周期来完成各种任务。
GPU，是 Graphics ProcessingUnit 的简写，是现代显卡中非常重要的一个部分，其地位与 CPU 在主板上的地位一致，主要负责的任务是加速图形处理速度。GPU 是显卡的“大脑”，它决定了该显卡的档次和大部分性能，同时也是 2D 显示卡和 3D 显示卡的区别依据。2D 显示芯片在处理 3D 图像和特效时主要依赖 CPU 的处理能力，称为“软加速”。3D 显示芯片是将三维图像和特效处理功能集中在显示芯片内，也即所谓的“硬件加速”功能。
每一帧的执行步骤
一般浏览器的刷新率为 60HZ，即 1 秒钟刷新 60 次。
1000ms / 60hz = 16.6 ，也就是大概每过 16.6ms 浏览器就会渲染一帧画面。
浏览器对每一帧画面的渲染工作都要在 16ms 内完成，超出这个时间，页面的渲染就会出现卡顿现象，影响用户体验。
简单概括下，浏览器在每一帧里会依次执行以下这些动作：
JavaScript：JavaScript 实现动画效果，DOM 元素操作等。
Style（计算样式）：确定每个 DOM 元素应该应用什么 CSS 规则。
Layout（布局）：计算每个 DOM 元素在最终屏幕上显示的大小和位置。由于 web 页面的元素布局是相对的，所以其中任意一个元素的位置发生变化，都会联动的引起其他元素发生变化，这个过程叫 reflow。
Paint（绘制）：在多个层上绘制 DOM 元素的的文字、颜色、图像、边框和阴影等。
Composite（渲染层合并）：按照合理的顺序合并图层然后显示到屏幕上。
减少或者避免 layout，paint 可以让页面减少卡顿，动画效果更加流畅。
完整的渲染流程
更具体一些，一个完整的渲染步骤大致可总结为如下：
渲染进程将 HTML 内容转换为能够读懂的 DOM 树结构。
渲染引擎将 CSS 样式表转化为浏览器可以理解的 styleSheets ，计算出 DOM 节点的样式。
创建布局树，并计算元素的布局信息。
对布局树进行分层，并生成分层树。
为每个图层生成绘制列表，并将其提交到合成线程。
合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
合成线程发送绘制图块命令 DrawQuad 给浏览器进程。
浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上
普通图层和复合图层
上面的介绍中，提到了 composite 概念。
可以简单的这样理解，浏览器渲染的图层一般包含两大类：渲染图层（普通图层）以及复合图层
渲染图层：又称默认复合层，是页面普通的文档流。我们虽然可以通过绝对定位，相对定位，浮动定位脱离文档流，但它仍然属于默认复合层，共用同一个绘图上下文对象（GraphicsContext）。
复合图层，它会单独分配资源（当然也会脱离普通文档流，这样一来，不管这个复合图层中怎么变化，也不会影响默认复合层里的回流重绘）
某些特殊的渲染层会被提升为复合成层（Compositing Layers），复合图层拥有单独的 GraphicsLayer，而其他不是复合图层的渲染层，则和其第一个拥有 GraphicsLayer 父层共用一个。
每个 GraphicsLayer 都有一个 GraphicsContext，GraphicsContext 会负责输出该层的位图，位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多个位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上。
可以 Chrome 源码调试 -> More Tools -> Rendering -> Layer borders 中看到，黄色的就是复合图层信息。
硬件加速
硬件加速，直观上说就是依赖 GPU 实现图形绘制加速，软硬件加速的区别主要是图形的绘制究竟是 GPU 来处理还是 CPU，如果是 GPU，就认为是硬件加速绘制，反之，则为软件绘制。
一般一个元素开启硬件加速后会变成复合图层，可以独立于普通文档流中，改动后可以避免整个页面重绘，提升性能。
常用的硬件加速方法有：
最常用的方式：translate3d、translateZ
opacity 属性/过渡动画（需要动画执行的过程中才会创建合成层，动画没有开始或结束后元素还会回到之前的状态）
will-change 属性（这个知识点比较冷僻），一般配合 opacity 与 translate 使用（而且经测试，除了上述可以引发硬件加速的属性外，其它属性并不会变成复合层），作用是提前告诉浏览器要变化，这样浏览器会开始做一些优化工作（这个最好用完后就释放）
<video>、<iframe>、<canvas>、<webgl>等元素
其它，譬如以前的 flash 插件
当然，有的时候我们想强制触发硬件渲染，就可以通过上面的属性，比如
will-change: transform;  
或者
transform:translate3d(0, 0, 0);
使用硬件加速的注意事项
使用硬件加速并不是十全十美的事情，比如：
内存。如果 GPU 加载了大量的纹理，那么很容易就会发生内容问题，这一点在移动端浏览器上尤为明显，所以，一定要牢记不要让页面的每个元素都使用硬件加速。
使用 GPU 渲染会影响字体的抗锯齿效果。这是因为 GPU 和 CPU 具有不同的渲染机制。即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。
所以不要大量使用复合图层，否则由于资源消耗过度，页面可能会变的更加卡顿。
同时，在使用硬件加速时，尽可能的使用 z-index 设置大点，防止浏览器默认给后续的元素创建复合层渲染。
具体的原理是这样的：
webkit CSS3 中，如果一个元素添加了硬件加速，并且 z-index 层级比较低，那么在这个元素的后面其它元素（层级比这个元素高的，或者相同的，并且 releative 或 absolute 属性相同的），会默认变为复合层渲染，如果处理不当会极大的影响性能。
简单点理解，其实可以认为是一个隐式合成的概念：如果 a 是一个复合图层，而且 b 在 a 上面，那么 b 也会被隐式转为一个复合图层，这点需要特别注意。

## 异常
try 可以有 return，catch/finally 也可以有 return，如果这个抛异常那个 return 会怎么样呢

catch 中的异常会覆盖 try 中的异常和 return
catch 中的 return 会覆盖 try 中的异常和 return
finally 中的异常会覆盖 try/catch 中的异常和 return
finally 中的 return 会覆盖 try/catch 中的异常和 return
try/catch/finally 块中异常或 return 之后的代码不会被执行
