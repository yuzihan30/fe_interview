<!--
 * @Author: your name
 * @Date: 2022-02-28 20:16:36
 * @LastEditTime: 2022-05-15 09:44:21
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
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

4. css var 语法
var(custom-property-name, value)
custom-property-name	必需。自定义属性的名称，必需以 -- 开头。
value	可选。备用值，在属性不存在的时候使用。
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

5. css过渡和动画的区别
css过渡需要触发条件（常用鼠标移动到：hover），动画不需要触发条件
transition只有起始两个状态（一般用在比较简单的效果上，不过可以很好的和js结合，比如结合定时器实现循环效果；而animation可以通过设置infinite来实现遍历循环，不能很好与js结合），不能在transition上直接设置和修改属性，只能在选择器上设置css属性，然后在transition上设置要全部过渡还是具体属性过渡
animation状态可以精确到非常多个，有百分比控制，而且可以在关键帧上设置和修改css属性
transition子属性一般也就3-4个，只能实现简单的动画
animation子属性就比较多了

6. calc应用场景
图片垂直水平居中, calc支持不同单位混合计算，而且一次可以进行多个运算，也是可以进行嵌套运算
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
 deg是角度单位，0-360度
 body {
   --t: 20deg; // 方便同一修改
   background: 
      linear-gradient(calc(var(--t) * 10), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
      linear-gradient(calc(var(--t) * 20), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
      linear-gradient(calc(var(--t) * 30), rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)
 }
