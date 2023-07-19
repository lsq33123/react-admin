import * as THREE from 'three'
import * as utils from '../utils'


// 创建树
const createTree = (x, y, z) => {
  let tree = new THREE.Object3D()
  let trunkGeometry = new THREE.BoxGeometry(2, 16, 2)
  let trunk = utils.makeMesh('lambert', trunkGeometry, 0x8a613a) // 树干
  trunk.position.set(x, y + 10, z)
  tree.add(trunk)

  let leavesGeometry = new THREE.BoxGeometry(8, 8, 8)
  let leaves = utils.makeMesh('lambert', leavesGeometry, 0x9c9e5d) // 树叶
  leaves.position.set(x, y + 18, z)
  tree.add(leaves)

  return tree
}


const addTree = (scene: THREE.Scene) => {
  var treesPosition = [
    [-110, -110],
    [-90, -110],
    [-70, -110],
    [-50, -110],
    [-30, -110],
    [-10, -110],
    [10, -110],
    [30, -110],
    [50, -110],
    [70, -110],
    [90, -110],
    [-110, 110],
    [-110, 90],
    [-110, 70],
    [-110, 50],
    [-110, 30],
    [-110, 10],
    [-110, -10],
    [-110, -30],
    [-110, -50],
    [-110, -70],
    [-110, -90],
    [110, 110],
    [90, 110],
    [70, 110],
    [50, 110],
    [30, 110],
    [-30, 110],
    [-50, 110],
    [-70, 110],
    [-90, 110],
    [110, -110],
    [110, -90],
    [110, -70],
    [110, -50],
    [110, -30],
    [110, -10],
    [110, 10],
    [110, 30],
    [110, 50],
    [110, 70],
    [110, 90],
  ]

  treesPosition.forEach(item => {
    let x = item[0]
    let y = 1
    let z = item[1]
    let tree = createTree(x, y, z)
    scene.add(tree)
  })

}

export {
  addTree,
}