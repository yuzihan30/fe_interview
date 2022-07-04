## TS 路由

router 目录下-index.tsx
import { HashRouter } from 'react-router-dom'
// 会警告未找到，需要一个声明文件；任何模块或者第三方模块需要有个声明文件；TS 的话不运行不知道 react-router-dom 里面有 HashRouter；npm i --save-dev @types/react-router-dom@5, @types 是 npm 的一个分支，放一些第三方的声明文件，类似于 c 语言预编译时的声明；生命文件告诉我们即使项目没运行起来，也会知道这里面有这个方法，并且会验证一下传的数据或者属性有没有、对不对；但有些模块的声明文档就放在模块的根目录下，就不会提示找不到了，比如说 axios，之前 axios 也需要但新版不需要

```TypeScript
<Switch> // 防止在某个路由刷新的时候, 继续向下模糊匹配;比如center页面刷新不会保持在/center
// 会继续向下匹配redirect
    <Route path="film" component={Film} />
    <Route path="/center" component={Center} />
    <Route path="/detail/:myid" component={Detail} />
    <Redirect from="/" to="/film"></Redirect>
</Switch>

```

```TypeScript
// Film.tsx
// 其实和后端确认好接口就确定数据类型了
interface IItem {
    filmId: number,
    name: string
}
extends Component<RouteComponentProps, any>
this.state.list.map((item: IItem) => {
    <li key={item.filmId} onClick={()=>{
        console.log(this.props.history) // RouteComponentProps
        this.props.history.push(`/detail/${item.filmId}`)
    }}></li>
})
```

```TypeScript
// Detail.tsx
interface IParam {
    myid:string
}
extends Component<RouteComponentProps<IParam>>
componentDidMount() {
    // console.log(this.props.match) // 但这里又不知道有myid
    // console.log((this.props.match.params as any).myid) // 或者
    console.log(this.props.match.params.myid)
}

```
