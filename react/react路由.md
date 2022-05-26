<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-26 10:22:34
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-26 18:16:36
 * @FilePath: /fe_interview/react/react路由.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

-->
# react路由
@[toc](目录)
## 路由引入
1. 什么是路由
- 让路径和组件进行关联，比如把页面分享给别人，如果没做路由，还会走到初始化的页面；以前多页应用分享链接的时候，就带着页面的/1.html,所以不存在前面的问题，但现在单页应用就唯一的页面
- 路由就是根据不同的url地址展示不同的内容或者页面或者组件
- 解决REACT components到url的同步映射关系
- 实现重定向、一级二级路由、点击切换功能
2. 路由安装
npm install react-router-dom@5 // 当前不指定版本的话会装6， 指定5的话就是当前5的最新版本
里面有个理念万物皆组件，包括重定向、一级路由都是一个个组件
## 一级路由和多级路由
1. 改造之前卖座案例
films => Films
cinemas => Cinemas
center => Center
配置好路由后，会自动帮我们管理路由
import { HashRouter, Route } from 'react-router-dom'
export default class App extends Component {
    render() {
        return (
            <div>
                // HashRouter也是插槽的机制,路径上就会出现#号, location.hash会拿到#及后面的值
                // 跳转的原理就是location.hash拿到值跟path去匹配然后加载对应的组件
                // 后面这里面加的内容会比较多，就单独提到一个叫路由组件里
                <HashRouter>
                    // 路径里有1个叫一级，有两个的就叫二级；组件名是什么，最好路径名跟它也是有关联的
                    <Route path="/films" component={Films}></Route>

                    <Route path="/cinemas" component={Cinemas}></Route>
                    <Route path="/center" component={Center}></Route>
                </HashRouter> 
            </div>
        )
    }
}
components一般放公共组件，views文件夹下放页面视图
2. 抽离路由router->IndexRouter.js
import React, { HashRouter, Route } from 'react'
import { HashRouter, Route } from 'react-router-dom'
// 引入组件

export default class IndexRouter extends Component {
    render() {
        return (
            <HashRouter>
                // 路径里有1个叫一级，有两个的就叫二级；组件名是什么，最好路径名跟它也是有关联的
                <Route path="/films" component={Films}></Route>

                <Route path="/cinemas" component={Cinemas}></Route>
                <Route path="/center" component={Center}></Route>
            </HashRouter> 
        )
    }
}
3. 引入路由后改造根组件App.js
import MRouter from "./router/IndexRouter"
return (
    <MRouter></MRouter>
    // 当然外面也可以嵌套一层div, 比如除了路由组件还有其他东西
)
## 路由重定向
1. 路由重定向
<HashRouter>
    // 路径里有1个叫一级，有两个的就叫二级；组件名是什么，最好路径名跟它也是有关联的
    <Route path="/films" component={Films}>
    <Route path="/cinemas" component={Cinemas}>
    <Route path="/center" component={Center}>
    // react中万物皆组件，上面都不匹配的时候就走下面的;但写成下面还有个问题，就是在center等页面刷新的时候还会进到films页面；原因是由于/是模糊匹配；还有个问题，第一次输入url比如center能停住，但刷新就跑到films了，这个5版本路由刚改的，老的路由，第一次和后面刷新都会匹配"/";为了解决这个问题就引入了Switch组件，匹配到了就会break,就不会再往下走了
    <Redirect from="/" to="/films" />
</HashRouter> 
<HashRouter>
    <Switch>
        // 路径里有1个叫一级，有两个的就叫二级；组件名是什么，最好路径名跟它也是有关联的
        <Route path="/films" component={Films}>
        <Route path="/cinemas" component={Cinemas}>
        <Route path="/center" component={Center}>
        // react中万物皆组件，上面都不匹配的时候就走下面的;但写成下面还有个问题，就是在center等页面刷新的时候还会进到films页面；原因是由于/是模糊匹配；还有个问题，第一次输入url比如center能停住，但刷新就跑到films了，这个5版本路由刚改的，老的路由，第一次和后面刷新都会匹配"/";为了解决这个问题就引入了Switch组件，匹配到了就会break,就不会再往下走了
        <Redirect from="/" to="/films" /> // 万能匹配
    </Switch>
</HashRouter> 
2. 重定向改造
没有的路径，返回404
<HashRouter>
    <Switch>
        <Route path="/films" component={Films} />
        <Route path="/cinemas" component={Cinemas} />
        <Route path="/center" component={Center} />
        // <Redirect from="/" to="/films" />
        // 前面都不满足的时候就走这个，但都被上面重定向给拦截了，这是因为上面重定向是模糊匹配，要变成精准匹配，找不到的路径比如/aaa就可以走下面的了;传个属性exact
        <Redirect from="/" to="/films" exact />
        <Route component={NotFound}/>
    </Switch>
</HashRouter>
## 嵌套路由
<HashRouter>
    <Switch>
        // 默认也是模糊匹配，会提前拦截到子路由的匹配，除非加个exact;但这个时候nowplaying又会把上面的films完全覆盖掉，因为当前看他们俩的关系是平级的，也就是说/films/nowplaying也会把/films上面公共的轮播也盖掉；虽然看路径上父子关系，但实质上市完全平级的，组件时互相替代的
        // <Route path="/films" component={Films} />
        <Route path="/films" component={Films} exact />
        <Route path="/films/nowplaying" component={Nowplaying} />
        <Route path="/cinemas" component={Cinemas} />
        <Route path="/center" component={Center} />
        <Redirect from="/" to="/films" exact />
        <Route component={NotFound}/>
    </Switch>
</HashRouter>
引入嵌套路由
Films.js
render() {
    return (
        <div>
            <div>大轮播</div>
            <div>导航</div>
            // 路由配置，嵌套路由; 它们写在了一级路由的组件的里面；把组件的路由套在一个组件的内部
            // 创建组件时路径关系上也要体现出来，views下建个films目录放这俩子组件（和views平级的components目录则放一些公共组件，比如选项卡、公共导航栏、轮播组件，可以放一些零零散散的小组件，但也可以放films里的组件）;两个路由不会同时显示，只能活一个，而且路径完全匹配的情况下；同时<Route path="/films" component={Films} />中去掉精确匹配
            <Switch>
                <Route path="/films/nowplaying" component={Nowplaying} />
                <Route path="/films/comingsoon" component={comingsoon} />
                // 这也加个重定向，输入/films可以直接定向到/films/nowplaying"；但是刷新又会出之前提到过的万能匹配的问题，需要加switch来解决
                <Redirect from="/films" to="/films/nowplaying"/>
            </Switch>
        </div>
    )
}
## 声明式导航和编程式导航
1. 用户使用时不会说是使用输入url导航，而是点击切换或者跳转导航，比如选项卡、tab;一级导航选项卡，二级导航选项卡
以前声明式:html标签方式<a href="/index.html">aaa</a>
以前编程式:js编码方式location.href = '/index.html'
现在引入react的声明式导航和编程式导航，原网站也不是这种输入路径的，而是通过选项卡的方式
2. Tabbar.js
<ul>
    <li>
        <a href="#/films">电影</a> // 注意这个跳转写的时候一定加#号,js的hash,如果不加#号，就会走到localhost:8080/hash;可以看到用原始的生命式写法是肯定没问题的
    </li>
    <li>
        <a href="#/cinemas">影院</a>
    </li>
    <li></li>
</ul>
另外高亮的问题，点击选项卡导航，会高亮；怎么直接输入url链接导航也能高亮呢，就是监听路径的改变，自动帮你高亮；原生js中window.onhashchange可以监听到路径改变，location.hash拿到切换的路径，对比给那个选项相等就加上高亮；那直接监听到路径改变，那直接让某个组件显示也是可以的
实际上react-router将这些已经实现了

3. react声明式导航
<NavLink to="/films" activeClassName="active">films<NavLink>
<li>
    // <a href="#/films">电影</a>
    // 就像配置路由的时候我们这里不用带#
    <NavLink to="/films" activeClassName="active">films<NavLink> 
</li>
<li>
    <a href="#/cinemas">影院</a>
</li>
这时运行会报错，提示NavLink必须放到<HashRouter>内，怎么做到不用放进去呢，那就采用弯道超车的方式，放到App.js中的<MRouter>内,作为它的子组件,然后HashRouter内留好一个插槽

4. 引入路由后改造根组件App.js
import MRouter from "./router/IndexRouter"
return (
    <MRouter>
        <Tabbar></Tabbar>
    </MRouter>
    // 当然外面也可以嵌套一层div, 比如除了路由组件还有其他东西
)
<HashRouter>
    { this.props.children }
    <Switch>
        // 默认也是模糊匹配，会提前拦截到子路由的匹配，除非加个exact;但这个时候nowplaying又会把上面的films完全覆盖掉，因为当前看他们俩的关系是平级的，也就是说/films/nowplaying也会把/films上面公共的轮播也盖掉；虽然看路径上父子关系，但实质上市完全平级的，组件时互相替代的
        // <Route path="/films" component={Films} />
        <Route path="/films" component={Films} exact />
        <Route path="/films/nowplaying" component={Nowplaying} />
        <Route path="/cinemas" component={Cinemas} />
        <Route path="/center" component={Center} />
        <Redirect from="/" to="/films" exact />
        <Route component={NotFound}/>
    </Switch>
</HashRouter>
运行起来后，在浏览器里查看发现这些标签又被渲染成a链接了
点击切换，组件会动态的增删.active属性，但active属性的样式需要自己写，你如果不想用active这个名，则需要显示生命一个新的class名，每个当行都要写，然后程序可以帮忙做自动的增删，匹配到谁就给谁加activeClassName="active"
<NavLink to="/films" activeClassName="active">电影<NavLink> 
<NavLink to="/cinemas" activeClassName="active">影院<NavLink> 

6. react编程式导航
从列表页跳转到详情页, 声明导航可以做，这里我们用编程导航，绑定click事件
// Nowplaying的父组件并不是Films，只是传给了Films里的Route组件，内部机制是会把Nowplaying组件变成Route组件的子组件
export default function Nowplaying(props) {
    useEffect(() => {
        axios().then( setlist(res.data.data.films) )
    }, )
}
const history = useHistory() // 它就等价于props.history
const handleChangePage = (id) => {
    // 先试试传统编程导航,原生js写法
    // window.location.href = "#/detail"+id // 要加#号
    // 再用react写法
    // Nowplaying变成Route的子组件之后，props里就可以拿到history、location、match属性
    // history里面就有go、goBack、goForward、push方法，类似于window.history里的方法
    // 经常用的就是push方法
    // props.history.push(`/detail/${id}`) // 这里就不要带#号
    // 还有种hooks写法
    history.push(`/detail/${id}`)
}
<div>
    {
        list.map(item=>
        <li key={item.filmId} onClick={() => handleChangePage(film.itemId)>
            // {item.name}
            // <NavLink to={'/detail/' + item.filmId}>{item.name}<NavLink> 
        </li>
        )
    }
</div>

## 动态路由
1. Detail组件，就是详情页
export default Detail(props) {
    // 这里怎么获得id值呢
    console.log(props.match.params)
}
<Route path="/films" component={Films} exact />
<Route path="/films/nowplaying" component={Nowplaying} />
<Route path="/cinemas" component={Cinemas} />
<Route path="/center" component={Center} />
// <Route path="/detail" component={Detail} />
// :myid代表一个模糊值，冒号是占位符，这就是动态路由，这样的话，Detail组件props.match.params里就能拿到id值；那样就不需要通过window.location或者props.location截字符串了
<Route path="/detail/:myid" component={Detail} />
<Redirect from="/" to="/films" exact />
<Route component={NotFound}/>
2. 面试题，react中从一个组件传另一个组件数据，两组间不挨着，非父子、兄弟关系？
- 动态路由，还有另外的传参方式，和路径没有关联
history.push(`/detail/${id}`)
<Route path="/detail/:myid" component={Detail} />
- this.props.history.push({pathname: '/detail', query: {id: id}})
<Route path="/detail" component={Detail} />
this.props.location.query.id
- this.props.history.push({pathname: '/user', state: {id: id}})
<Route path="/detail" component={Detail} />
this.props.location.state.id
后两种方法的问题是，复制链接给别人，别人打开，由于id数据在内存中，所以会页面报错；类似个全局变量，刷新页面也会丢；而第一种方案id是带在路径上的，就不存在这种问题






