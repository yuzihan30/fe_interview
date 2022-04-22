<!--
 * @Author: your name
 * @Date: 2022-04-09 16:55:19
 * @LastEditTime: 2022-04-22 14:01:45
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

