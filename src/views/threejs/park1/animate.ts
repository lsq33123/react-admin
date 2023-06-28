
import * as THREE from 'three'

//汽车沿着曲线移动

let progress = 0; // 物体运动时在运动路径的初始位置，范围0~1
const velocity = 0.0005; // 影响运动速率的一个值，范围0~1，需要和渲染频率结合计算才能得到真正的速率
const moveOnCurve = ({ scene, camera, car, curve, isDriverView }) => {
  if (curve && car) {
    if (progress <= 1 - velocity) {
      // var box = new THREE.Box3(); // 创建包围盒
      // box.setFromObject(car); // 设置包围盒
      // if (car.position.z.toFixed(2) >= 28.00 && car.position.z.toFixed(2) <= 28.10) {
      //   gsap.to()
      // }




      const point = curve.getPointAt(progress) // 获取曲线上某点的坐标
      const pointBox = curve.getPointAt(progress + velocity) // 获取曲线上某点的坐标

      if (point && pointBox) {
        car.position.set(point.x, point.y, point.z)
        //因为这个模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。
        car.lookAt(pointBox)
        if (isDriverView.current) {
          camera.position.set(point.x, point.y + 2, point.z)
          camera.lookAt(pointBox.x, pointBox.y + 2, pointBox.z)
        }

      }
      progress += velocity
    } else {
      progress = 0
    }
  }
}

export {
  moveOnCurve
}
