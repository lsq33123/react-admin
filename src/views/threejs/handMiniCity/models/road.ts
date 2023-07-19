import * as THREE from 'three'
import * as utils from '../utils'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
// 添加路
const addRoad = (scene: THREE.Scene) => {
  let road = new THREE.Object3D()
  let roadColor = 0xffffff

  //道路最外面的白色方框
  var roadBorderOuterCoords = [
    [-160, 160],
    [160, 160],
    [160, -160],
    [-160, -160],
  ]
  var roadBorderOuterHoleCoords = [
    [-159, 159],
    [-159, -159],
    [159, -159],
    [159, 159]
  ]
  let roadBorderOuterShape = utils.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords)
  let roadBorderOuterGeometry = utils.makeExtrudeGeometry(roadBorderOuterShape, 0.1)
  let roadBorderOuter = utils.makeMesh('lambert', roadBorderOuterGeometry, roadColor)
  road.add(roadBorderOuter)

  //道路里面的白色方框
  let roadBorderInnerCoords = [
    [-131, 131],
    [-131, -131],
    [131, -131],
    [131, 131],
    [19, 131],
    [19, 99],
    [99, 99],
    [99, -99],
    [-99, -99],
    [-99, 99],
    [-19, 99],
    [-19, 131]
  ]
  let roadBorderInnerShape = utils.makeShape(roadBorderInnerCoords)
  let roadBorderInnnerGeometry = utils.makeExtrudeGeometry(roadBorderInnerShape, 0.1)
  let roadBoaderInnder = utils.makeMesh('phong', roadBorderInnnerGeometry, roadColor)
  roadBoaderInnder.rotation.y = Math.PI
  road.add(roadBoaderInnder)


  //d道路中间的白色线条
  const roadLines: any = []
  let roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2)

  const roadLinesBottomGeometrys: any = []
  for (let i = 0; i < 9; i++) {
    let geometry = roadLineGeometry.clone()
    geometry.translate(i * 30, 0, -1)
    roadLinesBottomGeometrys.push(geometry)
  }
  const roadLinesBottomGeometry = mergeBufferGeometries(roadLinesBottomGeometrys)
  roadLinesBottomGeometry.translate(-120, 0, 145)
  roadLines.push(roadLinesBottomGeometry)


  var roadLinesTopGeometry = roadLinesBottomGeometry.clone()
  roadLinesTopGeometry.translate(0, 0, -290)
  roadLines.push(roadLinesTopGeometry)

  var roadLinesLeftGeometry = roadLinesBottomGeometry.clone()
  roadLinesLeftGeometry.rotateY(0.5 * Math.PI)
  roadLines.push(roadLinesLeftGeometry)

  var roadLinesRightGeometry = roadLinesBottomGeometry.clone()
  roadLinesRightGeometry.rotateY(-0.5 * Math.PI)
  roadLines.push(roadLinesRightGeometry)

  const roadLinesGeometry = mergeBufferGeometries(roadLines)
  const roadLinesMesh = utils.makeMesh('phong', roadLinesGeometry, roadColor)
  road.add(roadLinesMesh)
  scene.add(road)
}

export {
  addRoad
}