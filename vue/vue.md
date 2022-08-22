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
