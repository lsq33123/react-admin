/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeDomRef = React.useRef<HTMLDivElement>(null)
  const init = () => {
    const threeDomCurrent: any = threeDomRef.current
    const scene = new THREE.Scene() // 场景
    const camera = new THREE.PerspectiveCamera(
      75,
      threeDomCurrent.clientWidth / threeDomCurrent.clientHeight,
      0.1,
      1000,
    )

    camera.position.set(0, 0, 5) // 相机位置
    camera.lookAt(0, 0, 0) // 相机焦点

    const renderer = new THREE.WebGLRenderer() // 渲染器
    renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    threeDomCurrent.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1) // 几何体
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
    }) // 材质
    const cube = new THREE.Mesh(geometry, material) // 网格
    scene.add(cube)

    // 椎体
    const coneGeometry = new THREE.ConeGeometry(1, 2, 32)
    const coneMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
    })
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    cone.position.set(0, 2, 0)
    scene.add(cone)

    const coneGeometry2 = new THREE.ConeGeometry(1, 1.5, 32)
    const coneMaterial2 = new THREE.MeshNormalMaterial({flatShading: true})
    const cone2 = new THREE.Mesh(coneGeometry2, coneMaterial2)
    cone2.position.set(-2, 0, 1)
    scene.add(cone2)

    const point: any = []
    point.push(new THREE.Vector3(0, 0.5, 0))
    point.push(new THREE.Vector3(2, 1, 1))
    point.push(new THREE.Vector3(1, 1.5, 2))
    point.push(new THREE.Vector3(2, 2, 2))
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(point)
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xff5132})
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)

    const axexHelper = new THREE.AxesHelper(1000) // 坐标轴辅助线
    scene.add(axexHelper)

    const control = new OrbitControls(camera, renderer.domElement)

    gsap.fromTo(
      cone.position,
      {
        x: -1.5,
      },
      {
        x: 1.5,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      },
    )
    console.log('cone2:', cone2)
    const t1 = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    t1.to(cone2.position, {z: 2, duration: 1})
    t1.to(cone2.position, {x: 2, duration: 1})
    t1.to(cone2.position, {y: 1, duration: 1}, 1) // 延迟1秒执行
    // t1.to(cone2.position, {y: 1, duration: 1}, "<") // 上个动画开始 我也开始
    // t1.to(cone2.position, {y: 1, duration: 1}, ">") // 上个动画结束 我才开始  默认
    // t1.to(cone2.position, {y: 1, duration: 1}, "+=1") // 上个动画结束 延迟1后执行
    // t1.to(cone2.position, {y: 1, duration: 1}, "-=1") // 上个动画结束前1秒执行
    t1.to(cone2.rotation, {z: 4, duration: 2})
    t1.to(cone2.scale, {y: 0.5, duration: 1})
    t1.to(cone2.position, {y: 2, duration: 2})
    t1.to(cone2.position, {x: 5, y: 0, z: 0, duration: 1})
    t1.to(cone2.scale, {x: 1, y: 1, z: 1, duration: 1}, '<')
    t1.to(cone2.position, {x: -5, y: 0, z: 0, duration: 3})
    t1.to(cone2.scale, {x: 0.5, y: 0.5, z: 0.5, duration: 3}, '<')
    t1.to(cone2.rotation, {x: 0.5, y: 0.5, z: 0.5, duration: 3}, '<')
    t1.to(cone2.position, {x: -2, y: 0, z: 0, duration: 3}, '+=0.5')

    const animate = () => {
      requestAnimationFrame(animate)
      line.rotation.x += 0.01
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      cube.position.x += 0.01
      if (cube.position.x > 5) {
        cube.position.x = 0
      }

      control.update() // 更新控制器
      renderer.render(scene, camera)
    }
    animate()

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
