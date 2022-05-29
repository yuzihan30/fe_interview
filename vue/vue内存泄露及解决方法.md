<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-29 16:00:56
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-29 16:11:16
 * @FilePath: /fe_interview/vue/vue内存泄露及解决方法.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 内存管理
JavaScript 有完善的内存处理机制，能自动进行垃圾回收，但是假如一个对象一直被引用，他的内存是无法得到释放的。如果项目运行过程中，内存占用越来越高，只增不减，没有峰值，就存在内存泄漏。多页应用我们可以通过页面刷新缓解，但是对于服务端渲染和单页应用则需要重点关注内存泄漏问题。本文主要以Vue单页应用展开，因为在 SPA 的设计中，用户使用它时是不需要刷新浏览器的，所以 JavaScript 应用需要自行清理组件来确保垃圾回收以预期的方式生效。
## 内存泄露
程序的运行需要内存。只要程序提出要求，操作系统或者运行时就必须供给内存。对于持续运行的服务进程，必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。不再用到的内存，没有及时释放，就叫做内存泄漏。
## 内存泄露分析定位
chrome控制台的memory
- Heap snapshot - 用以打印堆快照，堆快照文件显示页面的 javascript 对象和相关 DOM 节点之间的内存分配
- Allocation instrumentation on timeline - 在时间轴上记录内存信息，随着时间变化记录内存信息。
- Allocation sampling - 内存信息采样，使用采样的方法记录内存分配。此配置文件类型具有最小的性能开销，可用于长时间运行的操作。它提供了由 javascript 执行堆栈细分的良好近似值分配。
定位
点击快照，右侧列表能看到存在泄露问题的地方
## 常见内存泄露
1. 意外的全局变量
函数中意外的定义了全局变量，每次执行该函数都会生成该变量，且不会随着函数执行结束而释放。
2. 未清除的定时器
定时器没有清除，它内部引用的变量，不会被释放。
3. 脱离DOM的元素引用
一个dom容器删除之后，变量未置为null，则其内部的dom元素则不会释放。
4. 持续绑定的事件
函数中addEventListener绑定事件，函数多次执行，绑定便会产生多次，产生内存泄漏。
5. 绑在EventBus的事件没有解绑
6. 闭包引起内存泄漏
比如事件处理回调，导致DOM对象和脚本中对象双向引用。
7. 使用第三方库创建，没有调用正确的销毁函数
8. 单页应用时，页面路由切换后，内存未释放
## 解决方法
1. 变量先申明后使用。
2. setTimeout setInterval清理 （最好不用）可以使用nextTick代替。
3. 如果在mounted/created 钩子中绑定了DOM/BOM 对象中的事件，需要在beforeDestroy 中做对应解绑处理
4. 如果在mounted/created 钩子中使用了on，需要在beforeDestroy 中做对应解绑(off)处理。
5. 如果在mounted/created 钩子中使用了第三方库初始化，需要在beforeDestroy 中做对应销毁处理。
6. 慎用keep-alive
当你用 keep-alive 包裹一个组件后，它的状态就会保留，因此就留在了内存里，切莫在整个路由页面上加上keep-alive。
一旦你使用了 keep-alive，那么你就可以访问另外两个生命周期钩子：activated和 deactivated。你需要在一个 keep-alive 组件被移除的时候，调用 deactivated 钩子进行清理或改变数据


