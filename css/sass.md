<!--
 * @Author: your name
 * @Date: 2022-04-21 20:14:09
 * @LastEditTime: 2022-05-08 17:35:04
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/css/sass.md
-->

> 参考资料： https://www.bilibili.com/video/BV17W411w7nL?p=15&vd_source=7ee5c96f1a1e60cce40c476ea01fa301

1. scss 是 sass 的升级版, sass 3.0 时改叫 sassy(粗略，时髦自信的) css, 扩展名由.sass 改为.scss。语法也由缩进改为嵌套形式

2. sass 和 scss 区别
   sass 是缩进式写法，多行注释不需要用\*/关闭， 当行注释// 其他行只需要跟第一行注释的缩进就行
   sass 导入，导入的文件不需要引号
   定义 mixin, scss 中@mixin alert, 且主体放入花括号，内部每行代码结束的地方需要用分号， 引用时需要@include alert；sass 的缩进式的 mixin, 只需要=alert, 不需要使用花括号不需要使用分号只需要缩进就可以了, 引入时+alert
   scss 写嵌套时都需要花括号，sass 只需要缩进

3. 变量，定义完后，使用时可以使用变量作为属性的值
   声明定义一个变量，$符号，$primary-color: #666666
   变量里可以有多个值，而且里面可以引用其它变量，\$primary-border: #666666
   定义和使用时中划线和下划线可以交替使用

4. 嵌套选择器，可以写选择器时重复的部分，编译后父类和子类选择器中间加空格
   嵌套时调用父选择器，主要针对伪类选择器，编译后父类和子类中间不加空格
   a {
   display: block;
   &:hover {
   color: #fff
   }
   }
   .nav {
   & &-text {
   font-size: 15px;
   }
   // .nav .nav-text
   }

5. 嵌套也可以用在属性里面叫属性嵌套, 编译后属性中间加中划线
   body {
   font: {
   family:
   size:
   }
   }
   .nav {
   border: 1px solid #000 {
   left: 0;
   right: 0;
   }
   }

6. mixin, 可以想象成一块用名字定义好的样式，在任何地方可以去重复的使用它
   定义的时候可以加参数， @mixin name (参数) { 这里面可以使用 scss 的其他特性比如嵌套、函数等 }
   参数和变量的定义方式一样，需要加$符
@mixin alert($text-color, $background) {
    color: $text-color;
   background-color: $background;
    a {
        color: darken($text-color, 10%) // darken 可以加深指定的颜色
   }
   }
   .alert-warning {
   @include alert(#666666, #555555)// 也可以使用命名参数，这样就不用在意顺序了（$background: #555555, $text-color: #666666）
   }

7. @extend 用扩展或者继承减少重复的动作，功能是让一个选择器去继承另一个选择器内所有的样式
   .alert {
   padding: 10px;
   }
   .alert-info {
   @extend .alert;
   background-color: #fff
   }
   编译后会使用群组选择器
   .alert, .alert-info {
   padding: 10px;
   }
   另外 alert 相关的样式也会继承下来
   .alert a {
   font-weight: bold
   }
   编译后
   .alert a, .alert-info a {
   font-weight: bold
   }

8. @import 每次使用都会发送一次新的 http 请求，去下载被导入的 css 文件， 而 scss 扩展了它的功能可以在一个 scss 文件里将其他 scss 文件包含进来；这样就可以将小的部分 partials(文件的名字用下划线开头)，包含到一个 scss 文件，编译的时候就不会把 partials 编译成 css，这样可以让样式模块化并更有条理；引入时@import "base"就不需要加下划线及文件名后缀

9. 注释
   单行、多行、强制注释
   多行注释会在编译输出后的 css 中保留，在压缩输出的 css 中会去掉
   单行注释不会在编译输出后的 css 中
   强制注释是第一行中使用!的多行注释，这样的注释会一直出现在 css 中
   sass --watch sass:css --style expanded/compressed(压缩的方式输出 css)

10. 数值类型
    数字、字符串、颜色、列表等 +号可以连接两个字符串类型的数据， 数字可以运算
    scss 中自带的一些函数可以处理这些不同类型的数据
    sass 交互功能，sass -i
    type-of(5 或者 5px), 输出“number”,说明是数字或者带单位的数字
    type-of(hello 或者“hello”) 输出"string"，说明是字符串或者加引号的字符串
    type-of(1px solid #000 或者 5px 6px) 输出“list”, 列表数据就是中间用空格或者逗号分开
    type-of(rgb(255, 255, 0)或者#fff 或者 red 或者 hsl(0, 100%, 50%))输出"color"
    加减乘除都能用：
    font: 18px/1.8 serif // 18px 是字号，1.8 是行间距；运算时可以保留单位，5px + 2

- 数字函数
  abs();round()四舍五入；进一位 ceil();退一位 floor();将一个数变成百分比 percentage(65px / 100px);最小数 min(1,2,3),最大数 max(1,2,3)

## 其他

@content 这个是不是个类似占位用的，代表里面是自定义的的

    @-webkit-keyframes #{$name} {
        @content;
    }

`@content`用在`mixin`里面的，当定义一个`mixin`后，并且设置了`@content`；
`@include`的时候可以传入相应的内容到`mixin`里面
官网给的例子：

$color: white;
@mixin colors($color: blue) {
background-color: $color;
@content;
border-color: $color;
}
.colors {
@include colors { color: $color; }
}
编译后：

.colors {
background-color: blue;
color: white;
border-color: blue;
}
