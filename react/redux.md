<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-28 09:16:44
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-29 15:15:16
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
    // var state = reducer() // reducer()第一次执行完后返回的是默认的老状态
    // var state = reducer(undefined, {})
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
## redux-reducer合并
1. redux三大使用原则
state以单一对象存在store中。 修改和访问的是同一个对象
state只读（每次返回一个新对象）
使用纯函数reducer执行state更新。 纯函数就是对外边的变量或者对象没有副作用，同样的输入得到同样的输出
2. 增加状态
const reducer = (prevState={ show: true, cityName: '北京' }, action={}) { // 接收老的状态和action的type和payload
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
Cinema.js
const [cityName, setcityName] = useState(store.getState().cityName)
<div onClick={() => {
    props.history.push('/city')
}}>{cityName}</div>
City.js
const [list] = useState(['北京', '上海'])
<div>
    city
    <ul>
        list.map(item=>{
            <li key="item" onClick={()=>{
                dispatch({
                    type: 'change-city',
                    payload: item
                })
                // props.history.push('/cinemas')
                props.history.goBack()
            }}>{item}</li>
        })
    </ul>
</div>
<Route path="/city" component={city} />
这个场景其实不用dispatch, 其实每次切换，都会销毁重新进来
case 'show-tabbar':
    newState.show = true
    return newState
case 'change-city':
    newState.cityName = action.payload
    return newState // 一旦返回会通知所有订阅者，这里我们不用通知，因为在city页面dispatch后还要跳回到cinema.js, cinema执行就会读最新的store
default:
    return prevState

3. 刷新数据丢失
Cinema.js
因为数据是在内存中，刷新会丢失，改变城市之后回到影院，刷新又会回到北京这个城市；后面会用redux持久化来解决这个问题
4. case太多了怎么办，reducer扩展
拆分成多个reducer,每个reducer只管理里面的子状态，最终再把他们合并成一个单一状态；如果不同的action之间处理的属性没有联系，可以把reducer函数拆分，不同函数处理不同属性，最终合并成一个大的reducer即可
redux文件夹下->reducers文件夹->CityReducer.js、TabbarReducer.js
CityReducer.js
const reducer = (prevState={ cityName: '北京' }, action={}) { // 接收老的状态和action的type和payload
    let newState = {...prevState}
    switch(action.type) {
        case 'change-city':
            newState.cityName = action.payload
            return newState // 一旦返回会通知所有订阅者，这里我们不用通知，因为在city页面dispatch后还要跳回到cinema.js, cinema执行就会读最新的store
        default:
            return prevState
    }
    // return prevState // 如果不处理就返回老状态，如果处理就返回新状态
}
export default CityReducer
store.js
import CityReducer from ''
import TabbarReducer from ''
const reducer = combineReducer({
    CityReducer,
    TabbarReducer
})
App.js
this.setState({
    isShow: store.getState().TabbarReducer.show
})
## redux中间件-redux-thunk
1. swith的case分支能直接匹配到，不像if else分支每个都得走一遍
之前都是同步场景；而且切换城市之后影院请求完数据后，切换搜索，又会重新请求一次影院数据，多请求了，这种异步场景；同样的数据往后端要两次，后端是有压力的；优化的话就先将请求的数据放store, 让后搜索组件请求的时候，先判断if(store.list.length == 0){自己再取} else {从store读取} 同样的逻辑也放到search组件中一份
还有种场景也可以用，就是一个接口里面返回的数据是两个页面都会用到的数据
redux数据存在内存里也有它的优点，当接口数据有更新，应用刷新redux数据丢失，下次就会请求最新的接口数据；或者关闭应用，内存数据也会丢失，下次再打开也会请求最新的数据；localstorage永久缓存就会导致永远不跟后端交互了，使得数据得不到同步更新的问题

2. cinema.js里试试上面的方案，
useEffect(()=>{
    if(store.getState().CinemaListReducer.list.length === 0) {
        // 去后台取数据， 不放在这里;放到redux里做
        // actionCreator里面写异步
        store.dispatch(getCinemaListAction())
    } else { //  }
}, [])
actionCreater文件夹下创建getCinemaListAction.js
function getCinemaListAction() {
    axios().then()
    return {
        type: 'change-list',

    }
    // 这里就出现没法处理的情况，如果return放到then内，因为里面then是异步，外边函数就会同步返回undefined
}
export default getCinemaListAction
之前store.dispatch(getCinemaListAction())里面的函数只能返回一个对象，现在引入thunk中间件，可以让其返回函数

