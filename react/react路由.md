<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-26 10:22:34
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-26 11:33:36
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
