/** @format */

import React from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {labelRenderer as labelRenderer2D, tag as tag2D} from '../utils/tag2D.js'
import * as Stats from 'stats.js'
import * as utils from './utils'
import * as anim from './animate'
import './index.less'
interface IProps {
  //props:any
}

const PageViewPart1: React.FC<IProps> = props => {
  const threeDomRef = React.useRef<HTMLDivElement>(null)
  const statsRef = React.createRef<HTMLDivElement>()
  let car: any = null
  let man: any = null
  // let CameraInitPosition: any = new THREE.Vector3(17, 10, 52)
  const highlightArr = ['广告牌', '实验楼', '树', '快递车', '人', '无人机', '办公大厅']
  const modelSelect = ['zuoding', 'zuo1', 'zuo2', 'zuo3', 'zuo4', 'zuo5']
  let selectFloorName: string = ''
  const isDriverView = React.useRef<boolean>(false)
  const control = React.useRef<any>(null)
  const cameraRef = React.useRef<any>(null)
  const composerRef = React.useRef<any>(null)
  const outlinePassRef = React.useRef<any>(null)
  const [autoRotate, setAutoRotate] = React.useState<boolean>(false)
  const init = () => {
    const threeDomCurrent: any = threeDomRef.current
    const scene = new THREE.Scene() // 场景
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      threeDomCurrent.clientWidth / threeDomCurrent.clientHeight,
      0.1,
      1000,
    )

    cameraRef.current.position.set(13, 10, 25) // 相机位置
    // cameraRef.current.position.set(17, 10, 52) // 相机位置
    cameraRef.current.lookAt(0, 0, 0) // 相机焦点

    const renderer = new THREE.WebGLRenderer() // 渲染器
    renderer.shadowMap.enabled = true // 阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

    renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    threeDomCurrent.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // 5、添加环境光
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('rgb(253,253,253)') // 6、添加平行光
    directionalLight.position.set(100, 100, 70)
    directionalLight.castShadow = true
    directionalLight.intensity = 2
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    // 阴影范围
    const d = 80
    directionalLight.shadow.camera.left = -d
    directionalLight.shadow.camera.right = d
    directionalLight.shadow.camera.top = d
    directionalLight.shadow.camera.bottom = -d
    directionalLight.shadow.bias = -0.0005 // 解决条纹阴影的出现
    // 最大可视距和最小可视距
    directionalLight.shadow.camera.near = 0.01
    directionalLight.shadow.camera.far = 2000
    scene.add(directionalLight)

    // 添加平行光辅助线
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
    scene.add(directionalLightHelper)

    const addSkyBox = index => {
      //添加雾效果
      // const color = new THREE.Color('#rgb(9,9,9)')
      // const fog = new THREE.Fog(color, 0.01, 50)
      // scene.fog = fog
      //添加天空盒子
      const skyboxType = ['daytime', 'dusk', 'night']
      const path = `threejs/models/park1/skybox/${skyboxType[index]}/` // 设置路径
      const format = '.jpg' // 设定格式
      const skyBoxLoaderbox = new THREE.CubeTextureLoader()
      const cubeTexture = skyBoxLoaderbox.load([
        path + 'posx' + format,
        path + 'negx' + format,
        path + 'posy' + format,
        path + 'negy' + format,
        path + 'posz' + format,
        path + 'negz' + format,
      ])
      // 需要把色彩空间编码改一下，原因我上一篇说过的
      cubeTexture.encoding = THREE.sRGBEncoding
      scene.background = cubeTexture
    }
    const loaderModel = () => {
      const loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('./threejs/draco/')
      // dracoLoader.setDecoderConfig({type: 'js'})
      dracoLoader.preload()
      loader.setDRACOLoader(dracoLoader)
      loader.load(
        '/threejs/models/park1/glb/city-v1.glb',
        gltf => {
          utils.openCastShadow(gltf.scene) // 产生阴影
          scene.add(gltf.scene)
        },
        xhr => {
          // console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + '% loaded')
        },
        error => {
          console.log('error3333:', error)
        },
      )
      loader.load(
        '/threejs/models/park1/glb/zuo.glb',
        gltf => {
          console.log('办公大厅:', gltf.scene)
          gltf.scene.rotateY(Math.PI)
          gltf.scene.position.set(16, 0, -25)
          gltf.scene.scale.set(0.2, 0.2, 0.2)
          utils.openCastShadow(gltf.scene) // 产生阴影
          gltf.scene.name = '办公大厅'
          scene.add(gltf.scene)
          scene.add(utils.createLabel(gltf.scene)) // 添加标签
        },
        xhr => {
          // console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + '% loaded')
        },
        error => {
          console.log('error3333:', error)
        },
      )

      loader.load('/threejs/models/park1/glb/guanggao.glb', gltf => {
        gltf.scene.rotateY(-Math.PI / 2)
        gltf.scene.position.set(4, -10, -35)
        gltf.scene.scale.set(2.7, 2.7, 2.7)
        // utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '广告牌'

        let video = document.createElement('video')
        video.src = '/threejs/models/park1/video/bi.mp4'
        video.autoplay = true // 自动播放
        video.loop = true // 循环播放
        video.muted = true // 静音
        video.play() // 播放
        let texture = new THREE.VideoTexture(video)
        texture.wrapS = THREE.RepeatWrapping // 水平方向重复
        texture.wrapT = THREE.RepeatWrapping // 垂直方向重复
        texture.repeat.set(1, 1) // 设置重复次数
        let Object_6 = gltf.scene.getObjectByName('Object_6')
        Object_6.material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })
        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/drone/wrj.glb', gltf => {
        gltf.scene.rotateY(-Math.PI / 2)
        gltf.scene.position.set(16, 12, 5)
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '无人机'
        gltf.scene.add(utils.createLabel(gltf.scene, false))
        scene.add(gltf.scene)

        gsap.to(gltf.scene.position, {
          duration: 10, // 动画持续时间
          x: gltf.scene.position.x + 10,
          y: gltf.scene.position.y + 2,
          z: gltf.scene.position.z + 7,
          repeat: -1, // 无限循环
          yoyo: true, // 往返运动
          ease: 'Expo.inOut', // 缓动函数
        })
      })

      loader.load('/threejs/models/park1/glb/ren.glb', gltf => {
        man = gltf.scene
        gltf.scene.position.set(13, 0, 15)
        utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '人'
        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/gltf/shiyanlou.gltf', gltf => {
        console.log('实验楼:', gltf.scene)
        gltf.scene.rotateY(Math.PI / 2)
        gltf.scene.position.set(-16, 0, 0)
        gltf.scene.scale.set(0.7, 0.7, 0.7)
        utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '实验楼'
        scene.add(gltf.scene)
        scene.add(utils.createLabel(gltf.scene)) // 添加标签
      })

      loader.load('/threejs/models/park1/gltf/car13.gltf', gltf => {
        car = gltf.scene
        gltf.scene.position.set(11.5, 0, 18)
        gltf.scene.scale.set(1, 1, 1)
        utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '快递车'
        gltf.scene.add(utils.createLabel(gltf.scene, false))
        scene.add(gltf.scene)
      })
      loader.load('/threejs/models/park1/tree_animate/scene.gltf', gltf => {
        gltf.scene.position.set(8, 0, 26)
        gltf.scene.scale.set(0.08, 0.08, 0.08)
        utils.openCastShadow(gltf.scene) // 产生阴影
        gltf.scene.name = '树'
        scene.add(gltf.scene)
      })
    }

    addSkyBox(2) //添加天空盒子
    loaderModel() //加载模型
    let {curveCar, curveObjectCar} = utils.makeCurveCar(scene) //添加汽车行驶路线
    let {curveCarMan, curveObjectCarMan} = utils.makeCurveMan(scene) //添加人行驶路线
    scene.add(curveObjectCar)
    scene.add(curveObjectCarMan)
    console.log(scene)

    const stats = new Stats() // 9、添加性能监控
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats.dom)

    const stats2 = new Stats() // 9、添加性能监控
    stats2.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats2.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats2.dom)

    const stats3 = new Stats() // 9、添加性能监控
    stats3.showPanel(2) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats3.dom.style.position = 'unset'
    statsRef.current!.appendChild(stats3.dom)

    composerRef.current = new EffectComposer(renderer) // 10、添加后期处理
    const renderPass = new RenderPass(scene, cameraRef.current)
    composerRef.current.addPass(renderPass)

    outlinePassRef.current = new OutlinePass(
      new THREE.Vector2(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight),
      scene,
      cameraRef.current,
    )
    outlinePassRef.current.edgeStrength = 3 // 边缘强度
    outlinePassRef.current.edgeGlow = 0.7 // 边缘光
    outlinePassRef.current.edgeThickness = 1 // 边缘厚度
    outlinePassRef.current.pulsePeriod = 2 // 闪烁频率
    outlinePassRef.current.visibleEdgeColor.set('#ffffff') // 可见边缘颜色
    outlinePassRef.current.hiddenEdgeColor.set('#190a05') // 隐藏边缘颜色
    composerRef.current.addPass(outlinePassRef.current)

    control.current = new OrbitControls(cameraRef.current, renderer.domElement)
    const animate = () => {
      requestAnimationFrame(animate)
      control.current.update()
      stats.update()
      stats2.update()
      stats3.update()
      anim.moveOnCurve({scene, camera: cameraRef.current, car, curve: curveCar, isDriverView}) // 汽车沿着曲线移动 使汽车动起来
      // anim.moveOnCurve({scene, car: man, curve: curveCarMan}) // 人沿着曲线移动 使汽车动起来
      renderer.render(scene, cameraRef.current)
      composerRef.current.render()
      if (threeDomCurrent) {
        labelRenderer2D(threeDomCurrent).render(scene, cameraRef.current)
      }
    }
    animate()

    window.addEventListener('resize', () => {
      cameraRef.current.aspect = threeDomCurrent.clientWidth / threeDomCurrent.clientHeight
      cameraRef.current.updateProjectionMatrix()
      renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    })
    console.dir(threeDomCurrent)
    let offsetLeft = threeDomCurrent.parentNode.offsetLeft || 0 // 获取父元素距离左边的距离
    let offsetTop = threeDomCurrent.parentNode.offsetTop || 0 // 获取父元素距离上边的距离
    console.log('offsetLeft:', offsetLeft)
    console.log('offsetTop:', offsetTop)
    // let offsetLeft = 0 // 获取父元素距离左边的距离
    // let offsetTop = 0 // 获取父元素距离上边的距离

    const mousemove: any = event => {
      // threeDomCurrent.addEventListener('click', event => {
      event.preventDefault()
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()
      mouse.x = ((event.clientX - offsetLeft) / threeDomCurrent.clientWidth) * 2 - 1
      mouse.y = -((event.clientY - offsetTop) / threeDomCurrent.clientHeight) * 2 + 1
      raycaster.setFromCamera(mouse, cameraRef.current)

      const intersects = raycaster.intersectObjects(scene.children, true)
      // 获取需要高亮的mesh
      const highlightMeshArr = scene.children.filter(item => highlightArr.includes(item.name))
      const highlightMeshArr2 = scene.children.filter(item => modelSelect.includes(item.name))
      if (intersects.length > 0) {
        let object = intersects[0].object
        for (let mesh of highlightMeshArr) {
          // 如果当前高亮的mesh在鼠标移入的mesh中
          if (mesh.name === '办公大厅') {
            console.log('object:', object)
            if (modelSelect.includes(object.parent.name)) {
              selectFloorName = object.parent.name
              if (mesh.getObjectByName(object.name)) {
                mesh.getObjectByName(object.parent.name).traverse(child => {
                  if (child.isMesh) {
                    child.material = new THREE.MeshPhongMaterial({
                      color: 'yellow',
                      transparent: true,
                      opacity: 0.8,
                      emissive: child.material.color,
                      emissiveMap: child.material.map,
                      emissiveIntensity: 3,
                    })
                  }
                })
                break
              }
            }
            // 如果当前高亮的mesh不在鼠标移入的mesh中
            let temparr = modelSelect.filter(item => !item.includes(object.parent.name))
            // console.log('temparr:', temparr)
            for (let item of temparr) {
              // console.log('item:', item)
              // console.log('mesh.getObjectByName(item):', mesh.getObjectByName(item))
              // console.log('mesh', mesh)
              mesh.getObjectByName(item).traverse(function (child) {
                if (child.isMesh && child.parent.name != selectFloorName) {
                  child.material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color('#123ca8'),
                    transparent: true,
                    opacity: 0.5,
                    emissiveMap: child.material.map,
                  })
                }
              })
            }
          } else {
            if (mesh.getObjectByName(object.name)) {
              outlinePassRef.current.selectedObjects = [mesh]
              break
            } else {
              outlinePassRef.current.selectedObjects = []
            }
          }
        }
      }
    }
    threeDomCurrent.addEventListener('mousemove', utils.debounce(mousemove, 100))
  }

  React.useEffect(() => {
    init()
  }, [])

  const onAutoRotate = () => {
    control.current.autoRotate = !control.current.autoRotate
    setAutoRotate(pre => !pre)
  }

  const onViewReset = () => {
    isDriverView.current = false
    setAutoRotate(false)
    control.current.autoRotate = false
    gsap.to(cameraRef.current.position, {
      // x: CameraInitPosition.x,
      // y: CameraInitPosition.y,
      // z: CameraInitPosition.z,
      x: 17,
      y: 10,
      z: 52,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {},
    })
    gsap.to(control.current.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {},
    })
  }

  const onViewAd = () => {
    isDriverView.current = false
    setAutoRotate(false)
    control.current.autoRotate = false
    gsap.to(cameraRef.current.position, {
      x: 4,
      y: 25,
      z: -10,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {},
    })
    gsap.to(control.current.target, {
      x: 4,
      y: 25,
      z: -30,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {},
    })
  }
  const onViewDriver = () => {
    if (!isDriverView.current === false) {
      cameraRef.current.position.set(17, 10, 52) // 相机位置
      cameraRef.current.lookAt(0, 0, 0) // 相机焦点
    }
    isDriverView.current = !isDriverView.current
  }

  return (
    <div className="threejs-park-1-wrap">
      <div ref={statsRef} style={{position: 'absolute', left: '0', top: '0', zIndex: 1}}></div>
      <div ref={threeDomRef} style={{width: '100%', height: '100%'}}></div>
      <video id="videoContainer" style={{display: 'none'}}></video>
      <div className="ctrl-wrap">
        <div className="ctrl-wrap-list">
          <div className="ctrl-item" onClick={onViewReset}>
            场景重置
          </div>
          <div className="ctrl-item" onClick={onAutoRotate}>
            {autoRotate ? '停止旋转' : '自动旋转'}
          </div>
          <div className="ctrl-item" onClick={onViewAd}>
            广告视角
          </div>
          <div className="ctrl-item" onClick={onViewDriver}>
            司机视角
          </div>
        </div>
      </div>
    </div>
  )
}
export default PageViewPart1
