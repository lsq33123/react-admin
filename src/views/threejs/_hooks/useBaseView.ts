import { useEffect, useState } from "react";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface IProps {
  divRef: React.RefObject<HTMLDivElement>,
  createModel?: Function,
  createAnimate?: Function,
  isAutoRender?: boolean,
  isAmbientLight?: boolean,
  isSpotLight?: boolean,
  isAxisHelper?: boolean,
  isControls?: boolean,
  isAnimate?: boolean,
  isResize?: boolean,
  //props:any
}

export default function useBaseView({
  divRef, // 挂载的元素
  createModel, // 创建模型
  createAnimate, // 创建动画
  isAmbientLight = true, // 是否添加环境光
  isSpotLight = false, // 是否添加聚光灯光源
  isAxisHelper = true, // 是否添加坐标轴辅助线
  isControls = true, // 是否添加控制器
  isAutoRender = true, // 是否自动渲染
  isAnimate = true, // 是否开启动画
  isResize = true, // 是否开启窗口自适应
}: IProps) {
  let scene: THREE.Scene = null
  let camera: THREE.PerspectiveCamera = null
  let renderer: THREE.WebGLRenderer = null
  let ambientLight: THREE.AmbientLight = null
  let spotLight: THREE.SpotLight = null
  let axexHelper: THREE.AxesHelper = null
  let control: OrbitControls = null
  let animate: any = null
  let animateId: any = null
  let resize: any = null
  let divElement: HTMLDivElement | null = null

  const [res, setRes] = useState<any>(null) // 用于返回的数据
  const init = () => {
    divElement = divRef.current
    if (!divElement) {
      console.error('没有找到挂载元素')
      return
    }  // 如果没有挂载元素，直接返回
    scene = new THREE.Scene() // 1、创建场景
    // 2、创建相机
    camera = new THREE.PerspectiveCamera(
      75, // 相机视野
      divElement!.clientWidth / divElement!.clientHeight, // 水平方向和竖直方向长度的比值
      0.1, // 近端渲染距离
      1000, // 远端渲染距离
    )
    camera.position.set(0, 0, 20) // 设置相机位置
    renderer = new THREE.WebGLRenderer() // 3、创建渲染器
    renderer.setSize(divElement!.clientWidth, divElement!.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    divElement!.appendChild(renderer.domElement) // 将渲染器的dom元素（canvas元素）添加到指定元素中
    createModel && createModel(scene) // 4、创建模型


    if (isAmbientLight) {
      ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // 5、添加环境光
      scene.add(ambientLight)
    }

    if (isSpotLight) {
      spotLight = new THREE.SpotLight(0xffffff) // 6、添加聚光灯光源
      spotLight.position.set(100, 1000, 1000)
      spotLight.castShadow = true
      scene.add(spotLight)
    }
    if (isAxisHelper) {
      axexHelper = new THREE.AxesHelper(1000) // 7、添加坐标轴辅助线
      scene.add(axexHelper)
    }

    if (isControls) {
      control = new OrbitControls(camera, renderer.domElement) // 8、创建控制器
      control.enableDamping = true // 阻尼惯性
    }


    if (isAutoRender) {
      animate = function () {
        // 9、创建动画
        if (isAnimate) {
          animateId = requestAnimationFrame(animate)
        }
        createAnimate && createAnimate({ el: divElement, scene, camera, renderer })
        if (isControls) {
          control.update()
        }
        renderer.render(scene, camera)
      }
      animate()
    }

    if (isResize) {
      resize = window.addEventListener('resize', () => {
        // 10、监听窗口变化
        camera.aspect = divElement!.clientWidth / divElement!.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(divElement!.clientWidth, divElement!.clientHeight) // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      })
    }


    setRes({
      scene,
      camera,
      renderer,
      ambientLight,
      spotLight,
      axexHelper,
      control,
      animate,
      animateId,
      resize,
    })
  }


  useEffect(() => {
    init()
    return () => {
      // 卸载
      if (animateId) {
        cancelAnimationFrame(animateId)
      }
      if (control) {
        control.dispose()
      }
      if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss()
        renderer = null
      }
      // if (scene) {  // 不能删除，否则会报错
      //   scene.dispose()
      // } 
      if (isResize) {
        window.removeEventListener('resize', resize)
      }
    }
  }, [])
  return res
}