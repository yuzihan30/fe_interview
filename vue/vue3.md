<!--
 * @Author: your name
 * @Date: 2022-04-01 21:45:58
 * @LastEditTime: 2022-06-17 09:29:52
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/vue/vue3.md
-->

############## 模板语法 #################

1. 布尔型 Attribute, isButtonDisabled 为真值或者空字符串时，元素会包含 disabled 属性，空字符串这个找机会验证下
2. 不带参数的 v-bind，可以将包含多个属性的对象绑定到单个元素上

   <div v-bind="objectOfAttrs"></div> 
   objectOfAttrs: {
       id: 'container',
       class: 'wrapper'
   }

3. 表达式可以出现在文本插值以及任何 Vue 指令 attribute（v-for, v-on, v-slot 除外）的值中，既然是表达式就不能是定义语句、条件语句等；表达式中可以出现方法，该方法在组件每次更新时都会重新调用，因此不能有改变数据或触发异步操作的副作用

4. 表达式有受限的全局访问

5. 指令的动态参数，<a v-bind:[attributeName]="url">...</a>简写为<a :[attributeName]="url">...</a> <a v-on:[eventName]="doSomething">...</a>或者简写<a @[eventName]="doSomething">

6. vue3 允许 template 下有多个节点

############## 响应式基础 #################

1. vue3 的 provide-inject 支持响应式；但 vue2 不支持

############## SSR #################
hydrate 混合

## 新增特性

组合 api
setup: ref 和 reactive, computed 和 watch, 新的生命周期函数，provide 和 inject
新组件：Fragment 新组件，Teleport 瞬移组件, suspense 异步加载组件的 loading 界面
其他 API 更新：全局 API 的修改，将原来的全局 API 转移到应用对象，模板语法变化

## 创建 vue3 项目的两种方式

### vue-cli 创建

npm install -g @vue/cli
vue --version // 4.5.0 以上才行
vue create my-project
选第三个手动选择->选 TS 按下空格->选 vue3->一路回车

### 使用 vite 创建

基于原生 ESM 驱动的构建工具，在开发环境下基于浏览器原生 ES imports 开发
能在本地快速启动，生产环境 Rollup 打包：快速冷启动，不需等待打包操作；即时的热模块更新，替换性能和模块数量的解耦让更新起飞；按需编译，不需等待整个应用编译完成
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev

## 组合 API 常用部分

### setup

也是个函数或者叫回调函数，在程序运行的时候只执行一次

- 新的配置选项，所有的组合 API 函数都在此使用，只在初始化的时候执行一次
- 函数如果返回对象，对象中的属性或者方法，模板中可以直接使用
  > 修改文件内容重启后出现 error Insert `⏎` prettier/prettier 解决方法
  > https://blog.csdn.net/qq_45432996/article/details/105552757
  > "editor.formatOnSave": true

编辑组件遇到的问题及解决办法

- vscode 安装并启用 Volar
  The recommended IDE setup is VSCode + the Volar extension. Volar provides syntax highlighting, TypeScript support, and intellisense for template expressions and component props.
  Volar replaces Vetur, our previous official VSCode extension for Vue 2. If you have Vetur currently installed, make sure to disable it in Vue 3 projects.
- Mac 更新 VSCode 写权限被拒绝 Cannot update while running on a read-only volume
  执行以下命令并重启 vscode, 有时新插件老版本不支持，比如 volar
  sudo chown -R \$USER ~/Library/Caches/com.microsoft.VSCode.ShipIt

### ref

- 作用： ref 定义一个响应式的数据
- 语法：const xxx = ref(initValue)
  - 创建一个响应式数据的引用(reference)对象
  - js 中操作数据：xxx.value
  - 模板中操作数据：不需要.value
- 一般用来定义一个基本类型的响应式数据，言外之意对象就用 reactive

### reactive

- 作用：定义多个数据的响应式，就是定义响应式的对象
- const proxy = reactive(obj):接受一个普通对象然后返回该普通对象的响应式代理器对象
- 响应式转换是深层的：会影响对象内部所有嵌套的属性，通过代理对象操作源对象内部数据都是响应式的
  内部基于 ES6 的 Proxy 实现，

## 组合 API 其他部分
