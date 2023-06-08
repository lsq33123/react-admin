/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
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
    camera.position.set(0, 0, 20)
    const renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // document.body.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到body中
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中

    const geometry = new THREE.BoxGeometry(10, 10, 10) // 4、创建几何体模型（立方几何体）
    const material = new THREE.MeshBasicMaterial({
      // 5.1 创建基础网格材质
      color: 0x00ff00, // 绿色
    })
    const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
    scene.add(cube) // 7、将网格模型添加到场景中

    camera.lookAt(cube.position) // 设置相机位置

    //创建文本几何体
    const textGeometry = new TextGeometry('Hello Three.js', {
      size: 10, //字体大小
      height: 1, //字体高度
      curveSegments: 12, //弧线分段数，使得文字的曲线更加光滑
      // font: new THREE.Font(undefined), //设置字体，默认是'helvetiker'，需对应引入的字体文件
      bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切
      bevelThickness: 1, //倒角厚度
      bevelSize: 0.5, //倒角宽度
      bevelSegments: 3, //倒角分段数
    })
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000, //文字颜色
    })
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(0, 7, 0)
    scene.add(textMesh)

    const spotLight = new THREE.SpotLight(0xffffff) // 8、添加聚光灯光源
    spotLight.position.set(100, 1000, 1000)
    spotLight.castShadow = true
    scene.add(spotLight)

    const axexHelper = new THREE.AxesHelper(1000) // 8、添加坐标轴辅助线
    scene.add(axexHelper)

    var control = new OrbitControls(camera, renderer.domElement) // 7、创建控制器
    control.enableDamping = true // 阻尼惯性

    const animate = function () {
      // 9、创建动画
      requestAnimationFrame(animate)
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

  return (
    <>
      <div>来源：https://blog.csdn.net/qw8704149/article/details/110499196</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
