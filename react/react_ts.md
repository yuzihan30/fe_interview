## TS

### react 引入 TS

> 参考资料：https://blog.csdn.net/weixin_44892714/article/details/109090852
> 最佳实践： https://zzfzzf.com/article/1465585026269933570

1. 使用脚手架 create-react-app 创建新的 ts react 项目
   npx create-react-app my-app --typescript
   或者
   yarn create react-app my-app --typescript
2. 将现有的 js react 项目改造成 ts
   先执行
   npm install --save typescript @types/node @types/react @types/react-dom @types/jest
   或者
   yarn add typescript @types/node @types/react @types/react-dom @types/jest
   然后将.js 文件重命名改为.tsx，再重新运行项目就可以了

react-router-dom
注意安装@types/react-router-dom
npm i react-router-dom @types/react-router-dom

注意：
要想使用 typescript，在安装一些 react 常用工具的时候，别忘了安装对应额 ts 包，@types/包名

### typescript

现在的 js 是动态类型，写完代码在浏览器中是边解析边执行，出了错编译器发现不了，只有执行的时候才能看到

1. TS 定位是静态语言类型，在写代码阶段就能检查错误，而非运行阶段
2. 类型系统是最好的文档，增加了代码的可读性和可维护性
   vscode 是 react 结合 electron 实现的

### 安装

基于最新的脚手架重新生成一版基于 TS 的配置代码就行，而在原来的基础上升级很麻烦
create-react-app myappts --template typescript
--template typescript 意思是加载 script 模板
create-react-app 需要 5 以上的版本才行， npm i -g create-react-app 将最新的 create-react-app 安装一遍
之前脚手架比较能容忍，jsx 文件写.js 扩展名也行；现在 ts 的是 tsx 扩展名
index.tsx 中先把<React.StrictMode>注释掉
document.get... // 警告，找不到“document”, 因为 TS 版本太老的问题（比如 4.0.1），新版本的 VSCODE 不会有这个问题，要么升级 vscode 要么 com+shift+P 点使用工作区版本（使用的是脚手架安装的 ts）,但又提示找不到路径，需要把项目拖到 VScode 的根目录下才行
npm start 启动， 3000 端口

### 语法

1. 基本类型
   一开始赋值为什么类型，后面就是什么类型；但以后显示定义好，不要隐式推断
   var name = 'xx'

2. 数组

- 第一种写法
  var list3:(number | string)[] = [1,2,'xx']
- 泛型写法
  let mylist1: Array<string | number> = ['x', 'y', 'z', 1]

3. 对象
   ts 文件要有 export, 导入时可以直接 import '.ts'

```
let obj1 = { // 这样是默认推断的情况，隐式推断有什么属性及属性类型
    name: "aa",
    age:100
}
export default {}
```

// 通过接口来描述对象的形状，接口不在于实现过程，只在于大体描述轮廓(只描述了有什么属性及属性类型)

```
interface IObj {
    name: string,
    age: number,
    location?: string, // 可选属性
    [propName: string]: any, // 适用于后台接口返回很多字段，我只要某几个；不关心其他属性值，也不想都写一遍；表示属性名是字符串类型，接收这个值爱是什么类型是什么类型
}
let obj1: IObj = {

}
```

4. 函数
   不写返回值，返回 void
   function test(a: string, c?: number): string {} // 问号可选参数
   第二种写法：接口

```
interface IFunc {
    (a: string, c?: number): string
}
let test: IFunc = function test1(a: number, ...) {}
```

上面这种场景用的少一些，更多是讲属性、函数组合到一个接口里面来限制对象

```
interface IObj {
    name: string,
    age: number,
    getName: (name: string) => string
}
let obj:IObj = {
    name: 'xx',
    age: 10,
    getName: (name: string) => {
        return name
    }
}
```

5. Toast

```
Cinemas.js
if (list.length === 0) {
    Toast.show({ // Toast只是一个对象，不是一个组件； duration设置为0就不会自动消失
        icon: 'loading',
        content: '加载中...',
        duration: 0
    })
    // action.js中拿到数据后隐藏掉，Toast因为不是一个组件，完全可以脱离组件库去使用
}
```

优化方案：
请求发送前加载，请求成功或者失败后隐藏；就在 axios 拦截器里做
项目目录->util->request.js
加请求拦截器和响应拦截器

```
import {Toast} from 'antd-mobile'
Toast.show({ // 放到请求拦截器
    icon: 'loading',
    content: '加载中...',
    duration: 0
})
```

响应拦截器中，成功和失败都要放 Toast.clear(), return 之前放

App.js 中引入
import './util/request'

6. 类、类加接口

```

interface Ifunc {
    getName: () => string
}
A implements Ifunc {
    A1,
    A2,
    getName() {

    }
}
B implements Ifunc {
    B1,
    B2,
    getName() {

    }
}
function init(obj: Ifunc) {
    obj.getName()
}
```

接口约束类，要这样实现和这样调用

### TS 类组件

最多的就是接口类型的应用，限制组件状态属性符合接口

1. state.tsx

```typescript
state = { name: 'xx' }
setState({
    name: 100 // 这个值如果是后台返回的，你不知道类型，运行时才能看到报错；或者调用别人的函数的返回结果
})
// 换种写法再试试
interface IState {
    name: string
}
export ...
state: IState = { name: 'xx' }
//
setState({ // 此时这样改并不会提示，因为不是直接改, this.state.name = 100这样才有提示
    name: 100
}
// react有专门的写法
export default class App extends Component<约定属性，约定状态>
export default class App extends Component<any，IState> { // 属性不约束，状态约束
    state = {
        name: 'xxx' // 这时就会提示类型校验
    }
    render() {
        return (
            // ...
            setState({name: "yyy"})
            // ...
        )
    }
}
```

2. todo.tsx

```typescript
interface IState {
  text: string,
  list: string[]
}
export default class App extends Component<any, IState> {
    state = {
        text: "",
        list: []
    }
    myRef = React.createRef<HTMLInputElement>() // 需要指定ref的类型
    render() {
        return (
            <div>
                // <input type="text" value={this.state.text}onChange={
                //     (evt) => {
                //         setState({
                //             text: evt.target.value
                //         })
                //     }
                // }>
                // 或者试试ref
                <input ref={this.myRef}>
                <button onClick={
                    // console.log(state.name)
                    // console.log(this.myRef.current.value)
                    console.log((this.myRef.current as HTMLInputElement).value) // 需要加类型断言
                    this.setSate({
                        list: [...this.sate.list, (this.myRef.current as HTMLInputElement).value]
                    })
                }></button>
                {
                    this.state.list.map(item=>
                        <li key={item}>{item}</li>
                    )
                }
            </div>
        )
    }
}
```

3. props.tsx

```typescript
export default class App extends Component {
    render() {
        return (
            <div>
                <Child name="aaa">
            </div>
        )
    }
}
interface IProps {
    name: string
}
class Child extends Component<IProps, any> {
    render() {
        return <div>
            {this.props.name}
        </div>
    }
}

```

4.  drawer.tsx

```typescript
export default class App extends Component {
  state = {
    isShow: true,
  };
  render() {
    return (
      <div>
        app
        <Navbar
          title="first page"
          cb={() => {
            this.setState({
              isShow: !this.state.isShow,
            });
          }}
        />
        {this.state.isShow && <Sidebar></Sidebar>}
      </div>
    );
  }
}
interface IProps {
  title: string;
  cb: () => void;
}
class Navbar extends Component<IProps, any> {
  render() {
    return (
      <div>
        Navbar-{this.props.title}
        <button
          onClick={() => {
            this.props.cb();
          }}
        ></button>
      </div>
    );
  }
}
class Sidebar extends Component {
  render() {
    return <div>Sidebar</div>;
  }
}
```

### TS 的函数式组件

1. state

```typescript
const [name, setName] = useState("aaa");
name.substring(0, 1).toUpperCase() + name.substring(1);
setName("bbb"); // 这里利用了隐式类型推断
// 要么就显示泛型指定
const [name, setName] = useState<string>("aaa");
```

2. todo
   const myText = useRef<HTMLInputElement>(null)
   console.log((myText.current as HTMLInputElement).value)
   const [list, setList] = useState<string>([])
   setList([...list, (myText.current as HTMLInputElement).value])
3. props

```typescript
<Child name="aaa" />;
interface IProps {
  name: string;
}
function Child(props: IProps) {
  return <div>child</div>;
}
// 或者
const Child: React.FC<IProps> = (props) => {};
```

4. drawer

```typescript
//
const [isShow, setIsShow] = useState(true)
<Navbar cb={()=>{
    console.log("111")
    setIsShow(!isShow)
}}/>
{isShow && <Sidebar />}
interface IProps {
    title?: string,
    cb: ()=>void
}
function Navbar(props: IProps) {
    props.cb()
}
function Sidebar(props: IProps) {

}

```
