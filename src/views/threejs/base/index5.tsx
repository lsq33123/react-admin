/** @format */

import React, {useEffect} from 'react'
import * as THREE from 'three'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

  const init = () => {
    const threeBaseCurrent: any = threeBaseRef.current
    // 1、创建场景
    var scene = new THREE.Scene()

    // 2、创建相机（透视投影相机）
    const camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      threeBaseCurrent.clientWidth / threeBaseCurrent.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      1000, // 远端渲染距离
    )
    // 2.1 设置相机位置简写方式：
    camera.position.set(5, 10, 10)
    // 3、创建渲染器
    var renderer = new THREE.WebGLRenderer()
    // 3.1 设置渲染器的大小（长宽）（设置渲染器为全屏）
    renderer.setSize(threeBaseCurrent.clientWidth, threeBaseCurrent.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // 3.2 将渲染结果展示到页面上
    threeBaseRef.current!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中

    // 7、创建光源
    var spotLight = new THREE.SpotLight(0xffffff)
    // 7.1 设置光源位置
    spotLight.position.set(0, 20, 20)
    // 7.2 设置光源照射的强度，默认值为 1
    spotLight.intensity = 5
    // 7.3 将光源添加到场景中
    scene.add(spotLight)

    // 创建跟几何体的相关属性的顶点（Geometry包含顶点位置，面信息，颜色等）
    var starsGeometry = new THREE.BufferGeometry()
    // 创建1万个点
    const vertices: any = []
    for (var i = 0; i < 10000; i++) {
      // 设置点的随机位置
      const x = THREE.MathUtils.randFloatSpread(2500)
      const y = THREE.MathUtils.randFloatSpread(2000)
      const z = THREE.MathUtils.randFloatSpread(2500)
      // 把创建好的点，添加到几何体的相关属性的顶点上。
      // vertices(顶点的队列)保存了模型中每个顶点的位置信息。
      vertices.push(x, y, z)
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    // 设置粒子材质
    var starsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
    })
    // 创建粒子实例
    var starField = new THREE.Points(starsGeometry, starsMaterial)
    // 将1000个点，添加到场景中
    scene.add(starField)

    var beforeDate: any = new Date() //之前的时间

    // 9、创建动画循环渲染函数
    function animate() {
      var nowDate: any = new Date() //现在的时间

      var t = nowDate - beforeDate //时间差
      beforeDate = nowDate //把现在的时间赋值给之前的时间

      //让相机转动以此来实现整个场景的旋转
      camera.rotateY(-0.0001 * t)
      camera.rotateX(0.00005 * t)
      camera.rotateZ(0.00005 * t)

      // 9.1 循环调用函数
      requestAnimationFrame(animate)
      // 3.3 结合场景和相机进行渲染，即用摄像机拍下此刻的场景
      renderer.render(scene, camera)
    }
    // 调用动画函数
    animate()
  }

  useEffect(() => {
    init()
  }, [])

  return <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
}
export default PageViewIndex
