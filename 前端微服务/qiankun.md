<!--
 * @Author: your name
 * @Date: 2022-04-15 10:00:44
 * @LastEditTime: 2022-04-25 10:59:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/前端微服务/qiankun.md
-->
1. 子应用应该能渲染到指定的容器，而不是顶在顶层容器上，需要子应用和基座应用使用不同的id, 基座index.html内的id="main-app"
2. 动态注册微服务，一般在main.js执行，registerMicroApps，但由于没登录，可能无法注册设定的服务，需要在app.vue等地方重新调用registerMicroApps动态注册微服务
3. 子应用返回主应用，不能成功返回主应用，可能启动了根目录的原因导致
// window.location.href = "/"
window.history.pushState(null, '', '/login')
4. 子应用不需要关注qiankun，无需引用其包，只需要按照标准实现导出接口即可

## spa
单页Web应用（single page web application，SPA

单页应用和多页应用区别
一. 什么是SPA？
SPA(single-page application)，翻译过来就是单页应用。
SPA是一种特殊的web应用。将所有的活动局限于一个Web页面中，仅在该Web页面初始化时加载相应的HTML、JavaScript和CSS。 一旦页面加载完成，SPA不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用JavaScript动态的变换HTML的内容， 从而实现UI与用户的交互。

二.SPA的优缺点？
优点：

具有良好的交互体验
因为是局部渲染，每个部分是单独的模块，避免了不必要的跳转和重复渲染。
前后端分离，架构清晰
缺点：

可能出现首屏加载时间过长
因为SPA是将所有的活动局限于一个Web页面，需要在加载页面的时候将HTML、JavaScript和CSS统一加载，部分页面可以在需要的时候加载。这样会导致初次加载耗时多，可能出现首屏加载时间过长问题。
不利于SEO（搜索引擎优化）
由于所有的内容都在一个页面中进行动态的替换，利用hash片段实现路由，而利用hash片段不会作为HTTP请求中的一部分发送给服务器，所以在SEO上存在弱势。
导航不能用
由于单页Web应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，如果需要导航，需要自行设置前进后退。
三.怎么实现一个SPA？
监听地址栏中的hash变化，驱动界面变化
用history.pushSate记录浏览器的历史，驱动界面变化
直接在界面用普通事件，驱动界面变化
四.SPA首屏加载速度慢怎么解决？
首屏时间：指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容。
计算首屏时间：通过监听DOMContentLoad或者performance来计算出时间
//方案1
document.addEventListener('DOMContentLoaded',(event) =>{
	console.log(111);
})
//方案2
performance.getEntriesByName("first-contentful-paint")[0].startTime
加载慢的原因：网络延时、资源体积过大、资源重复发出请求、加载脚本时导致渲染阻塞
解决方案：主要是从两方面优化，资源加载优化和页面渲染优化
减少入口文件体积	常用手段：懒加载，把不同路由对应的组件分割成不同的代码块，当用时才加载，使得入口文件体积减少，加载速度提高。在vue-router配置动态加载路由的形式
静态资源本地缓存	后端返回资源问题：后端设置响应头cache-control ，Exprise， Etag ，Last-modified等；采用Service Worker离线缓存。前端合理利用locaStorage
UI框架按需加载	比如适用element-UI，不要直接引入UI库，而要按需加载
组件重复打包	一个组件被多个路由同时适用，会造成重复下载。在webpack的config文件中，修改CommonChunkPlugin的配置，将minChunk:3，表示会把三次及以上的包抽离出来，放进公共样式，避免重新加载组件
图片资源的压缩	对于所有的图片，都可以进行适当的压缩，对于页面上的icon，我们可以适用字体图表来代替；或者使用雪碧图，把多个小的图片放在一张图上加载，这样可以加快加载速度
开启gzip的压缩	
适用SSR	服务端渲染，组件或者页面通过服务器生成html字符串，发送到浏览器
五.什么是MPA?
MPA(mutiple-page application)，翻译过来就是多页面应用。
MPA（多页应用）：每个页面都是一个主页面，都是独立的，当我们访问一个页面时，需要重新加载HTML、Javascript和CSS，公共文件则按需下载。

六.SPA与MPA的区别?
SPA	MPA
组成	一个主页面和多个片段页面	多个主页面
url路由模式	hash模式 http://xxx/abc.html#page1	history模式 http://xxx/page1.html
SEO搜索引擎优化	难实现，可用SSR（服务端渲染）方式改善	容易实现
数据传递	容易（全局变量Vuex或Vue中的父子组件通讯props对象）	依赖url、cookie或者localstorage，实现麻烦
页面切换	速度快，用户体验好	切换加载资源，速度慢，用户体验差
维护成本	相对容易	相对复杂
过渡动画	提供了transition的封装组件，容易实现	很难实现
适用场景	对于体验度和流畅度有较高要求的应用，不利于SEO	适用于对SEO要求很高的应用

arbitrary	英[ˈɑːbɪtrəri]
美[ˈɑːrbɪtreri]
adj.	任意的; 武断的; 随心所欲的; 专横的; 专制的;

straightforward
英[ˌstreɪtˈfɔːwəd]
美[ˌstreɪtˈfɔːrwərd]
adj.	直截了当的; 简单的; 坦率的; 易懂的; 不复杂的; 坦诚的; 率直的;
adv.	坦率地;


isomorphic	
adj.	同形（态）的;
[例句]Research and Development of Multi-domain Collaborative Design System Based on Isomorphic Mode
同构模式下多领域协同设计系统的研究与实现
