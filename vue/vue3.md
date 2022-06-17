<!--
 * @Author: your name
 * @Date: 2022-04-01 21:45:58
 * @LastEditTime: 2022-06-17 09:29:52
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/vue/vue3.md
-->

############## 模板语法 #################
1. 布尔型Attribute, isButtonDisabled为真值或者空字符串时，元素会包含disabled属性，空字符串这个找机会验证下
2. 不带参数的v-bind，可以将包含多个属性的对象绑定到单个元素上
<div v-bind="objectOfAttrs"></div> 
objectOfAttrs: {
    id: 'container',
    class: 'wrapper'
}

3. 表达式可以出现在文本插值以及任何Vue指令attribute（v-for, v-on, v-slot除外）的值中，既然是表达式就不能是定义语句、条件语句等；表达式中可以出现方法，该方法在组件每次更新时都会重新调用，因此不能有改变数据或触发异步操作的副作用

4. 表达式有受限的全局访问

5. 指令的动态参数，<a v-bind:[attributeName]="url">...</a>简写为<a :[attributeName]="url">...</a> <a v-on:[eventName]="doSomething">...</a>或者简写<a @[eventName]="doSomething">

6. vue3允许template下有多个节点

############## 响应式基础 #################
1. vue3的provide-inject支持响应式；但vue2不支持

############## SSR #################
hydrate 混合


## 新增特性
组合api
setup: ref和reactive, computed和watch, 新的生命周期函数，provide和inject
新组件：Fragment新组件，Teleport瞬移组件, suspense异步加载组件的loading界面
其他API更新：全局API的修改，将原来的全局API转移到应用对象，模板语法变化

## 创建vue3项目的两种方式
### vue-cli创建
npm install -g @vue/cli
vue --version // 4.5.0以上才行
vue create my-project
选第三个手动选择->选TS按下空格->选vue3->一路回车
### 使用vite创建
基于原生ESM驱动的构建工具，在开发环境下基于浏览器原生ES imports开发
能在本地快速启动，生产环境Rollup打包：快速冷启动，不需等待打包操作；即时的热模块更新，替换性能和模块数量的解耦让更新起飞；按需编译，不需等待整个应用编译完成
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev