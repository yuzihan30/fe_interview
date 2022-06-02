<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-06-02 15:31:22
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-06-02 22:25:26
 * @FilePath: /fe_interview/react/mobx.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 原理
redux的替代方案，新旧版本分别基于Proxy和Object.define
## 使用
npm i mobx@5 普及率最高的版本是5
import { observable, autorun } from 'mobx'
observable将数据转化为可观察的， 每次改变值的时候在autorun的回调函数中就会监听触发
1. 观察基本数据类型
let observableNum = observable.box(10)
let observableName = observable.box('aaa')
autorun(()=>{ // 第一次执行一次，之后每次改变也会执行
    console.log(observableNum.get()) // 会对observableNum的get、set拦截，observableNum改了才会触发
})
autorun(()=>{ 
    console.log(observableName.get()) 
})
setTimeout(() => {
    observableNum.set(20)
    observableName.set('bbb')
}, 1000)
之前redux只要dispatch, 所有订阅者都能收到通知，只是按需取用，只取和自己相关的；而autorun里只有observableNum改变了才会执行一次，只关心跟自己相关的状态改变；能更加细粒度的控制状态的改变，性能得到一定提升
setTimeout(() => {
    observableNum.set(20)
    observableName.set('bbb')
}, 2000)
2. 观察复杂数据类型
对象用.map或者直接观察，数组直接观察
let myObj = observable.map({
    name: 'aaa',
    age: '18'
})
autorun(()=>{ 
    console.log(myObj.get('name')) // 改name属性才会执行
})
setTimeout(() => {
    myObj.set('age', 19)
}, 3000)

let myObj = observable({
    name: 'aaa',
    age: '18'
})
autorun(()=>{ 
    console.log(myObj.name) // 改name属性才会执行
})
setTimeout(() => {
    myObj.age = 19
}, 3000)
3. mobx改造影院
views平级建mobx文件夹->store.js
{
    isTabbarShow: true,
    list: [],
    cityName: '北京'
}
import { observable } from 'mobx'
const store = observable({
    isTabbarShow: true,
    list: [],
    cityName: '北京'
})
export default store
Detail.js
useEffect(() => {
    store.isTabbarShow = false
    return () => {
        store.isTabbarShow = true
    }
}, [])
App.js
state = {
    isShow: false // true也可以，反正autorun开始都要执行一次
}
cDM() {
    autorun(() => {
        // console.log(store.isTabbarShow)
        this.setState({
            isShow: isTabbarShow
        })
    })
}
<MRouter>
    { this.state.isShow && <Tabbar></Tabbar> }
</MRouter>

4. 严格模式
现在Detail里面直接修改store, 之前redux是在store里修改；那就开启严格模式，不让团队在外面改
import { observable, configure } from 'mobx'
configure({
    enforeActions: 'always', // 'never'是不使用严格模式
})
const store = observable({
    isTabbarShow: true,
    list: [],
    cityName: '北京',
    changeShow() {
        this.isTabbarShow = true
    },
    changeHide() {
        this.isTabbarShow = false
    }
}, {
    changeShow: action,
    changeHide: action // 标记这两个方法是action, 专门修改可观测的value
})
export default store
Detail.js
useEffect(() => {
    // store.isTabbarShow = false
    store.changeHide()
    return () => {
        // store.isTabbarShow = true
        store.changeShow()
    }
}, [])

5. 带装饰器的写法
ES7的装饰器
import { observable, configure } from 'mobx'
configure({
    enforeActions: 'always', // 'never'是不使用严格模式
})
const store = observable({
    isTabbarShow: true,
    list: [],
    cityName: '北京',
    changeShow() {
        this.isTabbarShow = true
    },
    changeHide() {
        this.isTabbarShow = false
    }
}, {
    changeShow: action,
    changeHide: action // 标记这两个方法是action, 专门修改可观测的value
})
class Store {
    @observable isTabbarShow = true
    @observable list = []

    @action changeShow() {
        this.isTabbarShow = true
    },
    @action changeHide() {
        this.isTabbarShow = false
    }
}
// export default new Store() 或者
const store = new Store()
export default store
现在需要让vscode和项目都支持装饰器
vscode设置->用户->搜experimentalDecorators后，勾选上
项目支持，需要安装，配置babel.rc,再创建个config-overrides.js文件, 继续安装其他依赖，修改package.son(可以搜网上资料)
6. 异步
Cinemas.js
useEffect(() => {
    if(store.list.length === 0) {
        store.getList()
    }
    const unsubscribe = autorun(()=>{ // 切换出去，再切换回来会注册多个回调函数,所以销毁时需要取消
        setCinemaList(store.list)
    }) // 会返回一个函数
    return ()=>{
        unsubscribe()
    }
}, [])
store.js
import { observable, configure, runInAction } from 'mobx'
class Store {
    @observable isTabbarShow = true
    @observable list = []

    @action changeShow() {
        this.isTabbarShow = true
    },
    @action changeHide() {
        this.isTabbarShow = false
    },
    @action getList() {
        axios().then(res => {
            // this.list = res.data.data.cinemas // 异步的时候编译时不会认为你是在action里改的
            runInAction(()=>{
                this.list = res.data.data.cinemas
            })
        })
    },
    或者
    @action async getList() {
        let list = await axios().then(res => {
            return res.data.data.cinemas 
        })
        runInAction(()=>{
            this.list = list
        })
    },
}
7. mobx-react
对比react-redux, 不用自己订阅和取消订阅
npm i mobx-react@5 // 对应mobx也装5版本的
index.js
import { Provider } from 'mobx-react'
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
)
App.js // 里面就不需要自己监听了
@inject("store") // 装饰器不是父组件的角色，只是让App可以用store,想让App可以直接拿到store需要加高阶组件
@observer // 这个是高阶组件
class App extends Component {
    // cDM() {
    //    console.log(this.props.store)
    // }
    render() { // 打造成无状态组件
        ...
        { this.props.store.isTabbarShow && <Tabbar></Tabbar> }
    }

}
export default App
但在函数式组件写法不一样
Cinemas.js
// useEffect(() => { // 这个就可以不要了
    if(store.list.length === 0) {
        store.getList()
    }
    const unsubscribe = autorun(()=>{ // 切换出去，再切换回来会注册多个回调函数,所以销毁时需要取消
        setCinemaList(store.list)
    }) // 会返回一个函数
    return ()=>{
        unsubscribe()
    }
}, [])
return (
    <div>
        <Observer> // 一个是要包Observer，另一个要改成箭头函数写法；Observer帮你监听帮你取消，监听后会执行回调
            {
                () => {
                    return store.list
                }
            }
        </Observer>
    </div>
)
原理同下面消费者，里面函数会回调
<createContext.Consumer>
    {
        () => {

        }
    }
</createContext.Consumer>