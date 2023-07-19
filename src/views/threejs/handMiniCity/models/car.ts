import * as THREE from 'three'
import Car from './carClass'
let movingCars: any = []
// 添加静止汽车
const addStaticCar = (scene: THREE.Scene) => {
  let carsPosition = [
    [-84, 82, 1.5],
    [-58, 82, 1.5],
    [-32, 82, 1.5],
    [84, 82, 1.5]
  ]
  carsPosition.forEach(item => {
    let x = item[0]
    let z = item[1]
    let r = item[2]
    let car = new Car()
    car.setPosition(x, 0, z)
    car.mesh.rotation.y = r * Math.PI
    scene.add(car.mesh)
  })
}
// 添加移动汽车
const addMovingCar = (scene: THREE.Scene) => {
  let carsPosition = [
    [-130, 145, 0],
    [10, 145, 0],
    [145, 20, 0.5],
    [30, -145, 1],
    [-145, -60, 1.5]
  ]
  carsPosition.forEach(item => {
    let car = new Car()
    let x = item[0]
    let z = item[1]
    let r = item[2]
    car.setPosition(x, 0, z)
    car.mesh.rotation.y = r * Math.PI
    movingCars.push(car)
    scene.add(car.mesh)
  })
}

const onCarMoveing = () => {
  movingCars.forEach(item => {
    moveing(item)
  })
}
const moveing = (car) => {
  var angle = car.mesh.rotation.y
  var x = car.mesh.position.x,
    z = car.mesh.position.z

  if (x < 145 && z === 145) {
    car.forward()
  } else if (angle < 0.5 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x === 145 && z > -145) {
    car.forward()
  } else if (angle < Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x > -145 && z == -145) {
    car.forward()
  } else if (angle < 1.5 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x === -145 && z < 145) {
    car.mesh.rotation.y = 1.5 * Math.PI
    car.forward()
  } else if (angle < 2 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else {
    car.setPosition(-145, 0, 145)
    car.mesh.rotation.set(0, 0, 0)
  }
}

export {
  addStaticCar,
  addMovingCar,
  onCarMoveing,
}