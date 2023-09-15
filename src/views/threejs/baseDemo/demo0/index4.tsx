/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

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
    camera.position.set(0, 0, 5)
    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // document.body.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到body中
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中
    const geometry = new THREE.BoxGeometry() // 4、创建几何体模型（立方几何体）
    const material = new THREE.MeshBasicMaterial({
      // 5.1 创建基础网格材质
      color: 0x00ff00, // 绿色
      wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
    })
    const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    scene.add(cube) // 7、将网格模型添加到场景中

    // 加入一个球体
    var sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff, // 球体颜色
      wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
    })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(4, 0, 0)
    sphere.castShadow = true // 球体投射阴影
    scene.add(sphere)

    camera.lookAt(cube.position) // 设置相机位置
    const spotLight = new THREE.SpotLight(0xffffff) // 8、添加聚光灯光源
    spotLight.position.set(100, 1000, 1000)
    spotLight.castShadow = true
    scene.add(spotLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    var control = new OrbitControls(camera, renderer.domElement)

    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      sphere.rotation.x += 0.02
      sphere.rotation.y += 0.02

      // 更新相机插件
      control.update()

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

  return <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
}
export default PageViewIndex
