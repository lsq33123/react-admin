/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const hieght = document.documentElement.clientHeight - 64

  const init = () => {
    const threeBaseCurrent: any = threeBaseRef.current
    const scene = new THREE.Scene({
      antialias: true, // 抗锯齿
    }) // 1、创建场景
    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      1000, // 远端渲染距离
    )
    camera.position.set(0, 5, 0)
    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // document.body.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到body中
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中

    //创建星球
    const createBall = sizeArray => {
      const spereGeometry = new THREE.SphereGeometry(...sizeArray)
      const spereMaterial = new THREE.MeshLambertMaterial()
      return new THREE.Mesh(spereGeometry, spereMaterial)
    }
    //创建太阳
    const sun = createBall([1, 20, 20])
    sun.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/sun.jpg'))
    scene.add(sun)

    const mercury = createBall([0.2, 20, 20]) // 水星
    mercury.position.set(2, 0, 0)
    mercury.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/mercury.jpg'))
    scene.add(mercury)
    // let geometryMercury = new THREE.CircleGeometry()
    // const arcCurveMercury = new THREE.ArcCurve(0, 0, 2, 0, 2 * Math.PI)
    // geometryMercury.setFromPoints(arcCurveMercury.getPoints(50))
    // const lineMercury = new THREE.Line(geometryMercury, new THREE.LineBasicMaterial({color: 0xee00ff}))
    // scene.add(lineMercury)

    const torusGeometryMercury = new THREE.TorusGeometry(2, 0.01, 2, 100)
    const torusMaterialMercury = new THREE.MeshBasicMaterial({color: 0x707881})
    const torusMercury = new THREE.Mesh(torusGeometryMercury, torusMaterialMercury)
    torusMercury.rotation.x = THREE.MathUtils.degToRad(90)
    scene.add(torusMercury)

    const venus = createBall([0.3, 20, 20]) // 金星
    venus.position.set(3, 0, 0)
    venus.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/venus.jpg'))
    scene.add(venus)

    const earth = createBall([0.4, 20, 20]) // 地球
    earth.position.set(4, 0, 0)
    earth.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/earth.jpg'))
    scene.add(earth)

    const moon = createBall([0.1, 20, 20]) // 月球
    moon.position.set(0.5, 0, 0)
    moon.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/moon.jpg'))
    earth.add(moon)

    const mars = createBall([0.3, 20, 20]) // 火星
    mars.position.set(5, 0, 0)
    mars.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/mars.jpg'))
    scene.add(mars)

    const jupiter = createBall([0.8, 20, 20]) // 木星
    jupiter.position.set(6, 0, 0)
    jupiter.rotation.y = 150
    jupiter.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/jupiter.jpg'))
    scene.add(jupiter)

    const saturn = createBall([0.7, 20, 20]) // 土星
    saturn.position.set(7, 0, 0)
    jupiter.rotation.y = 290
    saturn.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/saturn.jpg'))
    scene.add(saturn)

    const uranus = createBall([0.5, 20, 20]) // 天王星
    uranus.position.set(8, 0, 0)
    jupiter.rotation.y = 300
    uranus.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/uranus.jpg'))
    scene.add(uranus)

    const neptune = createBall([0.5, 20, 20]) // 海王星
    neptune.position.set(9, 0, 0)
    jupiter.rotation.y = 60
    neptune.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/neptune.jpg'))
    scene.add(neptune)

    // 添加环境 光
    const alight = new THREE.AmbientLight('#FFF', 0.7)
    scene.add(alight)

    //添加点光源
    const light = new THREE.PointLight({
      color: '0xff0000',
      intensity: 100,
    })
    light.position.set(0, 0, 0)
    scene.add(light)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    var control = new OrbitControls(camera, renderer.domElement) // 7、创建控制器
    control.enableDamping = true // 阻尼惯性
    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
      sun.rotation.y += 0.05
      // 水星动画
      mercury.rotation.y += 0.001
      mercury.position.x = 2 * Math.cos(mercury.rotation.y * 100)
      mercury.position.z = -2 * Math.sin(mercury.rotation.y * 100)
      // 金星动画
      venus.rotation.y += 0.00025
      venus.position.x = 3 * Math.cos(venus.rotation.y * 100)
      venus.position.z = -3 * Math.sin(venus.rotation.y * 100)
      // 地球动画
      earth.rotation.y += 0.06
      earth.position.x = 4 * Math.cos(earth.rotation.y / 10)
      earth.position.z = -4 * Math.sin(earth.rotation.y / 10)

      // 月球动画
      moon.rotation.y += 0.05
      moon.position.x = 0.5 * Math.cos(moon.rotation.y * 2)
      moon.position.z = -0.5 * Math.sin(moon.rotation.y * 2)

      // 火星动画
      mars.rotation.y += 0.05
      mars.position.x = 5 * Math.cos(mars.rotation.y / 10)
      mars.position.z = -5 * Math.sin(mars.rotation.y / 10)

      // 木星动画
      jupiter.rotation.y += 0.14
      jupiter.position.x = 6 * Math.cos(jupiter.rotation.y / 20)
      jupiter.position.z = -6 * Math.sin(jupiter.rotation.y / 20)

      // 土星动画
      saturn.rotation.y += 0.13
      saturn.position.x = 7 * Math.cos(saturn.rotation.y / 35)
      saturn.position.z = -7 * Math.sin(saturn.rotation.y / 35)

      // 天王星动画
      uranus.rotation.y += 0.12
      uranus.position.x = 8 * Math.cos(uranus.rotation.y / 50)
      uranus.position.z = -8 * Math.sin(uranus.rotation.y / 50)

      // 海王星动画
      neptune.rotation.y += 0.11
      neptune.position.x = 9 * Math.cos(neptune.rotation.y / 65)
      neptune.position.z = -9 * Math.sin(neptune.rotation.y / 65)

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

  return <div ref={threeBaseRef} style={{width: '100%', height: hieght + 'px'}}></div>
}
export default PageViewIndex
