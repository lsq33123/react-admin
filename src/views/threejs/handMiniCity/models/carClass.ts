import { BoxGeometry, CylinderGeometry, Object3D } from 'three'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import * as utils from '../utils'

const colors = [0x2cbab2, 0x47a700, 0xd60000, 0x087f87, 0x37ad0e, 0x4d4d4d, 0xce7e00, 0xe0a213, 0x87bcde]
export default class Car {
  index: number
  color: string | number
  mesh: Object3D
  wheels: Array<Object3D>
  startAngle: number
  constructor(color?: number) {
    console.log('Car constructor')
    this.index = Math.floor(Math.random() * colors.length)
    this.color = color || colors[this.index]
    this.mesh = new Object3D()
    this.wheels = []
    this.startAngle = 0

    this.addBoy()
    this.addWindows()
    this.addLights()
    this.addWheels()
  }
  setPosition(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z)
  }
  private addBoy() {
    const carBodyCoords = [
      [-13, 2],
      [13, 2],
      [13, 8],
      [5, 8],
      [3, 13],
      [-8, 13],
      [-10, 8],
      [-13, 8],
      [-13, 2]
    ]
    let carBodyshape = utils.makeShape(carBodyCoords)
    let carBodyGeometry = utils.makeExtrudeGeometry(carBodyshape, 14)
    carBodyGeometry.translate(0, -7, 0)
    carBodyGeometry.rotateX(0.5 * Math.PI)
    let carBody = utils.makeMesh('phong', carBodyGeometry, this.color)
    this.mesh.add(carBody)
  }

  private addWindows() {
    let carWindows = new Object3D()

    let carWindowLeft = new Object3D()
    let carWindowLeftFrontCoords = [
      [-2, 8],
      [4, 8],
      [2.5, 12],
      [-2, 12]
    ]
    let carWindowLeftFront = this.makeWindow(carWindowLeftFrontCoords)
    carWindowLeft.add(carWindowLeftFront)

    let carWindowLeftBackCoords = [
      [-9, 8],
      [-3, 8],
      [-3, 12],
      [-7.5, 12]
    ]
    let carWindowLeftBack = this.makeWindow(carWindowLeftBackCoords)
    carWindowLeft.add(carWindowLeftBack)
    carWindowLeft.position.z = 7.1
    carWindows.add(carWindowLeft)

    let carWindowRight = carWindowLeft.clone()
    carWindowRight.position.z = -7.1
    carWindows.add(carWindowRight)

    let carWindowFrontGeometry = new BoxGeometry(0.1, 5, 12)
    carWindowFrontGeometry.rotateZ(0.12 * Math.PI)
    carWindowFrontGeometry.translate(4.2, 10, 0)
    let carWindowFront = utils.makeMesh('phong', carWindowFrontGeometry, 0x000000)
    carWindows.add(carWindowFront)

    let carWindowBack = carWindowFront.clone()
    carWindowBack.rotation.z = -0.24 * Math.PI
    carWindowBack.position.x = -19
    carWindowBack.position.y = 6
    // carWindowFrontGeometry.translate(4.2,10,7)
    carWindows.add(carWindowBack)

    this.mesh.add(carWindows)

  }
  private makeWindow(coords: Array<Array<number>>) {
    let windowColor = 0x000000
    let shape = utils.makeShape(coords)
    let geometry = utils.makeExtrudeGeometry(shape, 0.1)
    geometry.rotateX(0.5 * Math.PI)
    let mesh = utils.makeMesh('phong', geometry, windowColor)
    mesh.castShadow = false
    return mesh
  }

  private addLights() {
    let carLightsGeometrys: any = []
    let carLigetGeometry = new BoxGeometry(2, 2, 2)

    let carLightsPosition = [
      [12.5, 7.1, 6.1],
      [12.5, 7.1, -6.1],
      [-14, 7.1, 6.1],
      [-14, 7.1, -6.1]
    ]
    carLightsPosition.forEach(function (elem) {
      let x = elem[0],
        y = elem[1],
        z = elem[2]
      let geometry = carLigetGeometry.clone()
      geometry.translate(x, y, z)
      carLightsGeometrys.push(geometry)
    })

    let carLightFrontGeometry = carLigetGeometry.clone()
    carLightFrontGeometry.scale(1, 1.3, 7.1)
    carLightFrontGeometry.translate(12.1, 3.3, 0)
    carLightsGeometrys.push(carLightFrontGeometry)

    let carLightBackGeometry = carLightFrontGeometry.clone()
    carLightBackGeometry.translate(-26, 0, 0)
    carLightsGeometrys.push(carLightBackGeometry)

    const carLightsGeometry = mergeBufferGeometries(carLightsGeometrys)
    let carLights = utils.makeMesh('phong', carLightsGeometry, 0xffffff)
    this.mesh.add(carLights)

  }

  private addWheels() {
    const createWheel = () => {
      let wheel = new Object3D()
      let wheelOuterGeometry = new CylinderGeometry(3, 3, 3, 32)
      wheelOuterGeometry.rotateX(0.5 * Math.PI)
      let wheelOuter = utils.makeMesh('lambert', wheelOuterGeometry, 0x000000)
      wheel.add(wheelOuter)

      let wheelInner = utils.makeMesh('lambert', wheelOuterGeometry, 0xdddddd)
      wheelInner.castShadow = false
      wheelInner.scale.set(0.8, 0.8, 1.1)
      wheel.add(wheelInner)

      let wheelCenterGeometry = new CylinderGeometry(1, 1, 3.6, 4)
      wheelCenterGeometry.rotateX(0.5 * Math.PI)
      let wheelCenter = utils.makeMesh('lambert', wheelCenterGeometry, 0xa7a7a7)
      wheelCenter.castShadow = false
      wheel.add(wheelCenter)

      return wheel
    }

    let wheelFrontLeft = createWheel()
    wheelFrontLeft.position.set(8, 3, -6)
    this.wheels.push(wheelFrontLeft)
    this.mesh.add(wheelFrontLeft)

    let wheelFrontRight = createWheel()
    wheelFrontRight.position.set(8, 3, 6)
    this.wheels.push(wheelFrontRight)
    this.mesh.add(wheelFrontRight)

    let wheelBackLeft = createWheel()
    wheelBackLeft.position.set(-8, 3, 6)
    this.wheels.push(wheelBackLeft)
    this.mesh.add(wheelBackLeft)

    let wheelBackRight = createWheel()
    wheelBackRight.position.set(-8, 3, -6)
    this.wheels.push(wheelBackRight)
    this.mesh.add(wheelBackRight)

  }

  //转向 angle:转向角度 direction:转向方向 speed:转向速度
  // direction true:左转 false:右转
  private turn(angle: number, direction: boolean, speed: number) {
    const dirValue = direction ? 1 : -1
    if (speed) {
      if (this.startAngle < angle) {
        this.mesh.rotation.y += speed
        this.startAngle += speed
        if (angle - this.startAngle < speed) {
          let originAngle = this.mesh.rotation.y - this.startAngle
          this.mesh.rotation.y = originAngle + angle
          this.startAngle = 0
          return
        }
      }
    } else {
      this.mesh.rotation.y += angle * dirValue
    }
  }

  private moving(speed: number, direction: boolean) {
    let rotation = this.mesh.rotation.y
    const dirValue = direction ? 1 : -1
    let xLength = speed * Math.cos(rotation) * dirValue,
      zLength = speed * Math.sin(rotation) * dirValue
    this.mesh.position.x += xLength
    this.mesh.position.z -= zLength
    this.rotateWheels(speed)
  }

  private rotateWheels(speed: number) {
    this.wheels.forEach(function (elem) {
      elem.rotation.z -= 0.1 * speed
    })
  }

  //前进
  forward(speed: number) {
    speed = speed || 1
    this.moving(speed, true)
  }
  //后退
  backward(speed: number) {
    speed = speed || 1
    this.moving(speed, false)
  }
  //左转
  turnLeft(angle: number, speed: number) {
    this.turn(angle, true, speed)
  }
  //右转
  turnRight(angle: number, speed: number) {
    this.turn(angle, false, speed)
  }


}