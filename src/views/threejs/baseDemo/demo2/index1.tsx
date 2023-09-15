/** @format */

import React from 'react'
import * as THREE from 'three'
import useBaseView from '../../_hooks/useBaseView'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
interface IProps {
  //props:any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

  useBaseView({
    divRef: threeBaseRef,
    createModel: scene => {
      const geometry = new THREE.BoxGeometry(10, 10, 10) // 4、创建几何体模型（立方几何体）
      const material = new THREE.MeshBasicMaterial({
        // 5.1 创建基础网格材质
        color: 0x00ff00, // 绿色
      })
      const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
      cube.position.set(0, 0, 0) // 设置mesh位置
      scene.add(cube) // 7、将网格模型添加到场景中

      const loader = new FontLoader()
      loader.load(
        '/threejs/fonts/PingFang_SC_Regular_Regular.json',
        function (font) {
          const geometry = new TextGeometry('你好呀！ Hello three.js!', {
            font: font, // 字体，默认是'helvetiker'，需对应引入的字体文件
            size: 2, //字体大小 默认值是100
            height: 0.5, //字体高度 默认值是50
            curveSegments: 12, //弧线分段数，使得文字的曲线更加光滑 默认值是12
            // bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切 默认值为false
            // bevelThickness: 1, //倒角厚度 默认值为10
            // bevelSize: 0.5, //倒角宽度 默认值为8
            // bevelSegments: 3, //倒角分段数 默认值为3
          })
          const textMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
          const textMesh = new THREE.Mesh(geometry, textMaterial)
          textMesh.position.set(0, 9, 0)
          scene.add(textMesh)
        },
        undefined,
        function (err) {
          console.log('err:', err)
        },
      )
    },
  })

  return (
    <>
      <div>来源：https://blog.csdn.net/qw8704149/article/details/110499196</div>
      <div>字体库需要转化成json/js：http://gero3.github.io/facetype.js/</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
