/** @format */

import {Col, Row} from 'antd'
import React from 'react'
import * as THREE from 'three'
import useBaseView from '../../_hooks/useBaseView'
interface IProps {
  //props:any
}

type IBasicView = {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  ambientLight: THREE.AmbientLight | null
  spotLight: THREE.SpotLight | null
  axexHelper: THREE.AxesHelper | null
  control: any
  animate: any
  animateId: any
  resize: any
}

const PageView: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const controlRef = React.createRef<HTMLDivElement>()
  var cylinderMesh: any = null

  const createCube = (scene: THREE.Scene) => {
    const geometry = new THREE.BoxGeometry(20, 20, 20) // 4、创建几何体模型（立方几何体）
    const material = new THREE.MeshBasicMaterial({
      color: 0x003300,
      wireframe: false,
    })
    const cubeMesh = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    cubeMesh.position.set(15, 10, 0) //设置立方体的坐标
    cubeMesh.castShadow = true //允许投射阴影
    cubeMesh.receiveShadow = true //允许接收阴影
    scene.add(cubeMesh) //将立方体添加到场景中
  }

  //创建一个平面
  const createPlane = (scene: THREE.Scene) => {
    var planeGeo = new THREE.PlaneGeometry(200, 200, 10, 10) //创建平面
    var planeMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xffffff,
      wireframe: false,
    })
    var planeMesh = new THREE.Mesh(planeGeo, planeMat) //创建网格模型
    planeMesh.position.set(0, 0, -50) //设置平面的坐标
    planeMesh.rotation.x = -0.5 * Math.PI //将平面绕X轴逆时针旋转90度
    planeMesh.receiveShadow = true //允许接收阴影
    scene.add(planeMesh) //将平面添加到场景中
  }

  //创建圆柱体
  const createCylinder = (scene: THREE.Scene) => {
    //创建圆柱体
    var cylinderGeo = new THREE.CylinderGeometry(15, 15, 40, 40, 40)
    var cylinderMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0xff6600,
      wireframe: false,
    })
    //创建圆柱体网格模型
    cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat)
    cylinderMesh.position.set(0, 20, -40) //设置圆柱坐标sphere
    cylinderMesh.castShadow = true //允许投射阴影
    cylinderMesh.receiveShadow = true //允许接收阴影
    scene.add(cylinderMesh) //向场景添加圆柱体
  }

  //创建一个球
  const createSphere = (scene: THREE.Scene) => {
    var sphereGeo = new THREE.SphereGeometry(16, 40, 40) //创建球体
    var sphereMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0x0000ff,
      wireframe: false,
    })
    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat) //创建球体网格模型
    sphereMesh.position.set(-25, 16, 0) //设置球的坐标
    sphereMesh.castShadow = true //允许投射阴影
    sphereMesh.receiveShadow = true //允许接收阴影
    scene.add(sphereMesh) //将球体添加到场景
  }

  const baseView: IBasicView = useBaseView({
    divRef: threeBaseRef,
    isSpotLight: true, // 是否开启聚光灯
    createModel: scene => {
      createPlane(scene)
      createCube(scene)
      createCylinder(scene)
      createSphere(scene)
    },
    createAnimate: ({scene, camera, renderer}) => {
      cylinderMesh.rotation.y += 0.01 //让圆柱体沿Y轴旋转
      cylinderMesh.rotation.x += 0.01 //让圆柱体沿Y轴旋转
      renderer.render(scene, camera) //执行渲染操作
    },
  })

  if (baseView) {
    baseView.camera.position.set(30, 70, 30) // 设置相机位置
    baseView.renderer.shadowMap.enabled = true // 开启阴影
    // baseView.renderer.shadowMapType = THREE.PCFSoftShadowMap // 阴影类型
    baseView.spotLight.castShadow = true // 开启阴影
    baseView.spotLight.position.set(-30, 100, 30) //   设置聚光灯位置
    // baseView.spotLight.position.set(0, 70, 0) // 设置聚光灯位置
    baseView.camera.updateProjectionMatrix() // 更新相机投影矩阵

    const spotLightHelper = new THREE.SpotLightHelper(baseView.spotLight, 0xff0000)
    baseView.scene.add(spotLightHelper)
  }

  return (
    <>
      <div ref={threeBaseRef} style={{width: '100%', height: '500px'}}></div>
      {/* <Row gutter={15}>
        <Col span={18}>
        </Col>
        <Col span={6}>
        <div ref={controlRef} style={{width: '100%', height: '500px'}}></div>
        </Col>
      </Row> */}
    </>
  )
}
export default PageView
