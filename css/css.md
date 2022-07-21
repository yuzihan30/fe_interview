<!--
 * @Author: your name
 * @Date: 2022-03-08 14:13:46
 * @LastEditTime: 2022-06-01 17:57:58
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/css/css题库.md
-->

1. css 盒模型
   盒模型由 margin、border、padding、content 组成
   IE 盒模型 border-box: 宽高由 content、padding、border 构成，IE8+默认为 content-box, IE8 以下如果没有声明 DTD 就是 border-box, 如果声明 DTD 就是 content-box；W3C 标准盒模型 content-box: 宽高只包含 content 部分；如果页面声明了 DOCTYPE, 所有浏览器都会把盒模型解释为 W3C 盒模型。

2. css 选择器有哪些？
   ID 选择器，类选择器，标签选择器，后代选择器（div a），相邻后代选择器（div>a）, 兄弟选择器（div~ul）, 相邻兄弟选择器（div+ul）, 属性选择器（a[href=""]），伪类选择器（a:hover）, 伪元素选择器（::before）, 通配符选择器（\*）

3. ::和:, 即伪元素选择和伪类选择的区别？
   二者在 css3 中区分伪类和伪元素；伪类选择器描述元素的状态样式，比如 a:hover; ::伪元素选择器描述元素的特殊位置，比如::after, css3 之前有单冒号表示伪元素

4. css 哪些元素可以继承？
   css 继承：具有继承性的属性没有指定值时，会继承父元素同属性的值；一个属性具不具备继承性，都可以通过 inherit 显示指定继承父元素的属性值；有继承性的属性有字体相关、文本相关、表格布局、列表属性、光标属性（cursor）、可见性属性（visibility）

5. css 优先级算法计算？
   先看权重（!important）,有权重的优先级最高；再看匹配规则，行内样式>id 选择器>类、伪类选择器>元素、伪元素

6. 解释伪类 LVHA?
   用伪类:link, :visited, :hover, :active 分表标识 a 标签的四种状态：访问前、访问后、鼠标滑过、激活

7. font-size:100%;设置字体属性为默认大小，是相对于浏览器默认字体大小或继承 body 设定的字体大小来说的。

8. absolute 破坏性：内层盒子设置 absolute 外层盒子会塌陷; float 同样会出现这个问题
   absolute 脱离 relative 更强大，能够摆托 overflow: hidden/scroll 的控制
   无依赖的绝对定位：不受 relative 限制的 absolute,不使用上右下左任何一个定位值或则 auto 值；脱离文档流；absolute 和 float 不能同时存在，绝对定位生效的时候，浮动定位无效，先浮动后绝对定位和直接用绝对定位效果一样；位置跟随，chrome 有个支持问题，设置绝对定位的元素，改变 display 属性不会重新渲染，就是改变 block 属性不会起作用；IE7 浏览器任何元素绝对定位后都会 inline-block 化，只能跟随文字显示效果而不会换行显示，解决这个 bug 在这个绝对定位元素外面设置空 div 即可；设置无依赖的绝对定位后可以配合 margin 实现精准定位，包括 IE6 浏览器

无依赖的绝对定位，位置跟随性（普通元素是该是什么位置，绝对定位后依然是什么位置）和脱离文档流的特点可以做出很多好用的东西，绝对定位不占据任何位置，也就是说宽高是 0，注释<!-- -->可以消除图片和 i 标签之间的空格，通过注释里面的换行可以对齐二者；搜索下拉框的最佳实践可以用无依赖绝对定位，下拉框一般会封装成组件，避免了那种子绝父相定位的问题，而且自适应能力好，日期、颜色选择器都用这种

图片居中几种方法： 1)text-align: center 2) display: block margin-left: auto margin-left: auto 3)绝对定位，left:50% margin-left 负自身宽度的一半或者 translateX: -50% 4）这种方法不是最佳实践，但可以拓展思路，text-align 让盒子内的 inline 或者 inline-block 盒子居中（比如想让图片居中，图片前放”&nbsp;“，图片无依赖绝对定位有跟随性） + 无依赖绝对定位(图片设置无依赖绝对定位并且 margin-left:负一半图片宽 du) 延伸：网页右下角的定位，外层 div 设置 text-align, 内层先”&nbsp;“， 再 div 设置 display: inline, position: fixed(这个跟无依赖的绝对定位有什么关系), margin-left: 20px, bottom: 100px

登录 label 上的星号有无文字都要对齐，<label><span class="register-star">\*</span>"登录密码</label> .register-star {position: absolute; margin-left: -1em; }
提示的小图标对齐，<span><i class="icon-warn"></i>"邮箱格式不准确"</span> .icon-warn {
position: absolute, margin-left: -20px
}
提示信息即使超出表单容器可以做到也不会换行

9. 脱离文档流，动画尽量用在绝对定位元素上；absolute 优先级，后来居上，不依赖 z-index

10. 宽高满屏的自适应效果实现：position: absolute, left: 0, top: 0, right: 0, bottom: 0
    传统方案：position: absolute, width: 100%, height: 100%, left: 0, top: 0
    absolute 的左右拉伸和 width、height 是可以相互替代的
    position: absolute, left: 0, top: 0, right: 50% 等价于 position: absolute, left: 0, top: 0, width: 50%
    实现右侧距离 200px 的全屏自适应容器层：
    position: absolute, left: 0, right: 200px IE7+
    position: absolute, left: 0, width: calc(100% -200px) 现代浏览器才支持

11. 容器无固定的宽高，内部元素绝对定位依然可以拉伸(可以单独上下拉伸或者左右拉伸，也可以四个方向一起拉伸)
    .container { display: inline-block } inline-block 具有和 float、absolute 一样的包裹性，可以使用容器尺寸的宽高正好和里面的图片一样

12. 容器拉伸，内部元素支持百分比 width/height 值
    通常情况下：元素 height 百分比高度起作用，需要父容器的 height 值不是 auto
    绝对定位拉伸下：即使父容器的高度值是 auto,只要容器绝对定位拉伸形成，百分比高度值也是支持的；移动端九宫格，.page { position: absolute, left: 0, top: 0, right: 0, bottom: 0 }
    .list { float: left, height: 33%, width: 33%, position: relative }
    当宽高和拉伸同时存在时，宽高优先级高， position: absolute, left: 0, right: 0, width: 50%这是宽度是 50%，但如果再加上 margin: auto 就会居中

13. 设置透明度的方式：
    opacity 设置值 0-1，超过范围就近截取，值越大越不透明，图片、颜色或者其他元素都可以使用；opacity 具有继承性，既作用于元素本身，也会使元素内的所有子元素具有透明度。IE8 前不支持
    filter: Alpha(opacity=0-100)， 滤镜可以兼容 IE8 前版本
    rgba()只作用于元素的颜色或其背景色（设置了 rgb(）透明度元素的子元素不会继承其透明效果）
    B 站弹幕，语义分割+蒙版（-webkit-mask:url()）, 不过 mask 现在很多浏览器不支持

############## 图片相关 #################

1. 什么时候用 img，什么时候用 background-image
   .img {
   background-image: url('')
   }
   <img src="" />
   如果图片可能超出显示器尺寸的时候，使用背景图
   如果图片内部还需要编辑内容时，使用背景图
   其他时候优先选择 img
   一般来说，作为修饰的不进行操作的图片选择使用 background-image，而比较重要的与网页内容相关的就使用 img 标签。

2. img 和 background 引入图片的区别
   1）是否占位
   background-image 是背景图片，是 css 的一个样式，不占位；
   <img />是 dom 元素，它是一个图片，是 html 的一个标签，占位；
   2）是否会被搜索引擎识别
   img 会被搜索引擎识别，background 不会。所以一些重要的图片内容建议使用 img 标签引用，一些修饰性的建议使用背景属性引用；
   3）加载顺序问题
   在网页加载的过程中，以 css 背景图存在的图片 background-image 会等到结构加载完成（网页的内容全部显示以后）才开始加载，而 html 中的标签 img 是网页结构（内容）的一部分会在加载结构的过程中加载；
   img 标签作为 html 标签，使用 src 引入图片，别的资源会被中断加载；而 CSS 引用使用 href 引入，可以与别的资源并行加载。所以 img 标签会比 background-image 优先加载
   4）是否可操作
   使用 img 引用的图片是可以进行另存为，移动和改变 src 实现图片替换等操作。使用背景属性引用的图片不能进行这些操作。
3. 背景图片
 background-size:100%;在任何时候都会优先适应宽度；
 background-size:cover;是跨度和高度谁牛逼就适应谁；
 background-size 属性（设置背景图片大小）
值	描述
length	设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为auto(自动)
percentage	将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"
cover	此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
contain	此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。
4. background用法
“可以设置的属性分别是:background-color、background-position、background-size、background-repeat、background-origin、background-clip、background-attachment 和 background-image。各值之间用空格分隔,不分先后顺序。
## 选择器

.example.noSpace 则是在一个元素上，这个元素包括这两个类才会有效果

## css 布局

1. css 实现固定宽高比例方案

- height: 0; padding-top 或者 padding-bottom: 75%
- ::after 伪元素和 padding
- height: 0 和 padding-top: calc(100%) \* 75%
- 视窗宽高

2. 吸顶
   比如让 tab 吸顶，外边套一层 div, 样式设置 position: sticky; top: 0

## 盒模型

1. background 颜色只会覆盖到 contentpadding 不会覆盖到 border 上面
2. height: 100%不行的时候试试 height: 100vh

## flex

https://www.jianshu.com/p/4df56ee561ba
在说 flex:1 和 flex:auto 区别之前先回顾 flex:0 1 atuo;
从默认值上可以看出它有三个属性，分别是 flex-grow、flex-shrink、flex-basis

flex-grow:项目的放大比例，默认为 0，如果存在剩余空间，不放大
flex-shrink:项目的缩小比例，默认为 1，如果空间不足，会适当缩小
flex-basis:在分配空间之前，项目的主轴空间，相当于我们设置的 width，
