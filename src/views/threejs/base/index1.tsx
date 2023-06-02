/** @format */

import {Col, Row} from 'antd'
import React, {useEffect} from 'react'
import * as THREE from 'three'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef1 = React.createRef<HTMLDivElement>()
  const threeBaseRef2 = React.createRef<HTMLDivElement>()
  const init = () => {
    const threeBaseCurrent: any = threeBaseRef1.current
    const threeBaseCurrent2: any = threeBaseRef2.current
    const scene = new THREE.Scene() // 1、创建场景
    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      1000, // 远端渲染距离
    )
    camera.position.set(-3, 3, 3)
    var camera2 = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.1, 140) // 创建正交投影相机
    camera2.position.set(-3, 3, 3)
    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    const renderer2 = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    renderer2.setSize(threeBaseCurrent2.clientWidth, threeBaseCurrent2.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // document.body.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到body中
    threeBaseCurrent!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中
    threeBaseCurrent2!.appendChild(renderer2.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中
    const geometry = new THREE.BoxGeometry() // 4、创建几何体模型（立方几何体）
    const material = new THREE.MeshBasicMaterial({
      // 5.1 创建基础网格材质
      color: 0x00ff00, // 绿色
      wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
    })
    const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    scene.add(cube) // 7、将网格模型添加到场景中

    const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5) // 4、创建几何体模型（立方几何体）
    const cube2 = new THREE.Mesh(geometry2, material) // 6、创建网格模型（mesh）
    cube2.position.set(0, 2, 0)
    scene.add(cube2) // 7、将网格模型添加到场景中

    // // 加入一个平面（带线框效果）
    // var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
    // var planeMaterials = [
    //   new THREE.MeshLambertMaterial({color: 0xffffff}),
    //   new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5}),
    // ]
    // var plane = THREE.SceneUtils.createMultiMaterialObject(planeGeometry, planeMaterials)
    // plane.rotation.x = -0.5 * Math.PI // 沿着 X轴旋转-90°
    // plane.position.x = 15 // 沿着 x轴右移 15个单位
    // plane.position.y = 0 // y轴为 0
    // plane.position.z = 0 // z轴为 0
    // plane.children[0].receiveShadow = true // 非线框几何平面接收阴影
    // scene.add(plane)

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

    //创建圆柱体
    var cylinderGeo = new THREE.CylinderGeometry(1, 1, 2, 40, 40)
    var cylinderMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xff6600, //设置颜色
      wireframe: true,
    })
    //创建圆柱体网格模型
    var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat)
    cylinderMesh.position.set(7, 0, 0) //设置圆柱坐标
    scene.add(cylinderMesh) //向场景添加圆柱体

    // 创建一个圆环
    var torusGeo = new THREE.TorusGeometry(1, 0.3, 20, 20)
    var torusMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xff6600, //设置颜色
      wireframe: true,
    })
    var torusMesh = new THREE.Mesh(torusGeo, torusMat)
    torusMesh.position.set(10, 0, 0) //设置圆柱坐标
    scene.add(torusMesh)

    // const generateSprite = () => {
    //   const canvas = document.createElement('canvas')
    //   canvas.width = 16
    //   canvas.height = 16
    //   const context = canvas.getContext('2d')
    //   if (context) {
    //     context.fillStyle = 'rgba(255,255,255,0.5)'
    //     context.beginPath()
    //     context.arc(8, 8, 8, 0, Math.PI * 2, true)
    //     context.closePath()
    //     context.fill()
    //   }
    //   return canvas
    // }
    // // 创建一个蒙层
    // const spriteMaterial = new THREE.SpriteMaterial({
    //   map: new THREE.CanvasTexture(generateSprite()),
    //   blending: THREE.AdditiveBlending,
    // })
    // const sprite = new THREE.Sprite(spriteMaterial)
    // sprite.scale.set(200, 200, 1.0)
    // scene.add(sprite)

    // 创建一个圆锥体
    var coneGeo = new THREE.ConeGeometry(1, 2, 20, 20)
    var coneMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xff6600, //设置颜色
      wireframe: true,
    })
    var coneMesh = new THREE.Mesh(coneGeo, coneMat)
    coneMesh.position.set(0, 0, 2) //设置圆柱坐标
    scene.add(coneMesh)

    // 创建一个精灵
    const spriteMaterial2 = new THREE.SpriteMaterial({color: 0x00ffff})
    const sprite2 = new THREE.Sprite(spriteMaterial2)
    sprite2.position.set(-2.5, 2.5, 0)
    sprite2.scale.set(1, 1, 1.0) // 可以拉伸精灵
    scene.add(sprite2)

    //粒子材质
    const sphereGeometry2 = new THREE.SphereGeometry(1, 20, 20) // 4、创建球体几何对象
    const sphereMaterial2 = new THREE.PointsMaterial({
      color: 0xff00ff,
      size: 0.1,
    }) // 5、创建材质对象
    var sphere2 = new THREE.Points(sphereGeometry2, sphereMaterial2) // 6、创建网格对象
    sphere2.position.set(-2, 0, 0) // 设置球体网格模型的坐标
    scene.add(sphere2) // 将球体网格模型添加到场景中

    camera.lookAt(cube.position) // 设置相机位置
    camera2.lookAt(cube.position) // 设置相机位置
    const spotLight = new THREE.SpotLight(0xffffff) // 8、添加聚光灯光源
    spotLight.position.set(100, 1000, 1000)
    spotLight.castShadow = true // 聚光灯光源投射阴影
    scene.add(spotLight)

    // 加入一个环境光源
    var ambientLight = new THREE.AmbientLight(0x0c0c0c)
    scene.add(ambientLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
      renderer2.render(scene, camera2)
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
      <Row gutter={15}>
        <Col span={12}>
          <div>透视投影相机（PerspectiveCamera）</div>
          <div ref={threeBaseRef1} style={{width: '100%', height: '500px'}}></div>
        </Col>
        <Col span={12}>
          <div>正交投影相机（OrthographicCamera ）</div>
          <div ref={threeBaseRef2} style={{width: '100%', height: '500px'}}></div>
        </Col>
      </Row>
    </>
  )
}
export default PageViewIndex
