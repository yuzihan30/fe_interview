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

### css属性unset
CSS 关键字 initial、inherit 和 unset
名如其意，unset 关键字我们可以简单理解为不设置。其实，它是关键字 initial 和 inherit 的组合。
什么意思呢？也就是当我们给一个 CSS 属性设置了 unset 的话：
如果该属性是默认继承属性，该值等同于 inherit
如果该属性是非继承属性，该值等同于 initial
举个例子，根据上面列举的 CSS 中默认继承父级样式的属性，选取一个，再选取一个不可继承样式：
选取一个可继承样式: color
选取一个不可继承样式: border
https://blog.csdn.net/weixin_44578496/article/details/107775828

## 盒模型
### 圆角
内部盒子会将外部盒子圆角撑开，所以内部div设置overflow:hidden

### 右对齐
要实现上述右对齐的方式有很多，比如：

flex设置justify-content: flex-end
absolute定位设置rigth: 0
float: right
当父节点和子节点宽度固定时，设置margin-left: auto
margin: 0 auto;水平居中

### 行框
<label ></label> 
单独对label设置一个100px的属性石不起作用的，和float:left或者display：inline-block配合的话 都可以设置上 
在 CSS 中，任何元素都可以float浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。如果浮动非替换元素，则要指定一个明确的宽度；否则，它们会尽可能地窄。

元素是文档结构的基础，在css里面，每个元素生成了包含内容的框（box）,大家都叫“盒子”。但是不同的元素显示方式是不同的，有占据一整行的，有水平一个挨着一个的。 

替换元素：替换元素是浏览器根据其标签的元素与属性来判断显示具体的内容。 
比如：<input /> type="text" 的是，这是一个文本输入框，换一个其他的时候，浏览器显示就不一样。(X)HTML中的<img>、<input>、<textarea>、<select>、<object>都是替换元素，这些元素都没有实际的内容。 

替换元素可增加行框高度，但不影响line-height,内容区高度值 = padding-top + padding-bottom + margin-top + margin-bottom + height。 
要想替换元素居中，可以设置line-height = height， vertral-align = middle。 
（vertical-align:middle,是将元素行内框的垂直中点与父元素基线上0.5ex处的一点对齐。） 

非替换元素：(X)HTML 的大多数元素是不可替换元素，他们将内容直接告诉浏览器，将其显示出来。 
比如<p>p的内容</p>、<label>label的内容</label>；浏览器将把这段内容直接显示出来。 

非替换元素添加padding-top或padding-bottom，不影响行框高度，但内容区高度会变化，margin-top，margin-bottom对行框没有任何影响。添加左右边距会影响非替换元素水平位置。要使非替换元素在父元素框内居中，可以设定line-height = 父元素框的高度。 


行内元素框模型： 
下面概括了行内布局组成： 
（注意：对于行内非替换元素中指代的height，是指字符本身的高度，由font-size决定） 
1. 内容区： 
对于非替换元素，内容区高度取决于font-size,若有内边距，则内容区高度 = padding-top + padding-bottom + height； 

对于替换元素，内容区高度值 = padding-top + padding-bottom + margin-top + margin-bottom + height 
2. 行间距： 
只应用于非替换元素，其高度值=（|line-height - height|）/2 

3. 行内框： 
对于非替换元素，其高度值 = line-height 

对于替换元素，其高度值 = 内容区高度值 = padding-top + padding-bottom + margin-top + margin-bottom + height 
4. 行框： 
取决于行内框。行框的上边界要位于最高行内框的上边界，而行框的底边要位于最低行内框的下边界。

## 字体的两种使用方式
https://blog.csdn.net/qq_45488467/article/details/109605231