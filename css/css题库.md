<!--
 * @Author: your name
 * @Date: 2022-03-08 14:13:46
 * @LastEditTime: 2022-03-08 14:51:20
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