<!--
 * @Author: your name
 * @Date: 2022-05-02 14:58:38
 * @LastEditTime: 2022-05-02 20:38:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/web3/web3js.md
-->
1. v1.0.0
web3.eth.sendTransaction()
.once('receipt', funciont(receipt) {}) // receipt收据的意思

2. ABI应用二进制接口，主要包括函数和事件
合约里的public变量在ABI里体现是get函数
web3.eth.net.getId().then(console.log) // 这种console.log写法更简洁，这个回调函数就是接受参数并执行
常用接口：
基本信息查询，网络状态查询，provider，工具方法，账户相关web3.eth

3. http-rpc调用容易被抓包不安全，因为它没有https, 官方不推荐通过http-rpc的方式调用；默认是ipc方式，还可以ws方式（websocket方式）

4. eth地址长度40个16进制字符，即160个二进制字符

5. v0.2和v1.0的差异，版本差异+同步异步差异
v1.0 geth环境下，eth.getAccounts(function(err, res) {}) // 里面不支持箭头函数，需要用普通函数
