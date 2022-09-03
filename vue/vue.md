1. vue常用指令：
内容类：v-html(可以将标签一起渲染)、v-text(等价于{{}})、v-show、v-if、v-else、v-for、v-model、v-once(例：<p v-once>{{ content }}</p>，只渲染一次，后面改变不会再渲染)
属性类：v-bind(:XXX)、v-on(:click,等价于@)

2. v-if和v-for的区别
v-if切换时会伴随组件的创建销毁，惰性加载，为true才真正渲染
v-show 只在初始化时加载渲染一次，只是display:none和block的切换

3. app.vue项目的根组件，main.js项目的入口文件（就是项目在加载时会首先加载main.js文件）

4. 单文件组件：.vue文件，包含模板、js和样式的文件组件

5. 可以将插槽和props类比，插槽给子组件传模板，props给子组件传数据

6. 为什么说虚拟DOM可以跨平台? 因为DOM和平台是强相关的，而虚拟DOM是js对象

########## 路由 #########
1. 默认hash模式，a链接本地跳转的形式，相当于一个锚点
history是h5方式的路由，项目正式部署的时候，需要后台配合，因为相当于发起一个请求，没有处理这种请求，就会报404

## 组件通信
vuex、eventBus、以及props与emit、$parent与$children，除此之外，还有provide与inject、$attrs与$listeners等；另外ref绑定到组件上也能通信

## 初始化
1. el是element的意思

## 工具
Vue Template Explorer
是一个网页工具，可以将模板转换成网页的函数，例如换行都会原样生成，但是在运行时消耗无意义的内存
vue-template-explorer
Vue 2.6 把模板编译成 render 函数的工具 vue-next-template-explorer Vue 3.0 beta
把模板编译成 render 函数的工具


## 样式
### 私有样式scoped
参考文章
https://blog.csdn.net/weixin_43343423/article/details/103614846
Vue中scoped属性的渲染规则：
给DOM节点添加一个不重复的data属性（比如data-v-7ba5bd90）来表示他的唯一性
在每个CSS选择器末尾（编译后生成的CSS）加一个当前组件的data属性选择器（如[data-v-7ba5bd90]）来私有化样式。选择器末尾的data属性和其对应的DOM中的data属性相匹配
子组件最外层标签上有一个类已经在这个父组件中定义过了，那么这个父组件的样式就也会应用到子组件上。只不过其权重没有子组件同类名的重。
如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
如果父组件想要改变子组件中某个标签样式可以使用>>>连接符或者/deep/来解决

## vue2模板不识别可选链等新语法
Vue2 template中无法正常识别 ?. 操作符 可能是因为 ?. 可选链语法比较新，没有在template中做关于这方面的处理
解决方案：

第三方库 lodash中的 _get 方法
升级到vue3，目前vue3成为默认版本生态趋近于成熟且template支持可选链操作符
computed计算属性中使用 ?.
对template源码进行拦截更改，代码侵入性过高
写一个hook挂到global/mixins上随时调用
如需使用链式调用操作符可以封装方法不要在表达式中直接使用
这些都是上网浏览的方案。
https://blog.csdn.net/X_Promise/article/details/125521074

## 修改elementUI内部样式的几种方式
1.新建全局样式表
新建global.css文件，并在main.js中引入。global.css文件一般都放在src/asset/style下

import "./assets/style/global.css"
1
在 global.css 文件中写的样式，无论在哪一个 vue 单页面都会覆盖 ElementUI 默认的样式。

2.在当前vue单页面中添加一个新的style标签
在当前的vue单页面的style标签后，添加一对新的style标签，新的style标签中不要添加scoped。在有scoped属性的style标签中的样式不会覆盖ElementUI默认的样式

3.使用/deep/深度修改标签样式
找到需要修改的ElementUI标签的类名，然后在类名前加上/deep/，可以强制修改默认样式。这种方式可以直接用到有scoped属性的style标签中。

// 修改级联选择框的默认宽度
/deep/ .el-cascader {
  width: 100%;
}
4.通过内联样式或者绑定类样式覆盖默认样式
通过内联样式style可以在某些标签中直接覆盖默认样式，不是很通用。

总结
第一种全局引入CSS文件的方式，适合于对ElementUI整体的修改，比如整体配色的修改
第二种添加一个style标签的形式，也能够实现修改默认样式的效果，但实际上因为是修改了全局的样式，因此在不同的vue组件中修改同一个样式可能有冲突
第三种方式通过/deep/的方式可以很方便地在vue组件中修改默认样式，也不会与其他页面冲突
第四种内联样式局限性比较大，不太通用

## vm.$attr
包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
## vm.$listeners
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
## vue中的render函数
https://blog.csdn.net/weixin_43974265/article/details/112747768
https://blog.csdn.net/weixin_43974265/article/details/112743656
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，真的需要 JavaScript 的完全编程的能力。这时可以用渲染函数，它比模板更接近编译器。

render 函数和 template 一样都是创建 html 模板的，但是有些场景中用 template 实现起来代码冗长繁琐而且有大量重复，这时候就可以用 render 函数。
new Vue({
  el: '#app',
  render: h => h(App)
})

render 函数即渲染函数，它是个函数，它的参数 createElement 也是个函数。

上边的代码中 render: h => h(App) ，这是 ES6的箭头函数的写法，可以把 h 当作 createElement 的别名。所以这段代码其实相当于：
render: function (createElement) {
    return createElement(App)
}
createElement 函数讲解
这个函数的作用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。

runtime-only 比 runtime-compiler 轻 6kb，代码量更少
runtime-only 运行更快，性能更好
runtime-only 其实只能识别render函数，不能识别template，.vue 文件中的template也是被 vue-template-compiler 翻译成了render函数，所以只能在.vue里写 template
