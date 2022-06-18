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
- 操作代理数据影响界面更新渲染

### vue2 和 vue3 的响应式对比

- vue2 的响应式
  - 核心：
    - 对象：通过 defineProperty 对对象的已有属性值的读取和修改进行劫持（监视/拦截）
    - 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
  - 问题：
    - 对象直接新添加的属性或者删除已有的属性，界面不会自动更新
    - 直接通过下标替换元素或者更新 length,界面不会自动更新
      后面就有了`$set` 方法来实现数据的响应式操作
- vue3 的响应式
  通过 Proxy 和 Reflect 的配合来实现了监视及数据的响应式操作

  - 通过 Proxy(代理)：拦截对 data 的任意属性的任意（13 种）操作，包括属性的读写、添加和删除等；cont p = new Proxy(target, handler) handler 用来监视数据的变化，内部还要配合 Reflect 实现
  - 通过 Reflect(反射)：动态对被代理对象的相应属性进行特定的操作；所谓反射就是你给我这个事物，我可以把这个事物的内部东西再给你；通过反射对象可以将当前代理对象或者目标对象当中相关的属性、属性值或者属性的操作直接给你返回过来；Reflect 是个内置对象，不能 new 的，它里面所有的相关方法得通过调用它的静态方法才行或者说叫直接调用
  - vue3 响应式原理

  ```javascript
  // 目标对象
  const user = {
    name: "xx",
    age: 28,
    gf: {
      name: "yy",
      age: 25,
      cars: ["BMW", "BENZ", "audi"]
    }
  };

  // 把目标对象变成代理对象, 第二个参数是一些处理器对象，处理器对象里面有一些监视方法，
  // 监视方法再加上反射对象里面一些对应的方法来实现数据的响应式
  // 参数1：user->target目标对象
  // 参数2：handler->处理器对象，用来监视数据及对数据的操作
  const proxyUser = new Proxy(user, {
    // 获取目标对象中的某个属性值
    get(target, prop) {
      console.log("get方法调用了");
      // 这里要通过反射对象将数据返回去
      return Reflect.get(target, prop);
    },
    // 修改目标对象的属性值/为目标对象添加新的属性
    set(target, prop, val) {
      console.log("set方法调用了");
      // 这里要通过反射对象将数据返回去
      return Reflect.set(target, prop, val);
    },
    // 删除目标对象中的某个属性
    deleteProperty(target, prop) {
      console.log("delete方法调用了");
      return Reflect.deleteProperty(target, prop);
    }
  });

  // 通过代理对象获取目标对象中的某个属性值
  console.log(proxyUser.name);
  // 通过代理对象更新目标对象中的某个属性值
  proxyUser.name = "yy";
  console.log(user);
  // 通过代理对象向目标对象中添加一个新的属性
  proxyUser.gender = "male";
  console.log(user);
  delete proxyUser.name;
  console.log(user);
  // 更新目标对象中属性对象的属性, 说明是个深度监视的操作
  proxyUser.gf.name = "zz";
  console.log(user);
  ```

### setup 的细节

- setup 的执行时机

  vv3 指令可以快速创建一个 vue3 的单文件组件, vscode 可以配置，code->首选项->配置用户代码片段->搜 vue.json 或者 vue, 里面进行配置，该换行换行该转义转义

  ```json
  {
    // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and
    // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
    // same ids are connected.
    // Example:
    // "Print to console": {
    // 	"prefix": "log",
    // 	"body": [
    // 		"console.log('$1');",
    // 		"$2"
    // 	],
    // 	"description": "Log output to console"
    // }
    "Print5 to console": {
      "prefix": "vv3",
      "body": [
        "<template>",
        "</template>",
        "<script lang=\"ts\">",
        "import { defineComponent } from 'vue'",
        "export default defineComponent({",
        "\tname: 'App'",
        "})",
        "</script>"
      ],
      "description": "Log output to console"
    }
  }
  ```

  eslint 会校验多单词命名子组件

  - 在 beforeCreate 之前执行一次，此时组件实例还未创建
  - this 是 undefined,说明就不能通过 this 再去调用 data/computed/methods
  - 其实所有的 composition API 相关回调函数中也都不可以

- setup 返回值
  - setup 的返回值是一个对象，内部的属性和方法是给 html 模板使用的
  - setup 中对象内部的属性和 data 函数中的 return 对象的属性都可以在 html 模板中使用
  - setup 中对象内部的属性和 data 函数中的 return 对象的属性会合并为组件对象的属性
  - setup 中的对象的方法和 method 对象中的方法会合并为组件对象的方法
  - 重名时 setup 优先
  - 注意事项：
  - 在 Vue3 中尽量不要混合的使用 data 和 setup 及 methods 和 setup；setup 访问不到 methods 里的方法和 data 里的属性，因为 this 是 undefined, setup 执行是在 beforeCreate 之前，此时组件还没被创建出来
  - setup 不能是一个 async 函数，因为返回值不再试 return 的对象，而是 promise，模板看不到
- setup 参数
  - setup(props, context)/setup(props, {attrs,slots,emit})
  - props: 包含 props 配置生命且传入了的所有属性的对象
  - attrs: 包含没有在 props 配置中声明的属性的对象，相当于 `this.$attrs`
  - slots: 包含所有传入的插槽内容的对象，相当于 `this.$slots`
  - emit: 用来分发自定义事件的函数，相当于 `this.$emit`
- reactive 和 ref 细节
  ref 也可以对对象进行处理
  - 是 Vue3 的 composition API 中 2 个最重要的响应式 API
  - ref 用来处理基本类型数据, reactive 用来处理对象(递归深度响应式)
  - 如果用 ref 对象/数组, 内部会自动将对象/数组转换为 reactive 的代理对象
  - ref 内部: 通过给 value 属性添加 getter/setter 来实现对数据的劫持
  - reactive 内部: 通过使用 Proxy 来实现对对象内部所有数据的劫持, 并通过 Reflect 操作对象内部数据
  - ref 的数据操作: 在 js 中要.value, 在模板中不需要(内部解析模板时会自动添加.value)
- 计算属性与监视

  - computed 函数:
    - 与 computed 配置功能一致
    - 只有 getter
    - 有 getter 和 setter
  - watch 函数
    - 与 watch 配置功能一致
    - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
    - 默认初始时不执行回调, 但可以通过配置 immediate 为 true, 来指定初始时立即执行第一次
    - 通过配置 deep 为 true, 来指定深度监视
  - watchEffect 函数

  - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
  - 监视数据发生变化时回调

## 组合 API 其他部分
