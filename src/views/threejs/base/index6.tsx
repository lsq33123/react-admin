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

    var loader = new THREE.ObjectLoader()
    loader.load(require('../data/scene.json'), function (obj) {
      scene.add(obj)
    })
    // loader.load('https://threejs.org/examples/models/obj/cerberus/Cerberus.obj', function (obj) {
    //   scene.add(obj)
    // })

    // 7、创建光源
    var spotLight = new THREE.SpotLight(0xffff0f)
    // 7.1 设置光源位置
    spotLight.position.set(-5, 5, 5)
    // 7.2 设置光源照射的强度，默认值为 1
    spotLight.intensity = 2
    // 7.3 将光源添加到场景中
    scene.add(spotLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)
    var control = new OrbitControls(camera, renderer.domElement)
    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
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
