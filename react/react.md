### JSX语法及组件：class组件、函数式组件、嵌套组件、组件样式、事件处理、ref应用 ####
1. 组件书写注意事项：
import导入首字母必须大写
return 返回标签时，要么不换行，要么换行时用括号括起来，js中return如果换行会返回undefined
return 返回所有内容必须由一个标签包裹，也可以是一个空标签

2. 16.8之前函数式组件又叫无状态组件，16.8开始引入react-hooks，函数式组件开始可以有状态

3. import React, { Component } from 'react' // 17版本不写React也不会报错，因编译的时候会自动导入，但推荐写
// export { Component }
上面的导入方式后继承React类组件就可以简写了
// class App extends React.Component {}
class App extends Component {}

4. 最好风格统一，要么都写成函数式组件，要么都写成类组件，但现在推荐写函数式组件，更接近js函数式变成风格

5. 函数式组件写法, 避免this大战，推荐es6的箭头函数写法
function Tabbar() {
    return <div>Tabbar</div>
}
const Tabbar = () => {
    return <div>Tabbar</div>
}
const Tabbar = () => <div>Tabbar</div>

6. jsx中的逻辑和变量要放到{}中，区别与vue中的双大括号

7. 组件样式，let obj = {background: 'red'}, style={obj}定义的对象或者现成的对象style={{background: 'red'}}, 就是大括号里面需要是个对象；另外{backgroundColor: 'red'}, 需要驼峰符合js风格的; 大括号能解析的是表达式和变量，函数和语句这些不要放进去
js和css中书写样式区别，驼峰命名，值要加引号s
外部文件方式，import './css/01.css', 引入类class="active", 16.2版本之前是不允许写成class的，要写成className，后面版本class也可以用
<label for="username">用户名：</label> <input id="username">同样道理，16.2之前for会被识别为js关键字，所以改用htmlFor; 注意react中是单向数据绑定，区别于vue可以双向数据绑定
外部引入样式方便复用，但react推荐行内样式；这样组件内就包括完整的样式
jsx内的注释写法：{ /* 多行注释 */ // 单行注释 }

8. 事件处理：onClick={() => {}}, 用箭头函数的写法，普通函数会有this的问题
组件类内定义一个函数handleClick, 然后onClick={this.handleClick2}
handleClick2() { 
    console.log(this) // 本来按钮绑定的事件，谁调用我我就绑定谁，但react有自己的事件代理机制会绑定undefined, 所以需要手动绑定一下onClick={this.handleClick2.bind(this)}
}
或者 handleClick2 = (event) => { 这里也能拿到正确的this, 而且如果只需要默认的事件对象参数时也可以用 }, onClick={this.handleClick2} 默认传event参数
函数定义可以使用ES7的写法，直接 handleClick3 = () => {}, ES7可以在类内直接定义属性，变量前不要带let、const，  onClick={this.handleClick3}传参不方便
或者 handleClick4 = () => {} onClick={() => {this.handleClick4()} }， 类似的写法都要加this，指向类组件实例， handleClick4内this正常指向类组件实例，谁调用指向谁，this调用
onClick={() => {this.handleClick4()} }简化成onClick={() => this.handleClick4(可以传参数) }以后主推这种写法， 或者onClick={this.handleClick2.bind(this，这里传参)}对应handleClick2(参数){}

9. react事件绑定和原生事件绑定的区别
react没有具体绑定在DOM节点上，绑定DOM身上比较消耗内存，采用事件代理方案，绑定在根节点上
event事件对象是react自己模拟的不是浏览器提供的，也有event.stopPropagation,event.preventDefault方法

10. ref绑在普通标签身上时，<input ref="username">, this.refs.username可以获得真实DOM
refs这种方式现在被遗弃，因为可能多个人命名一样，ReactDOM.render(<ReactStrictMode><app/>
</ReactStrictMode>, document.getElementById("root"))严格模式会报错
新的写法：创建变量，myRef = React.createRef() <div ref="{this.myRef}"></div>, 访问时，this.myRef.current（注意current属性才能拿到原生DOM）, 这样定义两个相同的变量名就是不允许的
组件上使用ref道理相同

### 组件的数据挂载方式：状态、循环渲染、条件渲染 ####
1. React没有Object.defineProperty这种数据拦截机制，所以状态数据不能直接赋值修改，需要使用this.setState()
2. 状态的两种写法：state = {name: "React"}, constructor() { super(); this.state = {} }, 可以一次更新多个状态
也叫类组件中状态初始化的两种方式
3. react哲学，如无必要，勿增实体
{
    // this.state.list.map(item => `<li>${item}</li>`)
    this.state.list.map(item => <li>{item}</li>) // jsx中标签外不用带引号，变量或者表达式直接放大括号内， 
}
或者let newList = this.state.list.map(item => <li>{item}</li>) 然后使用的时候直接{newList}
另外li需要加key, this.state.list.map(item => <li key={item}>{item}</li>)

4. 列表项的key提升了列表虚拟DOM对比的效率，设想场景如果没有key，有1万项的列表比对。一般设置为item.id; 在列表没有调整位置或者删除的时候，可以把设置为索引值，但发生位置调整或者删除，就会比较耗性能

5. todo-list添加数据，this.state.list.push(this.myref.current.value)(不要直接修改状态，可能会造成不可预期的问题), this.setState({
    list: this.state.list
})
暂时可以用这种方式：let newList = [...this.state.list], newList.push(), this.setState({
    list: newList
})
6. todo-list删除数据
onClick={this.handleClick2.bind(this，index)}
onClick={() => this.handleClick4.click(index)} 箭头函数不用传参，因为里面的函数可以拿到外部的变量
let newList = this.state.list.slice()/concat()/[...]
newList.splice(index, 1) 同样道理，改完之后页面不会自动更新的，需要调用setState方法

7. 条件渲染，清空字符串, this.myref.current.value = ""
{ this.state.list.length === 0 ? <div>暂无待办事项</div>:null }
或者抽出来 a = <div>暂无待办事项</div>, jsx会被解析成React.create
换种写法：{ this.state.list.length === 0 && <div>暂无待办事项</div> }
上述两种方式都是div的创建和删除，从浏览器DOM结构能看出来，下面一种方式是控制显示和隐藏
<div className="this.state.list.length === 0 ? '':'hidden' ">暂无待办事项</div>
这些就是Vue中v-if和v-show的区别

8. {}的内容会当做普通字符串显示，防止一些恶意代码攻击
如果实在想显示富文本，可以<span dangerouslySetInnerHTML={
    _html: item.text // 比如text为<b>你好</b>， 这样就可以将HTML代码片段解析后渲染到页面
}></span>
应用场景，接收后台返回的html片段

9. 选项卡设置页面底部的样式：position: fixed; left: 0; bottom: 0
which() {
    switch (this.state.current) {
        case 0: 
            return <Film></Film>
        default:
            return null
    }

}

{ this.state.current === 0 && <Film></Film> }
或者
{ this.which() // 表达式：支持函数表达式 }
<ul>
{
    this.state.list.map((item. index) => 
        <li className="this.state.current === index ? 'active' : ''" onClick={() => {
            this.handleClick(index)
        }}>{item.text}</li>
    )
}
</ul>

10. 数据请求，每次更新状态时，render函数就会执行一次，所以数据请求不能放到这里
这时暂时放到构造器里，后面会放到生命周期里
constructor() {
    super()
    // 数据请求, 卖座接口的响应头跨域已经限制已经为*, 但还是有些限制，需要请求头加X-Client-Info、X-Host
    // axios.get('').then(res => {}).catch(err => {console.log(err)})
    // axios完整版可以加请求头
    axios({
        url: '',
        headers: {
            '': ''
        }

    }).then(res => {console.log(res.data // 原始后台数据放在res.data里面的)
        this.setState({  // 对引用数据类型的值赋值是深拷贝还是钱拷贝，暂时可以按深拷贝理解
            cinemaList: res.data.data.cinemas // 第一个data是axios的要求，第二个data是真正的后端数据
            backCinemaList: res.data.data.cinemas
        })

        // axios本来就是个异步的, 所以setState会同步
        new BetterScroll(".wrapper")
    })
}

11. 搜索过滤， handleInput(event) {
    console.log(event.target.value)
    let newList = this.state.backCinemaList.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase() || item.address.toUpperCase().includes(event.target.value.toUpperCase()))
    this.setState({
        cinemaList: newList,

    })
}
this.state = {
    cinemaList: [],
    backCinemaList: [] // 注意备份一个源数据，这样每次过滤万后依然有源数据可用
    // 这种方案有点浪费内存，后续有更好的方法来处理，还有input的值后续也可以通过受控组件的状态来处理
}

12. setState的同步异步的问题
handleAdd1 = () => {
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count) // 1, 1说明setState异步更新状态， 异步更新实际DOM
    // 处在同步逻辑中（合并逻辑的标志位会置为true），会异步更新状态，且异步更新真实DOM
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count) // 1
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count) // 1
} // 点击发现页面1变成2， 合并处理，在下一个宏任务时更新
但把上面几个setState包裹放在setTimeout(() => {}, 0), 2就是处在异步逻辑中(合并逻辑的标志位会置为false,调用一次就立即执行一次)，会同步更新状态，且同步更新真实DOM，界面会显示4

    this.setState({
        count: this.state.count + 1
    }, () => {
        // 3第二个回调知道状态已经更新完了,DOM也更新完了
    })

13. betterscroll让列表更平滑滚动， 之前用于移动端，现在也可以用PC端; 使用条件，外面有个有限高度的盒子设置overflow:hidden，里面有个ul或者div盒子可以无限高
style="{{ height: '200px' }}"
this.setState({
    list: list
}, () => { // 放到这里BetterScroll才能接管到更新后的DOM， 而不能放到外面
    new BetterScroll('.wrapper')
})
或者
setTimeout(() => {
    this.setState({
        list: list
    })
    new BetterScroll('.wrapper')
}, 0)

14. props属性提高组件的复用性，而state只能控制组件内的状态
父组件， <Navibar leftshow={true} /> 也可以传state的数据给子组件
子组件：const { leftshow } = this.props, { leftshow && <button>返回</button> }
属性验证：
import xxPropTypes from 'prop-types' 
// 类属性
Navbar.propTypes = {
    leftshow: xxPropTypes.bool
}
// 类属性默认值
Navbar.defaultProps = {
    leftshow: true
}
// 类属性的另一种写法推荐：写成类内的静态方法
static propTypes = {
    leftshow: xxPropTypes.bool
}
static defaultProps = {
    leftshow: true
}

15. 属性注意事项
obj = {
    title: 'xx',
    leftshow: true
}
<Navbar title={obj.title} leftshow={obj.leftshow}  />
<Navbar {...obj}  />
props函数式组件，函数式组件天生支持props，不像state，16.8之后才支持
import React from 'react'
export default function Sidebar(props) {
    let { bg } = props
    return ( // 必须要有个根节点，根节点为空标签也是可以的
        <div style={{
            background: bg, 
            width="200px"
            }} 或者 style={obj1}>
            <ul>
            </ul>
        </div>
    )
}
import Sidebar from ''
<Sidebar bg="yellow"></Sidebar>

16. 属性和状态的异同，及应用场景
同：都是纯js对象，都能触发render更新
异：属性从父组件获取和修改， 状态不能；属性不在组件内部修改，而状态要；属性能设置子组件初始值，而状态不可以，属性能修改子组件的值而状态不可以
都能在内部设置默认值，但设置方式不同
属性是父给的，状态是自己控制的
孩子没法直接改父组件的属性，可以请求父组件改
状态多了管理会复杂，多写无状态组件，让组态放到父组件，子组件通过属性听从父组件的调配，有状态的父组件控制无状态的孩子组件；这种子组件就是广义上的受控组件

17. 狭义的受控组件和非受控组件， 表单中的受控组件和非受控组件
<input value="xx">这在react中相当于一个组件，并给属性value传了个写死的值；用defaultValue="xx"，意思是第一次是xx值，后续可以改，只是赋予一个初始值，后续没法控制更新了；ref拿到dom值，修改dom值就是非受控方案，并没有通过react的state来获取状态；这种方案的缺点是如果当前组件里有子组件，需要传当前组件的状态，直接传this.username.current.value无法做到响应式更新

react中input和原生的input的区别，react中input中value是受控，defaultValue非受控，而且onChange和onInput是同效的，原生js则不然
在react中把input看成一个组价
onChange={ (evt) => {
    this.setState({
        // 状态改了，render才能重新渲染一遍
        username: evt.target.value
    })
} }

18. cinema优化，受控cinema
constructor() {
    super()
    this.state = {
        cinemaList: [],
        mytext: ""
    }
}
// input做成受控的, 受控之后值就能给别的组件用，且能渲染
<input value={this.state.mytext} onchange={ (evt) => {
    // 让输入框的值与状态同步
    this.setState({
        mytext: evt.target.value
    })
} } />
// 受控组件只要状态改变，所有用到state的相关视图都会发生改变，react中提倡受控组件的写法
{
    this.getCinemaList().map(item => 
    <dl key={item.cinemaId}>
        <dt>{item.name}</dt>
        <dd>{item.address}</dd>
    </dl>)
}
getCinemaList() {
    return this.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.state.mytext.toUpperCase() || item.address.toUpperCase().includes(this.state.mytext.toUpperCase()))
}
19. 增加check功能，
handleChecked = (index) => {
    let newList = [...this.state.list] // 只是对最外层的拷贝，其实内层的对象还是指向原对象
    newList.isChecked = !newList.isChecked
    this.setState({
        list: newList
    })
}
{ 布尔变量 }在模板中是显示不出来的
style={{ textDecoration: item.checked? "line-through": '' }} // 文本带删除线的样式

10. 受控组件：表单元素的控制交给React，表单元素的值完全由state控制。比如我们可以称由state控制的input表单元素为受控组件，可以扩展到自定义组件，如果组件的状态由传入的props来控制，而没有自己的内部状态state也叫受控组件
非受控组件：表单元素的状态不受React组件状态的影响，表单元素的值存储于DOM元素中，组件要获取DOM元素的值可以通过ref的方式，扩展到自定义组件，如果组件的状态完全由内部的state来控制，就是非受控组件（即不受外部控制的组件）
也可以既是受控组件又是非受控组件，比如可以根据props是否传有值来判断是否启用自身的state对应值
能够通过属性完全驱动和控制孩子组件，就是受控组件

11. React.PureComponent与React.Component很相似，两者的区别在于React.Component并未实现shouldComponentUpdate()，而React.PureComponent中以浅层对比prop和state的方式来实现了该函数， React.PureComponent可以提高性能

########## 组件通信 #########
组件通信解决组件之间的协作问题
1. 父传子是为了子组件能复用
为什么进行子传父，子传父怎么用？
子传父，就是子给父发个信号，让父自己去更新自己的状态，antdesign的抽屉组件就是一个子传父的示例
使用方式：父给子传个事件属性，<Navbar event={() => { // event可以叫其它名字
    this.setState({ isShow: !this.state.isShow })
}} />, 子传父就是子能通知上面的回调函数执行，父传子是传的字符串，子传父时父给子传的是函数，子里面通过this.props.event就能访问到这个函数，也就是说子可以直接调用父传来的函数this.props.event(这里可以传参数)；也就子可以调用父传来的回调函数
父传子是传属性，子传父是通过回调

2. 非受控卖座选项卡的功能, 难以实现组件之间的联动功能
将之前的底部拆成底部选项卡组件Tabbar.js
子：this.props.myevent(current)
<Tabbar myevent={ (index) => {

} } ></Tabbar>
// 闭合标签的书写形式，取决于内部有无内容，既有无子元素或者子组件
<Navbar myevent={ () => { // 父组件内myevent重名不影响

} }  />
state更新会走rander函数，所以rander函数内不要再写state更新了，否则出现循环调用的问题报错
state的初始化时，只会在类组件第一次创建的时候调用，下一次更新的时候state不会再次初始化而只会rander再次调用

3. 改成受控组件，多写无状态的组件，这也是对父子通信好的应用
像list列表数据仍可以保留自己用
哪些数据设计成无state,哪些设计成props可以做个区分
受控组件可以进一步改造成16.8之前的函数式组件，注意函数式组件中方法要加function

4. 表单域组件，使用受控组件这种方式会比较麻烦
label和input封装一起的组件就叫表单域组件，antdesign里面可以看到，即field组件
下面父子通信的方式写个表单域组件
import React, { Component } from 'react'

class Field extends Component {
    render() {
        return <div style={{background: yellow}}>
            // 表达式需要用大括号括住
            <label>{this.props.label}</label>
            <input type={this.props.type} onChange={ (evt) => {
                this.props.onChangeEvent(evt.target.value)
            }} value={this.props.username}/>
        </div>
    }
}

state = {
    username: localStorage.getItem('username'),
    password: ''
}
<Filed label="用户名" type="text" onChangeEvent={(value) => { 
    this.setState({
        username: value
    })} value={this.state.username} />
<Filed label="密码" type="text" onChangeEvent={(value) => { 
    this.setState({
        password: value
    })
 }} />
// 相当于两个实例，内部的数据是隔离的

5. ref方案改写表单域组件
class Field extends Component {
    state = {
        value: '',
    }
    render() {
        return <div style={{background: yellow}}>
            // 表达式需要用大括号括住
            <label>{this.props.label}</label>
            <input type={this.props.type} onChange={ (evt) => {
                this.setState({
                    value: evt.target.value
                })
            }} value={this.props.username}/>
        </div>
    }
}
username = React.createRef()
<Filed label="用户名" type="text" onChangeEvent={(value) => { 
    this.setState({
        username: value
    })} value={this.state.username} ref={this.username} />  // ref="username", ref这种写法严格模式下会有问题所以会
ref加到标签身上是原生dom节点，拿到组件生上就是组件对象，但都是.current才能拿到
父组件就可以通过this.state.current.state拿到Field域的值
那剩下的设置初始值和清空怎么做呢
this.state.current.state.value = ""这种方法直接改孩子的状态是最忌讳的而且不好用
改变子组件状态有两种方式，要么父组件重新渲染一下，要么子组件里setState重新执行一遍
this.state.current.setState可以这样，但不推荐
推荐this.state.current.clear() 在定义的clear内setState来操作状态
类似的设置值也是在内部定义一个set方法

6. 非父子组件间通信
（1）状态提升（中间人模式），适合亲兄弟之间，层次太多就不合适了
将多个组件需要共享的状态提升到最近的父组件，父组件改变之后再分发给子组件，其实就是父子通信的组合，一个子去改这个状态，另一个子去访问这个状态
（2）发布订阅模式
（3）context状态树传参
状态提升示例：FilmItem, FilmDetail亲兄弟之间的通信
constructor() {
    super()
    this.state = {
        filmList: []
    }
    // 因为静态资源在同账号同域名下http://localhost:3000也可以省略
    axios.get('http://localhost:3000/test.json').then(res => {
        //console.log(res.data)  // axios多包装了一层所以res.data才能真正拿到后端返回的数据
        console.log(res.data.data.films) // 前一个.data是因为axios, 后一个.data是因为后端返回的数据层次
        this.setState({
            filmList: res.data.data.films
        })
    })
    render() {
        return (
            <div>
                this.state.filmList.map(item => {
                    <FilmItem key="item.filmId" {...item}></FilmItem>
                })
            </div>
        )
    }
}
// FilmItem子组件
let { name, poster, synopsis } = this.props
synopsis拿到之后子传父的方式传给父，父拿到之后调用setState, 再传给FilmDetail
// 在属性上应用表达式或者变量必须用大括号这种形式
// 组件内css文件可以直接import方式引入

8. 发布订阅
发布中心、发布者、订阅者
订阅者把自己的回调函数送到发布中心保存，发布者调用发布的方法找出所有订阅的函数依次进行调用
// 调度中心
var bus = {
    list:[],
    // 订阅
    subscribe(callback) {
        this.list.push(callback)
    },
    // 发布，遍历list所有的元素，将回调函数执行
    publish(text) {
        this.list.forEach(callback => {
            callback && callback(text) // 防止call为null等
        })
    }
}
bus.subscribe((value) => {
    console.log('1111', value)
})
bus.subscribe(() => {
    console.log('2222')
})
// 一般是点个按钮才发布
setTimeout(() => {
    bus.publish(可以加参数)
}, 0)
Redux就是基于纯函数写的发布订阅，用于状态管理和非父子通信
发布订阅示例：FilmItem发布者, FilmDetail订阅者
constructor() {
    super()
    this.state = {
        filmList: []
    }
    // 因为静态资源在同账号同域名下http://localhost:3000也可以省略
    axios.get('http://localhost:3000/test.json').then(res => {
        //console.log(res.data)  // axios多包装了一层所以res.data才能真正拿到后端返回的数据
        console.log(res.data.data.films) // 前一个.data是因为axios, 后一个.data是因为后端返回的数据层次
        this.setState({
            filmList: res.data.data.films
        })
    })
    render() {
        return (
            <div>
                this.state.filmList.map(item => {
                    <FilmItem key="item.filmId" {...item}></FilmItem>
                })
            </div>
        )
    }
}
FilmDetail一上来就要订阅, 孩子的孩子也可以订阅
constructor() {
    super()
    this.state = {
        info: ""
    }
    bus.subscribe((info) => {
        this.setState({
            info: info
        })
    })
}
FilmItem中发布
onClick={ () => {
    bus.publish(synopsis)
}

}
