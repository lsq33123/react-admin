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