import * as THREE from 'three'
import * as utils from '../utils'
// 添加路灯底座
const addFense = (scene: THREE.Scene) => {
  var fenseCoords = [
    [-130, -130],
    [-130, 130],
    [130, 130],
    [130, -130],
    [20, -130],
    [20, -120],
    [120, -120],
    [120, 120],
    [-120, 120],
    [-120, -120],
    [-20, -120],
    [-20, -130],
    [-130, -130]
  ]
  var fenseShape = utils.makeShape(fenseCoords)

  var fenseGeometry = utils.makeExtrudeGeometry(fenseShape, 3)
  var fense = utils.makeMesh('lambert', fenseGeometry, 0xe5cabf)
  scene.add(fense)
}

export {
  addFense
}