<!--
 * @Author: your name
 * @Date: 2022-04-21 13:45:36
 * @LastEditTime: 2022-04-22 15:57:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/前端可视化/canvas.md
-->
canvas应用场景：动画、游戏画面、数据可视化（echarts）、图片编辑以及实时视频处理，绘制的图形不会出现在DOM结构中，适合小画布、大数据量的场景
画直线、虚线、统计图、圆
<canvas id="cont" width="500px" height="500px">您的浏览器版本过低，请升级浏览器或者使用chrome打开</canvas>
const canvas = document.querySelector('#cont') // 获取画布容器
const ctx = canvas.getContext('2d') // 给画布容器赋能，使其可以挂载2d图形
1. 随机生成16进制颜色值, 应用场景：canvas中需要随机生成颜色的地方
const color16 = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16)
ctx.fillStyle = color16
其他随机生成颜色值的方案：ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 256) + 
',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ')'

2. 画动态高度矩形时，比如高度是[100, 120), 注意点： height = Math.random() * 100 + 20

3. 清除画布： ctx.clearRect(x, y, width, height)

4. 画圆(也能画圆弧)：ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
x,y圆心坐标，radius半径，后面起始角度(pi为单位， Math.PI)，顺逆时针（顺时针false, 逆时针true）
示例： ctx.arc(250, 250, 200, 0, Math.PI * 2, false), // x轴正向对应0度角
// 先配置再填充
ctx.fillStyle = 'gold'
ctx.fill()
// 先画线再填充
ctx.lineWidth = 3, ctx.strokeStyle = 'red', ctx.stroke()着色

// ctx.beginPath()之前会默认加上ctx.closePath()
ctx.beginPath()
ctx.arc(250, 250, 250, 0, Math.PI, false)
ctx.stroke()
ctx.beginPath() // 如果不加这个，之前的画线未关闭，中间会出现两条直径线相连
ctx.arc(500, 250, 250, 0, Math.PI, true)
ctx.stroke()

5. 碰撞检测，涉及到动画，需要清除画布ctx.clearRect(0,0,w,h)