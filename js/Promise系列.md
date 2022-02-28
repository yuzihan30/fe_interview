<!--
 * @Author: your name
 * @Date: 2022-02-28 09:57:12
 * @LastEditTime: 2022-02-28 12:49:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/Promise系列.md
-->
1. 通过Promise实现每隔1秒输出1、2、3
```
使用组合函数, 上一个函数的返回值作为下一个函数的入参
思路：关键点then里面传函数，传函数才不会透传，透传会导致直接拿到决议值，
拿到决议值后直接会执行下一个then，而不会pending
[1, 2, 3].reduce((p, x) => {
    return p.then(() => {  
        return new Promise(r => {
            setTimeout(() => r(console.log(x)), 1000)
        })
    })
}, Promise.resolve())

简洁写法：
[1, 2, 3].reduce((p, x) => p.then(() => new Promise(r => setTimeout(() => r(console.log(x)), 1000))), Promise.resolve())
```

2. 通过Promise实现红绿灯交替重复亮
红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次
```
function red() {
    console.log('red')
}
function yellow() {
    console.log('yellow')
}
function green() {
    console.log('green')
}

const light = (timer, cb) => {
    return new Promise(resolve => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer)
    })
}

const step = () => {
    return Promise.resolve()
            .then(() => {
                return light(3000, red)
            }).then(() => {
                return light(2000, yellow)
            }).then(() => {
                return light(1000, green)
            }).then(() => {
                return step()
            })    
}

step()
```
