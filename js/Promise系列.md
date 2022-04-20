<!--
 * @Author: your name
 * @Date: 2022-02-28 09:57:12
 * @LastEditTime: 2022-04-20 23:23:33
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
3. 图片异步加载
思路：通过Promise实现，img加载完成之后resolve(img)

4. 手写Promise.all
```
const PromiseAll = (iterator) => {
    // 1. 初始化及特殊处理
    // 将迭代器转为数组方便遍历
    const promiseArr = Array.from(iterator)
    const len = promiseArr.length
    let resolveNum = 0  // 记录成功返回结果值的promise数量
    let resolveRes = []  // 记录成功返回的结果
    // 2. 返回new Promise， 并遍历处理promiseArr数组
    return new Promise((resolve, reject) => {
        for (let i in promiseArr) {
            promiseArr[i].then(res => {
                resolveNum++
                resolveRes.push(res)
                if (resolveNum === len) {
                    resolve(resolveRes)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })

}
```