<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-11 08:18:45
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-12 22:31:32
 * @FilePath: /fe_interview/react/react2.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
########## 组件通信 #########
9. context状态树react官方提供的跨级通信方案，使用了生产者消费者这种模式
provider服务提供商，比如有两个消费者，一个去改服务，另一个去访问这个服务，第三个在provider范围内，但没成为消费者，第四个在provider范围之外
改造之前的案例，需要把父组件做成供应商组件
const GlobalContext = React.createContext() // 创建context对象，所有的供应商和消费者都是由这个context对象创建出来的
this.state = {
    filmList: [],
    info: '111'
}
render() {
    return (
        // value名字是固定的不能写其他的， 供应商可以传普通的key\value, 也可以传key\方法
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
redux也是状态管理的一种方案，也能解决父子之间数据的共享，后续更新
10. 插槽，vue中叫slot插槽，上面context中的内容就是这种形式，react中子组件通过this.props.children可以拿到插槽的信息，区别于标签上能定义的属性，插槽会把插槽内容固定挂载children属性上
对应vue中具名插槽，react中this.props.children[i]依次拿到对应位置的插槽信息
作用：为了复用；一定程度减少父子通信

11. 插槽版抽屉组件
Navbar里的按钮现在放到插槽里，那就可以直接访问到父组件的状态,这种方法就能替代子传父
<Navbar>
    // 插槽能看到父组件的模板，又能拿到父组件的状态
    <button onClick={ () => {
        this.setState({
            show: !this.state.show
        })
    }}
    > </button>
</Navbar>
其他应用场景：比如可以让使用者自己决定到底轮播什么内容，留好插槽就行；navbar也可以左边一个插槽右边一个插槽，中间是文本内容
组件封装的时候一方面通过属性控制复用性，如果想在复杂情况下复用的话就必须开放好插槽

########## 生命周期 #########
1. react生命周期
之前在constructor中做ajax请求和事件绑定都是不合理的
初始化阶段，运行中的阶段，销毁阶段
初始化阶段：
componentWillMount: render之前最后一次修改状态的机会
render:只能访问props和state, 不允许修改状态和DOM输出
componentDidMount: 成功render并渲染完成真实的DOM后触发，可以修改DOM
运行中的阶段：
componentWillReceiveProps: 父组件修改属性触发
shouldComponentUpdate: 返回false回组织render调用
componentWillUpdate: 不能修改属性和状态
render: 只能访问props和state, 不允许修改状态和DOM输出
componentDidUpdate: 可以修改DOM
销毁阶段：
componentWillUnmount: 在删除组件之前进行清理操作，比如计时器和事件监听器
组件创建的时候启动一个定时器，销毁之前未清理的话，销毁之后还会存在
之前的函数式组件只有props，没有state也没有组件的生命周期，后面借助于hooks的副作用函数可以实现
目前只有类组件有生命周期，render函数可以看到，没有被主动调用，但会被react组件系统自动调用

2. 初始化阶段
state = {
    myname: ''
}
componentWillMount() { // 将要挂载到DOM节点中
    // 上树之前最后一次修改状态的机会， 初始化数据的作用
    // 适用场景：state数据初始化时有复杂的计算逻辑，直接写到前面会比较丑
}
componentDidMount() { // 已经挂载到DOM节点中， 已经渲染完了，可以拿到真实的DOM节点
    // 有的文档会把构造器当做声明周期函数，其实只是类必走的一个函数而已
    // 数据请求一般会放在这里，放在constructor、willMount里其实也没问题，其实不要以为放在didMount里会有延迟，willMount到didMount的延迟可以忽略不计
    // 还有订阅一般放这里，其实订阅放constructor里也没问题
    // 还有定时器
    // 基于创建完的DOM进行初始化，这个是前面构造器willMount不能替代的，BetterScroll是原生js封装的库可以让我们的长列表更好的滚动，必须等DOM创建完后才能new，之前做过异步请求then拿到结果后，setState会同步更新DOM， 然后new BetterScroll是非常安全的;但现在如果列表在render里直接写死的，那什么时候才能拿到DOM呢，只能在didMount里
}
上面它们俩只会执行一次，就是在组件创建的时候。render在运行中也会执行
render() { // 正在渲染，作用就是渲染页面
    // 这里千万不能setState, 初始化会执行一次，每次更新还会执行，导致循环调用，栈溢出
}

2. 初始化阶段注意事项
componentWillMount已经该名并且不推荐使用了，因为可能会有副作用函数，副作用函数可以移到componentDidMount来做，初始化状态移动到constructor来做
react版本的几个节点
16.2（之前都是老的生命周期，这个版本之后diff算法做了一些更改，提出了fiber技术，willMount如果再用的话会报黄色警告，若不让报警告，要么不用，要么改为加个前缀UNSAFE_）， 16.8（），17
Fiber纤维就是比线程还要小的，16.2之前创建状态之后会创建新的虚拟DOM树，会对比老的虚拟DOM树，这个对比过程是同步的，数据量如果比较小的话还好，如果比较多比如100多个组件，会出现浏览器假死，在忙着对比两个虚拟DOM,这两个对象超级超级大；Fiber把创建DOM和组件渲染拆分成无数个小的分片任务来进行，先执行优先级；低优先级任务就是willMount中找哪些节点要挂到页面中，高优先级就是render渲染啊，didMount挂载完了，就是找出哪些需要更新到DOM的过程这个是可以被打断的，而更新DOM的过程是不能被打断的，打断的任务只能下次重新再来一遍，那willMount里面的东西就存在可能触发多次的问题
16.8引入hooks之后函数式组件开始有生命周期

3. 初始化案例
BetterScroll使用步骤：
import BetterScroll from 'better-scroll'
componentDidMount() {
    new BetterScroll("#wrapper")
}
<div id="wrapper" style={{ height: "200px", overflow: "hidden" }><ul></ul></div>

4. 运行中阶段
componentWillUpdate， 是通过自己的state更新，还是从父组件传来props更新，都会引发这个组件将要更新；和willMount一样也是没有到DOM更新的状态，它的执行频率是很高的，willMount一辈子执行只有一次，WillUpdate则是setState就要走一次，render、didUpdate也是
render() {
    // DOM正在更新
}
componentWillUpdate() { // 和willMount同样道理，处在React调度机制的第一个阶段，寻找需要更新哪些DOM, 被打断重新执行，有隐患
    // DOM还未更新，用到的机会比较少，后面用到一次配合新生命周期去说
    // 这里也不能setState,会引入死循环
}
UNSAFE_componentWillUpdate 
componentDidUpdate(preProps, preState) {
    // DOM已经更新， 更新后获取DOM节点
    // 引出better-scroll新方案，didMount中请求数据之后setState会走更新， didUpdate里面DOM就更新完了,在didUpdate里面
    // 但这里有个缺点，会执行多次，每次更新，它都会执行，频繁执行多次，危险且耗性能，会引发不可预期的问题
    // 比如new BetterScroll("#wrapper")，这时可以做个判断，避免频繁调用
    // if(state.list.length === 0) { new BetterScroll("#wrapper") } 但又发现这里拿不到老状态，state.list.length === 0这个条件判断可能就一直无法成立，那就通过入参preProps和preState的方式拿到老的状态，进一步修改if(preState.list.length === 0) { new BetterScroll("#wrapper") }
}
