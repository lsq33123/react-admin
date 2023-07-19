import * as THREE from 'three'
import * as utils from '../utils'
import * as textures from '../textures'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'


const createWindow = () => {
  var windowObj = new THREE.Object3D()
  var glassGeometry = new THREE.PlaneGeometry(20, 20)
  var glass = utils.makeMesh('phong', glassGeometry, 0x6a5e74)
  windowObj.add(glass)

  var windowBorderGeometry = new THREE.BoxGeometry(22, 2, 2)
  var windowBorder = utils.makeMesh('phong', windowBorderGeometry, 0xffffff)

  var windowBorderTop = windowBorder.clone()
  windowBorderTop.position.y = 10
  windowObj.add(windowBorderTop)

  var windowBorderBottom = windowBorder.clone()
  windowBorderBottom.position.y = -10
  windowObj.add(windowBorderBottom)

  var windowBorderLeft = windowBorder.clone()
  windowBorderLeft.rotation.z = 0.5 * Math.PI
  windowBorderLeft.position.x = -10
  windowObj.add(windowBorderLeft)

  var windowBorderRight = windowBorderLeft.clone()
  windowBorderRight.position.x = 10
  windowObj.add(windowBorderRight)

  return windowObj
}


//创建医院
const createHospital = () => {
  let hospital = new THREE.Object3D()


  let baseGeometry = new THREE.BoxGeometry(180, 3, 140) //白色底座
  let base = utils.makeMesh('lambert', baseGeometry, 0xffffff)
  base.position.y = 1
  hospital.add(base)

  //前部分
  let frontMainCoords = [
    [-80, -30],
    [-80, 20],
    [50, 20],
    [50, 0],
    [20, -30],
    [-80, -30]
  ]
  let frontMainShape = utils.makeShape(frontMainCoords)
  let frontMainGeometry = utils.makeExtrudeGeometry(frontMainShape, 100)
  let frontMainMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
  frontMainMaterial.map.repeat.set(0.1, 0.08)
  let frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial)
  frontMain.castShadow = true
  frontMain.receiveShadow = true
  hospital.add(frontMain)

  //前部分顶部 顶盖
  let frontTopShape = frontMainShape
  let frontTopGeometry = utils.makeExtrudeGeometry(frontTopShape, 5)
  let frontTop = utils.makeMesh('lambert', frontTopGeometry, 0xb1a7af)
  frontTop.position.y = 100
  hospital.add(frontTop)


  // 前部分顶部 顶盖上的突起   楼顶白色架子
  const frontRoofShelfs: any = []
  let frontRoofShelfCubeGeometry = new THREE.BoxGeometry(2, 2, 40)
  // for z-axis
  for (let i = 0; i < 12; i++) {
    let geometry = frontRoofShelfCubeGeometry.clone()
    geometry.translate(i * 5, 0, 0)
    frontRoofShelfs.push(geometry)
  }
  // for x-axis
  for (let i = 0; i < 2; i++) {
    let geometry = frontRoofShelfCubeGeometry.clone()
    geometry.rotateY(0.5 * Math.PI)
    geometry.scale(1.6, 1, 1)
    geometry.translate(27, 0, -15 + i * 30)
    frontRoofShelfs.push(geometry)
  }
  // for y-axis
  let frontRoofShelfCubeYPosition = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ]
  for (let i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
    let p = frontRoofShelfCubeYPosition[i]
    let geometry = frontRoofShelfCubeGeometry.clone()
    geometry.scale(1, 1, 0.4)
    geometry.rotateX(0.5 * Math.PI)
    geometry.translate(p[0] * 55, 0, -15 + p[1] * 30)
    frontRoofShelfs.push(geometry)
  }
  const frontRoofShelfGeometry = mergeBufferGeometries(frontRoofShelfs)
  let frontRoofShelf = utils.makeMesh('phong', frontRoofShelfGeometry, 0xffffff)
  frontRoofShelf.position.set(-70, 112, 5)
  hospital.add(frontRoofShelf)

  //中间 蓝色水平挡板
  let frontPlatGeometry = new THREE.BoxGeometry(150, 3, 90)
  let fronPlat = utils.makeMesh('lambert', frontPlatGeometry, 0x0792a5)
  fronPlat.position.set(-3, 18, 25)
  hospital.add(fronPlat)
  //中间 蓝色竖直挡板
  let frontPlatVerticalGeometry = new THREE.BoxGeometry(150, 15, 3)
  let frontPlatVertical = utils.makeMesh('phong', frontPlatVerticalGeometry, 0x0792a5)
  frontPlatVertical.receiveShadow = false
  frontPlatVertical.position.set(-3, 24, 68.5)
  hospital.add(frontPlatVertical)
  //中间 白色竖直挡板
  let frontPlatVerticalWhiteGeometry = new THREE.BoxGeometry(150, 3, 3)
  let frontPlatVerticalWhite = utils.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xffffff)
  frontPlatVerticalWhite.position.set(-3, 33, 68.5)
  hospital.add(frontPlatVerticalWhite)
  //白色地面于蓝色挡板之间的连接 白色柱子-左
  let frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32)
  let frontPlatPillar = utils.makeMesh('lambert', frontPlatPillarGeometry, 0xffffff)
  frontPlatPillar.position.set(-60, 10, 55)
  hospital.add(frontPlatPillar)
  //白色地面于蓝色挡板之间的连接 白色柱子-右
  let frontPlatPillar2 = frontPlatPillar.clone()
  frontPlatPillar2.position.set(55, 10, 55)
  hospital.add(frontPlatPillar2)

  //医院周围的3根白色柱子
  let frontBorderVerticles = new THREE.Object3D()
  let frontBorderVerticleGeometry = new THREE.BoxGeometry(4, 106, 4)
  let frontBorderVerticleMesh = utils.makeMesh('phong', frontBorderVerticleGeometry, 0xffffff)
  let frontBorderVerticle1 = frontBorderVerticleMesh.clone()
  frontBorderVerticle1.position.set(-80, 52, 30)
  frontBorderVerticles.add(frontBorderVerticle1)
  let frontBorderVerticle2 = frontBorderVerticleMesh.clone()
  frontBorderVerticle2.position.set(-80, 52, -20)
  frontBorderVerticles.add(frontBorderVerticle2)
  let frontBorderVerticle3 = frontBorderVerticleMesh.clone()
  frontBorderVerticle3.position.set(50, 52, -18)
  frontBorderVerticles.add(frontBorderVerticle3)
  hospital.add(frontBorderVerticles)

  //医院顶部的白色围墙
  let frontRoofCoords = [
    [-82, -32],
    [20, -32],
    [52, 0],
    [52, 22],
    [-82, 22],
    [-82, -32]
  ]
  let frontRoofHolePath = [
    [-78, -28],
    [20, -28],
    [48, 0],
    [48, 18],
    [-78, 18],
    [-78, -28]
  ]
  let frontRoofShape = utils.makeShape(frontRoofCoords, frontRoofHolePath)
  let frontRoofGeometry = utils.makeExtrudeGeometry(frontRoofShape, 8)
  let frontRoof = utils.makeMesh('phong', frontRoofGeometry, 0xffffff)
  frontRoof.position.y = 100
  hospital.add(frontRoof)

  //医院后方的黄色围墙
  let backMainCoords = [
    [-80, 20],
    [-80, 60],
    [80, 60],
    [80, 20],
    [-80, 20]
  ]
  let backMainHolePath = [
    [-78, 22],
    [78, 22],
    [78, 58],
    [-78, 58],
    [-78, 22]
  ]
  let backMainShape = utils.makeShape(backMainCoords, backMainHolePath)
  let backMainGeometry = utils.makeExtrudeGeometry(backMainShape, 90)
  let backMain = utils.makeMesh('lambert', backMainGeometry, 0xf2e21b)
  hospital.add(backMain)

  //医院后方的黄色围墙上的白色围墙
  let backMiddleCoords = [
    [0, 0],
    [36, 0],
    [36, 70],
    [0, 70],
    [0, 0]
  ]
  let backMiddleHolePath = [
    [2, 2],
    [34, 2],
    [34, 68],
    [2, 68],
    [2, 2]
  ]
  let backMiddleShape = utils.makeShape(backMiddleCoords, backMiddleHolePath)
  let backMiddkeGeometry = utils.makeExtrudeGeometry(backMiddleShape, 165)
  let backMiddle = utils.makeMesh('lambert', backMiddkeGeometry, 0xffffff)
  backMiddle.rotation.x = -0.5 * Math.PI
  backMiddle.rotation.z = -0.5 * Math.PI
  backMiddle.position.y = 86
  backMiddle.position.z = -58
  backMiddle.position.x = -78
  hospital.add(backMiddle)

  // 医院后方右边的白色围墙的窗户
  let backMiddleWindowGeometry = new THREE.PlaneGeometry(32, 66, 1, 1)
  let backMiddleWindowMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
  backMiddleWindowMaterial.map.repeat.set(2, 6)

  let backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial)
  backMiddleWindow.position.set(83, 51, -40)
  backMiddleWindow.rotation.y = 0.5 * Math.PI
  hospital.add(backMiddleWindow)

  // 医院后方黄色围墙的窗户
  let windowBackOrigin = createWindow()
  windowBackOrigin.scale.set(0.6, 0.6, 1)
  windowBackOrigin.rotation.y = Math.PI
  windowBackOrigin.position.set(65, 75, -61)
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      let windowObj = windowBackOrigin.clone()
      windowObj.position.x -= i * 22
      windowObj.position.y -= j * 20
      hospital.add(windowObj)
    }
  }

  return hospital

}


// 添加医院
const addHospital = (scene: THREE.Scene) => {
  let hospital = createHospital()
  hospital.position.z = -20
  scene.add(hospital)
}

export {
  addHospital,
}