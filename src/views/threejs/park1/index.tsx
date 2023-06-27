/** @format */

import React from 'react'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
interface IProps {
  //props:any
}

const PageViewPart1: React.FC<IProps> = props => {
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

    camera.position.set(17, 10, 52) // 相机位置
    camera.lookAt(0, 0, 0) // 相机焦点

    const renderer = new THREE.WebGLRenderer() // 渲染器
    renderer.shadowMap.enabled = true // 阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

    renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    threeDomCurrent.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // 5、添加环境光
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('rgb(253,253,253)') // 6、添加平行光
    directionalLight.position.set(100, 100, -10)
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
    addSkyBox(2)

    var sphereGeo = new THREE.SphereGeometry(16, 40, 40) //创建球体
    var sphereMat = new THREE.MeshLambertMaterial({
      //创建材料
      color: 0x0000ff,
      wireframe: false,
    })
    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat) //创建球体网格模型
    sphereMesh.position.set(5, 30, 0) //设置球的坐标
    sphereMesh.castShadow = true //允许投射阴影
    sphereMesh.receiveShadow = true //允许接收阴影
    scene.add(sphereMesh) //将球体添加到场景

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
          gltf.scene.castShadow = true // 产生阴影
          gltf.scene.receiveShadow = true // 接收阴影
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
          gltf.scene.rotateY(Math.PI)
          gltf.scene.position.set(16, 0, -25)
          gltf.scene.scale.set(0.2, 0.2, 0.2)
          gltf.scene.castShadow = true // 产生阴影
          gltf.scene.receiveShadow = true // 接收阴影
          gltf.scene.name = '办公大厅'
          scene.add(gltf.scene)
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
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
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

        // gltf.scene.traverse(child => {
        //   if (child instanceof THREE.Mesh) {
        //     child.material = new THREE.MeshBasicMaterial({
        //       map: texture,
        //       side: THREE.DoubleSide,
        //     })
        //   }
        // })

        //没效果
        // gltf.scene.material = new THREE.MeshBasicMaterial({
        //   map: texture,
        //   transparent: true,
        //   side: THREE.DoubleSide,
        // })

        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/drone/wrj.glb', gltf => {
        gltf.scene.rotateY(-Math.PI / 2)
        gltf.scene.position.set(16, 12, 5)
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
        gltf.scene.name = '无人机'
        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/glb/ren.glb', gltf => {
        gltf.scene.position.set(13, 0, 15)
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
        gltf.scene.name = '人'
        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/gltf/shiyanlou.gltf', gltf => {
        gltf.scene.rotateY(Math.PI / 2)
        gltf.scene.position.set(-16, 0, 0)
        gltf.scene.scale.set(0.7, 0.7, 0.7)
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
        gltf.scene.name = '实验楼'
        scene.add(gltf.scene)
      })

      loader.load('/threejs/models/park1/gltf/car13.gltf', gltf => {
        gltf.scene.position.set(11.5, 0, 18)
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
        gltf.scene.name = '快递车'
        scene.add(gltf.scene)
      })
      loader.load('/threejs/models/park1/tree_animate/scene.gltf', gltf => {
        gltf.scene.position.set(8, 0, 26)
        gltf.scene.scale.set(0.08, 0.08, 0.08)
        gltf.scene.castShadow = true // 产生阴影
        gltf.scene.receiveShadow = true // 接收阴影
        gltf.scene.name = '树'
        scene.add(gltf.scene)
      })
    }
    loaderModel()
    var control = new OrbitControls(camera, renderer.domElement)
    const animate = () => {
      requestAnimationFrame(animate)
      control.update()
      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', () => {
      camera.aspect = threeDomCurrent.clientWidth / threeDomCurrent.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeDomCurrent.clientWidth, threeDomCurrent.clientHeight)
    })
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div ref={threeDomRef} style={{width: '100%', height: 'calc(100vh - 64px)'}}></div>
      <video id="videoContainer" style={{display: 'none'}}></video>
    </>
  )
}
export default PageViewPart1
