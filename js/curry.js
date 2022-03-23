/*
 * @Author: your name
 * @Date: 2022-03-23 18:56:28
 * @LastEditTime: 2022-03-23 20:06:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/ 柯里化函数.js
 */
function curry(fn, len=fn.length) {
    return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args) {
    return function (...params) {
        let _args = [...args, ...params]
        // if (_args >= len) {
        if (_args.length >= len) {
            // fn.call(this, ..._args)
            return fn.call(this, ..._args)
        } else {
            // _curry.call(this, fn, len, ..._args)
            return _curry.call(this, fn, len, ..._args)
        }
    }
}

function add(a, b, c, d) {
    console.log(a + b + c + d)
}

let curryAdd = curry(add)
curryAdd(1)(2)(3)(4)



