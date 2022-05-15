<!--
 * @Author: your name
 * @Date: 2022-04-01 21:45:58
 * @LastEditTime: 2022-05-15 20:00:49
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

############## 响应式基础 #################

############## SSR #################
hydrate 混合
