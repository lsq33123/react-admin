/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import * as Stats from 'stats.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const statsRef = React.createRef<HTMLDivElement>()

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
    const materialNormal = new THREE.MeshBasicMaterial() // 5.2 创建基础网格材质
    const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    scene.add(cube) // 7、将网格模型添加到场景中
    camera.lookAt(cube.position) // 设置相机位置
    const spotLight = new THREE.SpotLight(0xffffff) // 8、添加聚光灯光源
    spotLight.position.set(100, 1000, 1000)
    spotLight.castShadow = true
    scene.add(spotLight)

    // 随机创建大量的模型,测试渲染性能
    const num = 1000 //控制长方体模型数量
    const group = new THREE.Group()
    for (let i = 0; i < num; i++) {
      const geometry = new THREE.BoxGeometry(5, 5, 5)
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
      })
      const mesh = new THREE.Mesh(geometry, material)
      // 随机生成长方体xyz坐标
      const x = (Math.random() - 0.5) * 200
      const y = (Math.random() - 0.5) * 200
      const z = (Math.random() - 0.5) * 200
      mesh.position.set(x, y, z)
      group.add(mesh)
      scene.add(group) // 模型对象插入场景中
    }

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    const stats = new Stats() // 9、添加性能监控
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats.dom)

    const stats2 = new Stats() // 9、添加性能监控
    stats2.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats2.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats2.dom)

    const stats3 = new Stats() // 9、添加性能监控
    stats3.showPanel(2) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats3.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats3.dom)

    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      group.rotation.x += 0.01
      group.rotation.y += 0.01
      stats.update()
      stats2.update()
      stats3.update()
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
      <div ref={statsRef} style={{width: '100%', height: '50px', display: 'flex'}}></div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
