/** @format */

import React, {useEffect} from 'react'
import {render} from 'react-dom'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  var mikuGltf: any = null

  const init = () => {
    const threeBaseCurrent: any = threeBaseRef.current
    const scene = new THREE.Scene() // 1、创建场景
    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      1000, // 远端渲染距离
    )
    camera.position.set(0, 10, 15)
    camera.lookAt(0, 0, 10)

    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    renderer.shadowMap.enabled = true // 开启阴影
    // renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // document.body.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到body中
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中

    //创建一个平面
    var planeGeo = new THREE.PlaneGeometry(200, 200, 10, 10) //创建平面
    var planeMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xd7dedf,
      wireframe: false,
    })
    var planeMesh = new THREE.Mesh(planeGeo, planeMat) //创建网格模型
    planeMesh.position.set(0, 0, -50) //设置平面的坐标
    planeMesh.rotation.x = -0.5 * Math.PI //将平面绕X轴逆时针旋转90度
    planeMesh.receiveShadow = true //允许接收阴影
    scene.add(planeMesh) //将平面添加到场景中

    const geometry = new THREE.BoxGeometry(3, 3, 3) // 4、创建几何体模型（立方几何体）
    const material = new THREE.MeshBasicMaterial({
      color: 0x003300,
      wireframe: false,
    })
    const cubeMesh = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    cubeMesh.position.set(15, 3, 0) //设置立方体的坐标
    cubeMesh.castShadow = true //允许投射阴影
    cubeMesh.receiveShadow = true //允许接收阴影
    scene.add(cubeMesh) //将立方体添加到场景中

    const loader = new GLTFLoader()
    loader.load('/threejs/models/miku.gltf', gltf => {
      // 设置缩放大小
      console.log('gltf:', gltf)
      mikuGltf = gltf.scene
      gltf.scene.scale.set(0.5, 0.5, 0.5)
      gltf.scene.position.set(0, 0, 5)
      gltf.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      scene.add(gltf.scene)
    })

    var ambient = new THREE.AmbientLight(0x777777)
    scene.add(ambient) //环境光对象添加到scene场景中

    // 7、创建光源
    var spotLight = new THREE.SpotLight(0xf5db8e)
    // 7.1 设置光源位置
    spotLight.position.set(-25, 25, 25)
    spotLight.angle = Math.PI / 6 // 光源的角度
    // 7.2 设置光源照射的强度，默认值为 1
    spotLight.intensity = 1
    // 7.3 将光源添加到场景中
    spotLight.castShadow = true //开启阴影投射
    scene.add(spotLight)

    const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotLightHelper)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)
    var control = new OrbitControls(camera, renderer.domElement)
    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)

      cubeMesh.rotation.x += 0.01
      cubeMesh.rotation.y += 0.01
      cubeMesh.rotation.z += 0.01

      if (mikuGltf) {
        mikuGltf.rotation.y += 0.01
      }

      // 更新相机插件
      control.update()
      // renderer.setClearColor('rgb(135,206,250)', 1.0) //设置背景颜色
      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', () => {
      // 10、监听窗口变化
      camera.aspect = threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div>编辑器网站：http://tengge1.gitee.io/shadoweditor-examples/</div>
      <div>编辑器网站gitee：https://gitee.com/tengge1/ShadowEditor</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
