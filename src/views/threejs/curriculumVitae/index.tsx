/** @format */

import React, {useEffect, createRef} from 'react'
import './index.less'
import * as THREE from 'three'
import useBaseView from '../_hooks/useBaseView'

interface IProps {
  //props:any
}

const PageViewCurriculumVitae: React.FC<IProps> = props => {
  const threeBaseRef = createRef<HTMLDivElement>()
  let torus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>
  let moon: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
  let avatar: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>

  const addStar = (scene: THREE.Scene) => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3)
      .fill(0)
      .map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
  }

  const baseView = useBaseView({
    divRef: threeBaseRef,
    isAmbientLight: false,
    isControls: false,
    isAxisHelper: false,
    createModel: (scene, camera) => {
      // Lights

      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(5, 5, 5)

      const ambientLight = new THREE.AmbientLight(0xffffff)
      scene.add(pointLight, ambientLight)

      const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
      const material = new THREE.MeshBasicMaterial({color: 0xff6347})
      torus = new THREE.Mesh(geometry, material)
      scene.add(torus)

      Array(200)
        .fill(0)
        .forEach(() => addStar(scene))

      // Avatar
      const avatarTexture = new THREE.TextureLoader().load('/threejs/curriculumVitae/2333.png')
      avatar = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({map: avatarTexture}))
      // avatar.position.set(2, 0, -5)
      scene.add(avatar)

      // Moon
      const moonTexture = new THREE.TextureLoader().load('/threejs/curriculumVitae/moon.jpg')
      const normalTexture = new THREE.TextureLoader().load('/threejs/curriculumVitae/normal.jpg')

      moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
          map: moonTexture,
          normalMap: normalTexture,
        }),
      )
      moon.position.set(-10, 0, 30)
      scene.add(moon)

      const moveCamera = () => {
        const t = document.body.getBoundingClientRect().top
        if (moon) {
          moon.rotation.x += 0.05
          moon.rotation.y += 0.075
          moon.rotation.z += 0.05
        }
        if (avatar) {
          avatar.rotation.y += 0.01
          avatar.rotation.z += 0.01
        }
      }
      document.getElementsByClassName('curriculum-vitae-wrap')[0].parentNode?.addEventListener('scroll', moveCamera)
    },
    createAnimate: () => {
      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      torus.rotation.z += 0.01

      moon.rotation.y += 0.005
      moon.position.x = 30 * Math.cos(moon.rotation.y)
      moon.position.z = 30 * Math.sin(moon.rotation.y)
    },
  })

  if (baseView) {
    const {scene, camera, renderer, animate} = baseView
    const spaceTexture = new THREE.TextureLoader().load('/threejs/curriculumVitae/space.jpg')
    scene.background = spaceTexture
    camera.position.z = -457 * -0.01
    camera.position.x = -457 * -0.002
    camera.position.y = -457 * -0.0001
    document.getElementsByClassName('curriculum-vitae-wrap')[0].parentNode?.addEventListener('scroll', e => {
      const t = document.getElementsByClassName('curriculum-vitae-wrap')[0].getBoundingClientRect().top - 52 - 457
      console.log('t:', t)
      camera.position.z = t * -0.01
      camera.position.x = t * -0.002
      camera.position.y = t * -0.0001
      camera.rotation.y = t * -0.0002
      console.log('camera:', camera.position)
    })
  }

  return (
    <div className="curriculum-vitae-wrap">
      <div ref={threeBaseRef} className="three-wrap"></div>
      <div className="context-wrap">
        {new Array(50).fill(0).map((item, index) => (
          <div key={index}>
            <h1>来源{index + 1}：https://github.com/fireship-io/threejs-scroll-animation-demo</h1>
            <h2>5555555555555555555</h2>
            <p>6666666666666666666</p>
            <a href="#">7777777777777777777</a>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PageViewCurriculumVitae
