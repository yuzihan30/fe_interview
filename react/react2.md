########## 组件通信 ######### 
9. context 状态树 react 官方提供的跨级通信方案，使用了生产者消费者这种模式
provider 服务提供商，比如有两个消费者，一个去改服务，另一个去访问这个服务，第三个在 provider 范围内，但没成为消费者，第四个在 provider 范围之外
改造之前的案例，需要把父组件做成供应商组件
const GlobalContext = React.createContext() // 创建 context 对象，所有的供应商和消费者都是由这个 context 对象创建出来的
this.state = {
filmList: [],
info: '111'
}
render() {
return (
// value 名字是固定的不能写其他的， 供应商可以传普通的 key\value, 也可以传 key\方法
<GlobalContext.Provider value={{
            call: "电话服务",
            info: this.state.info,
            changeInfo: (value) => {
                this.setState({
                    info: value
                })
            }
        }}>
<div>
this.state.filmList.map(item => {
<FilmItem key="item.filmId" {...item}></FilmItem>
})
</div>
</GlobalContext.Provider>
)
}
剩下就是让两个子组件成为消费者, 谁要想使用这个服务，谁就要把自己包装成消费者
render() {
return (
<GlobalContext.Consumer> // 如果不愿意成为消费者永远拿不到公共服务
// 注意里面的格式，大括号加回调函数
{
// 这里用回调函数式因为入参是公共服务
(value) => {

                return <div onClick={() => {
                    // 这里改info, 比如value.info = "222"， 另一个消费者就能拿到改变的info， 直接改不好用， 必须跟状态挂钩
                    // 像让另一个消费者触发render执行，要么props,要么state方式
                    // 那我们就把info做成根组件的状态, synposis概要摘要
                    value.changeInfo(synposis)
                }}>
                </div>
            }
            // 或者 (value) => <div>
            //</div>
        }
        <GlobalContext.Consumer>
    )

}
redux 也是状态管理的一种方案，也能解决父子之间数据的共享，后续更新 
10. 插槽，vue 中叫 slot 插槽，上面 context 中的内容就是这种形式，react 中子组件通过 this.props.children 可以拿到插槽的信息，区别于标签上能定义的属性，插槽会把插槽内容固定挂载 children 属性上
对应 vue 中具名插槽，react 中 this.props.children[i]依次拿到对应位置的插槽信息
作用：为了复用；一定程度减少父子通信

11. 插槽版抽屉组件
    Navbar 里的按钮现在放到插槽里，那就可以直接访问到父组件的状态,这种方法就能替代子传父
    <Navbar>
    // 插槽能看到父组件的模板，又能拿到父组件的状态
    <button onClick={ () => {
    this.setState({
    show: !this.state.show
    })
    }} > </button>
    </Navbar>
    其他应用场景：比如可以让使用者自己决定到底轮播什么内容，留好插槽就行；navbar 也可以左边一个插槽右边一个插槽，中间是文本内容
    组件封装的时候一方面通过属性控制复用性，如果想在复杂情况下复用的话就必须开放好插槽

########## 生命周期 #########

1. react 生命周期
   之前在 constructor 中做 ajax 请求和事件绑定都是不合理的
   初始化阶段，运行中的阶段，销毁阶段
   初始化阶段：
   componentWillMount: render 之前最后一次修改状态的机会
   render:只能访问 props 和 state, 不允许修改状态和 DOM 输出
   componentDidMount: 成功 render 并渲染完成真实的 DOM 后触发，可以修改 DOM
   运行中的阶段：
   componentWillReceiveProps: 父组件修改属性触发
   shouldComponentUpdate: 返回 false 会阻止 render 调用
   componentWillUpdate: 不能修改属性和状态
   render: 只能访问 props 和 state, 不允许修改状态和 DOM 输出
   componentDidUpdate: 可以修改 DOM
   销毁阶段：
   componentWillUnmount: 在删除组件之前进行清理操作，比如计时器和事件监听器
   组件创建的时候启动一个定时器，销毁之前未清理的话，销毁之后还会存在
   之前的函数式组件只有 props，没有 state 也没有组件的生命周期，后面借助于 hooks 的副作用函数可以实现
   目前只有类组件有生命周期，render 函数可以看到，没有被主动调用，但会被 react 组件系统自动调用

2. 初始化阶段
   state = {
   myname: ''
   }
   componentWillMount() { // 将要挂载到 DOM 节点中
   // 上树之前最后一次修改状态的机会， 初始化数据的作用
   // 适用场景：state 数据初始化时有复杂的计算逻辑，直接写到前面会比较丑
   }
   componentDidMount() { // 已经挂载到 DOM 节点中， 已经渲染完了，可以拿到真实的 DOM 节点
   // 有的文档会把构造器当做声明周期函数，其实只是类必走的一个函数而已
   // 数据请求一般会放在这里，放在 constructor、willMount 里其实也没问题，其实不要以为放在 didMount 里会有延迟，willMount 到 didMount 的延迟可以忽略不计
   // 还有订阅一般放这里，其实订阅放 constructor 里也没问题
   // 还有定时器
   // 基于创建完的 DOM 进行初始化，这个是前面构造器 willMount 不能替代的，BetterScroll 是原生 js 封装的库可以让我们的长列表更好的滚动，必须等 DOM 创建完后才能 new，之前做过异步请求 then 拿到结果后，setState 会同步更新 DOM， 然后 new BetterScroll 是非常安全的;但现在如果列表在 render 里直接写死的，那什么时候才能拿到 DOM 呢，只能在 didMount 里
   }
   上面它们俩只会执行一次，就是在组件创建的时候。render 在运行中也会执行
   render() { // 正在渲染，作用就是渲染页面
   // 这里千万不能 setState, 初始化会执行一次，每次更新还会执行，导致循环调用，栈溢出
   }

3. 初始化阶段注意事项
   componentWillMount 已经该名并且不推荐使用了，因为可能会有副作用函数，副作用函数可以移到 componentDidMount 来做，初始化状态移动到 constructor 来做
   react 版本的几个节点
   16.2（之前都是老的生命周期，这个版本之后 diff 算法做了一些更改，提出了 fiber 技术，willMount 如果再用的话会报黄色警告，若不让报警告，要么不用，要么改为加个前缀 UNSAFE\_）， 16.8（），17
   Fiber 纤维就是比线程还要小的，16.2 之前创建状态之后会创建新的虚拟 DOM 树，会对比老的虚拟 DOM 树，这个对比过程是同步的，数据量如果比较小的话还好，如果比较多比如 100 多个组件，会出现浏览器假死，在忙着对比两个虚拟 DOM,这两个对象超级超级大；Fiber 把创建 DOM 和组件渲染拆分成无数个小的分片任务来进行，先执行优先级；低优先级任务就是 willMount 中找哪些节点要挂到页面中，高优先级就是 render 渲染啊，didMount 挂载完了，就是找出哪些需要更新到 DOM 的过程这个是可以被打断的，而更新 DOM 的过程是不能被打断的，打断的任务只能下次重新再来一遍，那 willMount 里面的东西就存在可能触发多次的问题
   16.8 引入 hooks 之后函数式组件开始有生命周期

4. 初始化案例
BetterScroll 使用步骤：
import BetterScroll from 'better-scroll'
componentDidMount() {
new BetterScroll("#wrapper")
}
<div id="wrapper" style={{ height: "200px", overflow: "hidden" }><ul></ul></div>

5. 运行中阶段
   componentWillUpdate， 是通过自己的 state 更新，还是从父组件传来 props 更新，都会引发这个组件将要更新；和 willMount 一样也是没有到 DOM 更新的状态，它的执行频率是很高的，willMount 一辈子执行只有一次，WillUpdate 则是 setState 就要走一次，render、didUpdate 也是
   render() {
   // DOM 正在更新
   }
   componentWillUpdate() { // 和 willMount 同样道理，处在 React 调度机制的第一个阶段，寻找需要更新哪些 DOM, 被打断重新执行，有隐患
   // DOM 还未更新，用到的机会比较少，后面用到一次配合新生命周期去说
   // 这里也不能 setState,会引入死循环
   }
   UNSAFE_componentWillUpdate
   componentDidUpdate(preProps, preState) {
   // DOM 已经更新， 更新后获取 DOM 节点
   // 引出 better-scroll 新方案，didMount 中请求数据之后 setState 会走更新， didUpdate 里面 DOM 就更新完了,在 didUpdate 里面
   // 但这里有个缺点，会执行多次，每次更新，它都会执行，频繁执行多次，危险且耗性能，会引发不可预期的问题
   // 比如 new BetterScroll("#wrapper")，这时可以做个判断，避免频繁调用
   // if(state.list.length === 0) { new BetterScroll("#wrapper") } 但又发现这里拿不到老状态，state.list.length === 0 这个条件判断可能就一直无法成立，那就通过入参 preProps 和 preState 的方式拿到老的状态，进一步修改 if(preState.list.length === 0) { new BetterScroll("#wrapper") }
   }

6. 运行阶段 2 shouldComponentUpdate
<div> onClick={ () => {
    // this.state.name = "aaa" // 如果直接改，相当于上来就把老状态改成最新的值了，SCU里判断的时候都相等了，就直接return false,直接就不更新了
    this.setState({
        name: 'aaa'
    })
}}
> </div>
发现一直点击，render生命周期会一直触发下去，willUpdate和didUpdate也是，即使前后两次状态相同；对比了虚拟DOM，didUpdate等生命周期也走，发现没改变，白白浪费了时间，执行了无所必要的重复工作，最后DOM还没改变;即使不设置值，执行this.setState({})，也会一直重复执行那个过程,react虚拟DOM对比是很浪费性能的,所以就有了shouldComponentUpdate，如果不需要更新就不需要比较虚拟DOM了
// 面试中问SCU就是它， 性能优化函数
shouldComponentUpdate(nextProps, nextState) { // 能真正做到手动控制react的性能
    // 这里还未更新所以state是老的状态，nextProps、nextState就是新的状态
    if (老状态 !== 新状态) { return true // 那么就允许虚拟DOM创建，并diff }
    // 如果要比较的东西比较多就JSON.stringify(this.state) !== JSON.stringify(nextState)
    return false
}
// 更重要的应用场景是在子组件中-案例2
shouldComponentUpdate(nextProps, nextState) {
    // 只需要更新上一次相同和这一个不同的两个盒子，也就是只更新上次选中和这次选中的，其他成百上千的盒子不用关心，这样每次父state更新，子Box只需要两个更新
    if (this.props.current === this.props.index || nextProps.current === nextProps.index) { // 老的current等于老的index
        return true
    }
    return false
}
style={{ border: this.props.current === this.props.index ? "5px solid green":"1px solid gray" }}

<input type="number" onChange={ (evt) => { // type="number"虽然标识是数字类型，但 evt.target.value 拿到还是字符串所以需要转换一下 current: Number(evt.target.value)
this.setState({ current: Number(evt.target.value) }) // 问题来了，每次 setSate 一次父都会 render, 这样每个子 Box 也会 render，而不是只关心变化的两个盒子，所以在子里面加 SCU 优化性能
} }>
this.state.list.map((item, index) => // 箭头函数里省略的 return，可以暂时忽略<Box>换不换行的问题，不同于 render 中 return, 这个省略的 return 可能和 Box 在同一行
<Box key={item} current={this.state.current} index={index} />)

6. 运行中 3
   componentWillReceiveProps 将要得到属性的时候，名字虽然这样起的，但其实不传 props 只改父组件的状态也会触发，在什么时候执行及应用场景
   需要先构建父子关系，componentWillReceiveProps 放到子组件里
   父组件里 state 更新，即使没给子组件传 props 或者 props 没更新，都会触发 componentWillReceiveProps， 因为父 state 更新->父 render 执行->子更新
   componentWillReceiveProps(nextProps) { // 因为是在更新阶段的，首次创建时不会被触发
   // 这里 this.props.text 是老的属性, 入参 nextProps 可以拿到最新的，nextProps 可以最早拿来父组件传来的属性，可以利用属性进行 ajax 或者逻辑处理
   // 或者把父组件的属性转化成孩子自己的状态（不能直接改属性，就可以在这儿将其改成其内部的状态）
   }

componentWillReceiveProps-案例
电影切换正在热映和即将上映下面的列表页可以是一个组件（子组件根据传的不同 type,请求不同的电影列表数据）
电商分类下的列表页也可以是公用的一个组件
初始化组件时 didMount 里根据不同 props.type 请求不同接口，更新则根据 willReceiveProps(nextProps)中 nextProps.props.type 值的不同发不同请求
willReceiveProps 处于 diff 更新时找哪些需要更新的阶段，没有正在更新正在渲染阶段的优先级高，所以这个阶段容易被打断，打断之后就会引发重复执行的问题，UNSAFE_componentWillReceiveProps 可以消除警告
axios({url: "", headers:{}}).then()

7. 销毁
   销毁组件的方式，之前用过三目运算符
   { this.state.isCreated ? <Child> : '' } isCreated 修改为 false 时，Child 就不在 render 中渲染了，不是就移出了嘛
   还可以用&&的方式，这也是一种让一个节点快速创建和删除的方案
   { this.state.isCreated && <Child> : '' }
   还可以空标签的形式 this.state.show?<Btn></Btn>:<></>
   componentDidMount() {
   // 组件销毁后绑定 window 窗口的事件还会被触发，而内部的其他事件则被销毁
   window.onresize = () => {
   console.log("resize")
   }
   // UI 视图会用到这个状态才会定义这个状态
   setIntervale(()=> { // 这个定时器如果销毁前不清除，销毁后还存在
   console.log("111")
   }, 1000)
   // 可以测试一下定义为局部变量时 let timer = setInterval 会不会销毁
   // 标准的做法挂到 this 上，不挂在 state 上，UI 视图会用到这个状态才会定义这个状态
   this.timer = setInterval // 销毁时清除
   }
   componentWillUnmount() {
   // 这里把 window 事件清空
   window.onresize = null
   clearInterval(this.timer)
   }

########## 新生命周期 #########

1.  getDerivedStateFromProps 初始化时代替 willMount，父传子时代替 receiveProps
    获取衍生的状态从属性上，意思就是把从父获得的属性转化为自己的状态
    第一次初始化和后续更新（自己状态更新或者父传子），相当于销毁不执行，其他都执行了
    怎么用及使用场景
    getDerivedStateFromProps 而且是类方法，静态方法，需要在前面加 static
    另外要求有状态，且内部返回值（不能是空）
    state = {
    name: "aaa",
    age: 16,
    type: 1
    }
    // 之前用 willMount 初始化
    static getDerivedStateFromProps(nextProps, nextState) { // 类似于 setState 在一个事件循环中执行多次可以合并处理， 合并完了在 didUpdate 当中做一次请求就可以，相比 willReceiveProp 能解决频繁异步请求的问题
    // console.log(this.state) // 会报错, 类上的静态方法拿不到实例
    return { // state 中同名的会覆盖掉，不同名的会保存下来
    // name: "AAA" // 不能写死，写死后面就不能更新了
    // 适合初始化和更新时执行同一逻辑的场景
    name: nextState.name.substring(0, 1).toUpperCase() + nextState.name.substring(1),
    type: nextProps.type

        }

    }
    componentDidUpdate(prevProps, prevState) {
    // 初次 axios 扔需要在 didMount 里写上
    if (this.state.type === 老的 update 一样) { return }
    // 如果在这 axios 并 setState 又会引发 update 死循环，所以在上面要加个判断
    // 即使 axios 请求结果出来再更新就会先走上面的判断
    }
    老生命周期和新生命周期不能共存，会报错
    取代老的 componentWillReceiveProps 时，一个是不能 axios 请求，因为是异步，return 会先返回；也没法在 return 前进行 setState 更新，因为 this 都丢了
    用的时候 getDerivedStateFromProps 只是把 nextProps 转化为自己的状态；真正取数据还要配合 didMount
    componentWillReceiveProps 只要父状态有更新，任何子组件跟状态有无关系都会执行一次更新，这是大问题

2.  getSnapshotBeforeUpdate
    willMount、willReceive、willUpdate 都是怕被打断，怕重复一次
    willUpdate 更新前记录 DOM 状态，但和 didUpdate 相隔时间太长，可能导致记录的状态不可信
    换成使用 getSnapshotBeforeUpdate 后更安全，记录的状态更可信
    案例：
    比如邮箱列表正在查看，突然来了 100 条新邮件，期望在这 100 条插入 dom 之前记录一下滚动距离，更新之前只有 willUpdate 生命周期，里面记录一下滚动距离， didUpdate 中让 scrollTop = 此时容器高度 - willUpdate 记录的容器高度，达到自动滚动的目的；相当于长度多了多少，滚动条就让它滚多少
    但可能存在一个问题，render\didUpdate 里有 ajax 请求，或者手滚动滚了一下 wilUpdate 中记录的高度可能已经不对了，willUpdate 和 disUpdate 之间离的比较远，这期间任何组件更新或者手动引起滚动条滚动，willUpdate 记录的容器高度就不准确了
    willUpdate 不安全，而且记录不准，现在用 render 和 didUpdate 之间的 getSnapshotBeforeUpdate 替换，这个里面记录的高度就非常准确；用了这个新的，willUpdate 就不能用了
    getSnapshotBeforeUpdate() {
    // 必须有返回值，比如记录的高度, 返回的值给后面的生命周期使用
    return 100
    }
    componentDidUpdate(prevProps, prevState, value) {
    // 怎么获取前面的 100 呢, value 正是上面传来的返回值
    // getSnapshotBeforeUpdate 是完全为了记录老 DOM 而生的生命周期
    }
3.  getSnapshotBeforeUpdate-案例
scrollHeight 可以获得容器的滚动高度多少, 或者叫没有高度限制时，能够完全显示子元素时的高度
scrollHeight 属性是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding），不包含外边距（margin）、边框（border）
scrollTop 可读可写
<div id="#box" ref={myref} style={{height: "200px", overflow: "scroll"}><ul></ul></div>
box.scrollHeight
myref = React.createRef()  // 在react中不建议用原生获取dom方式，而是用绑ref的方式
componentDidUpdate(prevProps, prevState, value) {
    return this.myref.current.scrollHeight // 绑到div上就是div节点，绑到组件上就是组件对象
}
componentDidUpdate(prevProps, prevState, value) {
    this.myref.current.scrollHeight // 现在的高度
    this.myref.current.scrollTop += this.myref.current.scrollHeight - value // 万一之前要有值呢，所以要用+=
}

## React 中的性能优化

### 1.SCU

### 2.PureComponent

PureComponent 相当于把 SCU 的优化自动化了
但不适用于 state 或者 props 频繁变化的场景，对比也消耗时间，比如倒计时组件

## 轮播组件案例

基于 swiper.js 封装 react 轮播组件

1. 同步方式
   import Swiper, { Navigation, Pagination } from 'swiper'
   import 'swiper/swiper-bundle.min.css'
   Swiper.use([Navigation, Pagination])

state = {
list: ['111', '222', '333']
}

或者
import Swiper from 'swiper/bundle' // 这样就会自动引入圆点导航

2. 异步方式
   state = {
   list: []
   }
   componentDidMount() {
   setTimeout(() => {
   this.setState({
   list: ['aaa', 'bbb', 'ccc']
   })
   }, 1000)
   // new Swiper()
   }
   componentDidUpdate() {
   new Swiper('.swiper', {
   pagination: '.swiper-pagination'
   })
   }
   另一种方案，异步里面 setState 会同步更新
   componentDidMount() {
   setTimeout(() => {
   this.setState({
   list: ['aaa', 'bbb', 'ccc']
   })
   new Swiper()
   }, 1000)
   // new Swiper()
   }

3. 封装 swiper 组件
提高复用性，swiper 官网已经封装了 swiper 的 react 组件，这里我们自己尝试封装
<KSwiper>
// <div className="swiper-slide">111</div> // 这样不好，外面传入的东西越少越好
<KSwiperItem></KSwiperItem>
<KSwiperItem></KSwiperItem>
<KSwiperItem></KSwiperItem>>
<KSwiper/>
KSwiper:
<div className="swiper-wrapper">
    { this.props.children }
</div>
KSwiperItem:
<div className="swiper-slide">
    { this.props.children }
</div>
怎么请求数据的问题也开放给使用者
<KSwiper>
    {
        this.state.list.map(item => <KSwiperItem k={item}>{item}// 也可以放图片等</KSwiperItem>
        )
    }
<KSwiper/>
