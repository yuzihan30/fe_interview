<!--
 * @Author: your name
 * @Date: 2022-03-20 10:17:10
 * @LastEditTime: 2022-03-31 22:04:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/react/react.md
-->
### JSX语法及组件：class组件、函数式组件、嵌套组件、组件样式、事件处理、ref应用 ####
1. 组件书写注意事项：
import导入首字母必须大写
return 返回标签时，要么不换行，要么换行时用括号括起来，js中return如果换行会返回undefined
return 返回所有内容必须由一个标签包裹

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
函数定义可以使用ES7的写法，直接 handleClick3 = () => {}, ES7可以在类内直接定义属性，变量前不要带let、const，  onClick={this.handleClick3}传参不方便
或者 handleClick4 = () => {} onClick={() => {this.handleClick4()} }， 类似的写法都要加this，指向类组件实例， handleClick4内this正常指向类组件实例，谁调用指向谁，this调用
onClick={() => {this.handleClick4()} }简化成onClick={() => this.handleClick4(可以传参数) }以后主推这种写法， 或者onClick={this.handleClick2.bind(this，这里传参)}对应handleClick2(参数){}

9. react事件绑定和原生事件绑定的区别
react没有具体绑定在DOM节点上，绑定DOM身上比较消耗内存，采用事件代理方案，绑定在根节点上
event事件对象时react自己模拟的不是浏览器提供的，也有event.stopPropagation,event.preventDefault方法

10. ref绑在普通标签身上时，<input ref="username">, this.refs.username可以获得真实DOM
refs这种方式现在被遗弃，因为可能多个人命名一样，ReactDOM.render(<ReactStrictMode><app/>
</ReactStrictMode>, document.getElementById("root"))严格模式会报错
新的写法：创建变量，myRef = React.createRef() <div ref="{this.myRef}"></div>, 访问时，this.myRef.current（注意current属性才能拿到原生DOM）, 这样定义两个相同的变量名就是不允许的
组件上使用ref道理相同

### 组件的数据挂载方式：状态、循环渲染、条件渲染 ####
1. React没有Object.defineProperty这种数据拦截机制，所以状态数据不能直接赋值修改，需要使用this.setState()
2. 状态的两种写法：state = {name: "React"}, constructor() { super(); this.state = {} }, 可以一次更新多个状态
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

