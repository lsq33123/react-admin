/** @format */

import React, {createRef} from 'react'
import * as THREE from 'three'
import './index.less'
import * as Stats from 'stats.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {presetsCameraPos} from './data'
interface IProps {
  //props:any
}

const PageViewShangHai: React.FC<IProps> = props => {
  const threeRef: any = createRef<HTMLDivElement>()
  const statsRef = React.createRef<HTMLDivElement>()
  const gltfLoader = new GLTFLoader()

  const defaultInfo = presetsCameraPos.find(pos => pos.name === 'aerial')
  const cameraPos = new THREE.Vector3().fromArray(defaultInfo!.pos)

  function loadGltf(url: string) {
    return new Promise<Object>((resolve, reject) => {
      gltfLoader.load(url, function (gltf) {
        console.log('gltf', gltf)
        resolve(gltf)
      })
    })
  }

  const createScene = (el, scene) => {
    // this.scene.background = new THREE.Color(0x000000)
    const drawingCanvas = document.createElement('canvas')
    const context = drawingCanvas.getContext('2d')

    if (context) {
      // 设置canvas的尺寸
      drawingCanvas.width = el.offsetWidth
      drawingCanvas.height = el.offsetHeight

      // 创建渐变
      const gradient = context.createRadialGradient(
        el.offsetWidth / 2,
        el.offsetHeight,
        0,
        el.offsetWidth / 2,
        el.offsetHeight / 2,
        Math.max(el.offsetWidth, el.offsetHeight),
      )

      // 为渐变添加颜色
      gradient.addColorStop(0, '#0b171f')
      gradient.addColorStop(0.6, '#000000')

      // 使用渐变填充矩形
      context.fillStyle = gradient
      context.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height)
      scene.background = new THREE.CanvasTexture(drawingCanvas)
      scene.fog = new THREE.Fog(0x000000, 0, 200)
    }
  }

  const init = () => {
    const threeEl = threeRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(12, threeEl.clientWidth / threeEl.clientHeight, 1, 1000)
    console.log('cameraPos:', cameraPos)
    // camera.position.set(cameraPos)
    camera.position.set(-10, 17, 15)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(threeEl.clientWidth, threeEl.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.needsUpdate = true
    threeEl.appendChild(renderer.domElement)

    createScene(threeEl, scene)

    loadGltf('/threejs/models/shanghai/scene.gltf').then((gltf: any) => {
      const group = gltf.scene
      const scale = 10
      group.scale.set(scale, scale, scale)

      // 删除多余模型
      const mesh1 = group.getObjectByName('Text_test-base_0')
      if (mesh1 && mesh1.parent) mesh1.parent.remove(mesh1)

      const mesh2 = group.getObjectByName('Text_text_0')
      if (mesh2 && mesh2.parent) mesh2.parent.remove(mesh2)

      // 重命名模型
      // 环球金融中心
      const hqjrzx = group.getObjectByName('02-huanqiujinrongzhongxin_huanqiujinrongzhongxin_0')
      if (hqjrzx) hqjrzx.name = 'hqjrzx'
      // 上海中心
      const shzx = group.getObjectByName('01-shanghaizhongxindasha_shanghaizhongxindasha_0')
      if (shzx) shzx.name = 'shzx'
      // 金茂大厦
      const jmds = group.getObjectByName('03-jinmaodasha_jjinmaodasha_0')
      if (jmds) jmds.name = 'jmds'
      // 东方明珠塔
      const dfmzt = group.getObjectByName('04-dongfangmingzhu_dongfangmingzhu_0')
      if (dfmzt) dfmzt.name = 'dfmzt'

      const box3 = new THREE.Box3()
      box3.expandByObject(group)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box3.getCenter(center)
      box3.getSize(size)
      group.position.copy(center.negate().setY(0)) // 设置模型中心点 将Y轴置为0

      scene.add(group)
    })

    // 加入一个环境光源
    var ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const light = new THREE.DirectionalLight(0xffffff, 3)

    const lightPos2 = new THREE.Vector3().fromArray(defaultInfo!.pos)
    light.position.copy(lightPos2)
    light.castShadow = true
    light.shadow.needsUpdate = true

    const d = 1000
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    // light.shadow.camera.far = 3500;
    // light.shadow.bias = - 0.0001;

    light.shadow.mapSize.x = 1024 * 1000
    light.shadow.mapSize.y = 1024 * 1000
    const lightHelper = new THREE.DirectionalLightHelper(light)
    scene.add(lightHelper)
    scene.add(light)

    const axexHelper = new THREE.AxesHelper(10000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    const stats = new Stats() // 9、添加性能监控
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats.dom)

    var control = new OrbitControls(camera, renderer.domElement)
    const animate = function () {
      requestAnimationFrame(animate)
      stats.update()
      control.update()
      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', () => {
      // 10、监听窗口变化
      camera.aspect = threeEl.clientWidth / threeEl.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeEl.clientWidth, threeEl.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="page-all-wrap">
      <div ref={threeRef} className="three-wrap"></div>
      <div ref={statsRef} style={{width: '100%', height: '50px', display: 'flex'}}></div>
      <div className="context-wrap">
        <h3>来源：https://juejin.cn/post/7304272076650283042</h3>
      </div>
    </div>
  )
}
export default PageViewShangHai
