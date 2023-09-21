/** @format */

import React from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const controlRef = React.createRef<HTMLDivElement>()

  const init = () => {
    const threeBaseCurrent: any = threeBaseRef.current
    const scene = new THREE.Scene() // 1、创建场景
    scene.background = new THREE.Color('#333333')
    const camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      100, // 远端渲染距离
    )
    camera.position.set(1, 3, 5)

    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    renderer.shadowMap.enabled = true // 开启阴影
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中

    // Material
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0
    material.roughness = 0.4

    // Objects
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
    sphere.position.set(-1.5, 0, 0)

    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
    torus.position.set(1.5, 0, 0)

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
    plane.rotation.set(-Math.PI / 2, 0, 0)
    plane.position.set(0, -0.65, 0)

    scene.add(sphere, cube, torus, plane)

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
    scene.add(ambientLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    var control = new OrbitControls(camera, renderer.domElement)

    const gui = new dat.GUI({
      autoPlace: true, //是否自动放置
      width: 300, //窗口宽度
    })
    gui.domElement.id = 'gui' // 设置dat.gui的id，用于自定义样式
    controlRef.current?.appendChild(gui.domElement) // 将dat.gui的dom元素（canvas元素）添加到指定元素中

    const materialFolder = gui.addFolder('Material')
    materialFolder.add(material, 'metalness').min(0).max(1).step(0.0001)
    materialFolder.add(material, 'roughness').min(0).max(1).step(0.0001)
    materialFolder.add(material, 'wireframe')
    materialFolder.open()

    const animate = () => {
      requestAnimationFrame(animate)

      control.update() // 更新控制器
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

  React.useEffect(() => {
    init()
  }, [])

  return (
    <div
      ref={threeBaseRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
      <div
        ref={controlRef}
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          zIndex: 1,
        }}></div>
    </div>
  )
}
export default PageView
