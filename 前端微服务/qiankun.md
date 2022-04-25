<!--
 * @Author: your name
 * @Date: 2022-04-15 10:00:44
 * @LastEditTime: 2022-04-25 10:59:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/前端微服务/qiankun.md
-->
1. 子应用应该能渲染到指定的容器，而不是顶在顶层容器上，需要子应用和基座应用使用不同的id, 基座index.html内的id="main-app"
2. 动态注册微服务，一般在main.js执行，registerMicroApps，但由于没登录，可能无法注册设定的服务，需要在app.vue等地方重新调用registerMicroApps动态注册微服务
3. 子应用返回主应用，不能成功返回主应用，可能启动了根目录的原因导致
// window.location.href = "/"
window.history.pushState(null, '', '/login')
4. 子应用不需要关注qiankun，无需引用其包，只需要按照标准实现导出接口即可