1. Reflect.ownKeys() 返回自身可枚举、不可枚举、符号属性，等价于Object.getOwnPropertyNames().concat(Object.getOwnPropertySymbols(target))
Object.keys()返回自身可枚举属性（不含符号属性）

2. Object.create(null)创建一个以null为原型的对象，也就是能建立一个空对象

3. function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
       // 如果存在是数组的子元素，children中的元素作为参数传给apply方法，找到第一个是数组的子元素就返回了
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
simpleNormalizeChildren([1,2,3, [4, 5, [6, 7]], [8,9]])
// (8) [1, 2, 3, 4, 5, Array(2), 8, 9]

4. ast和vnode区别
template > ast > render function > 执行 render function > VNode
AST是compiler中把模板编译成有规律的数据结构，方便转换成render函数所存在的；而VNode是优化DOM操作的，减少频繁DOM操作的，提升DOM性能的。
Vnode的数据结构要比ast复杂的多

5. _xx私有数据可读可写，$xx私有数据只读

6. 数组去重
const arr = [1,1,2,2,3,3]
let newArr = []
arr.forEach(v => newArr.indexOf(v) === -1 && newArr.push(v))
或者，效率更高的方式
let _set = {}
let newArr = []
arr.forEach(v => _set[v] = true) // arr.forEach(v => _set[v] || (_set[v] = true) ) _set[v] = true的外面加括号，因赋值运算优先级低一些
Object.keys(arr)

或者arr.forEach(v => _set[v] || (_set[v] = true, newArr.push(v))

7. with(this) {
    return _c(
        'div',
        { attrs: {"id": "app"} },
        [ _v(_s(name)) ]
    )
}
with支持改变词法作用域中属性指向，name直接使用就不用this.name了
示例：
let obj = {name: 'xx', age: 18}
with(obj) {
    console.log(name)
}
## 源码面试相关
下面我通过摘录一些社区里回答的比较浅显的面试答案，来模拟一次不太令人满意的 Vue 面试场景。
引用部分是模拟候选人的简略版回答。
正文部分是笔者的回应。

- 请说一下响应式数据的原理
默认 Vue 在初始化数据时，会给 data 中的属性使用 Object.defineProperty 重新定义所有属性，当页面到对应属性时，会进行依赖收集(收集当前组件中的 watcher)如果属性发生变化会通知相关依赖进行更新操作

收集当前组件中的 watcher，我会进一步问你什么叫当前组件的 watcher？我面试时经常听到这种模糊的说法，感觉就是看了些造玩具的文章就说熟悉响应式原理了，起码的流程要清晰一些：
由于 Vue 执行一个组件的 render 函数是由 Watcher 去代理执行的，Watcher 在执行前会把 Watcher 自身先赋值给 Dep.target 这个全局变量，等待响应式属性去收集它
这样在哪个组件执行 render 函数时访问了响应式属性，响应式属性就会精确的收集到当前全局存在的 Dep.target 作为自身的依赖
在响应式属性发生更新时通知 Watcher 去重新调用 vm._update(vm._render()) 进行组件的视图更新
关于这个问题，有一个比较有意思的经历是，有一位同学前面部分都答得很好，但是我问他 watcher 是利用了什么数据结构去存储的时候，他就不太能答得出来了。所以是否真的阅读过源码，可以通过类似只要你看过，就一定印象深刻的细节来试探。
响应式部分，如果你想在简历上写熟悉的话，还是要抽时间好好的去看一下源码中真正的实现，而不是看这种模棱两可的说法就觉得自己熟练掌握了。
- 为什么 Vue 采用异步渲染
因为如果不采用异步更新，那么每次更新数据都会对当前租金按进行重新渲染，所以为了性能考虑，Vue 会在本轮数据更新后，再去异步更新数据

什么叫本轮数据更新后，再去异步更新数据？

轮指的是什么，在 eventLoop 里的 task 和 microTask，他们分别的执行时机是什么样的，为什么优先选用 microTask，这都是值得深思的好问题。

建议看看这篇文章：Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！

- nextTick 实现原理
nextTick 方法主要是使用了宏任务和微任务，定义一个异步方法，多次调用 nextTick 会将方法存在队列中，通过这个异步方法清空当前队列。所以这个 nextTick 方法就是异步方法
这句话说的很乱，典型的让面试官忍不住想要深挖一探究竟的回答。（因为一听你就不是真的懂）
正确的流程应该是先去 嗅探环境，依次去检测：
Promise 的 then -> MutationObserver 的回调函数 -> setImmediate -> setTimeout 是否存在，找到存在的就使用它，以此来确定回调函数队列是以哪个 api 来异步执行。
在 nextTick 函数接受到一个 callback 函数的时候，先不去调用它，而是把它 push 到一个全局的 queue 队列中，等待下一个任务队列的时候再一次性的把这个 queue 里的函数依次执行。
这个队列可能是 microTask 队列，也可能是 macroTask 队列，前两个 api 属于微任务队列，后两个 api 属于宏任务队列。
简化实现一个异步合并任务队列：
let pending = false
// 存放需要异步调用的任务
const callbacks = []
function flushCallbacks() {
  pending = false
  // 循环执行队列
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]()
  }
  // 清空
  callbacks.length = 0
}

function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    // 利用Promise的then方法 在下一个微任务队列中把函数全部执行
    // 在微任务开始之前 依然可以往callbacks里放入新的回调函数
    Promise.resolve().then(flushCallbacks)
  }
}

测试一下：

// 第一次调用 then方法已经被调用了 但是 flushCallbacks 还没执行
nextTick(() => 🤔console.log(1))
// callbacks里push这个函数
nextTick(() => 🤔console.log(2))
// callbacks里push这个函数
nextTick(() => 🤔console.log(3))

// 同步函数优先执行
console.log(4)

// 此时调用栈清空了，浏览器开始检查微任务队列，发现了 flushCallbacks 方法，执行。
// 此时 callbacks 里的 3 个函数被依次执行。

- Vue 优点
虚拟 DOM 把最终的 DOM 操作计算出来并优化，由于这个 DOM 操作属于预处理操作，并没有真实的操作 DOM，所以叫做虚拟 DOM。最后在计算完毕才真正将 DOM 操作提交，将 DOM 操作变化反映到 DOM 树上

看起来说的很厉害，其实也没说到点上。关于虚拟 DOM 的优缺点，直接看 Vue 作者尤雨溪本人的知乎回答，你会对它有进一步的理解：

网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？

🤔双向数据绑定通过 MVVM 思想实现数据的双向绑定，让开发者不用再操作 dom 对象，有更多的时间去思考业务逻辑

开发者不操作 dom 对象，和双向绑定没太大关系。React 不提供双向绑定，开发者照样不需要操作 dom。双向绑定只是一种语法糖，在表单元素上绑定 value 并且监听 onChange 事件去修改 value 触发响应式更新。

我建议真正想看模板被编译后的原理的同学，可以去尤大开源的 vue-template-explorer[3] 网站输入对应的模板，就会展示出对应的 render 函数。

🤔运行速度更快，像比较与 react 而言,同样都是操作虚拟 dom,就性能而言,vue 存在很大的优势

为什么快，快在哪里，什么情况下快，有数据支持吗？事实上在初始化数据量不同的场景是不好比较的，React 不需要对数据递归的进行 响应式定义。

而在更新的场景下 Vue 可能更快一些，因为 Vue 的更新粒度是组件级别的，而 React 是递归向下的进行 reconciler，React 引入了 Fiber 架构和异步更新，目的也是为了让这个工作可以分在不同的 时间片 中进行，不要去阻塞用户高优先级的操作。

🤔Proxy 是 es6 提供的新特性，兼容性不好，所以导致 Vue3 一致没有正式发布让开发者使用

Vue3 没发布不是因为兼容性不好，工作正在有序推进中，新的语法也在不断迭代，并且发布 rfc 征求社区意见。

🤔Object.defineProperty 的缺点：无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应

事实上可以，并且尤大说只是为了性能的权衡才不去监听[4]。数组下标本质上也就是对象的一个属性。

React 和 Vue 的比较
🤔React 默认是通过比较引用的方式(diff)进行的，React 不精确监听数据变化。

比较引用和 diff 有什么关系，难道 Vue 就不 diff 了吗。

🤔Vue2.0 可以通过 props 实现双向绑定，用 vuex 单向数据流的状态管理框架

双向绑定是 v-model 吧，面试的时候不要把双向绑定和响应式数据给搞混。

🤔Vue 父组件通过 props 向子组件传递数据或回调

Vue 虽然可以传递回调，但是一般来说还是通过 @change 这样的方式去绑定事件吧，这和回调是两套机制。深入的话可以从 Vue 内部实现的 eventEmitter 事件总线机制来回答。

🤔模板渲染方式不同，Vue 通过 HTML 进行渲染

事实上 Vue 是自己实现了一套模板引擎系统，HTML 可以被利用为模板的而已，你在 .vue 文件里写的 template 和 HTML 本质上没有关系。

🤔React 组合不同功能方式是通过 HoC(高阶组件)，本质是高阶函数

事实上高阶函数只是社区提出的一种方案被 React 所采纳而已，其他的方案还有 renderProps 和 最近流行的Hook

Vue 也可以利用高阶函数实现组合和复用。

- diff 算法的时间复杂度
两个数的完全的 diff 算法是一个时间复杂度为 o(n3)， Vue 进行了优化 O(n3)复杂度的问题转换成 O(n)复杂度的问题(只比较同级不考虑跨级问题)在前端当中，你很少会跨级层级地移动 Dom 元素，所以 Virtual Dom 只会对同一个层级地元素进行对比
听这个描述来说，React 没有对 O(n3) 的复杂度进行优化？事实上 React 和 Vue 都只会对 tag 相同的同级节点进行 diff，如果不同则直接销毁重建，都是 O(n) 的复杂度。

- 谈谈你对作用域插槽的理解
单个插槽当子组件模板只有一个没有属性的插槽时， 父组件传入的整个内容片段将插入到插槽所在的 DOM 位置， 并替换掉插槽标签本身。跟 DOM 没关系，是在虚拟节点树的插槽位置替换。

- Vue 中 key 的作用
如果不加 key,那么 vue 会选择复用节点(Vue 的就地更新策略),导致之前节点的状态被保留下来，会产生一系列的 bug
不加 key 也不一定就会复用，关于 diff 和 key 的使用，建议大家还是找一些非造玩具的文章真正深入的看一下原理。
为什么 Vue 中不要用 index 作为 key？（diff 算法详解）

- 组件中的 data 为什么是函数
因为组件是用来复用的，JS 里对象是引用关系，这样作用域没有隔离，而 new Vue 的实例，是不会被复用的，因此不存在引用对象问题
这句话反正我压根没听懂，事实上如果组件里 data 直接写了一个对象的话，那么如果你在模板中多次声明这个组件，组件中的 data 会指向同一个引用。
此时如果在某个组件中对 data 进行修改，会导致其他组件里的 data 也被污染。而如果使用函数的话，每个组件里的 data 会有单独的引用，这个问题就可以避免了。
这个问题我同样举个例子来方便理解，假设我们有这样的一个组件，其中的 data 直接使用了对象而不是函数：
var Counter = {
    template: `<span @click="count++"></span>`
    data: {
        count: 0
    }
}
注意，这里的 Counter.data 仅仅是一个对象而已，它 是一个引用，也就是它是在当前的运行环境下全局唯一的，它真正的值在堆内存中占用了一部分空间。
也就是说，不管利用这份 data 数据创建了多少个组件实例，这个组件实例内部的 data 都指向这一个唯一的对象。
然后我们在模板中调用两次 Counter 组件：
<div>
  <Counter id="a" />
  <Counter id="b" />
</div>
我们从原理出发，先看看它被编译成什么样的 render 函数：
function render() {
  with (this) {
    return _c('div', [_c('Counter'), _c('Counter')], 1)
  }
}
每一个 Counter 会被 _c 所调用，也就是 createElement，想象一下 createElement 内部会发生什么，它会直接拿着 Counter 上的 data 这个引用去创建一个组件。也就是所有的 Counter 组件实例上的 data 都指向同一个引用。
此时假如 id 为 a 的 Counter 组件内部调用了 count++，会去对 data 这个引用上的 count 属性赋值，那么此时由于 id 为 b 的 Counter 组件内部也是引用的同一份 data，它也会感觉到变化而更新组件，这就造成了多个组件之间的数据混乱了。
那么如果换成函数的情况呢？每创建一次组件实例就执行一次 data() 函数：
function data() {
  return { count: 0 }
}
// 组件a创建一份data
const a = data()
// 组件b创建一份data
const b = data()
a === b // false
是不是一目了然，每个组件拥有了自己的一份全新的 data，再也不会互相污染数据了。

- computed 和 watch 有什么区别
计算属性是基于他们的响应式依赖进行缓存的，只有在依赖发生变化时，才会计算求值，而使用 methods，每次都会执行相应的方法
这也是一个一问就倒的回答，依赖变化是计算属性就重新求值吗？中间经历了什么过程，为什么说 computed 是有缓存值的？随便挑一个点深入问下去就站不住。事实上 computed 会拥有自己的 watcher，它内部有个属性 dirty 开关来决定 computed 的值是需要重新计算还是直接复用之前的值。
以这样的一个例子来说：
computed: {
    sum() {
        return this.count + 1
    }
}
首先明确两个关键字：
dirty 从字面意义来讲就是 脏 的意思，这个开关开启了，就意味着这个数据是脏数据，需要重新求值了拿到最新值。
求值 的意思的对用户传入的函数进行执行，也就是执行 sum 这个函数。
在 sum 第一次进行求值的时候会读取响应式属性 count，收集到这个响应式数据作为依赖。并且计算出一个值来保存在自身的 value 上，把 dirty 设为 false，接下来在模板里再访问 sum 就直接返回这个求好的值 value，并不进行重新的求值。
而 count 发生变化了以后会通知 sum 所对应的 watcher 把自身的 dirty 属性设置成 true，这也就相当于把重新求值的开关打开来了。这个很好理解，只有 count 变化了， sum 才需要重新去求值。
那么下次模板中再访问到 this.sum 的时候，才会真正的去重新调用 sum 函数求值，并且再次把 dirty 设置为 false，等待下次的开启……
具体的原理解析，我在Vue 的计算属性如何实现缓存？这篇文章里很详细的讲解了。

- Watch 中的 deep:true 是如何实现的
当用户指定了 watch 中的 deep 属性为 true 时，如果当前监控的值是数组类型，会对对象中的每一项进行求值，此时会将当前 watcher 存入到对应属性的依赖中，这样数组中的对象发生变化时也会通知数据更新。
不光是数组类型，对象类型也会对深层属性进行 依赖收集，比如deep watch了 obj，那么对 obj.a.b.c = 5 这样深层次的修改也一样会触发 watch 的回调函数。本质上是因为 Vue 内部对需要 deep watch 的属性会进行递归的访问，而在此过程中也会不断发生依赖收集。（只要此属性也是响应式属性）
在回答这道题的时候，同样也要考虑到 递归收集依赖 对性能上的损耗和权衡，这样才是一份合格的回答。

- action 和 mutation 区别
mutation 是同步更新数据(内部会进行是否为异步方式更新数据的检测)
内部并不能检测到是否异步更新，而是实例上有一个开关变量 _committing，
只有在 mutation 执行之前才会把开关打开，允许修改 state 上的属性。
并且在 mutation 同步执行完成后立刻关闭。
异步更新的话由于已经出了 mutation 的调用栈，此时的开关已经是关上的，自然能检测到对 state 的修改并报错。具体可以查看源码中的 withCommit 函数。这是一种很经典对于 js单线程机制 的利用。
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
总结
关于面经，面经其实是一个挺不错的文章形式，它可以让你在不去参与面试的情况下也可以得知目前国内的大厂主要在技术上关注哪些重点。但是如果你用面经下面的简略的答案去作为你的学习材料，那我觉得就本末倒置了。正确的方式是去针对每一个重难点，结合你自己目前的技术水平和方向去深入学习和研究。
比如面试官问你 Vue 的原理，其实是想考察你对平常使用的框架是否有探索底层原理的兴趣和热情，相信有这份热情的人他的技术积累和潜力一定也不会差。但是很多人现在为了应付面试，就直接按照本文所说的比较水的面试文章里简略版答案去背，大厂面试官一定会针对每一个点深入挖掘，挖到你说不出来为止，这样真的是很不推荐的一种行为。
如果你真的想掌握好 Vue 的原理，并且作为你简历中的一个亮点，那么你就自己打开源码一点点花时间去研究。
如果你目前的基础不够，那也可以辅助以一些优秀的的视频教程或者文章。我始终觉得，纸上得来终觉浅，如果你不能去深入源码一步步调试，你对它的认知总归是比较浅层的。
一些小秘密


## 响应式原理
### watcher分类
1. 渲染watcher, 负责更新视图变化的，即⼀个vue实例对应⼀个渲染watcher
2. ⽤户⾃定义watcher，⽤户通过watch：{value(val, oldVal){}}选项定义的，或者this.$watch()⽅法⽣成的。
3. computed选项⾥⾯的计算属性也是watcher, 和第2点中的watcher的区别是它的watcher实例有dirty属性控制着watcher.value值的变化
## Object.defineProperty的问题
无法监听Map、Set的变化
无法监听Class类型的数据
属性的新增和删除无法监听
数组元素的新增和删除无法监听，无法监听通过索引改变数组的情况

## diff算法
- 什么是diff算法
diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记
录的消息去局部更新Dom。
简单来说：
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁
- diff算法的特点
比较只会在同层级进行, 不会跨层级比较
在diff比较的过程中，循环从两边向中间比较
diff 算法的在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较
- diff算法的步骤
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文 档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较(diff)，记录两棵树差异
把第二棵树所记录的差异应用到第一棵树所构建的真正的DOM树上(patch)，视图就更新了
- 比较方式
diff整体策略为：深度优先，同层比较
比较只会在同层级进行, 不会跨层级比较
比较的过程中，循环从两边向中间收拢
- 原理分析
当数据发生改变时，set方法会调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图


