import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as utils from '../utils'

export default class Game {
  config: any = null
  el: HTMLElement
  scene: THREE.Scene = null
  camera: THREE.PerspectiveCamera = null
  renderer: THREE.WebGLRenderer = null
  control: OrbitControls = null
  cameraPos: any
  score: number = 0
  cubes: Array<any> = []
  jumper: any = null
  jumperState: any = null
  cubeState: any = null
  falledState: any = null
  fallingState: any = null
  successCallback: Function
  failedCallback: Function
  constructor(el: HTMLElement) {
    console.log('Game constructor')
    if (!el) {
      console.error('没有找到挂载元素')
      return
    }
    this.config = {
      isAmbientLight: true, // 是否添加环境光
      isSpotLight: false, // 是否添加聚光灯光源
      isAxisHelper: true, // 是否添加坐标轴辅助线
      isControls: true, // 是否添加控制器
      isAutoRender: true, // 是否自动渲染
      isAnimate: true, // 是否开启动画
      isResize: true, // 是否开启窗口自适应
      isShadowMap: false, // 是否开启阴影

      background: 0x282828, // 背景颜色
      cubeColor: 0xbebebe, // 方块颜色
      cubeWidth: 4, // 方块宽度
      cubeHeight: 2, // 方块高度
      cubeDeep: 4, // 方块深度
      minDistance: 5, // 方块最小间距
      maxDistance: 10, // 方块最大间距
      jumperColor: 0x232323, // jumper颜色
      jumperWidth: 1, // jumper宽度
      jumperHeight: 2, // jumper高度
      jumperDeep: 1 // jumper深度
    }

    this.cameraPos = {
      curr: new THREE.Vector3(0, 0, 0), // 当前相机位置
      next: new THREE.Vector3(0, 0, 0), // 目标相机位置
    }
    this.jumperState = {
      ready: false, // 鼠标按完没有
      xSpeed: 0, // x轴速度 Speed根据鼠标按的时间进行赋值
      ySpeed: 0, // y轴速度 ySpeed根据鼠标按的时间进行赋值
    }

    this.cubeState = {
      nextDir: '' // 下一个方块相对于当前方块的方向: 'left' 或 'right'
    }

    this.falledState = {
      location: -1, // jumper所在的位置
      distance: 0 // jumper和最近方块的距离
    }

    this.fallingState = {
      speed: 0.2, // 游戏失败后垂直方向上的掉落速度
      end: false // 掉到地面没有
    }

    this.successCallback = () => null
    this.failedCallback = () => null

    this.el = el
    this.scene = new THREE.Scene()
    // this.camera = new THREE.PerspectiveCamera(
    //   75, // 相机视野
    //   this.el.clientWidth / this.el.clientHeight, // 水平方向和竖直方向长度的比值
    //   0.1, // 近端渲染距离
    //   5000, // 远端渲染距离
    // )
    this.camera = new THREE.OrthographicCamera(
      this.el.clientWidth / -80,  // 相机视野
      this.el.clientWidth / 80,  // 
      this.el.clientHeight / 80,
      this.el.clientHeight / -80,
      0, 5000)
    this.camera.position.set(100, 100, 100) // 设置相机位置
    this.camera.lookAt(this.cameraPos.curr)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 开启抗锯齿
    })
    this.renderer.shadowMap.enabled = true //开启阴影
    this.renderer.setSize(this.el.clientWidth, this.el.clientHeight)
    this.renderer.setClearColor(this.config.background)
    this.el.appendChild(this.renderer.domElement)


    el.addEventListener('mousedown', () => {
      this._handleMousedown()
    })
    el.addEventListener('mouseup', () => {
      this._handleMouseup()
    })
  }
  _getScore() {
    return this.score
  }

  public init() {
    console.log('Game init')

    this._setLight()  // 设置光源
    this._setResize() // 设置窗口自适应
    this._createCube() // 创建方块
    this._createCube() // 创建方块
    // this._setControl() // 设置控制器
    this._setAnimate() // 设置动画
    this._updateCamera() // 更新相机位置
    this._createJumper() // 创建jumper
    // this._render() // 渲染



    // const axexHelper = new THREE.AxesHelper(1000) // 7、添加坐标轴辅助线
    // this.scene.add(axexHelper)
  }


  // 游戏失败重新开始的初始化配置
  restart() {
    this.score = 0
    this.cameraPos = {
      curr: new THREE.Vector3(0, 0, 0),
      next: new THREE.Vector3()
    }
    this.fallingState = {
      speed: 0.2,
      end: false
    }
    // 删除所有方块
    const length = this.cubes.length
    for (let i = 0; i < length; i++) {
      this.scene.remove(this.cubes.pop())
    }
    // 删除jumper
    this.scene.remove(this.jumper)
    // 显示的分数设为 0
    this.successCallback(this.score)
    this._createCube()
    this._createCube()
    this._createJumper()
    this._updateCamera()
  }

  private _setLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1)
    directionalLight.position.set(3, 10, 5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)
  }
  private _setResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.el.clientWidth / this.el.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.el.clientWidth, this.el.clientHeight)
    })
  }
  private _render() {
    this.renderer.render(this.scene, this.camera)
  }
  private _setAnimate() {
    requestAnimationFrame(() => {
      this._setAnimate()
    })
    // this.control.update()
    this._render()
  }

  private _setControl() {
    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.enableDamping = true // 开启阻尼效果
  }

  _createCube() {
    console.log('创建方块')
    const geometry = new THREE.BoxGeometry(
      this.config.cubeWidth + Math.random(),
      this.config.cubeHeight,
      this.config.cubeDeep + Math.random() ,
    )
    const material = new THREE.MeshLambertMaterial({
      color: this.config.cubeColor
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.cubeState.nextDir = Math.random() > 0.5 ? 'left' : 'right' // 随机方向
    const tempDistance = this.config.minDistance + Math.random() * (this.config.maxDistance - this.config.minDistance) // 随机间距
    if (this.cubes.length > 0) {
      let lastCube = this.cubes[this.cubes.length - 1]
      if (this.cubeState.nextDir === 'left') { // x轴方向  左边
        mesh.position.x = lastCube.position.x - tempDistance
        mesh.position.y = lastCube.position.y
        mesh.position.z = lastCube.position.z
      } else if (this.cubeState.nextDir === 'right') { // z轴方向  上边
        mesh.position.x = lastCube.position.x
        mesh.position.y = lastCube.position.y
        mesh.position.z = lastCube.position.z - tempDistance
      }
    }
    this.cubes.push(mesh)
    // 当方块数大于6时，删除前面的方块，因为不会出现在画布中
    if (this.cubes.length > 6) {
      this.scene.remove(this.cubes.shift())
    }

    this.scene.add(mesh)

    if (this.cubes.length > 1) {
      this._updateCameraPos()
    }
  }
  _updateCameraPos() {
    // 更新相机位置
    let lastCube = this.cubes[this.cubes.length - 1]
    let lastLastCube = this.cubes[this.cubes.length - 2]
    const pn = new THREE.Vector3(0, 0, 0)
    pn.x = (lastCube.position.x + lastLastCube.position.x) / 2
    pn.y = 0
    pn.z = (lastCube.position.z + lastLastCube.position.z) / 2
    this.cameraPos.next = pn
  }
  // 基于更新后的摄像机位置，重新设置摄像机坐标
  _updateCamera() {
    const c = {
      x: this.cameraPos.curr.x,
      y: this.cameraPos.curr.y,
      z: this.cameraPos.curr.z
    }
    const n = {
      x: this.cameraPos.next.x,
      y: this.cameraPos.next.y,
      z: this.cameraPos.next.z
    }
    // console.log('this.cameraPos.curr:', this.cameraPos.curr)
    // console.log('this.cameraPos.next:', this.cameraPos.next)
    if (c.x > n.x || c.z > n.z) {
      this.cameraPos.curr.x -= 0.1
      this.cameraPos.curr.z -= 0.1
      if (this.cameraPos.curr.x - this.cameraPos.next.x < 0.05) {
        this.cameraPos.curr.x = this.cameraPos.next.x
      }
      if (this.cameraPos.curr.z - this.cameraPos.next.z < 0.05) {
        this.cameraPos.curr.z = this.cameraPos.next.z
      }
      this.camera.lookAt(new THREE.Vector3(c.x, 0, c.z)) // 设置相机焦点
      this.camera.position.set(100 + c.x, 100.0, 100 + c.z) // 设置相机位置
      this._render()
      requestAnimationFrame(() => {
        this._updateCamera()
      })
    }
  }

  // 创建跳跃者
  _createJumper() {
    const geometry = new THREE.BoxGeometry(
      this.config.jumperWidth,
      this.config.jumperHeight,
      this.config.jumperDeep
    )
    geometry.translate(0, 1, 0)
    const material = new THREE.MeshLambertMaterial({
      color: this.config.jumperColor
    })
    this.jumper = new THREE.Mesh(geometry, material)
    this.jumper.position.y = 1
    this.jumper.castShadow = true
    this.jumper.receiveShadow = true
    this.scene.add(this.jumper)
  }

  _handleMousedown() {
    if (!this.jumperState.ready && this.jumper.scale.y > 0.5) {
      this.jumper.scale.y -= 0.01
      this.jumperState.xSpeed += 0.004
      this.jumperState.ySpeed += 0.008
      requestAnimationFrame(() => {
        this._handleMousedown()
      })
    }
  }

  _handleMouseup() {
    this.jumperState.ready = true  // 标记鼠标已经松开
    // 判断jumper是在方块水平面之上，是的话说明需要继续运动
    if (this.jumper.position.y >= 1) {
      if (this, this.cubeState.nextDir === 'left') {
        this.jumper.position.x -= this.jumperState.xSpeed
      } else if (this.cubeState.nextDir === 'right') {
        this.jumper.position.z -= this.jumperState.xSpeed
      }

      this.jumper.position.y += this.jumperState.ySpeed
      if (this.jumper.scale.y < 1) {
        this.jumper.scale.y += 0.02
      }
      this.jumperState.ySpeed -= 0.01
      this._render()
      requestAnimationFrame(() => {
        this._handleMouseup()
      })

    } else {
      this.jumperState.ready = false // 标记鼠标已经松开
      this.jumperState.xSpeed = 0 // 重置水平方向速度
      this.jumperState.ySpeed = 0 // 重置垂直方向速度
      this.jumper.position.y = 1// 重置jumper高度
      this._checkInCube()
      if (this.falledState.location === 1) {
        this.score++
        console.log('this.score:', this.score)
        this._createCube()
        this._updateCamera()
        if (this.successCallback) {
          this.successCallback(this.score)
        }
      } else {
        // 掉落失败，进入失败动画
        this._falling()
      }
    }
  }
  // 判断是否在方块上
  _checkInCube() {
    // 当前jumper位置
    const pointO = {
      x: this.jumper.position.x,
      z: this.jumper.position.z
    }
    // 下一个方块
    const pointB = {
      x: this.cubes[this.cubes.length - 1].position.x,
      z: this.cubes[this.cubes.length - 1].position.z
    }
    // 当前方块
    const pointA = {
      x: this.cubes[this.cubes.length - 2].position.x,
      z: this.cubes[this.cubes.length - 2].position.z
    }
    let distanceS = 0 // jumper和当前方块的坐标轴距离
    let distanceL = 0 // jumper和下一个方块的坐标轴距离
    if (this.cubeState.nextDir === 'left') {
      distanceS = Math.abs(pointO.x - pointA.x)
      distanceL = Math.abs(pointO.x - pointB.x)
    } else {
      distanceS = Math.abs(pointO.z - pointA.z)
      distanceL = Math.abs(pointO.z - pointB.z)
    }
    let should = this.config.cubeWidth / 2 + this.config.jumperWidth / 2
    let result = 0
    if (distanceS < should) {
      this.falledState.distance = distanceS
      // 落在当前方块，将距离储存起来，并继续判断是否可以站稳
      result = distanceS < this.config.cubeWidth / 2 ? -1 : -10
    } else if (distanceL < should) {
      this.falledState.distance = distanceL
      // 落在下一个方块，将距离储存起来，并继续判断是否可以站稳
      result = distanceL < this.config.cubeWidth / 2 ? 1 : 10
    } else {
      // 落到空中，游戏结束
      result = 0
    }
    this.falledState.location = result
  }
  /**
   *游戏失败进入掉落阶段
   *通过确定掉落的位置来确定掉落效果
   **/
  _falling() {
    if (this.falledState.location == 0) {
      this._fallingRotate('none')
    } else if (this.falledState.location === -10) {
      if (this.cubeState.nextDir == 'left') {
        this._fallingRotate('leftTop')
      } else {
        this._fallingRotate('rightTop')
      }
    } else if (this.falledState.location === 10) {
      if (this.cubeState.nextDir == 'left') {
        if (this.jumper.position.x < this.cubes[this.cubes.length - 1].position.x) {
          this._fallingRotate('leftTop')
        } else {
          this._fallingRotate('leftBottom')
        }
      } else {
        if (this.jumper.position.z < this.cubes[this.cubes.length - 1].position.z) {
          this._fallingRotate('rightTop')
        } else {
          this._fallingRotate('rightBottom')
        }
      }
    }
  }
  /**
 *游戏失败执行的碰撞效果
 *@param {String} dir 传入一个参数用于控制倒下的方向：'rightTop','rightBottom','leftTop','leftBottom','none'
 **/
  _fallingRotate(dir: String) {
    const offset = this.falledState.distance - this.config.cubeWidth / 2
    let rotateAxis = 'z' // 旋转轴
    let rotateAdd = this.jumper.rotation[rotateAxis] + 0.1 // 旋转速度
    let rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2 // 旋转结束的弧度
    let fallingTo = this.config.ground + this.config.jumperWidth / 2 + offset

    if (dir === 'rightTop') {
      rotateAxis = 'x'
      rotateAdd = this.jumper.rotation[rotateAxis] - 0.1
      rotateTo = this.jumper.rotation[rotateAxis] > -Math.PI / 2
      this.jumper.geometry.translate.z = offset
    } else if (dir === 'rightBottom') {
      rotateAxis = 'x'
      rotateAdd = this.jumper.rotation[rotateAxis] + 0.1
      rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2
      this.jumper.geometry.translate.z = -offset
    } else if (dir === 'leftBottom') {
      rotateAxis = 'z'
      rotateAdd = this.jumper.rotation[rotateAxis] - 0.1
      rotateTo = this.jumper.rotation[rotateAxis] > -Math.PI / 2
      this.jumper.geometry.translate.x = -offset
    } else if (dir === 'leftTop') {
      rotateAxis = 'z'
      rotateAdd = this.jumper.rotation[rotateAxis] + 0.1
      rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2
      this.jumper.geometry.translate.x = offset
    } else if (dir === 'none') {
      rotateTo = false
      fallingTo = this.config.ground
    } else {
      throw Error('Arguments Error')
    }
    if (!this.fallingState.end) {
      if (rotateTo) {
        this.jumper.rotation[rotateAxis] = rotateAdd
      } else if (this.jumper.position.y > fallingTo) {
        this.jumper.position.y -= this.config.fallingSpeed
      } else {
        this.fallingState.end = true
      }
      this._render()
      requestAnimationFrame(() => {
        this._falling()
      })
    } else {
      if (this.failedCallback) {
        this.failedCallback()
      }
    }
  }
}