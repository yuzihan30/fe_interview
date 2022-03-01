<!--
 * @Author: your name
 * @Date: 2022-03-01 09:42:44
 * @LastEditTime: 2022-03-01 13:18:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/服务端渲染/ssr.md
-->
1. 从url输入到页面渲染完成，浏览器执行了哪些操作？
解析url、浏览器缓存、DNS
建立TCP/IP链接、建立http链接、发送http请求、响应http报文
构建DOM树（浏览器深度遍历DOM节点）
构建CSS规则树（遇到css外链，异步加载解析）
同步加载执行js， 阻塞页面渲染（遇到script标签，外链js如果有defer或者async标签则异步加载）
将DOM树和CSS规则树构造成render树
渲染render树

2. defer和async异同？
defer和async都是异步加载js文件，但defer是等页面解析完成之后执行，而async是加载完成之后立即执行（执行阻塞页面解析）
多个声明defer的脚本会按顺序下载执行；多个声明了async的脚本，下载和执行也是异步的，不能保证顺序

3. FP、FCP、FMP、TTL？
FP首次绘制，首帧绘制或者像素点开始绘制的时间点，表明网页请求成功
FCP首次内容绘制，DOM绘制
FMP首次有效绘制，业务主角绘制，比如搜索框、视频绘制
TTL可交互时间，渲染完成到可响应用户交互的时间

4. 减少白屏或者首屏加载时间的方式？
csr客户端渲染可以通过loading、骨架屏的方式提前FP、FCP，但无法提前FMP; ssr服务端渲染可将FCP提前到js加载前触发，提前显示主角元素，所以能减少白屏和首屏加载时间。

5. ssr原理？
webpack的按需代码分割特性在渲染bundle时，可以确保对chunk进行资源预加载和数据预取，还可以将所需chunk异步只能的注入到script标签内，避免客户端的瀑布式加载

6. 前端瀑布流？
根据html外连资源出现的顺序，依次放入队列，然后根据优先级确定向服务器获取资源的顺序。同优先级根据出现顺序向服务器获取资源
可根据瀑布流做性能优化：将瀑布流变窄，即减少所有资源的加载时间；降低瀑布流的高度，即减少请求数量；优化请求顺序，即将开始渲染线左移

