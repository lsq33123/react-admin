/** @format */

import React from 'react'
import * as THREE from 'three'
import useBaseView from '../../_hooks/useBaseView'
interface IProps {
  //props:any
}

type IBasicView = {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  ambientLight: THREE.AmbientLight | null
  spotLight: THREE.SpotLight | null
  axexHelper: THREE.AxesHelper | null
  control: any
  animate: any
  animateId: any
  resize: any
}

const PageViewIndex: React.FC<IProps> = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

  const baseView: IBasicView = useBaseView({
    divRef: threeBaseRef,
    createModel: scene => {
      const geometry = new THREE.BoxGeometry(10, 10, 10) // 4、创建几何体模型（立方几何体）
      const material = new THREE.MeshBasicMaterial({
        // 5.1 创建基础网格材质
        color: 0x00ff00, // 绿色
      })
      const cube = new THREE.Mesh(geometry, material) // 6、创建网格模型（mesh）
      scene.add(cube) // 7、将网格模型添加到场景中

      //用canvas生成图片
      let canvas: any = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = 300
      canvas.height = 300
      //制作矩形
      ctx.fillStyle = 'rgba(255,165,0,0.8)'
      ctx.fillRect(0, 0, 300, 300)

      //设置文字
      ctx.fillStyle = '#fff'
      ctx.font = 'normal 18pt "楷体"'
      ctx.fillText('模型介绍', 100, 20)
      let textWord = '该模型由小少小同学制作完成'
      //文字换行
      let len = parseInt((textWord.length / 10) as any)
      for (let i = 0; i < len + 1; i++) {
        let space = 10
        if (i === len) {
          space = textWord.length - len * 10
        }
        console.log('len+' + len, 'space+' + space)
        let word = textWord.substr(i * 10, space)
        ctx.fillText(word, 15, 60 * (i + 1))
      }
      //生成图片
      let url = canvas.toDataURL('image/png')
      //将图片构建到纹理中
      let geometry1 = new THREE.PlaneGeometry(10, 10)
      let material1 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(url),
        side: THREE.DoubleSide,
        opacity: 1,
        transparent: true,
      })
      let mesh = new THREE.Mesh(geometry1, material1)
      mesh.position.set(10, 10, 5)
      scene.add(mesh)

      let mesh2 = new THREE.Mesh(geometry1, material1)
      mesh2.position.set(0, 0, 5)
      scene.add(mesh2)
    },
  })

  if (baseView) {
    baseView.camera.position.set(0, 0, 30)
    // baseView.camera.updateProjectionMatrix()
  }

  return (
    <>
      <div>思路：创建图片，添加文字，设置为纹理，添加到场景中</div>
      <div>来源：https://blog.csdn.net/WWW_share8/article/details/102826326</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
