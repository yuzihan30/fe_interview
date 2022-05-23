<!--
 * @Author: your name
 * @Date: 2022-04-21 20:01:34
 * @LastEditTime: 2022-05-23 18:21:55
 * @LastEditors: yuzihan yuzihanyuzihan@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fe_interview/前端可视化/threejs.md
-->
# three.js技术及项目实战
@[TOC]目录
## 示例技术栈
threejs是webGL的封装，主要用于3D绘制

1. setInterval("render()", 20) 第一个参数为要执行的代码串或者要调用的函数，这里可以理解为要执行的代码串。渲染频率不能太高也不能太低

2. vite+react+three.js+Lingo3D
skechfab（3D模型下载）+mixamo（3D任务动作绑定及动画）+readyplayer（3D角色生产）+gltf.report模型压缩+polyhaven hdr素材库（环境贴图）+textures(材质贴图素材)
blender模型处理软件

## 第一个three.js应用
立方体、球体、灯光的添加，动画实现(立方体，每次状态的变化就会重新渲染)
```javascript
function init() {
    // 创建场景
    var scene = new THREE.Scene();
    // 设置摄像机， 入参角度一般45度，长宽比一般要填满屏幕, 能够看到画面的最近最远距离
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 2000)
    // 创建渲染器
    var renderer = new THREE.WebGLRender()
    // 设置渲染器的初始颜色，一开始要做清除颜色等操作, 一般设置16进制颜色
    renderer.setClearColor(new THREE.color(0xEEEEEE))
    // 设置输出canvas画面的大小，一般是全屏的
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置渲染物体阴影
    renderer.shadowMapEnabled = true
    // 显示三维坐标系，入参是坐标轴的粗细
    var axes = new THREE.AxisHelper(20)
    // 最新版本已修改为THREE.AxesHelper(20)

    // 添加坐标系到场景中
    scene.add(axes)
    // 紧接着创建一个平面，平面上放置一个球体
    // 创建地面几何体
    var planeGeometry = new THREE.PlaneGeometry(60, 20) // 地面，设置地面的宽高
    // 材质，给地面物体上色
    var planeMaterial = new THREE.MeshBaseMaterial({ color: 0xCCCCCC }) // 设置对应材质，传入一个对象
    // 创建地面，几何物体和材质结合在一起生成真正的地面
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 物体移动位置
    plane.rotation.x = 0.5 * Math.PI // 角度
    plane.position.x = 15 // 位置
    plane.position.y = 0
    plane.position.z = 0
    plane.castShadow = true // 地面设置阴影
    // 地板接收阴影
    plane.receiveShadow = true

    // 地面添加到场景当中
    scene.add(plane)

    // 添加立方体
    var cubeGeometry = new THREE.BoxGeometry(4,  4, 4)
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.x = 0
    cube.position.y = 2
    cube.position.z = 2
    // 对象是否设置到阴影贴图当中
    cube.castShadow = true

    scene.add(cube)

    // 球体
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 10
    sphere.position.y = 4
    sphere.position.z = 2
    // 对象是否设置到阴影贴图当中
    sphere.castShadow = true
    scene.add(sphere)

    // 创建聚光灯，白色
    var spotLight = new THREE.SpotLight(0xffffff)
    // 设置灯的位置
    spotLight.position.set(130, 130, -130)
    // 设置阴影
    spotLight.castShadow = true
    scene.add(spotLight)

    // 定位相机，并让摄像机指向场景的中心
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    // 将渲染器输出添加html元素中
    document.getElementById('webglOutput').appendChild(renderer.domElement)
    renderer.render(scene, camera)

    // 定义一个渲染函数
    // function render() {
    //     renderer.render(scene, camera)
    //     // 每次渲染需要修改,每次绕y轴旋转0.01弧度
    //     cube.rotate(0.01)
    //     // 电脑一次渲染60帧，大概一帧16ms
    // }
    // setInterval(render, 16)
    // 定时器可能出现卡帧的情况，对性能要求不高的时候可以这样实现，优化一下
    let T0 = new Date()
    function render() {
        let T1 = new Date()
        let t = T1 - T0
        T0 = T1
        renderer.render(scene, camera)
        // 每次渲染需要修改,每次绕y轴旋转0.01弧度
        // 每1毫秒渲染0.001弧度
        cube.rotate(0.001 * t)
        // 电脑一次渲染60帧，大概一帧16ms
        window.requestAnimationFrame(render)
    }
    // 它能很好的利用浏览器的性能进行渲染, 它不是一个立即调用的函数，它是向浏览器发起一个请求;下次有足够时间了请求浏览器渲染；渲染完了再去请求下次有空闲时间了继续执行
    window.requestAnimationFrame(render)
}
window.onLoad = init


```