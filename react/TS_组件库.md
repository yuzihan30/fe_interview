## TS 组件库

npm i antd-mobile@next
// 声明文件也是集成到了组件库；旧版本需要引入样式，新版本不用
看一下电影轮播

```TypeScript
import {Button, Swiper} from 'antd-mobile'
import {Swiper}

// Films.tsx
ref = React.createRef<SwiperRef>()
<Button color="danger" onClick={()=>{
    this.ref.current?.swipePrev() // 原生js语法，前面为假，后面不会执行；前面为真，后面才会执行
}}>上一个</Button>
<Button color="primary" onClick={()=>{
    （this.ref.current as SwiperRef）.swipeNext()
}}>下一个</Button>
<Swiper autoplay loop ref={this.ref}>
{
    this.state.looplist.map((item: any) => {

        <Swiper.Item key={item.bannerId}>
            <img src={item.imgUrl} style={
                {width: 100%}
            }>
        </Swiper.Item>
    })
}
</Swiper>
```

## Styled-component

创建组件，默认带 css 的
`npm i styled-components`
App.js

```javascript
import styled from "styled-component";
export default class App extends Component
// styled.footer调用完之后直接会生成一个组件，里面没有语法提示，支持sass\less
const StyledFooter = styled.footer`
    background: yellow
    ul {}
`
<StyledFooter>
    <ul>
        <li>首页</li>
        <li>列表</li>
        <li>我的</li>
    </ul>
</StyledFooter>
```

## Styled-component 透传 props

```javascript
render() {
    const StyledInput = styled.input`
        outline: none;
        border-radius: 10px;
        border-bottom: 1px solid red;
    `
    const StyledDiv = styled.div`
        background: ${props => props.bg || 'yellow'} // 用箭头函数应该是为了实例化变量不冲突
    `
    return (
        <StyledInput type="text" />
        <StyledInput type="password" /> // 一样会支持的
        // 原生的属性的都会透传，那自定义的属性呢
        <StyledDiv bg="red"></ StyledDiv>
    )
}

```

## 样式化组件

```javascript
import styled from "styled-component";
const StyledChild = styled;
const StyledChild = styled(Child)`
  background: yellow;
  color: red;
`; // 包装之后的样式孩子要接收
<StyledChild />;
function Child() {
  return <div className={props.className}>Child</div>;
}
```

## 样式扩展

```TypeScript
const StyledButton = styled.button`
    width: 100px;
    height: 100px;
    background: yellow
`
const StyledButton2 = styled(StyledButton)`
    background: red // 类似于继承
`
const StyledButton3 = styled(StyledButton)`
    background: blue
`

<StyledButton></StyledButton>
<StyledButton2></StyledButton2>
<StyledButton3></StyledButton3>
```

## 动画的添加

```TypeScript
import styled, { keyframes } from "styled-component";
render() {
    const myanimation = keyframes`
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    `
    const StyledDiv = style.div`
        width: 100px;
        height: 100px;
        background: yellow
        animation: ${myanimation} 1s infinite
    `
}
<StyledDiv />
```
