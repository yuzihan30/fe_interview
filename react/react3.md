<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-20 18:44:05
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-20 19:12:38
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