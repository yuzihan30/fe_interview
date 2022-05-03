<!--
 * @Author: your name
 * @Date: 2022-05-02 14:58:38
 * @LastEditTime: 2022-05-03 15:08:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/web3/web3js.md
-->
1. v1.0.0
web3.eth.sendTransaction()
.once('receipt', function(receipt) {}) // receipt收据的意思

2. ABI应用二进制接口，主要包括函数和事件
合约里的public变量在ABI里体现是get函数
web3.eth.net.getId().then(console.log) // 这种console.log写法更简洁，这个回调函数就是接受参数并执行
常用接口：
基本信息查询，网络状态查询，provider，工具方法，账户相关web3.eth， 区块相关，交易相关,交易执行相关，消息调用， 日志过滤（事件监听），合约相关

3. http-rpc调用容易被抓包不安全，因为它没有https, 官方不推荐通过http-rpc的方式调用；默认是ipc方式，还可以ws方式（websocket方式）

4. eth地址长度40个16进制字符，即160个二进制字符

5. v0.2和v1.0的差异，版本差异+同步异步差异
v1.0 geth环境下，eth.getAccounts(function(err, res) {}) // 里面不支持箭头函数，需要用普通函数

6. 交易相关，余额查询，getBalance

7. 消息调用：call方法一般用在不需要提交交易的消息调用上（传的对象属性都是可选的），sendTransaction可以用在提交交易的消息调用上（传的对象属性只有from不是可选的）

8. 日志过滤（事件监听）：filter
先定一个一个filter, 再监听filter.watch;或者组合在一起，filter(options, cb)
filter.stopWatching()停止监听，不行就web3.reset()会清掉所有的filter
latest会监听会输出最近的区块hash和交易hash, pending最近的交易hash, geth客户端不用打web3
挖矿停了之后，再发交易不能进快，getTransaction得到的blockNumber是null, 说明pending是监听交易发布而不是监听是否进块的状态

9. 合约相关-创建合约
var MyContract = web3.eth.contract(abiArray)
MyContract.at(address)
如果合约未部署则用合约实例去new, MyContract.new()

10. 合约调用
直接调用，自动按函数类型决定用sendTransaction还是call
显式以消息调用形式call该函数， 不发送交易时这样
显式以发送交易的方式调用，状态更改或者转币

11. 监听合约事件，类似filter
定义事件然后启用监听或者直接组合到一起