1. nth-child 和 nth-of-type
   ele:nth-child(n)是指父元素下的第 n 个元素且是 ele 的元素
   ele:nth-of-type(n)是指父元素下第 n 个 ele 类元素
   n 是从 1 开始的
   浅谈逻辑选择器 is、where、not、hash
   https://mp.weixin.qq.com/s/Y-B4v2mCI66JP63UI_05rA

2. flex 实现两个内层盒子分别局于左上角和右下角

```
.wrapper {
    display: flex
    justify-content: space-between  // 水平对齐方式
}
.inner2 {
    align-self: flex-end
}
```

3. BFC
   概念及作用：块级格式化上下文，相当于一个隔离容器，BFC 块的内外部互不影响
   产生 BFC 的方式：html 根元素和包含根元素的元素；float(!=none);position: absolute/fixed;display(flex、inline-block 等);
   常见应用场景：盒子的外边距合并问题；清除浮动（浮动的子元素无法撑起父元素，外部元素设置为 overflow:hidden 或者 display:flow-root 无副作用）
   延伸：display: flow-root 可以将元素变成具备 BFC 的块级元素

4. css var 语法
   var(custom-property-name, value)
   custom-property-name 必需。自定义属性的名称，必需以 -- 开头。
   value 可选。备用值，在属性不存在的时候使用。
   :root {
   --main-bg-color: coral;
   --main-txt-color: blue;
   --main-padding: 15px;
   }
   #div1 {
   background-color: var(--main-bg-color);
   color: var(--main-txt-color);
   padding: var(--main-padding);
   }

5. css 过渡和动画的区别
   css 过渡需要触发条件（常用鼠标移动到：hover），动画不需要触发条件
   transition 只有起始两个状态（一般用在比较简单的效果上，不过可以很好的和 js 结合，比如结合定时器实现循环效果；而 animation 可以通过设置 infinite 来实现遍历循环，不能很好与 js 结合），不能在 transition 上直接设置和修改属性，只能在选择器上设置 css 属性，然后在 transition 上设置要全部过渡还是具体属性过渡
   animation 状态可以精确到非常多个，有百分比控制，而且可以在关键帧上设置和修改 css 属性
   transition 子属性一般也就 3-4 个，只能实现简单的动画
   animation 子属性就比较多了

6. calc 应用场景
   图片垂直水平居中, calc 支持不同单位混合计算，而且一次可以进行多个运算，也是可以进行嵌套运算
   img {
   height: 250px;
   weight: 400px;
   padding-top: calc(50vh - 250px / 2);
   padding-left: calc(50vh - 400px / 2);
   }
   最小外边距
   div { // 这样托拉的时候外边距会一直存在，只会对目标进行压缩
   width: calc(100% - 200px)
   }

7. 设置渐变色
   deg 是角度单位，0-360 度
   body {
   --t: 20deg; // 方便同一修改
   background:
   linear-gradient(calc(var(--t) _ 10), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
   linear-gradient(calc(var(--t) _ 20), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
   linear-gradient(calc(var(--t) \* 30), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
   }

## zoom: 1
zoom:1确实帮我们解决了不少ie下的bug，但是它的来龙去脉，又有多少人知道呢？
所以我老生常谈，说一下它的来龙去脉。
Zoom属性是IE浏览器的专有属性， 它可以设置或检索对象的缩放比例。
在平常的css编写过程中，zoom:1能够比较神奇地解决ie下比较奇葩的bug。
譬如外边距（margin）的重叠，譬如浮动的清除，譬如触发ie的 haslayout属性等等。
度娘告诉我们：zoom是 设置或检索对象的缩放比例。设置或更改一个已被呈递的对象的此属性值将导致环绕对象的内容重新流动。（没看懂）
虽然此属性不可继承，但是它会影响对象的所有子对象( children )。这种影响很像 background 和 filter 属性导致的变化。
此属性对于 currentStyle 对象而言是只读的，对于其他对象而言是可读写的。（没看懂）
（重点）当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。
Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中，也就是CSS3中的transform: scale这个属性来实现
用法：ie下子元素浮动时候父元素不随着自动扩大的问题，使用下面的CSS写法
.父元素 {   overflow: auto; zoom: 1   },