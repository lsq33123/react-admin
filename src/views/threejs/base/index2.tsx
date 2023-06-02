/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import {Col, Row} from 'antd'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const controlRef = React.createRef<HTMLDivElement>()
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
    threeBaseCurrent!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中
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
    cube2.position.set(2, 2, 0)
    scene.add(cube2) // 7、将网格模型添加到场景中

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

    camera.lookAt(cube.position) // 设置相机位置
    const spotLight = new THREE.SpotLight(0xffffff) // 8、添加聚光灯光源
    spotLight.position.set(100, 1000, 1000)
    spotLight.castShadow = true // 聚光灯光源投射阴影
    scene.add(spotLight)

    // 加入一个环境光源
    var ambientLight = new THREE.AmbientLight(0x0c0c0c)
    scene.add(ambientLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    //gui相关教程 https://www.cnblogs.com/fangdongdemao/p/13949773.html
    const gui = new dat.GUI({
      name: '33',
      autoPlace: true, //是否自动放置
      width: 300, //窗口宽度
    }) // 10、添加dat.gui插件

    gui.domElement.id = 'gui' // 设置dat.gui的id，用于自定义样式
    controlRef.current?.appendChild(gui.domElement) // 将dat.gui的dom元素（canvas元素）添加到指定元素中

    const controls = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03,
      opacity: material.opacity,
      transparent: material.transparent,
      visible: material.visible,
      color: material.color.getHex(),
      wireframe: material.wireframe,
      wireframeLinewidth: material.wireframeLinewidth,
      side: 'front',
      selectedMesh: 'cube',
      shadowCameraNear: spotLight.shadow.camera.near,
      shadowCameraFar: spotLight.shadow.camera.far,
      shadowCameraFov: spotLight.shadow.camera.fov,
      shadowCameraVisible: spotLight.shadow.camera.visible,
      shadowMapWidth: spotLight.shadow.mapSize.width,
      shadowMapHeight: spotLight.shadow.mapSize.height,
      shadowBias: spotLight.shadow.bias,
      shadowDarkness: spotLight.shadow.darkness,
      target: 'Plane',
    }

    const cameraGui = gui.addFolder('camera')
    cameraGui.add(camera.position, 'x', 0, 100)
    cameraGui.add(camera.position, 'y', 0, 100)
    cameraGui.add(camera.position, 'z', 0, 100)
    cameraGui.add(camera, 'fov', 0, 180)
    cameraGui.add(camera, 'near', 0, 100)
    cameraGui.add(camera, 'far', 0, 100)
    cameraGui.add(camera, 'zoom', 0, 100)
    // cameraGui.add(camera, 'left', 0, 100)
    // cameraGui.add(camera, 'right', 0, 100)
    // cameraGui.add(camera, 'top', 0, 100)
    // cameraGui.add(camera, 'bottom', 0, 100)

    const spGui = gui.addFolder('THREE.SpotLight')
    spGui.add(controls, 'shadowCameraNear', 0, 100).onChange(function (e) {
      spotLight.shadow.camera.near = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'shadowCameraFar', 0, 5000).onChange(function (e) {
      spotLight.shadow.camera.far = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'shadowCameraFov', 1, 180).onChange(function (e) {
      spotLight.shadow.camera.fov = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'shadowCameraVisible').onChange(function (e) {
      spotLight.shadow.camera.visible = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'shadowBias', 0, 1).onChange(function (e) {
      spotLight.shadow.bias = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    // spGui.add(controls, 'shadowDarkness', 0, 1).onChange(function (e) {
    //   spotLight.shadow.darkness = e
    //   spotLight.shadow.camera.updateProjectionMatrix()
    // })
    spGui.add(controls, 'shadowMapWidth', 0, 4096).onChange(function (e) {
      spotLight.shadow.mapSize.width = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'shadowMapHeight', 0, 4096).onChange(function (e) {
      spotLight.shadow.mapSize.height = e
      spotLight.shadow.camera.updateProjectionMatrix()
    })
    spGui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function (e) {
      console.log(e)
      switch (e) {
        // case 'Plane':
        //   spotLight.target = plane
        //   break
        // case 'Sphere':
        //   spotLight.target = sphere
        //   break
        case 'Cube':
          spotLight.target = cube
          break
      }
    })
    const spColor = {
      color: spotLight.color.getHex(),
    }
    spGui.addColor(spColor, 'color').onChange(function (e) {
      spotLight.color.setHex(e)
    })
    spGui.add(spotLight, 'intensity', 0, 5)
    spGui.add(spotLight, 'distance', 0, 2000)
    spGui.add(spotLight, 'angle', 0, Math.PI / 3)
    spGui.add(spotLight, 'penumbra', 0, 1)
    spGui.add(spotLight, 'decay', 1, 2)
    spGui.add(spotLight, 'castShadow').onChange(function (e) {
      spotLight.castShadow = e
    })
    const spPosFolder = spGui.addFolder('position')
    spPosFolder.add(spotLight.position, 'x', -1000, 1000)
    spPosFolder.add(spotLight.position, 'y', -1000, 1000)
    spPosFolder.add(spotLight.position, 'z', -1000, 1000)
    const spTarFolder = spGui.addFolder('target')
    spTarFolder.add(spotLight.target.position, 'x', -1000, 1000)
    spTarFolder.add(spotLight.target.position, 'y', -1000, 1000)
    spTarFolder.add(spotLight.target.position, 'z', -1000, 1000)

    const cubeFolder = gui.addFolder('cube')
    cubeFolder.add(controls, 'opacity', 0, 1).onChange(function (e) {
      material.opacity = e
    })

    cubeFolder.add(controls, 'transparent').onChange(function (e) {
      material.transparent = e
    })

    cubeFolder.add(controls, 'visible').onChange(function (e) {
      material.visible = e
    })

    cubeFolder.addColor(controls, 'color').onChange(function (e) {
      material.color.setHex(e)
    })

    cubeFolder.add(controls, 'wireframe').onChange(function (e) {
      material.wireframe = e
    })

    cubeFolder.add(controls, 'wireframeLinewidth', 0, 20).onChange(function (e) {
      material.wireframeLinewidth = e
    })

    cubeFolder.add(controls, 'side', ['front', 'back', 'double']).onChange(function (e) {
      switch (e) {
        case 'front':
          material.side = THREE.FrontSide
          break
        case 'back':
          material.side = THREE.BackSide
          break
        case 'double':
          material.side = THREE.DoubleSide
          break
      }
      material.needsUpdate = true
    })

    cubeFolder.add(controls, 'selectedMesh', ['cube', 'sphere', 'plane']).onChange(function (e) {
      scene.traverse(function (e) {
        if (e instanceof THREE.Mesh) {
          e.material.opacity = 1
          e.material.transparent = false
        }
      })
      switch (e) {
        case 'cube':
          scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e.name === 'cube') {
              e.material.opacity = controls.opacity
              e.material.transparent = controls.transparent
            }
          })
          break
        case 'sphere':
          scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e.name === 'sphere') {
              e.material.opacity = controls.opacity
              e.material.transparent = controls.transparent
            }
          })
          break
        case 'plane':
          scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e.name === 'plane') {
              e.material.opacity = controls.opacity
              e.material.transparent = controls.transparent
            }
          })
          break
      }
    })

    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
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
      <Row gutter={15}>
        <Col span={18}>
          <div ref={threeBaseRef} style={{width: '100%', height: '500px'}}></div>
        </Col>
        <Col span={6}>
          <div ref={controlRef} style={{width: '100%', height: '500px'}}></div>
        </Col>
      </Row>
    </>
  )
}
export default PageViewIndex
