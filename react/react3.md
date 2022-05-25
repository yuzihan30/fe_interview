<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-20 18:44:05
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-25 21:13:58
 * @FilePath: /fe_interview/react/react3.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## React Hooks
之前都是在谈类组件
### 使用Hooks的原因
- 高阶组件为了复用，导致代码层级复杂 (路由、redux中可以看到一些高阶组件)
- 生命周期的复杂性
- 一开始写成function无状态组件，后面需要状态了再改成了class成本高
有了hooks，函数式组件就可以勾住状态了
### useState(保存组件状态)
import React, { useState } from 'react'
const [ name, setName ] = useSate('xx')
onClick={ () => {
    setName('yy')
}}
// 改造之前的TodoList
setList([...list, text])
let newList = [...list]
newList.splice(index, 1)
setList(newList)
{ !list.length && <div>暂无待办事项</div> }
### useEffect
1. useEffect（处理副作用）和 useLayoutEffect(同步执行副作用)
模拟类组件中声明周期的作用
const [list, setList] = useState([])
模拟请求
axios.get('/test.json').then(res => {
    console.log(res.data)
    setList(res.data.data) // 这里和类组件的渲染机制不同，类组件是让render重新执行，而函数式组件会让整个函数式组件重新执行；这样就导致循环调用
})
useEffect(() => {
    axios.get('/test.json').then(res => {
        console.log(res.data)
        setList(res.data.data) 
    })
}, []) // 第一个参数是回调函数，第二个参数是个空数组；空数组意思说这个副作用函数不依赖于任何东西，就执行一次；也就是说里面的回调函数在这个函数式组件渲染的时候只会执行一次；或者解释说setList之后组件会重新执行，useEffect也会执行，但useEffect的回调不再执行
2. useEffect中是空数组和非空数组的区别？
const [name, setname] = useState('aaa')
// 第一次执行一次，之后name（依赖）更新也会执行一次
useEffect(() => {
    setname(name.substring(0, 1).toUpperCase() + name.substring(1))
}, [name]) // 如果[]不写依赖的name, setname调用时前面的回调也不会执行；写了就会再执行
<button onClick={() =< {
    setname('bbb')
}>}></button>
3. 改造之前的FilmList组件
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
4. 改造之前的组件销毁案例
useEffect(() => {
    window.onresize = () => {
        console.log("resize")
    }
    // UI视图会用到这个状态才会定义这个状态
    setIntervale(()=> { // 这个定时器如果销毁前不清除，销毁后还存在
        console.log("111")
    }, 1000)
    // 可以测试一下定义为局部变量时let timer = setInterval会不会销毁
    // 标准的做法挂到this上，不挂在state上，UI视图会用到这个状态才会定义这个状态
    this.timer = setInterval // 销毁时清除
    return () => {
        console.log('销毁时执行')
        window.onresize = null
        clearInterval(this.timer)
    }
}, []) // 没有依赖的时候回调只执行一次，同时return返回的函数会在销毁时执行；如果写依赖了，更新的时候return的回调函数每次也会执行一次，也就是说有依赖的时候会在更新或者销毁的时候执行；如果没有依赖这辈子也就执行一次
5. 注意事项
useEffect可以使用多次，而生命周期函数后面会把前面覆盖掉
6. useLayoutEffect和useEffect区别
常规使用，看不到区别，但调用时机不同，useLayoutEffect和之前CDM & CDU一致，在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染，useEffect是会在整个页面渲染完成后才会调用的代码；DOM更新对应DOM树，这个DOM可能还在内存中，只是说把DOM创建更新完了，这时useLayoutEffect里代码执行，就会阻止DOM树到渲染树生成；所以useEffect性能更好，是在UI渲染完成了才执行，官方也推荐useEffect
但如果需要DOM操作（比如不断加动画），则放到useLayoutEffect，这些DOM更改和react做的DOM更改会合并然后一次性渲染到屏幕上，只有一次回流和重绘的代价，避免了页面抖动
### useCallback记忆函数
const [count, setcount] = useState(0)
// useState记忆函数，会记住状态，count更新会导致函数式组件重新执行，useState也会重新执行，但count不会变成0，而是更新为最新的状态；能够帮我们存好count值，来复用；useCallback可以让函数给记住，防止函数被重新创建，起到缓存作用
let mycount = 0 // 作为对比，每次更新mycount还是0
let handleClick = () => {
    
}
组件的每次重新渲染都会导致定义的临时变量、函数都会重新赋值
const handleChange = useCallback(
    (evt) => {
        settext(evt.target.value)
    }, []
) // 那下次更新的时候就会用之前缓存的函数，那里面的变量也是以前缓存的值；所以可以记但不能永久记，加入依赖的状态或者props属性；加入依赖，依赖变的时候，里面函数会被再创建一次；就是状态或者属性的改变和当前函数不相关的时候就会起到缓存的作用
主要用了闭包的原理，可以将临时变量、临时函数永驻内存
### useMemo记忆组件
1. useMemo可以完全替代useCallback的功能
useCallback(fn, inputs)等价于useMemo(()=>fn, input) //useMemo中fn作为返回值
useCallback不会执行第一个参数函数，而是将其返回，useMemo会执行第一个函数并将执行结果返回给你
可以类比vue的计算属性功能
2. 改造受控cinema
// const getCinemaList = useMemo(()=>[1,2,3], [])
const getCinemaList = useMemo(()=>cinemaList.filter(), [cinemaList， mytext]) // cinemaList， mytext如果都没变就会把之前缓存的结果拿出来，而不去再执行filter
### useRef保存引用值
1. 放在普通的DOM节点身上，拿到的就是普通DOM节点，放在组件身上，它引用的就是这个组件对象
const mytext = useRef() // 等价于类组价中React.createRef()的写法
<input ref={mytext} />
mytext.current.value即可拿到值
mytext.current.value = '' // 清空值
2. 还有另一个用途：比如问你保存状态有哪些方法
useState可以，useRef也可以
let mycount = useRef(0) // mycount是个对象，里面有个current属性
// 每次更新不是从0开始赋值，而是把之前存的current值重新赋给它，背后都是闭包原理支撑的
<button onClick={ () => {
    mycount.current++
} }>
3. 总结：两个用途，保存数据不丢失，引用DOM或者组件（实现组件通信或者原生DOM节点的访问）
### useContext
useContext减少组件层级的, 主要用在简化消费者写法上
const GlobalContext = React.createContext() // 返回的值就是生产者定义的value值
function FilmItem(props) {
    // const context = useContext(GlobalContext)
    const value = useContext(GlobalContext)
    return 这里就可以直接使用value就不用套用<GlobalContext.Consumer>
    // 这边负责改供应商的东西
}
function FilmDetail() {
    const value = useContext(GlobalContext)
    // 这边负责用供应商的东西
}

