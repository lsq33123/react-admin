import * as THREE from 'three'
import * as utils from '../utils'

const addGreen = (scene: THREE.Scene) => {
  let greenCoords = [
    [-120, -120],
    [-120, 120],
    [120, 120],
    [120, -120],
    [20, -120],
    [20, -100],
    [100, -100],
    [100, 100],
    [-100, 100],
    [-100, -100],
    [-20, -100],
    [-20, -120],
    [-120, -120]
  ]

  let greenShape = utils.makeShape(greenCoords)
  let greenGeometry = utils.makeExtrudeGeometry(greenShape, 3)
  let green = utils.makeMesh('lambert', greenGeometry, 0xc0c06a)
  scene.add(green)

}

export {
  addGreen,
}