## React Hooks

之前都是在谈类组件

### 使用 Hooks 的原因

- 高阶组件为了复用，导致代码层级复杂 (路由、redux 中可以看到一些高阶组件)
- 生命周期的复杂性
- 一开始写成 function 无状态组件，后面需要状态了再改成了 class 成本高
  有了 hooks，函数式组件就可以勾住状态了

### useState(保存组件状态)

import React, { useState } from 'react'
const [ name, setName ] = useSate('xx')
onClick={ () => {
setName('yy')
}}
// 改造之前的 TodoList
setList([...list, text])
let newList = [...list]
newList.splice(index, 1)
setList(newList)
{ !list.length && <div>暂无待办事项</div> }

### useEffect

1.  useEffect（处理副作用）和 useLayoutEffect(同步执行副作用)
    模拟类组件中生命周期的作用
    const [list, setList] = useState([])
    模拟请求
    axios.get('/test.json').then(res => {
    console.log(res.data)
    setList(res.data.data) // 这里和类组件的渲染机制不同，类组件是让 render 重新执行，而函数式组件会让整个函数式组件重新执行；这样就导致循环调用
    })
    useEffect(() => {
    axios.get('/test.json').then(res => {
    console.log(res.data)
    setList(res.data.data)
    })
    }, []) // 第一个参数是回调函数，第二个参数是个空数组；空数组意思说这个副作用函数不依赖于任何东西，就执行一次；也就是说里面的回调函数在这个函数式组件渲染的时候只会执行一次；或者解释说 setList 之后组件会重新执行，useEffect 也会执行，但 useEffect 的回调不再执行
2.  useEffect 中是空数组和非空数组的区别？
    const [name, setname] = useState('aaa')
    // 第一次执行一次，之后 name（依赖）更新也会执行一次
    useEffect(() => {
    setname(name.substring(0, 1).toUpperCase() + name.substring(1))
    }, [name]) // 如果[]不写依赖的 name, setname 调用时前面的回调也不会执行；写了就会再执行
    <button onClick={() =< {
    setname('bbb')
    }>}></button>
3.  改造之前的 FilmList 组件
    function FilmList(props) {
    const [list, setlist] = useState([])
    useEffect(() => {
    if (props.type === 1) {
    axios().then( setlist )
    } else {

            }
        }, [props.type])
        return <ul>
                {
                    list.map()
                }
        </ul>

    }

4.  改造之前的组件销毁案例
    useEffect(() => {
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
    return () => {
    console.log('销毁时执行')
    window.onresize = null
    clearInterval(this.timer)
    }
    }, []) // 没有依赖的时候回调只执行一次，同时 return 返回的函数会在销毁时执行；如果写依赖了，更新的时候 return 的回调函数每次也会执行一次，也就是说有依赖的时候会在更新或者销毁的时候执行；如果没有依赖这辈子也就执行一次
5.  注意事项
    useEffect 可以使用多次，而生命周期函数后面会把前面覆盖掉
6.  useLayoutEffect 和 useEffect 区别
    常规使用，看不到区别，但调用时机不同，useLayoutEffect 和之前 CDM & CDU 一致，在 react 完成 DOM 更新后马上同步调用的代码，会阻塞页面渲染，useEffect 是会在整个页面渲染完成后才会调用的代码；DOM 更新对应 DOM 树，这个 DOM 可能还在内存中，只是说把 DOM 创建更新完了，这时 useLayoutEffect 里代码执行，就会阻止 DOM 树到渲染树生成；所以 useEffect 性能更好，是在 UI 渲染完成了才执行，官方也推荐 useEffect
    但如果需要 DOM 操作（比如不断加动画），则放到 useLayoutEffect，这些 DOM 更改和 react 做的 DOM 更改会合并然后一次性渲染到屏幕上，只有一次回流和重绘的代价，避免了页面抖动

### useCallback 记忆函数

const [count, setcount] = useState(0)
// useState 记忆函数，会记住状态，count 更新会导致函数式组件重新执行，useState 也会重新执行，但 count 不会变成 0，而是更新为最新的状态；能够帮我们存好 count 值，来复用；useCallback 可以让函数给记住，防止函数被重新创建，起到缓存作用
let mycount = 0 // 作为对比，每次更新 mycount 还是 0
let handleClick = () => {

}
组件的每次重新渲染都会导致定义的临时变量、函数都会重新赋值
const handleChange = useCallback(
(evt) => {
settext(evt.target.value)
}, []
) // 那下次更新的时候就会用之前缓存的函数，那里面的变量也是以前缓存的值；所以可以记但不能永久记，加入依赖的状态或者 props 属性；加入依赖，依赖变的时候，里面函数会被再创建一次；就是状态或者属性的改变和当前函数不相关的时候就会起到缓存的作用
主要用了闭包的原理，可以将临时变量、临时函数永驻内存

### useMemo 记忆组件

1. useMemo 可以完全替代 useCallback 的功能
   useCallback(fn, inputs)等价于 useMemo(()=>fn, input) //useMemo 中 fn 作为返回值
   useCallback 不会执行第一个参数函数，而是将其返回，useMemo 会执行第一个函数并将执行结果返回给你
   可以类比 vue 的计算属性功能
2. 改造受控 cinema
   // const getCinemaList = useMemo(()=>[1,2,3], [])
   const getCinemaList = useMemo(()=>cinemaList.filter(), [cinemaList， mytext]) // cinemaList， mytext 如果都没变就会把之前缓存的结果拿出来，而不去再执行 filter

### useRef 保存引用值

1. 放在普通的 DOM 节点身上，拿到的就是普通 DOM 节点，放在组件身上，它引用的就是这个组件对象
   const mytext = useRef() // 等价于类组价中 React.createRef()的写法
   <input ref={mytext} />
   mytext.current.value 即可拿到值
   mytext.current.value = '' // 清空值
2. 还有另一个用途：比如问你保存状态有哪些方法
   useState 可以，useRef 也可以
   let mycount = useRef(0) // mycount 是个对象，里面有个 current 属性
   // 每次更新不是从 0 开始赋值，而是把之前存的 current 值重新赋给它，背后都是闭包原理支撑的
   <button onClick={ () => {
   mycount.current++
   } }>
3. 总结：两个用途，保存数据不丢失，引用 DOM 或者组件（实现组件通信或者原生 DOM 节点的访问）

### useContext

useContext 减少组件层级的, 主要用在简化消费者写法上
const GlobalContext = React.createContext() // 返回的值就是生产者定义的 value 值
function FilmItem(props) {
// const context = useContext(GlobalContext)
const value = useContext(GlobalContext)
return 这里就可以直接使用 value 就不用套用<GlobalContext.Consumer>
// 这边负责改供应商的东西
}
function FilmDetail() {
const value = useContext(GlobalContext)
// 这边负责用供应商的东西
}

### useReducer

1.  经常和 useContext 一起搭配使用，学好它可以方便理解 redux
    redux 的理念不错，然后 react 就将其引入到 hooks 里了
    通常组件里有数据逻辑和视图逻辑，现在就有一种理念，将数据逻辑分离出来，就是将状态放到外部来管理；对单个组件来说，这样做没有任何意义，会增加复杂度，多个组件共享状态的时候它才会有意义，分离可以让耦合度降低
    之前 A 组件点 a 按钮传 a 值给 B 组件，A 组件点 c 按钮传 c 值给 C 组件，是通过他们公共的父组件来中转，A 改父组件的 state 传给 B、C；这种情况父组件既要渲染那几个孩子，有自己的视图逻辑，还要关心自己的状态，要让 A 中改这个状态进行子传父，又要父传子去控制这些状态；这样状态管理在父组件中就会比较乱，这个时候分离式的状态管理就显得重要了，A 中通过一种方法改变外部状态中的 stateA，B 里面再用这个状态，就不用和父组件进行子传父、父传子进行交流了；这样就围着外部状态，一边想着怎么改状态，另一边想着怎么用这个状态；这样代码更容易维护，降低了代码的耦合度
    单组件 useReducer + useContext 就能模拟出 redux 的功能

2.  单组件 useReducer
    大部分情况用它是处理复杂的父子通信的
    // 处理函数，减速器, 第一个参数会得到老的状态 preState，第二个参数会得到 dispatch 里面的对象，reducer 可以根据对象里的 type 值来控制状态来减还是加 1
    const reducer = (prevState, action) => {
    let newState = {...prevState} // 不改变老状态，也就是后面说的纯函数
    switch(action.type) {
    case 'add':
    // 和 state 用法一致，需要先保存住老状态，深复制一下；react 不允许直接++
    newState.count++
    return newState
    case 'minus':
    newState.count--
    return newState
    default: // 没有匹配到，返回老状态就行
    return prevState // 返回复制完的也可以
    } // 这样就可以非常清洗的管理好外部状态
    }
    // 外部状态
    const initialState = {
    count: 0
    }
    function App() {
    const [state, dispatch] = useReducer(reducer, initialState) // 第一个函数就是专门在外面容易管理状态的，第二个参数就是初始状态
    // 返回的第一个是状态值，第二个是改变状态的唯一方法
    // 就是 useState, 只是 useState 在内部管理状态，在内部写自己的处理函数；而 useReducer 是在外部进行管理
    return (
    <div>
    <button onClick={() => {
    // state.count--
    // 这里是低耦合度的，尽量不去碰状态自身，所以用 dispatch
    // 不是直接改，相当于发个通知
    dispatch({ // 调用 dispatch 之后会将对象传到 reducer 里面
    type: 'minus',

                    })
                }}>-</button>
                    { state.count }
                <button onClick={() => {
                    dispatch({
                        type: 'add',
                    })
                }}>+</button>
            </div>
        )

    }

3.  案例
    A 改传给 B、C
    newState.a = action.value
    return newState // 导致 state 改变，App 重新渲染，state 重新传给 2、3 组件
    const GlobalContext = React.createContext()
    export default App() {
    // useReducer 只能在父组件中创建一份，如果分别在子组件中用，就生成的是不同的东西
    // 让大家（子组件）共享这一个 state, dispatch 也传给 child1、2、3 来改, 1 用 dispatch 来改，而 2、3 就用 state 来显示；这时需要 useContext 出场了
    const [state, dispatch] = useReducer(reducer, initialState) // 不能放到组件外面，只能在组件内使用
    return (
    // 这里提供的服务就两个
    <GlobalContext.provider value={
    state, // state: state 的简写
    dispatch
    }>
    <div>
    <Child1 />
    <Child2 />
    <Child3 />
    </div>
    </GlobalContext.provider>
    )
    }
    function Child1() {
    const { dispatch } = useContext(GlobalContext)
    onClick={()=>{
    dispatch({
    type: 'change-a',
    value: '111' // 也可以传个值过去
    })
    }}
    }
    function Child2() {
    const { state } = useContext(GlobalContext)
    }
    function Child3() {
    const { state } = useContext(GlobalContext)
    }
4.  改造之前的 FilmItem 和 FilmDetail
    useEffect(() => {
    axios.get('/test.json').then(res => {
    console.log(res.data)
    // setList(res.data.data)
    dispatch({
    type: 'change-filmList'
    value: res.data.data.films
    })
    })
    }, [])
    FilmItem:
    () => {
    dispatch({
    type: 'change-info',
    value: synopsis
    })
    }
    每次 dispatch 发出去，会导致 reducer 重新执行，App 组件和子组件重新渲染
    useReducer 的缺点就是异步无法处理，只能在组件内部通过 useEffect 来解决，而后面 redux 是支持异步和中间件的写法的

### 自定义 hooks

大函数里面分出很多子函数，或者有共享的逻辑，抽出来复用；自定义 Hooks 必须以 use 开头
改造之前的模糊查询，hooks 只能把逻辑抽出来，UI 是不动的
function useCinemaList() { // 自定义 hooks 里面都可以使用之前官方提供的 hooks
const [cinemaList, setcinemaList] = useState([])

    useEffect(() => {
        axios().then(setcinemaList(res.data.data.cinemas))
        // 这边是异步，下面能等吗，在react hooks体系下，执行set方法后，useCinemaList也会被重新的触发
    }, [])
    return {
        cinemaList
    }

}
function useFilter(cinemaList, mytext) {
const getCinemaList = useMemo()
return {
getCinemaList
}

}
export default Cinema() {
const { cinemaList } = useCinemaList()
cosnt { getCinemaList } = useFilter(cinemaList, mytext)
}
