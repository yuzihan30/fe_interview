<!--
 * @Author: yuzihan yuzihanyuzihan@163.com
 * @Date: 2022-05-07 15:50:51
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @LastEditTime: 2022-05-07 16:29:05
 * @FilePath: /fe_interview/WASM/WASM.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
1. WebAssembly(web汇编) WASM支持将C/C++/Go/Rust等语言实现的代码编译为浏览器可执行的机器码，从而支持浏览器以接近原生应用的性能运行相关应用
WebAssembly是一个具有WASM扩展名的文件，可以把它看作一个可以导入JavaScript程序的模块。WASM不能直接与DOM交互，因此我们需要同时使用JavaScript和WASM。
可以执行视频处理、3D渲染、多媒体游戏、加密计算和AR/VR实时应用程序等任务

2. Web Assembly Explore将C++文件转换为浏览器能够理解的预编译WASM模块
步骤1：复制粘贴C++代码，然后点击编译（compile）。
步骤2：点击汇编（assemble）。
步骤3：下载wasm文件。
加载wasm文件
// script.js
let math;
// Let's create a function called loadWebAssembly that converts given file into binary array buffer.
function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer)) // Buffer converted to Web Assembly 
    .then(module => {return new WebAssembly.Instance(module) }); // Instance of Web assmebly module is returened 
};   

//We call the function for math.wasm for the given Instance. 
loadWebAssembly('math.wasm')
  .then(instance => {
      fibc = instance.exports._Z3fibi// 在Web Assembly Explorer的WAT列找函数名字
  }); 
不能直接运行index.html，因为这样就不会加载WASM模块，可以用Visual Studio Code的Live Server扩展[4]或者Xampp拉起本地主机上的项目目录。