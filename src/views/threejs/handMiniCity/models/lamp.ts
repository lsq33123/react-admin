import * as THREE from 'three'
import * as utils from '../utils'

//创建路灯
const createLamp = () => {
  let lamp = new THREE.Object3D()
  let pillarGeometry = new THREE.BoxGeometry(2, 30, 2) // 柱子
  pillarGeometry.translate(0, 15, 0) // 柱子位置
  let pillar = utils.makeMesh('phong', pillarGeometry, 0xebd1c2)
  lamp.add(pillar)

  let connectGeometry = new THREE.BoxGeometry(10, 1, 1) // 连接处
  let connect = utils.makeMesh('phong', connectGeometry, 0x2c0e0e)
  connect.position.set(3, 30, 0)
  lamp.add(connect)

  let bulbGeometry = new THREE.BoxGeometry(6, 2, 4) // 灯泡
  let bulb = utils.makeMesh('phong', bulbGeometry, 0xebd1c2)
  bulb.position.set(10, 30, 0)
  lamp.add(bulb)

  return lamp
}


// 添加路灯
const addLamps = (scene: THREE.Scene) => {
  let lampsPosition = [
    [-12.5, 12.5, 1.25],
    [-7.5, 12.5, -0.5],
    [-2.5, 12.5, -0.5],
    [2.5, 12.5, -0.5],
    [7.5, 12.5, -0.5],
    [12.5, 12.5, -0.25],
    [12.5, 7.5, 0],
    [12.5, 2.5, 0],
    [12.5, -2.5, 0],
    [12.5, -7.5, 0],
    [12.5, -12.5, 0.25],
    [7.5, -12.5, 0.5],
    [2.5, -12.5, 0.5],
    [-2.5, -12.5, 0.5],
    [-7.5, -12.5, 0.5],
    [-12.5, -12.5, 0.75],
    [-12.5, -7.5, 1],
    [-12.5, -2.5, 1],
    [-12.5, 2.5, 1],
    [-12.5, 7.5, 1],
  ]

  lampsPosition.forEach(item => {
    let x = item[0] * 10
    let z = item[1] * 10
    let r = item[2]
    let lamp = createLamp()
    lamp.rotation.y = r * Math.PI  // 旋转角度
    lamp.position.set(x, 0, z)
    scene.add(lamp)
  })


}

export {
  addLamps,
}