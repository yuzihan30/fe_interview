<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-20 18:44:05
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-25 18:10:41
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

