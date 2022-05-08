<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-08 19:48:37
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-08 19:50:45
 * @FilePath: /fe_interview/html/SVG_Icon.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. 关于Icon Font的缺陷，可以看这篇Inline SVG vs Icon Fonts文章。主要有以下几方面：
浏览器将其视为文字进行抗锯齿优化，有时得到的效果并没有想象中那么锐利。尤其是在不同系统下对文字进行抗锯齿的算法不同，可能会导致显示效果不同。
Icon Font 作为一种字体，Icon 显示的大小和位置可能要受到font-size、line-height、word-spacing 等等 CSS 属性的影响。Icon 所在容器的 CSS 样式可能对 Icon 的位置产生影响，调整起来很不方便。
使用上存在不便。首先，加载一个包含数百图标的 Icon Font，却只使用其中几个图标，非常浪费加载时间。自己制作 Icon Font 以及把多个 Icon Font 中用到的图标整合成一个 Font 也非常不方便。
为了实现最大程度的浏览器支持，可能要提供至少四种不同类型的字体文件。包括TTF、WOFF、EOT 以及一个使用 SVG 格式定义的字体。
网络延时会导致 Icon 会先加载出来一个 string。

SVG Icon 的优势可以用组件文档的描述
完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
在低端设备上 SVG 有更好的清晰度。
支持多色图标。
对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。
SVG Icon的劣势，比如兼容性。（IE：啥？）

当然总体来说，Icon Font 对性能的影响没有那么大。这也可能SVG ICon是没那么流行的原因