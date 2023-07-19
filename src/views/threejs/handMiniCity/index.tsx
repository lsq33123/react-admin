/** @format */

import React, {useEffect, createRef} from 'react'
import './index.less'
import * as THREE from 'three'
import useBaseView from '../_hooks/useBaseView'
import * as models from './models'

interface IProps {
  //props:any
}

const PageViewCurriculumVitae: React.FC<IProps> = props => {
  const threeBaseRef = createRef<HTMLDivElement>()
  // let torus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>
  // let moon: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
  // let avatar: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>

  const baseView = useBaseView({
    divRef: threeBaseRef,
    isAmbientLight: false,
    isShadowMap: true, // 是否开启阴影
    // isControls: false,
    isAxisHelper: false,
    createModel: (scene, camera, renderer) => {
      models.addLight(scene) //创建光源
      models.addGround(scene) // 创建地面
      models.addLamps(scene) // 添加路灯
      models.addFense(scene) // 添加路灯底座
      models.addGreen(scene) // 添加草地
      models.addTree(scene) // 添加树木
      models.addHospital(scene) // 添加医院
      models.addRoad(scene) // 添加道路
      models.addStaticCar(scene) // 添加静止汽车
      models.addMovingCar(scene) // 添加移动汽车
    },
    createAnimate: () => {
      models.onCarMoveing() // 汽车移动
    },
  })

  if (baseView) {
    const {scene, camera, renderer} = baseView

    camera.fov = 45 //设置相机视锥体的垂直视野角度
    camera.near = 1 //设置相机的近裁面
    camera.far = 5000 //设置相机的远裁面
    camera.position.set(100, 100, 270)
    camera.lookAt(scene.position)
    renderer.setClearColor(0x282828, 1.0) //设置背景颜色
    renderer.shadowMap.type = THREE.PCFSoftShadowMap //阴影类型
  }

  return (
    <div className="curriculum-vitae-wrap">
      <div ref={threeBaseRef} className="three-wrap"></div>
      <div className="context-wrap">
        <h3>注意：先开启阴影效果，再添加阴影模型，否则不生效</h3>
        <h3>来源：https://github.com/luosijie/threejs-examples</h3>
      </div>
    </div>
  )
}
export default PageViewCurriculumVitae
