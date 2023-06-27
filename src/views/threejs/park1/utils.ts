import * as THREE from 'three'
import { tag as tag2D } from '../utils/tag2D.js'
import gsap from 'gsap'
//开启阴影
export const openCastShadow = (mesh: THREE.Mesh) => {
  mesh.castShadow = true
  mesh.receiveShadow = true
  if (mesh.children.length) {
    mesh.children.forEach((item: any) => {
      openCastShadow(item)
    })
  }

  // mesh.traverse(child => {
  //   if (child instanceof THREE.Mesh) {
  //     child.castShadow = true
  //     child.receiveShadow = true
  //   }
  // })

}

//创建label 2d
//absolute 是否绝对定位 true基于整个场景 true基于物体
export const createLabel = (mesh: THREE.Mesh, absolute = true) => {
  var box = new THREE.Box3(); // 创建包围盒
  box.setFromObject(mesh); // 设置包围盒
  var size = new THREE.Vector3(); // 用于存储物体的长宽高
  var center = new THREE.Vector3(); // 用于存储物体的中心点
  box.getSize(size);
  box.getCenter(center);
  const label2d = tag2D(mesh.name)
  const pos = new THREE.Vector3(0, 0, 0)
  mesh.getWorldPosition(pos)
  if (absolute) {
    label2d.position.set(center.x, pos.y + size.y + 2, center.z)
  } else {
    label2d.position.set(0, pos.y + size.y + 2, 0)
  }
  gsap.to(label2d.position, {
    duration: 1, // 动画持续时间
    y: pos.y + size.y + 1, // 动画结束时的值
    repeat: -1, // 无限循环
    yoyo: true, // 往返运动
    ease: 'Bounce.inOut', // 缓动函数
  })

  return label2d

}


export const makeCurve = (scene: THREE.Scene) => {
  let curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(11.5, 0, 18),
    new THREE.Vector3(11.5, 0, 34),
    new THREE.Vector3(35, 0, 34),
    new THREE.Vector3(35, 0, 31),
    new THREE.Vector3(11.5, 0, 31),
  ]);
  curve.curveType = "catmullrom"; //设置曲线类型
  curve.closed = true;//设置是否闭环 默认为false
  curve.tension = 0; //设置线的张力，0为无弧度折线 1为圆弧 默认0.5
  // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
  //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
  const points = curve.getPoints(100);//分段数100，返回101个顶点
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  const curveObject = new THREE.Line(geometry, material);
  // curveObject.position.y = 3
  return {
    curve,
    curveObject
  }
}
