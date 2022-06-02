<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-06-01 19:59:26
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-06-01 20:56:17
 * @FilePath: /fe_interview/react/antDesign.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## ant design mobile
1. tabbar 切换页面，如果页面内还有tab, 导致会出现二级路由，这时 activeKey要做截取，才能正确高亮；'/' + this.props.location.pathname.split('/')[1]
2. 无限滚动
组件里属性中表达式里面可以是组件，可以是jsx
visibility: "hidden" 占位但不显示
将值缓存下来两种方案，一种就是useState, 一种是const count = useRef(0), count是一个对象，里面的current属性才是存的这个值
const loadMore = () => {
    count.current++
    sethasMore(false) // 解决onscroll到底之后触发多次的问题
    axios({url: ...${count.current}}).then(res=>{
        setList([...list, ...res.data.data.films])
        // sethasMore(true)
        sethasMore(res.data.data.films.length > 0)
    })
}
loadMore刷新页面会刷新一次，一开始没数据就到底了