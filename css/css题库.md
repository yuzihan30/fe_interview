<!--
 * @Author: your name
 * @Date: 2022-03-08 14:13:46
 * @LastEditTime: 2022-04-30 10:55:41
 * @LastEditors: Please set LastEditors
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
absolute脱离relative更强大，能够拜托overflow: hidden/scroll的控制
无依赖的绝对定位：不受relative限制的absolute,不使用上右下左任何一个定位值或则auto值；脱离文档流；absolute和float不能同时存在，绝对定位生效的时候，浮动定位无效，先浮动后绝对定位和直接用绝对定位效果一样；位置跟随，chrome有个支持问题，设置绝对定位的元素，改变display属性不会重新渲染，就是改变block属性不会起作用；IE7浏览器任何元素绝对定位后都会inline-block化，只能跟随文字显示效果而不会换行显示，解决这个bug在这个绝对定位元素外面设置空div即可；设置无依赖的绝对定位后可以配合margin实现精准定位，包括IE6浏览器

无依赖的绝对定位，位置跟随性（普通元素是该是什么位置，绝对定位后依然是什么位置）和脱离文档流的特点可以做出很多好用的东西，绝对定位不占据任何位置，也就是说宽高是0，注释<!-- -->可以消除图片和i标签之间的空格，通过注释里面的换行可以对齐二者；搜索下拉框的最佳实践可以用无依赖绝对定位，下拉框一般会封装成组件，避免了那种子绝父相定位的问题，而且自适应能力好，日期、颜色选择器都用这种