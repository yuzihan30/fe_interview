## TS-redux

redux 目录->store.ts

```TypeScript
import {createStore} from 'redux'
// 和axios类似，自带声明文件
interface IAction {
    type: string,
    payload?: any // 可能是字符串，可能是数组
}
interface IState {
    isShow: boolean
}
const reducer = (prevState: IState={
    isShow:true // 会给其他地方产生默认推断，可以做个显式约束
}, action: IAction)=>{
    const {type} = action
    const newState = {...prevState}
    switch(type){
        case "show":
            newState.isShow = true
            return newState
        case "hide":
            newState.isShow = false
            return newState
        default:
            return prevState
}
}
```

App.tsx

```TypeScript
state = {
    isShow: store.getState().isShow
}
componentDidMount() {
    store.subscribe(() => {
        console.log(store.getState())
        this.setState({
            isShow: store.getState().isShow
        })
    })
}
{
    this.state.isShow && <ul></ul>
}
```

Detail.tsx

```TypeScript
componentDidMount() {
    store.dispatch({
        type: "hide"

    })
}
componentWillUnmount() {
    store.dispatch({
        type: "hide"
    })
}
```
