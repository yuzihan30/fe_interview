<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-16 18:34:53
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-16 19:48:17
 * @FilePath: /fe_interview/前端监控/sentry.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
异常采集->数据存储->统计分析->报告告警
########## 异常 #########
1. try catch缺点：只能捕获同步运行时的错误，不能捕获语法级别的错误和异步错误
try {
    let name = "aaa"
    console.log(nam) 
} catch(e) {
    console.log('捕获到异常', e) // 捕获到异常, ReferenceError
}
try {
    let name = "aaa // 不能捕获语法级别的错误, js解析器不会执行下面代码块的，catch不到，window.onerror也捕获不到；开发阶段编辑器一般会帮我们解决语法错误
    console.log(nam) 
} catch(e) {
    console.log('捕获到异常', e) 
}
Uncaught SyntaxError:
try {
    setTimeout(() => { // 对于异步回调来说它是不属于try catch块的
        throw new Error('async error')
    } ,1000) 
} catch(e) {
    console.log('捕获到异常', e) 
}
Uncaught Error: 

2. window.onerror 能力强一些，属于一种全局捕获的一种方式，同步异步都能捕获到，获取到的信息比较详细（异常信息，异常文件url, 行号，列号，异常堆栈信息；但对于跨域的js资源，window.onerror是拿不到详细信息的，需要往这个资源的头部添加一些额外的信息；需要放到js文件的最前面，放后面的话前面的异常就捕获不到；另外捕获不到网络异常的错误，比如网络静态资源加载的错误

3. window.addEventListener('error') 信息没有window.onerror丰富，常用于捕获网络资源出错的情况，比如监控图片加载异常，js/css加载异常；window.addEventListener和window.onerror同时用的时候注意异常捕获的去重，因为他们都能捕获js异常的错误

4. window.addEventListener('unhandledrejection') 捕获异步错误的一种方式，常用于捕获promise没有去catch的错误；为了捕获漏掉的promise异常，一般要加一个全局异步错误的捕获方式

5. iframe异常， window.frame[0].onerror

6. 崩溃和卡顿
卡顿就是js不能及时的去执行这些代码，崩溃是网页已经崩了js不运行了
用load或者beforeload事件，或者service worker来执行网页崩溃的监控

7. 第三方库本身的那种异常捕获能力
Vue.config.errorHandler 
React ErrorBoundary


########## 数据存储->统计分析->报告告警 #########
1. 数据存储,其实主要是后端要做的一些事情，接收前端的异常日志经过一些处理，异常数据的处理，存储方案的存储；面对的问题是，数据量大，数据结构不规律，写入并发高，查询需求大

2. 统计分析，根据上报的分析得到更深层有价值的结论，包括自动分析和人工分析，自动分析就是根据一些预测条件和算法进行筛选发现一些问题并告警；人工分析就是提供可视化面板让用户看到更具体的一个信息

3. 报告告警，按照一定的级别自动告警，通过一定的渠道和触发规则；要考虑什么时候什么方式报警，邮件、短信、微信、电话，也要具备日志报表的能力，通过邮件发日报、周报月报等

########## sentry哨兵 #########