/*
 * @Author: your name
 * @Date: 2022-03-20 10:51:29
 * @LastEditTime: 2022-03-20 11:46:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/timer.js
 */
// 用setTimeout实现setInterval

// 1. 变量初始化
const timerMap = {}  // 可在全局内存储多个timerId, 对象的键是数字时会自动转为字符串
let id = 0  // timerId的全局的辅助变量

// 2. 定义mySetInterval
const mySetInterval = (cb, time) => {
    // 2.1 变量定义及初始化
    const timerId = id // 调用mySetInterval一次，timerId就会产生一个新值
    id++

    // 2.2 定义递归函数
    const fn = () => {
        // 执行定时器时间函数
        cb()
        // 递归调用递归函数
        timerMap[timerId] = setTimeout(fn, time)
    }
    // 2.3 执行setTimeout
    // 递归调用时，timerMap[timerId]每隔time时间不断更新，只保留最近一次调用setTimeout返回的值
    timerMap[timerId] = setTimeout(fn, time)  
    // 2.4 返回结果
    return timerMap[timerId]

}

// 测试
mySetInterval(() => {
    console.log(1)
}, 1000)
console.log(timerMap)
// console.log(timerMap)输出结果
// {
//     '0': Timeout {
//       _idleTimeout: 1000,
//       _idlePrev: [TimersList],
//       _idleNext: [TimersList],
//       _idleStart: 39,
//       _onTimeout: [Function: fn],
//       _timerArgs: undefined,
//       _repeat: null,
//       _destroyed: false,
//       [Symbol(refed)]: true,
//       [Symbol(kHasPrimitive)]: false,
//       [Symbol(asyncId)]: 2,
//       [Symbol(triggerId)]: 1
//     }
//   }
mySetInterval(() => {
    console.log(2)
}, 2000)
console.log(timerMap)

// 3、实现myClearInterval
const myClearInterval = (timerId) => {
    // 3.1 清理定时器
    clearTimeout(timerMap[timerId])
    // 3.2 删除timerMap中对应的定时器记录
    delete timerMap[timerId]
}