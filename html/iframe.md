<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-20 20:51:18
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-20 21:16:27
 * @FilePath: /fe_interview/html/iframe.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 重新认识iframe
@[TOC](目录)
## iframe优缺点
前端开发中我们对iframe已经非常熟悉了，那么iframe的作用是什么？可以归纳如下：
在一个web应用中可以独立的运行另一个web应用
这个概念已经和微前端不谋而合，相对于目前配置复杂、高适配成本的微前端方案来说，采用iframe方案具有一些显著的优点：
- **非常简单**，使用没有任何心智负担
- **隔离完美**，无论是js、css、dom都完全隔离开来
- **多应用激活**，页面上可以摆放多个iframe来组合业务
但是开发者又厌恶使用iframe，因为缺点也非常明显：
* 路由状态丢失，刷新一下，iframe的url状态就丢失了
* dom割裂严重，弹窗只能在iframe内部展示，无法覆盖全局
* 通信非常困难，只能通过postmessage传递序列化的消息
* 白屏时间太长，对于SPA 应用应用来说无法接受
能否打造一个完美的iframe，保留所有的优点的同时，解决掉所有的缺点呢？

## 无界方案
无界微前端框架通过继承iframe的优点，解决iframe的缺点，打造一个接近完美的iframe方案
来看无界如何一步一步的解决iframe的问题，假设我们有A应用，想要加载B应用：
在应用A中构造一个shadow和iframe，然后将应用B的html写入shadow中，js运行在iframe中，注意iframe的url，iframe保持和主应用同域但是保留子应用的路径信息，这样子应用的js可以运行在iframe的location和history中保持路由正确。
A: http://hostA/pathA/#hashA, shadowRoot, iframe(http://hostA/pathB/#hashB)
B: http://hostB/pathB/#hashB
在iframe中拦截document对象，统一将dom指向shadowRoot，此时比如新建元素、弹窗或者冒泡组件就可以正常约束在shadowRoot内部。
接下来的三步分别解决iframe的三个缺点：
+ dom割裂严重的问题，主应用提供一个容器给到shadowRoot插拔，shadowRoot内部的弹窗也就可以覆盖到整个应用A
+ 路由状态丢失的问题，浏览器的前进后退可以天然的作用到iframe上，此时监听iframe的路由变化并同步到主应用，如果刷新浏览器，就可以从url读回保存的路由
+ 通信非常困难的问题，iframe和主应用是同域的，天然的共享内存通信，而且无界提供了一个去中心化的事件机制
将这套机制封装进wujie框架：
我们可以发现：
- 首次白屏的问题，wujie实例可以提前实例化，包括shadowRoot、iframe的创建、js的执行，这样极大的加快子应用第一次打开的时间
- 切换白屏的问题，一旦wujie实例可以缓存下来，子应用的切换成本变的极低，如果采用保活模式，那么相当于shadowRoot的插拔
由于子应用完全独立的运行在iframe内，路由依赖iframe的location和history，我们还可以在一张页面上同时激活多个子应用，由于iframe和主应用处于同一个top-level browsing context，因此浏览器前进、后退都可以作用到到子应用：
通过以上方法，无界方案可以做到：

* 非常简单，使用没有任何心智负担
* 隔离完美，无论是js、css、dom都完全隔离开来
* 多应用激活，页面上可以摆放多个iframe来组合业务
路由状态丢失，刷新一下，iframe的url状态就丢失了
dom割裂严重，弹窗只能在iframe内部展示，无法覆盖全局
通信非常困难，只能通过postmessage传递序列化的消息
白屏时间太长，对于SPA 应用应用来说无法接受
## 使用无界
如果主应用是vue框架：
安装
`npm i @tencent/wujie-vue -S`
引入
mport WujieVue from "@tencent/wujie-vue";
Vue.use(WujieVue);
使用
<WujieVue
  width="100%"
  height="100%"
  name="xxx"
  url="xxx"
  :sync="true"
  :fetch="fetch"
  :props="props"
  @xxx="handleXXX"
></WujieVue>
其他框架也会在近期上线
适配成本
无界的适配成本非常低
对于主应用无需做任何改造
对于子应用：
前提，必须开放跨域配置，因为子应用是在主应用域内请求和运行的
对webpack应用，修改动态加载路径
如果子应用保活模式则无需进一步修改，非保活则需要将实例化挂载到无界生命周期内
if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = new Vue({ router, render: (h) => h(App) }).$mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  new Vue({ router, render: (h) => h(App) }).$mount("#app");
}
## 实现细节
### 实现一个纯净的 iframe
子应用运行在一个和主应用同域的iframe中，设置src为替换了主域名host的子应用url，子应用路由只取location的pathname和hash
但是一旦设置src后，iframe由于同域，会加载主应用的html、js，所以必须在iframe实例化完成并且还没有加载完html时中断加载，防止污染子应用
此时可以采用轮询监听document.readyState状态来及时中断，对于一些浏览器比如safari状态不准确，可以在wujie主动抛错来防止有主应用的js运行
### iframe 数据劫持和注入
子应用的代码 code 在 iframe 内部访问 window，document、location 都被劫持到相应的 proxy，并且还会注入$wujie对象供子应用调用
const script = `(function(window, self, global, document, location, $wujie) {
    ${code}\n
  }).bind(window.__WUJIE.proxy)(
    window.__WUJIE.proxy,
    window.__WUJIE.proxy,
    window.__WUJIE.proxy,
    window.__WUJIE.proxy.document,
    window.__WUJIE.proxy.location,
    window.__WUJIE.provide
  );`;
### iframe 和 shadowRoot 副作用的处理
iframe 内部的副作用处理在初始化iframe时进行，主要分为如下几部
/**
 * 1、location劫持后的数据修改回来，防止跨域错误
 * 2、同步路由到主应用
 */
patchIframeHistory(iframeWindow, appPublicPath, mainPublicPath);
/**
 * 对window.addEventListener进行劫持，比如resize事件必须是监听主应用的
 */
patchIframeEvents(iframeWindow);
/**
 * 注入私有变量
 */
patchIframeVariable(iframeWindow, appPublicPath);
/**
 * 将有DOM副作用的统一在此修改，比如mutationObserver必须调用主应用的
 */
patchIframeDomEffect(iframeWindow);
/**
 * 子应用前进后退，同步路由到主应用
 */
syncIframeUrlToWindow(iframeWindow);
ShadowRoot 内部的副作用必须进行处理，主要处理的就是shadowRoot的head和body

  shadowRoot.head.appendChild = getOverwrittenAppendChildOrInsertBefore({
    rawDOMAppendOrInsertBefore: rawHeadAppendChild
  }) as typeof rawHeadAppendChild
  shadowRoot.head.insertBefore = getOverwrittenAppendChildOrInsertBefore({
    rawDOMAppendOrInsertBefore: rawHeadInsertBefore as any
  }) as typeof rawHeadInsertBefore
  shadowRoot.body.appendChild = getOverwrittenAppendChildOrInsertBefore({
    rawDOMAppendOrInsertBefore: rawBodyAppendChild
  }) as typeof rawBodyAppendChild
  shadowRoot.body.insertBefore = getOverwrittenAppendChildOrInsertBefore({
    rawDOMAppendOrInsertBefore: rawBodyInsertBefore as any
  }) as typeof rawBodyInsertBefore
getOverwrittenAppendChildOrInsertBefore主要是处理四种类型标签：

link/style标签
收集stylesheetElement并用于子应用重新激活重建样式
script标签
动态插入的script标签必须从ShadowRoot转移至iframe内部执行
iframe标签
修复iframe的指向对应子应用iframe的window
iframe 的 document 改造
由于js在iframe运行需要和shadowRoot，包括元素创建、事件绑定等等，将iframe的document进行劫持：

所有的元素的查询全部代理到shadowRoot内去查询
head和body代理到shadowRoot的对应html元素上
### iframe 的 location 改造
将iframe的location进行劫持：
由于iframe的url的host是主应用的，所以需要将host改回子应用自己的
对于location.href特殊逻辑的处理
## 总结
通过上面原理以及细节的阐述，我们可以得出无界微前端框架的几点优势：

多应用同时激活在线 框架具备同时激活多应用，并保持这些应用路由同步的能力
组件式的使用方式 无需注册，更无需路由适配，在组件内使用，跟随组件装载、卸载
应用级别的 keep-alive 子应用开启保活模式后，应用发生切换时整个子应用的状态可以保存下来不丢失，结合预执行模式可以获得类似ssr的打开体验
纯净无污染
无界利用iframe和ShadowRoot来搭建天然的js隔离沙箱和css隔离沙箱
利用iframe的history和主应用的history在同一个top-level browsing context来搭建天然的路由同步机制
副作用局限在沙箱内部，子应用切换无需任何清理工作，没有额外的切换成本

 性能和体积兼具
子应用执行性能和原生一致，子应用实例instance运行在iframe的window上下文中，避免with(proxyWindow){code}这样指定代码执行上下文导致的性能下降，但是多了实例化iframe的一次性的开销，可以通过proloadApp提前实例化
包体积只有11kb，非常轻量，借助iframe和ShadowRoot来实现沙箱，极大的减小了代码量
开箱即用 不管是样式的兼容、路由的处理、弹窗的处理、热更新的加载，子应用完成接入即可开箱即用无需额外处理，应用接入成本也极低
相应的也有所不足：
内存占用较高，为了降低子应用的白屏时间，将未激活子应用的shadowRoot和iframe常驻内存并且保活模式下每张页面都需要独占一个wujie实例，内存开销较大
兼容性一般，目前用到了浏览器的shadowRoot和proxy能力，并且没有做降级方案
iframe劫持document到shadowRoot时，某些第三方库可能无法兼容导致穿透