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
之前tabbar里引入的样式，在films不引入但却能直接使用；这是因为通过import引入的css最终都会插入到head里面
views->css文件夹->Films.css 如果Films.css被引入后有和tabbar引入样式有同名的，则后面的style样式会覆盖之前的；解决方法，1可以换个名字，2使用脚手架提供的方式将文件名改为Films.module.css，这就是css模块化的写法，但这种写法，导入方式就要配套了import style from './css/Films.module.css';打印导入的style会发现，是个对象，键值对，键是自己写的名字，值是替换后带有hash码的名字；那用的时候就activeClassName={style.name};id选择器和类选择器处理方式一样；但标签选择器就无法这样处理，还是会全局影响，会原模原样显示出来，不会二次加工；如果一定要用ul li, 则前面需要.film ul li, 同时在组件Films里return <div className={style.film}>, 如果还要加额外独立的class则可以这样拼接，中间加空格，{style.film + " bb"}, 比如bb可以new swipper初始化使用；module.css里写全局样式，则需要:global(.active),就会被保留下来，不会被重命名
目录整理 views->films文件夹下面放css、js文件；但后面用了组件库之后自己写css的情况就比较少了