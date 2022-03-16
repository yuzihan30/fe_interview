<!--
 * @Author: your name
 * @Date: 2022-02-28 20:16:36
 * @LastEditTime: 2022-03-10 10:32:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/css/css3.md
-->
1. nth-child和nth-of-type
ele:nth-child(n)是指父元素下的第n个元素且是ele的元素
ele:nth-of-type(n)是指父元素下第n个ele类元素
n是从1开始的

2. flex实现两个内层盒子分别局于左上角和右下角
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
概念及作用：块级格式化上下文，相当于一个隔离容器，BFC块的内外部互不影响
产生BFC的方式：html根元素和包含根元素的元素；float(!=none);position: absolute/fixed;display(flex、inline-block等);
常见应用场景：盒子的外边距合并问题；清除浮动（浮动的子元素无法撑起父元素，外部元素设置为overflow:hidden或者display:flow-root无副作用）
延伸：display: flow-root可以将元素变成具备BFC的块级元素