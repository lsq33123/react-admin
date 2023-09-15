/** @format */

import React from 'react'
import * as THREE from 'three'
import useBaseView from '../../_hooks/useBaseView'
import {labelRenderer as labelRenderer3D, tag3D, tag3DSprite} from '../../utils/tag3D.js'
import {labelRenderer as labelRenderer2D, tag as tag2D} from '../../utils/tag2D.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

  useBaseView({
    divRef: threeBaseRef,
    createModel: scene => {
      const geometry = new THREE.BoxGeometry(5, 5, 5) // 4、创建几何体模型（立方几何体）
      const material = new THREE.MeshNormalMaterial({flatShading: true}) // 5、创建材质
      const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
      cube.position.set(5, 0, 0)
      scene.add(cube) // 7、将网格模型添加到场景中

      // 添加2D标签
      const label2D = tag2D('CSS 2D 标签')
      const pos1 = new THREE.Vector3(0, 0, 0)
      cube.getWorldPosition(pos1)
      pos1.y += 1
      label2D.position.copy(pos1)
      scene.add(label2D)

      // 添加3DObject标签标签
      const cube2 = cube.clone()
      cube2.position.x = 13
      const label3D = tag3D('CSS 3D Object标签', 0.05, 0.05, 0.05)
      const pos2 = new THREE.Vector3(0, 0, 0)
      cube2.getWorldPosition(pos2)
      pos2.y += 1
      label3D.position.copy(pos2)
      scene.add(cube2)
      scene.add(label3D)

      // 添加3DSprite标签标签
      const cube3 = cube.clone()
      cube3.position.x = -5
      const label3DSprite = tag3DSprite('CSS 3D Sprite标签', 0.05, 0.05, 0.05)
      const pos3 = new THREE.Vector3(0, 0, 0)
      cube3.getWorldPosition(pos3)
      pos3.y += 1
      label3DSprite.position.copy(pos3)
      scene.add(cube3)
      scene.add(label3DSprite)
    },
    createAnimate: ({el, scene, camera}) => {
      if (el) {
        ;(labelRenderer2D as any)(el).render(scene, camera) // 渲染HTML标签对象 CSS2DObject 标签
        ;(labelRenderer3D as any)(el).render(scene, camera) //渲染HTML标签对象 CSS3DObject 标签
      }
    },
  })

  return (
    <>
      <div>3种类型的标签文字：2d、3d obeject、3d sprite</div>
      <div>来源：https://blog.csdn.net/bobo789456123/article/details/129464847</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
