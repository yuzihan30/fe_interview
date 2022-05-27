<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-27 21:20:53
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-27 22:09:07
 * @FilePath: /fe_interview/react/react4.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 反向代理
jsonp、corse都需要后端配合，不需要配合的就反向代理这种方式
1. Films
<li>
    <NavLink to="/films/nowplaying">正在热映</NavLink>
</li>
<li>
    <NavLink to="/films/comingsoon">即将上映</NavLink>
</li>
export default class Comingsoon extends Component {
    componentDidMount() {
        axios.get('').then() // 因为跨域拿不到数据，jsonp的话也需要后端改接口，也不行，那就反向代理方案
    }
}
反向代理就是服务器与服务器之间没有跨域限制，然咱们的服务器把数据取回来；跨域是浏览器阻止的，只存在于浏览器端；隐藏客户端叫正向代理，隐藏服务端的叫反向代理

2. 安装代理服务器http-proxy-middleware，后src->setupProxy.js
app.use(
    '/api', // /api/list /api/detail 只过滤api开头的
    createProxyMiddleware({
        target: "http://localhost:5000", //代理就朝这个地址发请求
        changeOrigin: true // 改变域名这个是固定的
    })
)
axios.get('/ajax/cominglist').then() // 其他接口可能没有ajax开头或者没有跨域限制的，就不需要管了；配置了反向代理，这里请求的前面域名一定要删了，否则匹配不起/ajax；如果直接/非ajax开头则直接请求本地服务器，不存在跨域
https://i.maoyan.com/ajax/cominglist
app.use(
    '/ajax', // /api/list /api/detail 只过滤api开头的
    createProxyMiddleware({
        target: "https://i.maoyan.com", //代理就朝这个地址发请求，"https://i.maoyan.com" + "/ajax/..."
        changeOrigin: true // 改变域名这个是固定的
    })
) // 可以配置多个
app.use(
    '/ajax1', // /api/list /api/detail 只过滤api开头的
    createProxyMiddleware({
        target: "https://i1.maoyan.com", //代理就朝这个地址发请求，"https://i.maoyan.com" + "/ajax/..."
        changeOrigin: true // 改变域名这个是固定的
    })
) // 可以配置多个

每次添加或者修改setupProxy，都要重启服务器
## CSSModule
解决样式冲突问题