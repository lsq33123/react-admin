/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeDomRef = React.useRef<HTMLDivElement>(null)
  const init = () => {
    const threeDomCurrent: any = threeDomRef.current
    const scene = new THREE.Scene() // 场景
    // scene.background = new THREE.Color(0xaaaaaa)
    const camera = new THREE.PerspectiveCamera(75, threeDomCurrent.clientWidth / threeDomCurrent.clientHeight, 1, 1000)

    camera.position.set(20, 12, 80) // 相机位置
    camera.lookAt(0, 0, 0) // 相机焦点

    const renderer = new THREE.WebGLRenderer() // 渲染器
    renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    threeDomCurrent.appendChild(renderer.domElement)

    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)

    const color2 = 0xffffff
    const intensity2 = 1
    const light2 = new THREE.DirectionalLight(color2, intensity2)
    light2.position.set(1, -2, -4)
    scene.add(light2)

    const objects: any = []
    const spread = 15

    // 设置图形的位置x,y轴
    function addObject(x, y, obj) {
      obj.position.x = x * spread
      obj.position.y = y * spread

      scene.add(obj)
      objects.push(obj)
    }

    // 可以反射的材质
    function createMaterial() {
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
      })

      const hue = Math.random()
      const saturation = 1
      const luminance = 0.5
      material.color.setHSL(hue, saturation, luminance)

      return material
    }

    function addSolidGeometry(x, y, geometry) {
      // 网格
      const mesh = new THREE.Mesh(geometry, createMaterial())
      addObject(x, y, mesh)
    }

    const shape = new THREE.Shape()
    const x = -2.5
    const y = -5
    shape.moveTo(x + 2.5, y + 2.5)
    // 绘制贝塞尔曲线
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)

    const extrudeSettings = {
      // 用于沿着挤出样条的深度细分的点的数量，默认值为1。
      steps: 2,
      // 挤出的形状的深度，默认值为1。
      depth: 2,
      // 对挤出的形状应用是否斜角，默认值为true。
      bevelEnabled: true,
      // 设置原始形状上斜角的厚度。默认值为0.2。
      bevelThickness: 1,
      // 斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
      bevelSize: 1,
      // 斜角的分段层数，默认值为3。
      bevelSegments: 2,
    }

    addSolidGeometry(-2, 1, new THREE.ExtrudeGeometry(shape, extrudeSettings))

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    const axexHelper = new THREE.AxesHelper(1000) // 坐标轴辅助线
    scene.add(axexHelper)

    const control = new OrbitControls(camera, renderer.domElement)
    // const animate = () => {
    //   requestAnimationFrame(animate)

    //   control.update() // 更新控制器
    //   renderer.render(scene, camera)
    // }
    // animate()

    function render(time: number) {
      time *= 0.01

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }

      objects.forEach((obj: any, ndx) => {
        const speed = 0.1 + ndx * 0.05
        const rot = time * speed
        obj.rotation.x = rot
        obj.rotation.y = rot
      })

      renderer.render(scene, camera)
      control.update() // 更新控制器
      requestAnimationFrame(render)
    }

    // 动画
    requestAnimationFrame(render)

    window.addEventListener('resize', () => {
      camera.aspect = threeDomCurrent.clientWidth / threeDomCurrent.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    })
  }

  useEffect(() => {
    init()
  }, [])

  return <div ref={threeDomRef} style={{width: '100%', height: '400px'}}></div>
}
export default PageViewIndex
