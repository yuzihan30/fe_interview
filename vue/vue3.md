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

## prop
default：为该 prop 指定一个当其没有被传入或值为 undefined 时的默认值。对象或数组的默认值必须从一个工厂函数返回。工厂函数也接收原始 prop 对象作为参数。
## method
interface ComponentOptions {
  methods?: {
    [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
  }
}
...args: any[], any[]代表args的类型，args是数组
在声明方法时避免使用箭头函数，因为它们不能通过 this 访问组件实例。
## watch
watch 选项期望接受一个对象，其中键是需要侦听的响应式组件实例属性 (例如，通过 data 或 computed 声明的属性)——值是相应的回调函数。该回调函数接受被侦听源的新值和旧值。
除了一个根级属性，键名也可以是一个简单的由点分隔的路径，例如 a.b.c。注意，这种用法不支持复杂表达式——仅支持由点分隔的路径。如果你需要侦听复杂的数据源，可以使用命令式的 $watch() API。
值也可以是一个方法名称的字符串 (通过 methods 声明)，或包含额外选项的对象。当使用对象语法时，回调函数应被声明在 handler 中
声明侦听器回调时避免使用箭头函数，因为它们将无法通过 this 访问组件实例。

## render
预编译的模板，例如单文件组件中的模板，会在构建时被编译为 render 选项。如果一个组件中同时存在 render 和 template，则 render 将具有更高的优先级。
## 生命周期
updated
这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。

## inject
该 inject 选项应该是以下两种之一：

一个字符串数组
一个对象，其 key 名就是在当前组件中的本地绑定名称，而它的值应该是以下两种之一：
匹配可用注入的 key (string 或者 Symbol)
一个对象
它的 from 属性是一个 key (string 或者 Symbol)，用于匹配可用的注入
它的 default 属性用作候补值。和 props 的默认值类似，如果它是一个对象，那么应该使用一个工厂函数来创建，以避免多个组件共享同一个对象。

和 props 默认值类似，对于非原始数据类型的值，你需要使用工厂函数：

js
const Child = {
  inject: {
    foo: {
      from: 'bar',
      default: () => [1, 2, 3]
    }
  }
}
可以思考一下，为何执行函数时就可以返回一个新的引用值

## mixins
mixins 选项接受一个 mixin 对象数组。这些 mixin 对象可以像普通的实例对象一样包含实例选项，它们将使用一定的选项合并逻辑与最终的选项进行合并。举例来说，如果你的 mixin 包含了一个 created 钩子，而组件自身也有一个，那么这两个函数都会被调用。

Mixin 钩子的调用顺序与提供它们的选项顺序相同，且会在组件自身的钩子前被调用。

## extends
使一个组件可以继承另一个组件的组件选项。

从实现角度来看，extends 几乎和 mixins 相同。通过 extends 指定的组件将会当作第一个 mixin 来处理。

然而，extends 和 mixins 表达的是不同的目标。mixins 选项基本用于组合功能，而 extends 则一般更关注继承关系。

同 mixins 一样，所有选项都将使用相关的策略进行合并。

## 指令
- v-on
当用于普通元素，只监听原生 DOM 事件。当用于自定义元素组件，则监听子组件触发的自定义事件。
<!-- 动态事件 -->
<button v-on:[event]="doThis"></button>
<!-- 内联声明 -->
<button v-on:click="doThat('hello', $event)"></button>
<!-- 不带表达式地阻止默认事件 -->
<form @submit.prevent></form>
<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
监听子组件的自定义事件 (当子组件的“my-event”事件被触发，处理函数将被调用)：
template
<MyComponent @my-event="handleThis" />
<!-- 内联声明 -->
<MyComponent @my-event="handleThis(123, $event)" />

- v-bind
动态的绑定一个或多个 attribute，也可以是组件的 prop。
<!-- 动态 attribute 名 -->
<button v-bind:[key]="value"></button>
<!-- 缩写 -->
<img :src="imageSrc" />
<!-- 缩写形式的动态 attribute 名 -->
<button :[key]="value"></button>
<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定对象形式的 attribute -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
<MyComponent :prop="someThing" />

<!-- 传递子父组件共有的 prop -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
- v-model
在表单输入元素或组件上创建双向绑定。
期望的绑定值类型：根据表单输入元素或组件输出的值而变化
仅限：
<input>
<select>
<textarea>
components
修饰符：
.lazy ——监听 change 事件而不是 input
.number ——将输入的合法符串转为数字

- v-slot
<!-- 接收 prop 的具名插槽 -->
<InfiniteScroll>
  <template v-slot:item="slotProps">
    <div class="item">
      {{ slotProps.item.text }}
    </div>
  </template>
</InfiniteScroll>

<!-- 接收 prop 的默认插槽，并解构 -->
<Mouse v-slot="{ x, y }">
  Mouse position: {{ x }}, {{ y }}
</Mouse>

cloak	英[kləʊk]
美[kloʊk]
n.	斗篷; (尤指旧时的)披风; 遮盖物;
vt.	遮盖; 掩盖;

chalk	英[tʃɔːk]
美[tʃɑːk]
n.	(白色或彩色的)粉笔; 白垩;
vt.	用粉笔写(或画);

## 样式
子组件的根元素
使用 scoped 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

## 全局属性的使用
// 之前(Vue 2.x)
Vue.prototype.$http = () => {}
 
// 之后(Vue 3.x)
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
1
2
3
4
5
6
当我们想在组件内调用http时需要使用getCurrentInstance()来获取。

import { getCurrentInstance, onMounted } from "vue";
export default {
  setup( ) {
    const { ctx } = getCurrentInstance(); //获取上下文实例，ctx=vue2的this
    onMounted(() => {
      console.log(ctx, "ctx");
      ctx.http();
    });
  },
};

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

1. setup

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

2. ref

- 作用： ref 定义一个响应式的数据
- 语法：const xxx = ref(initValue)
  - 创建一个响应式数据的引用(reference)对象
  - js 中操作数据：xxx.value
  - 模板中操作数据：不需要.value
- 一般用来定义一个基本类型的响应式数据，言外之意对象就用 reactive

3. reactive

- 作用：定义多个数据的响应式，就是定义响应式的对象
- const proxy = reactive(obj):接受一个普通对象然后返回该普通对象的响应式代理器对象
- 响应式转换是深层的：会影响对象内部所有嵌套的属性，通过代理对象操作源对象内部数据都是响应式的
  内部基于 ES6 的 Proxy 实现，
- 操作代理数据影响界面更新渲染

4. vue2 和 vue3 的响应式对比

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
      cars: ["BMW", "BENZ", "audi"],
    },
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
    },
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
proxy可以直接监听数组的变化，proxy可以直接监听对象而非属性。
vue2.0中，比如vm.arr.length–或者vm.arr[0]=100均不能触发视图更新；
如果想更新索引可以使用
vm.$set(vm.arr,0,100)
或者
vm.$delete(vm.arr,0);
proxy返回的是一个新对象，我们可以只操作新对象达到目的，不需要深度遍历监听，性能高于Object.defineProperty；而Object.defineProperty只能遍历对象属性直接修改。

proxy有多达13种拦截方法，不限于apply、ownKeys、deleteProperty、has等是object.defineProperty不具备的。
看到这可能有同窗要问了，既然Proxy能解决以上两个问题，并且Proxy做为es6的新属性在vue2.x以前就有了，为何vue2.x不使用Proxy呢？一个很重要的缘由就是：vue

Proxy是es6提供的新特性，兼容性很差，最主要的是这个属性没法用polyfill来兼容

Object.defineProperty只能劫持对象的属性,所以咱们须要对每一个对象的每一个属性进行遍历。Vue 2.x里，是经过 递归 + 遍历 data 对象来实现对数据的监控的，若是属性值也是对象那么须要深度遍历,显然若是能劫持一个完整的对象是才是更好的选择。
5. setup 的细节

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
  - setup 不能是一个 async 函数，因为返回值不再是 return 的对象，而是 promise，模板看不到
- setup 参数
  - setup(props, context)/setup(props, {attrs,slots,emit})
  - props: 包含 props 配置声明且传入了的所有属性的对象
  - attrs: 包含没有在 props 配置中声明的属性的对象，相当于 `this.$attrs`
  - slots: 包含所有传入的插槽内容的对象，相当于 `this.$slots`
  - emit: 用来分发自定义事件的函数，相当于 `this.$emit`
setup(props) {
    console.log(props.title)
  }
}
请注意如果你解构了 props 对象，解构出的变量将会丢失响应性。因此我们推荐通过 props.xxx 的形式来使用其中的 props。
6. reactive 和 ref 细节
   ref 也可以对对象进行处理

- 是 Vue3 的 composition API 中 2 个最重要的响应式 API
- ref 用来处理基本类型数据, reactive 用来处理对象(递归深度响应式)
- 如果用 ref 对象/数组, 内部会自动将对象/数组转换为 reactive 的代理对象
- ref 内部: 通过给 value 属性添加 getter/setter 来实现对数据的劫持
- reactive 内部: 通过使用 Proxy 来实现对对象内部所有数据的劫持, 并通过 Reflect 操作对象内部数据
- ref 的数据操作: 在 js 中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

7. 计算属性与监视

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


hydrate 激活
英[haɪˈdreɪt , ˈhaɪdreɪt]
美[ˈhaɪdreɪt]
n.	水合物;
vt.	使吸入水分; 使水合; 使成水合物;


8. vue3 生命周期

卸载前、卸载后换成了 beforeUnmount、unmounted; vue2 中的都能在 vue3 中使用，但 vue2 中是 options 选项， vue3 都是组合式的 api；新增两个钩子函数主要用来做调试的

- 与 2.x 版本生命周期相对应的组合式 API
  vue2 中有 11 个，8 个常见的，2 个缓存组件的，1 个错误捕获的；vue3 中常见剩 6 个，因为有俩用 setup 代替了

beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured

- 新增的钩子函数

组合式 API 还提供了以下调试钩子函数：

onRenderTracked
onRenderTriggered

- 执行顺序
  3.0 中的 setup
  2.x 中的 beforeCreate
  2.x 中的 created
  3.0 中的 onBeforeMount
  2.x 中的 beforeMount
  3.0 中的 onMounted
  2.x 中的 mounted

  3.0 中的 onBeforeUpdate
  2.x 中的 beforeUpdate
  3.0 中的 onUpdated
  2.x 中的 updated
  3.0 中的 onBeforeUnmount
  2.x 中的 beforeUnmount
  3.0 中的 onUnmounted
  2.x 中的 unmounted

9. 自定义 hook 函数

- 使用 Vue3 的组合 API 封装的可复用的功能函数
- 自定义 hook 的作用类似于 vue2 中的 mixin 技术
- 自定义 Hook 的优势: 很清楚复用功能代码的来源, 更清楚易懂

10. toRefs

- 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
- 应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
- 问题: reactive 对象取出的所有属性值都是非响应式的
- 解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

11. ref 获取元素
    利用 ref 函数获取组件中的标签元素
    功能需求: 让输入框自动获取焦点

## 组合 API 其他部分

1.  shallowReactive 与 shallowRef

- shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)

- shallowRef: 只处理了 value 的响应式, 不进行对象的 reactive 处理

- 什么时候用浅响应式呢?
  - 一般情况下使用 ref 和 reactive 即可
  - 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
  - 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

2. readonly 与 shallowReadonly

- readonly:
  - 深度只读数据
  - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
- shallowReadonly
  - 浅只读数据
  - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
- 应用场景:
  - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

3. toRaw 与 markRaw

- toRaw
  - 返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。
  - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
- markRaw
  - 标记一个对象，使其永远不会转换为代理。返回对象本身
  - 应用场景:
    - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

4. toRef

- 为源响应式对象上的某个属性创建一个 ref 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
- 区别 ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
- 应用: 当要将 某个 prop 的 ref 传递给复合函数时，toRef 很有用

5. customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求: 使用 customRef 实现 debounce 的示例

6.  provide 与 inject

- provide 和 inject 提供依赖注入，功能类似 2.x 的 provide/inject
- 实现跨层级组件(祖孙)间通信

7. 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
- isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
- isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

## 手写组合 API

主要是实现里面的劫持操作，没有实现页面更新操作

1. shallowReactive 与 reactive
2. shallowRef 与 ref
3. shallowReadonly 与 readonly
4. isRef, isReactive 与 isReadonly

## 其他新组件和 API

1. 新组件

1) Fragment(片断)
   在 Vue2 中: 组件必须有一个根标签
   在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
   好处: 减少标签层级, 减小内存占用
2) Teleport(瞬移)
   把一些东西瞬间移动到指定的位置
   Teleport 提供了一种干净的方法, 让组件的 html 在父组件界面外的特定标签(很可能是 body)下插入显示
3) Suspense(不确定的)
   它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验

2. 其他新的 API #全新的全局 API
   createApp()
   defineProperty()
   defineAsyncComponent()
   nextTick()
   将原来的全局 API 转移到应用对象
   app.component()
   app.config()
   app.directive()
   app.mount()
   app.unmount()
   app.use()
   模板语法变化
   v-model 的本质变化
   prop：value -> modelValue；
   event：input -> update:modelValue；
   .sync 修改符已移除, 由 v-model 代替
   <ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />
   v-if 优先 v-for 解析



extraneous
英[ɪkˈstreɪniəs]
美[ɪkˈstreɪniəs]
adj.	没有直接联系的; 无关的;
[例句]We do not want any extraneous information on the page.
我们不希望这一页上有任何无关的信息。