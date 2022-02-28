<!--
 * @Author: your name
 * @Date: 2022-02-28 09:57:12
 * @LastEditTime: 2022-02-28 10:49:49
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/Promise系列.md
-->
1. 通过Promise实现每隔1秒输出1、2、3
```
使用组合函数, 上一个函数的返回值作为下一个函数的入参
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
