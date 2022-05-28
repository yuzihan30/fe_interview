<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-28 09:16:44
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-28 15:04:05
 * @FilePath: /fe_interview/react/redux.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## flux
flux使用单向数据流的方式更新视图组件，flux是一种思想，不是框架
就是view视图组件不会自己直接更新状态，而是发出一个action(这个action也可能是ajax请求回来的)，action触发dispatch更新state, 然后view上的订阅者更新view; 所以view就不需要关心逻辑，只需要关心视图，绑定事件监听事件就可以了
15种实现方式，redux最优，纯js写的，可以组合各种库，是一种状态放到外部进行管理的库
## redux工作流
component点击一个事件->action cteators生成一个action对象->dispath(action)把action对象送到store里面->store无法自己更新对象,通过reducer更新对象，类似useReducer->reducer接收老的状态和action,根据action中type的不同返回新的状态->store新的状态更新会通知组件订阅者更新
应用场景举例：App组件下有Router组件和Tabbar组件，router孙子组件detail出现会让tabbar消失；城市选择是一个相对独立的组件(下面还看不到tabbar)，选择完之后又传给电影tab、影院tab;搜索和影院也是平行的关系，也需要
## 实战
1. tabbar.module.css
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    height: 50px;
    line-height: 50px;
    text-align: center
}
.tabbar ul {
    display: flex
}
.tabbar li {
    flex: 1;
    list-style: none
}
App.css
* {
    margin: 0;
    padding: 0
}
html body {
    height: 100%
}
ul {
    list-style: none
}
2. 实现需求：进入详情，选项卡就没了，退出详情，选项卡就出来了
detail.js
useEffect(() => {
    // console.log('create')
    store.dispatch // 通知，或者叫发布
    return () => {
        console.log('destroy')
    }
}, [])
App.js
// store.subscribe // 订阅
views平级建个redux目录->store.js
那什么时候会订阅到消息呢，就是进去detail页面时通知隐藏，离开时通知显示
引入redux->createStore(reducer)
import {createStore} from 'redux'
const reducer = (prevState={ show: true }, action={}) { // 接收老的状态和action的type和payload
    let newState = {...prevState}
    switch(action.type) {
        case 'hide-tabbar':
            / 不能直接修改状态，也是先深复制一份
            newState.show = false
            return newState
        case 'show-tabbar':
            newState.show = true
            return newState
        default:
            return prevState
    }
    // return prevState // 如果不处理就返回老状态，如果处理就返回新状态
}
// 我处理不了，但我交给我自己的代言人reducer来处理
const store = createStore(reducer) // 支持在第二个参数写状态
export default store
store自己处理不了状态需要交给reducer来处理
接着App.js里成为订阅者
import store from '...store'
state = {
    isShow: store.getState()
}
componentDidMount() {
    store.subscribe(() => {
        // console,log('app订阅了', store.getState()) // 可以通过store.getState拿到最新的状态
        // 但得到的也是一个临时的值，如果想控制页面的更新，只能将其转化为自己的状态
        this.setState({
            isShow: store.getState().show
        })
    })
}
<MRouter>
    {this.state.isShow && <TabBar />}
</MRouter>
Detail.js
useEffect(() => {
    // console.log('create')
    // store.dispatch // 通知，或者叫发布
    store.dispatch({ // dispatch所发出来的一个对象是通过action creator创建出来的，异步的请求数据可能看的更明显；这因为比较简单可以直接写成一个对象，事实上可以写成函数生成的形式；函数生成的方式，在redux文件夹下建actionCreator文件夹，在这个文件夹下建TabbarActionCreator.js
        type: 'hide-tabbar',
        
    })
    return () => {
        // console.log('destroy')
        store.dispatch({
            type: 'show-tabbar',
            
        })
    }
}, [])
开发环境下每次保存都会热更新，会导致多次打印

TabbarActionCreator.js
function show() {
    return {
        type: "show-tabbar"
    }
}
function hide() {
    return {
        type: "hide-tabbar"
    }
}
export { show, hide }
Detail.js
import {show, hide} from "...TabbarActionCreator"
store.dispatch(show())
## redux原理
尝试写一下store
import {createStore} from 'redux'
const reducer = (prevState={ show: true }, action={}) { // 接收老的状态和action的type和payload
    let newState = {...prevState}
    switch(action.type) {
        case 'hide-tabbar':
            / 不能直接修改状态，也是先深复制一份
            newState.show = false
            return newState
        case 'show-tabbar':
            newState.show = true
            return newState
        default:
            return prevState
    }
    // return prevState // 如果不处理就返回老状态，如果处理就返回新状态
}
// 我处理不了，但我交给我自己的代言人reducer来处理
const store = createStore(reducer) // 支持在第二个参数写状态
// store.dispatch
// store.subscribe
// store.getStore
function createMyStore(reducer) {
    var list = []
    var state = reducer() // reducer()第一次执行完后返回的是默认的老状态
    function subscribe(callback){
        list.push(callback)
    }
    function dispatch(action){
        state = reducer(state, action)
        for(var i in list) {
            list[i] && list[i]()
        }

    }
    function getStore(){

    }
    return {
        subscribe,
        dispatch,
        getStore
    }
}
export default store
