/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import * as Stats from 'stats.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {starArr} from './data'
import {labelRenderer as labelRenderer3D, tag3DSprite} from '../utils/tag3D.js'
import './index.less'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const statsRef = React.createRef<HTMLDivElement>()
  const hieght = document.documentElement.clientHeight - 64
  let renderer: any = null
  let resize: any = null
  let animateId: any = null
  let labelRenderer3DInstance: any = null

  let init = () => {
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
    camera.position.set(0, 10, 20)
    renderer = new THREE.WebGLRenderer() // 3、创建渲染器
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

    // 添加宇宙背景

    let spaceGeometry = new THREE.SphereGeometry(100, 100, 100)
    let spaceMaterial = new THREE.MeshLambertMaterial({
      //高光材质
      map: new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/space.jpg')),
      side: THREE.DoubleSide, //双面显示
      //透明度 0.7
      transparent: true,
      opacity: 0.3,
    })
    //宇宙网格
    let spaceMesh = new THREE.Mesh(spaceGeometry, spaceMaterial)
    spaceMesh.name = '宇宙'
    scene.add(spaceMesh)

    var planetGroup = new THREE.Group()
    starArr.forEach((item, index) => {
      const planet = createBall([item.showRasius, 20, 20])
      if (index === 0) {
        planet.position.set(item.showDistance, 0, 0)
      } else {
        let showDistance = item.showDistance + 1
        // planet.position.set(showDistance, 0, 0)
        // const torusGeometryMercury = new THREE.TorusGeometry(showDistance, 0.01, 2, 100)
        // const torusMaterialMercury = new THREE.MeshBasicMaterial({
        //   color: 0xffffff,
        //   opacity: 0.5,
        // })
        // const torusMercury = new THREE.Mesh(torusGeometryMercury, torusMaterialMercury)
        // torusMercury.rotation.x = THREE.MathUtils.degToRad(90)
        // scene.add(torusMercury)

        //创建轨迹
        let trackGeometry = new THREE.RingGeometry(showDistance, showDistance + 0.01, 1000) //圆环几何体
        //圆环材质
        let trackMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        })
        let trackMesh = new THREE.Mesh(trackGeometry, trackMaterial)
        trackMesh.position.set(0, 0, 0) //轨道位置
        trackMesh.rotation.set(0.5 * Math.PI, 0, 0) //旋转轨道至水平
        scene.add(trackMesh)

        if (item.name === '地球') {
          const moon = createBall([0.1, 20, 20]) // 月球
          moon.position.set(0.9, 0, 0)
          moon.material.map = new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/moon.jpg'))
          ;(moon.material.normalScale = new THREE.Vector2(0.2, 0.2)), //凹凸深度
            (moon.name = '月球')
          planet.add(moon)

          const torusGeometry = new THREE.TorusGeometry(0.9, 0.01, 2, 100)
          const torusMaterial = new THREE.MeshBasicMaterial({color: 0x707881})
          const torus = new THREE.Mesh(torusGeometry, torusMaterial)
          torus.rotation.x = THREE.MathUtils.degToRad(90)
          planet.add(torus)
        }
        if (item.name === '土星') {
          // 土星环
          const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 2, 100)
          const torusMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(require('/public/threejs/textures/solarsystem/saturn_rings.jpg')),
          })
          const torus = new THREE.Mesh(torusGeometry, torusMaterial)
          torus.rotation.x = THREE.MathUtils.degToRad(45) // 旋转45度
          planet.add(torus)
        }

        const label3DSprite = tag3DSprite(item.name, 0.05, 0.05, 0.05)
        var post = new THREE.Vector3()
        planet.getWorldPosition(post)
        post.y += 1.5
        label3DSprite.position.copy(post)
        planet.add(label3DSprite)
      }
      planet.material.map = new THREE.TextureLoader().load(item.img)
      planet.name = item.name
      planet.data = item
      planet.isPlanet = true
      planetGroup.add(planet)
      scene.add(planet)
    })

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

    const stats = new Stats() // 9、添加性能监控
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats.dom)

    let animate = function () {
      // 9、创建动画
      animateId = requestAnimationFrame(animate)

      scene.traverse(function (obj) {
        if (obj.isMesh && obj.isPlanet) {
          if (obj.name === '太阳') {
          } else {
            obj.data.angle += obj.data.showSpeed / 5
            obj.rotation.y += obj.data.showSpeed / 5
            obj.position.x = (obj.data.showDistance + 1) * Math.cos(obj.data.angle)
            obj.position.z = (obj.data.showDistance + 1) * Math.sin(obj.data.angle)

            if (obj.name === '地球') {
              //月球的转动
              obj.children[0].rotation.y += 0.05
              obj.children[0].position.x = 0.9 * Math.cos(obj.children[0].rotation.y)
              obj.children[0].position.z = 0.9 * Math.sin(obj.children[0].rotation.y)
            }
          }
        }
      })
      stats.update()
      control.update()
      renderer.render(scene, camera)
      if (threeBaseRef.current) {
        labelRenderer3DInstance = (labelRenderer3D as any)(threeBaseRef.current)
        labelRenderer3DInstance.render(scene, camera) //渲染HTML标签对象 CSS3DObject 标签
      }
    }
    animate()

    resize = window.addEventListener('resize', () => {
      // 10、监听窗口变化
      camera.aspect = threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    })
  }

  useEffect(() => {
    init()
    return () => {
      //来源 https://www.195440.com/3380
      console.log('销毁')
      cancelAnimationFrame(animateId)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.context = null
      renderer.domElement = null
      renderer = null
      labelRenderer3DInstance = null
    }
  }, [])

  return (
    <div style={{position: 'relative'}}>
      <div ref={statsRef} style={{position: 'absolute', top: 0, left: 0, zIndex: 999}}></div>
      <div
        ref={threeBaseRef}
        style={{width: '100%', height: hieght + 'px', position: 'absolute', top: 0, left: 0}}></div>
    </div>
  )
}
export default PageViewIndex
