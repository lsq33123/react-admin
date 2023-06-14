/** @format */

import React from 'react'
import * as THREE from 'three'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import useBaseView from '../_hooks/useBaseView'

const PageViewIndex = props => {
  const threeBaseRef = React.createRef<HTMLDivElement>()

  useBaseView({
    divRef: threeBaseRef,
    createModel: scene => {
      const loader = new FontLoader()
      loader.load('/threejs/fonts/PingFang_SC_Regular_Regular.json', function (font) {
        const geometry = new TextGeometry('我要居中', {
          font: font,
          size: 2,
          height: 0.5,
          curveSegments: 12,
          // bevelEnabled: true,
          // bevelThickness: 10,
          // bevelSize: 8,
          // bevelOffset: 0,
          // bevelSegments: 5,
        })
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
      })
    },
  })

  return (
    <>
      <div>未居中</div>
      <div ref={threeBaseRef} style={{width: '100%', height: '400px'}}></div>
    </>
  )
}
export default PageViewIndex
