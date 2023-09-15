/** @format */

import React, {createRef, useEffect} from 'react'
import * as THREE from 'three'
import './index.less'
import createBackgroundMaterial from './materials/createBackground.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import urlRoom from './resources/room.glb'
import urlImageBaked from './resources/baked.webp'
const PageViewMiniRoom = () => {
  const threeRef: any = createRef<HTMLDivElement>()
  const textureLoader = new THREE.TextureLoader()

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./threejs/draco/')

  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  const init = () => {
    const threeEl = threeRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, threeEl.clientWidth / threeEl.clientHeight, 0.1, 100)
    camera.position.set(3.25, 1.02, 3.47)

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(threeEl.clientWidth, threeEl.clientHeight)
    threeEl.appendChild(renderer.domElement)

    const backgroundGeometry = new THREE.PlaneGeometry(2, 2, 2, 2)
    const backgroundMaterial = createBackgroundMaterial()
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
    backgroundMesh.frustumCulled = false
    backgroundMesh.matrixAutoUpdate = false
    backgroundMesh.updateMatrix()
    scene.add(backgroundMesh)

    // Load room
    const roomTexture = textureLoader.load(urlImageBaked)
    roomTexture.flipY = false
    roomTexture.encoding = THREE.sRGBEncoding
    gltfLoader.load(urlRoom, gltf => {
      const bakedMesh: THREE.Mesh = gltf.scene.children.find(child => child.name === 'main')
      bakedMesh.material = new THREE.MeshBasicMaterial({map: roomTexture})
      scene.add(gltf.scene)
    })

    var control = new OrbitControls(camera, renderer.domElement)
    control.enableDamping = true
    const animate = function () {
      requestAnimationFrame(animate)

      // 更新相机插件
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

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="page-all-wrap">
      <div ref={threeRef} className="three-wrap"></div>
      <div className="context-wrap">
        <h3>来源：https://github.com/luosijie/threejs-examples</h3>
      </div>
    </div>
  )
}
export default PageViewMiniRoom
