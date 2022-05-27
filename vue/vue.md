<!--
 * @Author: your name
 * @Date: 2022-03-20 09:11:19
 * @LastEditTime: 2022-05-17 16:28:28
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/vue/vue.md
-->
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