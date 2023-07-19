import * as THREE from 'three'

// 创建网格模型 参数：几何体，材质，颜色
// type: 'lambert' | 'phong'
//全部设置阴影
export const makeMesh = (type, geometry, color) => {
  let mesh
  let material
  switch (type) {
    case 'lambert':
      // Lambert网格材质
      material = new THREE.MeshLambertMaterial({
        color: color,
      })
      break;
    case 'phong':
      // Phong网格材质
      material = new THREE.MeshPhongMaterial({
        color: color,
      })
      break;
    default:
      console.error('unrecognized type!')
      break;
  }
  mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}


// 创建线条模型
export const makeShape = (...arg) => {
  let shape
  if (arg.length) {
    shape = new THREE.Shape()
    let arrarg = arg[0]
    shape.moveTo(arrarg[0][0], arrarg[0][1])
    for (let i = 1; i < arrarg.length; i++) {
      shape.lineTo(arrarg[i][0], arrarg[i][1])
    }

    if (arg.length > 1) {
      for (let i = 1; i < arg.length; i++) {
        let holearg = arg[i]
        let holePath = new THREE.Path()
        holePath.moveTo(holearg[0][0], holearg[0][1])
        for (let i = 1; i < holearg.length; i++) {
          holePath.lineTo(holearg[i][0], holearg[i][1])
        }
        shape.holes.push(holePath)
      }
    }
    return shape
  } else {
    console.error('makeShape no arguments!')
  }
}

//根据给定的形状和深度创建一个立体几何体，并将其绕X轴旋转90度后返回。
export const makeExtrudeGeometry = (shape, depth) => {
  let extrudeSetting = {
    steps: 1,
    depth,
    bevelEnabled: false
  }
  let geometry = new THREE.ExtrudeGeometry(shape, extrudeSetting)
  // geometry.computeVertexNormals() // 计算几何体侧面法向量
  geometry.rotateX(-0.5 * Math.PI) // 旋转几何体
  return geometry
}