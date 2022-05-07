<!--
 * @Author: your name
 * @Date: 2022-05-01 16:19:46
 * @LastEditTime: 2022-05-06 09:01:45
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/react/react源码.md
-->
1. var queue = a || (a = []) // (a = [])表达式先执行赋值再取a的值

2. 依赖注入是控制反转的一种实现方式
不需要自己来创建依赖的对象了，由外部传入，这就是依赖注入, 方便解耦

3. Concurrent并发，fiber解决CPU密集型任务，suspense解决IO密集型任务
Suspense - 新的异步数据处理方式， useTransition - 提供了一种预渲染的机制
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
我们需要 Suspense 来包裹这些包含异步操作的组件，并给它们提供回退(fallback)。在异步请求期间，会显示这个回退。上面的代码获取异步资源就跟同步调用似的。没错，有了 Suspense,  我们可以和async/await或者Generator 一样，用’同步‘的代码风格来处理异步请求
