/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
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

    //用canvas生成图片
    let canvas: any = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 300
    //制作矩形
    ctx.fillStyle = 'rgba(255,165,0,0.8)'
    ctx.fillRect(0, 0, 300, 300)

    //设置文字
    ctx.fillStyle = '#fff'
    ctx.font = 'normal 18pt "楷体"'
    ctx.fillText('模型介绍', 100, 20)
    let textWord = '该模型由小少小同学制作完成'
    //文字换行
    let len = parseInt((textWord.length / 10) as any)
    for (let i = 0; i < len + 1; i++) {
      let space = 10
      if (i === len) {
        space = textWord.length - len * 10
      }
      console.log('len+' + len, 'space+' + space)
      let word = textWord.substr(i * 10, space)
      ctx.fillText(word, 15, 60 * (i + 1))
    }
    //生成图片
    let url = canvas.toDataURL('image/png')
    //将图片构建到纹理中
    let geometry1 = new THREE.PlaneGeometry(10, 10)
    let material1 = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(url),
      side: THREE.DoubleSide,
      opacity: 1,
      transparent: true,
    })
    let mesh = new THREE.Mesh(geometry1, material1)
    mesh.position.set(10, 10, 5)
    scene.add(mesh)

    let mesh2 = new THREE.Mesh(geometry1, material1)
    mesh2.position.set(0, 0, 5)
    scene.add(mesh2)

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
      <div>思路：创建图片，添加文字，设置为纹理，添加到场景中</div>
      <div>来源：https://blog.csdn.net/WWW_share8/article/details/102826326</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
