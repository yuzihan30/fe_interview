<!--
 * @Author: your name
 * @Date: 2022-04-21 20:01:34
 * @LastEditTime: 2022-05-24 21:50:59
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

## 鼠标控制三维场景
需要引入相机控制器
// OrbitControls需要比较新的版本的threejs的支持
<script src="../libs/js/controls/OrbitControls.js"></script>
```javascript
// 新版本材质需要用standard
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC }) 

// 阴影如果出现马赛克，那是因为精度未设置
// 加聚光灯的扩散范围
spotLight.angle = Math.PI / 10
// 设置衰减光锥的百分比
spotlight.penumbra = 0.05
spotLight.shadow.map.width = 1024
spotLight.shadow.map.innerHeight = 1024
// 再设置一下产生阴影的衰减情况

// ...
renderer.render(scene, camera)
// 创建controls对象; 因为是相机控制器需要传入相机;还要传入渲染控件
var controls = new THREE.OrbitControls(camera, renderer.domElement)
// 监听控制器的鼠标事件，执行渲染内容,放大缩小也能做到
controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})
```
## 地月环绕案例
这次使用模块化的方式导入
canvas {
    background-image: url(imgs/star.jpg);
    background-size: cover
}
.label {
    color: #fff;
    font-size: 16px;
}
```javascript
<script type="module">
import * as THREE from '../libs/build/three.module.js'
import { OrbitControls } from '../libs/jsm/OrbitControls.js'
// 文字这些是2D渲染,导入css 2D渲染器和css 2D对象, 从js模块化的渲染器导入
import { CSS2DRenderer, CSS2DObject } from '../libs/jsm/renderers/CSS2DRenderer.js'

// 声明全局变量，比如标签渲染器
let camera, scene, renderer, labelRenderer;
let moon, earth;
// 声明了时间，方便后面更好的渲染
let clock = new THREE.Clock()
// 实例化纹理加载器
const textureLoader = new THREE.TextureLoader()

// 设置初始化函数
function init() {
    // 地球和月球半径大小
    const EARTH_RADIUS = 2.5
    const MOON_RADIUS = 0.27
    // 初始化相机
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 2000)
    camera.position.set(10, 5, 20)

    // 实例化场景
    var scene = new THREE.Scene();
    // 设置聚光灯光源
    var dirLight = new THREE.SpotLight(0xffffff) //白色
    dirLight.position.set(0, 0, 10)
    dirLight.intensity = 2 // 设置强度
    dirLight.castShadow = true // 灯光要投射出阴影
    scene.add(dirLight) // 添加到场景中
    // 添加环境光
    const aLight = new THREE.AmbientLight(0xffffff)
    aLight.intensity = 0.3 // 光的亮度调节
    scene.add(aLight)

    // 创建月球，16 * 16的网格比较精细
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
    // Phong可以实现高光
    const moonMaterial = new THREE.MeshPhongMaterial({ 
        map: textureLoader('textures/planets/moon_1024.jpg')
     })
    moon = new THREE.mesh(moonGeometry, moonMaterial)
    // 给月球设置接收投影、设置阴影
    moon.castShadow = true
    moon.receiveShadow = true
    scene.add(moon)

    // 创建地球
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
    // Phong可以实现高光
    const earthMaterial = new THREE.MeshPhongMaterial({ 
        // 觉得地球表面太亮，就可以把镜面反射调低一些
        shininess: 5,
        map: textureLoader.load('textures/planets/earth_atmos_2048.jpg'),
        // 表面太光滑，让表面更有纹理，通过像素值设置法线
        specularMap: textureLoader.load('textures/planets/earth_specular_2048.jpg'),
        // 对环境高光反射的设置
        normalMap: textureLoader.load('textures/planets/earth_normal_2048.jpg')
        // 上述处理之后大陆山脉具有凹凸感
    })
    earth = new THREE.mesh(earthGeometry, earthMaterial)
    // 给地球设置接收投影、设置阴影
    earth.castShadow = true
    earth.receiveShadow = true
    scene.add(earth)

    // 创建标签
    const earthDiv = document.createElement('div')
    earthDiv.className = 'label'
    earthDiv.textContent = 'Earth'
    const earthLabel = new CSS2DObject(earthDiv)
    earthLabel.position.set(0, EARTH_RADIUS + 0.5, 0)
    earth.add(earthLabel)

    // 创建标签
    const moonDiv = document.createElement('div')
    moonDiv.className = 'label'
    moonDiv.textContent = 'Moon'
    const moonLabel = new CSS2DObject(moonDiv)
    moonLabel.position.set(0, MOON_RADIUS + 0.5, 0)
    moon.add(moonLabel)

    // 创建渲染器
    let renderer = new THREE.WebGLRender({
        alpha: true // 设置透明，就能看到背景图了
    })
    // 设置它的像素比，设置成屏幕的像素比就可以
    renderer.setPixelRatio(window.deviceRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 渲染阴影
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    // 创建标签渲染器
    labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth, width.innerHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    document.body.appendChild(labelRenderer.domElement)

    // 绑定控制器和摄像头
    const controls = new OrbitControls(camera, renderer.domElement)
}
let oldTime = 0
// 定义渲染函数
function animate() {
    const elapsed = clock.getElapseTime() // 获取时间
    moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)

    // 地球自转，设置一个三维向量, 绕y轴
    let axis = new THREE.Vector3(0, 1, 0)
    // 绕某个轴，每毫秒旋转多少度
    earth.rotateOnAxis(axis, (elapsed - oldTime) * Math.PI / 10)
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    oldTime = elapsed
    requestAnimationFrame(animate)
}
init()
animate()

// 调整尺寸
window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机，也就是更新摄像头矩阵
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>
```

## 导弹飞行3D效果和AI插件
着色器用的是OpenGL语言，类似于C语言