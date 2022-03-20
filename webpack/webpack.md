<!--
 * @Author: your name
 * @Date: 2022-03-19 21:36:25
 * @LastEditTime: 2022-03-19 21:41:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/webpack/webpack.md
-->
webpack和vite比较
1. webpack在应用比较大时，存在dev server冷启动时间长，HMR热更新慢的问题。原因是webpack dev server在启动时需要先build然后启动webserver，而vite在执行vite serve时直接启动web server,并不会编译所有文件
2. vite特点：轻量、按需打包、HMR(热渲染依赖)