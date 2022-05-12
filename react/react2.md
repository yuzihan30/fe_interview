<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-11 08:18:45
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-12 14:58:56
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