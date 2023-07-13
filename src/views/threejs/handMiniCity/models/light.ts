import * as THREE from 'three'

// 添加光源
const addLight = (scene: THREE.Scene) => {
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1) // 平行光
  directionalLight.position.set(-300, 1000, 500)
  directionalLight.target.position.set(0, 0, 0)
  directionalLight.castShadow = true

  let d = 300
  directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600) // 正交投影
  directionalLight.shadow.bias = 0.0001 // 修复阴影贴近物体边缘时出现的黑边
  directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024 // 阴影贴图大小
  scene.add(directionalLight)

  var light = new THREE.AmbientLight(0xffffff, 0.5) // 环境光
  scene.add(light)
}

export {
  addLight
}