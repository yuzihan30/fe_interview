/*
 * @Author: your name
 * @Date: 2022-02-28 18:15:07
 * @LastEditTime: 2022-02-28 18:28:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/js/eval.js
 */
const str = "console.log('test')"

// eval(str)
test = new Function(str)
test()