/** @format */

import React, {useEffect, useImperativeHandle, useRef} from 'react'
import './index.less'
// import '@/assets/css/font-awesome-4.7.0/less/font-awesome.less'
import '@/assets/css/fontawesome-free-6.4.0-web/less/fontawesome.less'
import '@/assets/css/fontawesome-free-6.4.0-web/less/brands.less'
import '@/assets/css/fontawesome-free-6.4.0-web/less/regular.less'
import '@/assets/css/fontawesome-free-6.4.0-web/less/solid.less'
import Layer from './Layer'

interface IProps {
  onRef: any
  initTypeNum: number
}

const PageViewSnow: React.FC<IProps> = props => {
  const sign: any = useRef(1) //标记 是否可以创建循环
  let layer1Ref: any = useRef(null)
  let layer2Ref: any = useRef(null)
  let layer3Ref: any = useRef(null)
  let layer4Ref: any = useRef(null)
  let layer5Ref: any = useRef(null)
  let layer6Ref: any = useRef(null)
  let setInt1Ref: any = useRef(null)
  let setInt2Ref: any = useRef(null)
  let setInt3Ref: any = useRef(null)
  let setInt4Ref: any = useRef(null)
  let setInt5Ref: any = useRef(null)
  let setInt6Ref: any = useRef(null)
  var windowShow = true

  useImperativeHandle(props.onRef, () => {
    return {
      setTypeNum: setTypeNum,
    }
  })

  const setTypeNum = val => {
    if (val === 999) {
      deleteLayer()
      return
    } else if (layer1Ref.current) {
      layer1Ref.current.styleType = val
      layer2Ref.current.styleType = val
      layer3Ref.current.styleType = val
      layer4Ref.current.styleType = val
      layer5Ref.current.styleType = val
      layer6Ref.current.styleType = val
    } else if (sign.current === 1) {
      createLayer(val)
    }
  }

  function createLayer(typeNum = props.initTypeNum) {
    console.log('res:', 'deleteLayer')
    console.log('res:', sign.current)
    if (!sign.current) return
    sign.current = 0
    //more layers and css blur will cause performance drop
    layer1Ref.current = new Layer(16, 8, typeNum)
    setInt1Ref.current = setInterval(layer1Ref.current.addIcon, 1000)

    layer2Ref.current = new Layer(32, 6, typeNum)
    setInt2Ref.current = setInterval(layer2Ref.current.addIcon, 2000)

    layer3Ref.current = new Layer(50, 10, typeNum)
    setInt3Ref.current = setInterval(layer3Ref.current.addIcon, 3000)

    layer4Ref.current = new Layer(60, 10, typeNum)
    setInt4Ref.current = setInterval(layer4Ref.current.addIcon, 6600)

    layer5Ref.current = new Layer(80, 12, typeNum)
    setInt5Ref.current = setInterval(layer5Ref.current.addIcon, 10500)

    layer6Ref.current = new Layer(120, 15, typeNum)
    setInt6Ref.current = setInterval(layer6Ref.current.addIcon, 15300)
  }

  function deleteLayer() {
    console.log('res:', 'deleteLayer')
    layer1Ref.current = null
    layer2Ref.current = null
    layer3Ref.current = null
    layer4Ref.current = null
    layer5Ref.current = null
    layer6Ref.current = null
    if (setInt1Ref.current) clearInterval(setInt1Ref.current)
    if (setInt2Ref.current) clearInterval(setInt2Ref.current)
    if (setInt3Ref.current) clearInterval(setInt3Ref.current)
    if (setInt4Ref.current) clearInterval(setInt4Ref.current)
    if (setInt5Ref.current) clearInterval(setInt5Ref.current)
    if (setInt6Ref.current) clearInterval(setInt6Ref.current)
    sign.current = 1
  }

  function init() {
    let hiddenProperty =
      'hidden' in document
        ? 'hidden'
        : 'webkitHidden' in document
        ? 'webkitHidden'
        : 'mozHidden' in document
        ? 'mozHidden'
        : null

    let visibilityChangeEvent = hiddenProperty!.replace(/hidden/i, 'visibilitychange')

    let onVisibilityChange = function () {
      windowShow = !windowShow
      if (windowShow) {
        console.log('创建飘落物')
        createLayer()
      } else {
        console.log('清除创建')
        deleteLayer()
      }
    }

    document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    console.log('初始化创建:')
    createLayer()
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="page-view-snow-wrap"></div>
    </>
  )
}

PageViewSnow.defaultProps = {
  initTypeNum: 5,
}

export default PageViewSnow
