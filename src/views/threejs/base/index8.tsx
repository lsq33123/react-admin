/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import {DragControls} from 'three/examples/jsm/controls/DragControls.js'
import {TransformControls} from 'three/examples/jsm/controls/TransformControls.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()
  const init = () => {
    const threeBaseCurrent: any = threeBaseRef.current
    // 场景
    var scene = new THREE.Scene()

    // 相机
    var camera = new THREE.PerspectiveCamera(
      45,
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight,
      0.1,
      10000,
    )
    camera.position.set(0, 400, 600)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // 渲染器
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    threeBaseCurrent.appendChild(renderer.domElement)

    // 初始化模型
    // 创建坐标格辅助对象.
    var helper = new THREE.GridHelper(1200, 50, 0xcd3700, 0x4a4a4a)
    // 把坐标格添加到场景中去
    scene.add(helper)
    // 创建立方体
    var cubeGeometry = new THREE.BoxGeometry(100, 100, 100)
    // 创建法线网格材质
    var cubeMaterial = new THREE.MeshNormalMaterial()
    // 创建网格
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    // 将网格添加到场景中
    scene.add(cube)

    // 创建轨迹球控制器
    var controls = new TrackballControls(camera, renderer.domElement)
    //旋转速度
    controls.rotateSpeed = 100
    //变焦速度
    controls.zoomSpeed = 3
    //平移速度
    controls.panSpeed = 100
    //是否不变焦
    controls.noZoom = false
    //是否不平移
    controls.noPan = false
    //是否开启移动惯性
    controls.staticMoving = true

    // 添加拖拽控件
    // 添加平移控件
    var transformControls = new TransformControls(camera, renderer.domElement)
    scene.add(transformControls)

    // 过滤不是 Mesh 的物体,例如辅助网格
    var objects: any = []
    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].isMesh) {
        objects.push(scene.children[i])
      }
    }
    // 初始化拖拽控件
    var dragControls = new DragControls(objects, camera, renderer.domElement)

    // 鼠标略过
    dragControls.addEventListener('hoveron', function (event) {
      transformControls.attach(event.object)
    })
    // 开始拖拽
    dragControls.addEventListener('dragstart', function (event) {
      controls.enabled = false
    })
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
      controls.enabled = true
    })

    // 初始化灯光
    var light = new THREE.SpotLight(0xffffff)
    light.position.set(-300, 600, -400)
    scene.add(light)

    function animate() {
      //更新轨迹球控件
      controls.update()
      requestAnimationFrame(animate)
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
