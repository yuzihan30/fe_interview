<!--
 * @Author: your name
 * @Date: 2022-04-09 16:55:19
 * @LastEditTime: 2022-04-29 09:01:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/vue/vue源码.md
-->
1. Reflect.ownKeys() 返回自身可枚举、不可枚举、符号属性，等价于Object.getOwnPropertyNames().concat(Object.getOwnPropertySymbols(target))
Object.keys()返回自身可枚举属性（不含符号属性）

2. Object.create(null)创建一个以null为原型的对象，也就是能建立一个空对象

3. function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
       // 如果存在是数组的子元素，children中的元素作为参数传给apply方法，找到第一个是数组的子元素就返回了
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
simpleNormalizeChildren([1,2,3, [4, 5, [6, 7]], [8,9]])
// (8) [1, 2, 3, 4, 5, Array(2), 8, 9]

4. ast和vnode区别
template > ast > render function > 执行 render function > VNode
AST是compiler中把模板编译成有规律的数据结构，方便转换成render函数所存在的；而VNode是优化DOM操作的，减少频繁DOM操作的，提升DOM性能的。
Vnode的数据结构要比ast复杂的多

5. _xx私有数据可读可写，$xx私有数据只读

6. 数组去重
const arr = [1,1,2,2,3,3]
let newArr = []
arr.forEach(v => newArr.indexOf(v) === -1 && newArr.push(v))
或者，效率更高的方式
let _set = {}
let newArr = []
arr.forEach(v => _set[v] = true) // arr.forEach(v => _set[v] || (_set[v] = true) ) _set[v] = true的外面加括号，因赋值运算优先级低一些
Object.keys(arr)

或者arr.forEach(v => _set[v] || (_set[v] = true, newArr.push(v))

7. with(this) {
    return _c(
        'div',
        { attrs: {"id": "app"} },
        [ _v(_s(name)) ]
    )
}
with支持改变词法作用域中属性指向，name直接使用就不用this.name了
示例：
let obj = {name: 'xx', age: 18}
with(obj) {
    console.log(name)
}




