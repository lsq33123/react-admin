import * as THREE from 'three'
import * as utils from '../utils'

// 创建地面
const addGround = (scene: THREE.Scene) => {
  const boxGeometry = new THREE.BoxGeometry(320, 6, 320)
  let box = utils.makeMesh('lambert', boxGeometry, 0x6f5f6a)
  box.position.y = -3
  scene.add(box)
}

export {
  addGround,
}