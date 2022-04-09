<!--
 * @Author: your name
 * @Date: 2022-03-20 09:11:19
 * @LastEditTime: 2022-03-20 10:14:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/vue/vue.md
-->
1. vue常用指令：
内容类：v-html(可以将标签一起渲染)、v-text(等价于{{}})、v-show、v-if、v-else、v-for、v-model、v-once(例：<p v-once>{{ content }}</p>，只渲染一次，后面改变不会再渲染)
属性类：v-bind(:XXX)、v-on(:click,等价于@)

2. v-if和v-for的区别
v-if切换时会伴随组件的创建销毁，惰性加载，为true才真正渲染
v-show 只在初始化时加载渲染一次，只是display:none和block的切换