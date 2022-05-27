<!--
 * @Author: your name
 * @Date: 2022-03-08 14:13:46
 * @LastEditTime: 2022-05-27 14:05:43
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/css/css题库.md
-->
1. css盒模型
盒模型由margin、border、padding、content组成
IE盒模型border-box: 宽高由content、padding、border构成，IE8+默认为content-box, IE8以下如果没有声明DTD就是border-box, 如果声明DTD就是content-box；W3C标准盒模型content-box: 宽高只包含content部分；如果页面声明了DOCTYPE, 所有浏览器都会把盒模型解释为W3C盒模型。

2. css选择器有哪些？
ID选择器，类选择器，标签选择器，后代选择器（div a），相邻后代选择器（div>a）, 兄弟选择器（div~ul）, 相邻兄弟选择器（div+ul）, 属性选择器（a[href=""]），伪类选择器（a:hover）, 伪元素选择器（::before）, 通配符选择器（*）

3. ::和:, 即伪元素选择和伪类选择的区别？
二者在css3中区分伪类和伪元素；伪类选择器描述元素的状态样式，比如a:hover; ::伪类选择器描述元素的特殊位置，比如::after, css3之前有单冒号表示伪元素

4. css哪些元素可以继承？
css继承：具有继承性的属性没有指定值时，会继承父元素同属性的值；一个属性具不具备继承性，都可以通过inherit显示指定继承父元素的属性值；有继承性的属性有字体相关、文本相关、表格布局、列表属性、光标属性（cursor）、可见性属性（visibility）

5. css优先级算法计算？
先看权重（!important）,有权重的优先级最高；再看匹配规则，行内样式>id选择器>类、伪类选择器>元素、伪元素

6. 解释伪类LVHA?
用伪类:link, :visited, :hover, :active分表标识a标签的四种状态：访问前、访问后、鼠标滑过、激活

7. font-size:100%;设置字体属性为默认大小，是相对于浏览器默认字体大小或继承body设定的字体大小来说的。

8. absolute破坏性：内层盒子设置absolute外层盒子会塌陷; float同样会出现这个问题
absolute脱离relative更强大，能够摆托overflow: hidden/scroll的控制
无依赖的绝对定位：不受relative限制的absolute,不使用上右下左任何一个定位值或则auto值；脱离文档流；absolute和float不能同时存在，绝对定位生效的时候，浮动定位无效，先浮动后绝对定位和直接用绝对定位效果一样；位置跟随，chrome有个支持问题，设置绝对定位的元素，改变display属性不会重新渲染，就是改变block属性不会起作用；IE7浏览器任何元素绝对定位后都会inline-block化，只能跟随文字显示效果而不会换行显示，解决这个bug在这个绝对定位元素外面设置空div即可；设置无依赖的绝对定位后可以配合margin实现精准定位，包括IE6浏览器

无依赖的绝对定位，位置跟随性（普通元素是该是什么位置，绝对定位后依然是什么位置）和脱离文档流的特点可以做出很多好用的东西，绝对定位不占据任何位置，也就是说宽高是0，注释<!-- -->可以消除图片和i标签之间的空格，通过注释里面的换行可以对齐二者；搜索下拉框的最佳实践可以用无依赖绝对定位，下拉框一般会封装成组件，避免了那种子绝父相定位的问题，而且自适应能力好，日期、颜色选择器都用这种

图片居中几种方法： 1)text-align: center 2) display: block margin-left: auto margin-left: auto 3)绝对定位，left:50% margin-left负自身宽度的一半或者translateX: -50% 4）这种方法不是最佳实践，但可以拓展思路，text-align让盒子内的inline或者inline-block盒子居中（比如想让图片居中，图片前放”&nbsp;“，图片无依赖绝对定位有跟随性） + 无依赖绝对定位(图片设置无依赖绝对定位并且margin-left:负一半图片宽du) 延伸：网页右下角的定位，外层div设置text-align, 内层先”&nbsp;“， 再div设置display: inline, position: fixed(这个跟无依赖的绝对定位有什么关系), margin-left: 20px, bottom: 100px

登录label上的星号有无文字都要对齐，<label><span class="register-star">*</span>"登录密码</label> .register-star {position: absolute; margin-left: -1em; }
提示的小图标对齐，<span><i class="icon-warn"></i>"邮箱格式不准确"</span> .icon-warn {
    position: absolute, margin-left: -20px
}
提示信息即使超出表单容器可以做到也不会换行

9. 脱离文档流，动画尽量用在绝对定位元素上；absolute优先级，后来居上，不依赖z-index

10. 宽高满屏的自适应效果实现：position: absolute, left: 0, top: 0, right: 0, bottom: 0
传统方案：position: absolute, width: 100%, height: 100%, left: 0, top: 0
absolute的左右拉伸和width、height是可以相互替代的
position: absolute, left: 0, top: 0, right: 50% 等价于 position: absolute, left: 0, top: 0, width: 50%
实现右侧距离200px的全屏自适应容器层：
position: absolute, left: 0, right: 200px IE7+
position: absolute, left: 0, width: calc(100% -200px) 现代浏览器才支持

11. 容器无固定的宽高，内部元素绝对定位依然可以拉伸(可以单独上下拉伸或者左右拉伸，也可以四个方向一起拉伸)
.container { display: inline-block } inline-block具有和float、absolute一样的包裹性，可以使用容器尺寸的宽高正好和里面的图片一样

12. 容器拉伸，内部元素支持百分比width/height值
通常情况下：元素height百分比高度起作用，需要父容器的height值不是auto
绝对定位拉伸下：即使父容器的高度值是auto,只要容器绝对定位拉伸形成，百分比高度值也是支持的；移动端九宫格，.page { position: absolute, left: 0, top: 0, right: 0, bottom: 0 }
.list { float: left, height: 33%, width: 33%, position: relative }
当宽高和拉伸同时存在时，宽高优先级高， position: absolute, left: 0, right: 0, width: 50%这是宽度是50%，但如果再加上margin: auto 就会居中

13. 设置透明度的方式：
opacity设置值0-1，超过范围就近截取，值越大越不透明，图片、颜色或者其他元素都可以使用；opacity具有继承性，既作用于元素本身，也会使元素内的所有子元素具有透明度。IE8前不支持
filter: Alpha(opacity=0-100)， 滤镜可以兼容IE8前版本
rgba()只作用于元素的颜色或其背景色（设置了rgb(）透明度元素的子元素不会继承其透明效果）
B站弹幕，语义分割+蒙版（-webkit-mask:url()）, 不过mask现在很多浏览器不支持

############## 图片相关 #################
1. 什么时候用img，什么时候用background-image
.img {
    background-image: url('')
}
<img src="" />
如果图片可能超出显示器尺寸的时候，使用背景图
如果图片内部还需要编辑内容时，使用背景图
其他时候优先选择img
一般来说，作为修饰的不进行操作的图片选择使用background-image，而比较重要的与网页内容相关的就使用img标签。

2. img和background引入图片的区别
1）是否占位
background-image是背景图片，是css的一个样式，不占位；
<img />是dom元素，它是一个图片，是html的一个标签，占位；
2）是否会被搜索引擎识别
img会被搜索引擎识别，background不会。所以一些重要的图片内容建议使用img标签引用，一些修饰性的建议使用背景属性引用；
3）加载顺序问题
在网页加载的过程中，以css背景图存在的图片background-image会等到结构加载完成（网页的内容全部显示以后）才开始加载，而html中的标签img是网页结构（内容）的一部分会在加载结构的过程中加载；
img标签作为html标签，使用src引入图片，别的资源会被中断加载；而CSS引用使用href引入，可以与别的资源并行加载。所以img标签会比background-image优先加载
4）是否可操作
使用img引用的图片是可以进行另存为，移动和改变src实现图片替换等操作。使用背景属性引用的图片不能进行这些操作。

## css布局
1. css实现固定宽高比例方案
-  height: 0; padding-top或者padding-bottom: 75%
- ::after伪元素和padding
- height: 0和padding-top: calc(100%) * 75%
- 视窗宽高




