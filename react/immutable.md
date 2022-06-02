<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-06-02 09:40:48
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-06-02 15:24:19
 * @FilePath: /fe_interview/react/immutable.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 常见深复制
1. JSON.stringfy
缺点：undefined值的字段会被删掉
2. deepcopy
性能不好，占用内存，嵌套深层且多字段时，只有一个字段修改了导致其他字段都要复制
3. vue修改状态和react的区别
vue必须改老状态；而react是要保证老状态可用的前提下修改新状态，复制层级不够的话老状态就会受影响
4. immutable.js->Map
let oldImmuObj = Map(obj)
let newImmuObj = oldImmuObj.set("name", "aaa")
newImmuObj.get("name")
或者再转回去 newImmuObj.toJS()
react中示例：
方案1
state = {
    info: Map({ // 缺点：如果复杂里面还要套一层Map
        name: 'bbb',
        age: 18
    })
}
this.state.info.get("name")
this.setState({
    info: this.state.info.set("name", "bbbb").set("age", 19)
})
方案2
state = {
    info: {
        name: 'bbb',
        age: 18
    }
}
this.state.info.name
let old = Map(this.state.info)
let newImmu = old.set("name", "bbbb").set("age", 19)
this.setState({
    info: newImmu.toJS()
})

state = {
    info: Map({ 
        name: 'bbb',
        select: 'xx',
        filter: Map({
            text: ''
        })
    })
}
子组件SCU判断优化，优于之前stringify/parse方案;修改name, 传给子组件的filter没有受影响
if (this.props.info === nextProps.filter) {
    return false
}
5. List
对象用Map
数组用List
let arr = List([1,2,3])
let arr1 = List(arr)
arr1.push(4) // 这个是List结构的push方法，不是原数组的push方法
arr1.toJS()
state = {
    favor: List(['aaa', 'bbb', 'ccc']) // 支持map方法，用的时候和普通数组的map方法一样
}
这些方法都不会对原数组产生任何影响

6. Map 和List混合使用
react中不改变老状态，保证随时可用，随时可以diff
this.setState({
    info: this.state.info.set('name', 'ccc').set('location', Map({ // 如果字段多的话，这样改不太好
        province: '辽宁',
        city: '大连'
    }))
})
this.setState({
    info: this.state.info.set('name', 'ccc').set('location', this.state.info.get("location").set('city', '沈阳'))
})
// 删除列表中某一项爱好
this.setState{
    info: this.state.info.set('favor', this.state.info.get('favor').splice(index, 1))
}
7. fromJS和toJS
往往会遇到不知道数据结构的场景
state = {
    info: fromJS({})
}
this.state.info.get('location').get('city')
this.setState({
    info: this.state.info(['name'], 'ddd').setIn(['location', 'city'], '沈阳') // setIn能深度的修改某个属性
})
删除数组某个元素
this.setState({
    info: this.state.info.updateIn(['favor'], (list) => { // 形参接收原始的list
        list.splice(index, 1)
    })
})
this.setState({
    info: this.state.info.setIn(['favor', 0], '111')
})
其实Map, List也能使用getIn, setIn, updateIn方法
8. 总结
1层结构（对象或者数组一层）就用解构...方式的深拷贝；两层的话用map\list嵌套也行，但前提是知道结构

## immutabe-redux
TabbarReducer = (prevState=fromJS({
    show: true
}), action) => {
    switch(action.type) {
        case 'hide-tabbar': 
            return prevState.set('show', false)
    }
}
这种方式全过程都是immutable, 那使用的话就.get
this.setState({
    isShow: store.getState().TabbarReducer.get('show')
})
另一种方案：
CityReducer = (prevState={
    cityName: '北京'
}, action) => {
    let newState = fromJS(prevState)
    switch(action.type) {
        case 'change-city': 
            return newState.set('cityName', action.payload).toJS()
    }
}
