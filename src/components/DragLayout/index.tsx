/** @format */

import React from 'react'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import './index.less'

interface IProps {
  direction?: 'vertical' | 'horizontal' //方向 vertical:垂直 horizontal:水平
  allowDrag?: boolean //是否允许拖拽
  firstWidth?: string //第一个div的宽度
  min?: Array<number>
  children?: any
  resize?: () => void //拖拽时触发的回调函数
  //props:any
}

const PageViewDragLayout: React.FC<IProps> = props => {
  const divRef1 = React.useRef<HTMLDivElement>(null)
  const divRef2 = React.useRef<HTMLDivElement>(null)
  const divSplitterRef = React.useRef<HTMLDivElement>(null)
  const dragLayoutRef = React.useRef<HTMLDivElement>(null)
  const divHandlerRef = React.useRef<HTMLDivElement>(null)
  const [divOld1, setDivOld1] = React.useState<any>({width: 0, height: 0})
  const [divOld2, setDivOld2] = React.useState<any>({width: 0, height: 0})
  const [isShowBtn1, setIsShowBtn1] = React.useState(true)
  const [isShowBtn2, setIsShowBtn2] = React.useState(true)

  React.useEffect(() => {
    if (props.direction === 'vertical') {
      dragLayoutRef.current?.classList.add('vertical-type')
    }
    if (props.firstWidth) {
      ;(divRef1.current as any).style.width = props.firstWidth
      ;(divRef2.current as any).style.width = `calc(100% - ${props.firstWidth})`
    }
    if (!props.allowDrag) {
      ;(divSplitterRef.current as any).style.cursor = 'default'
    }
  }, [])

  // const getOffset = (el: HTMLDivElement) => {
  //   let x = el.offsetLeft
  //   let y = el.offsetTop
  //   let parent: any = el.offsetParent

  //   while (parent && parent.offsetParent != null) {
  //     x += parent.offsetLeft
  //     y += parent.offsetTop
  //     parent = parent.offsetParent
  //   }
  //   return {x, y}
  // }

  const boolTransition = val => {
    let div1El = divRef1.current as any
    let div2El = divRef2.current as any
    if (val) {
      div1El.style.transition = 'all 0.3s ease-in-out'
      div2El.style.transition = 'all 0.3s ease-in-out'
    } else {
      div1El.style.transition = 'unset'
      div2El.style.transition = 'unset'
    }
  }

  const onDragBtn1 = () => {
    setIsShowBtn1(false)
    setIsShowBtn2(true)
    let div1El = divRef1.current as any
    let div2El = divRef2.current as any

    setDivOld1({width: div1El.offsetWidth, height: div1El.offsetHeight})
    setDivOld2({width: div2El.offsetWidth, height: div2El.offsetHeight})
    if (props.direction === 'horizontal') {
      //水平方向
      if (div2El.offsetWidth === 0) {
        div1El.style.width = divOld1.width + 'px'
        div2El.style.width = divOld2.width + 'px'
        setIsShowBtn1(true)
      } else {
        div1El.style.width = 0 + 'px'
        div2El.style.width = 100 + '%'
      }
    } else {
      if (div2El.offsetHeight === 0) {
        div1El.style.height = divOld1.height + 'px'
        div2El.style.height = divOld2.height + 'px'
        setIsShowBtn1(true)
      } else {
        div1El.style.height = 0 + 'px'
        div2El.style.height = 100 + '%'
      }
    }
  }
  const onDragBtn2 = () => {
    setIsShowBtn1(true)
    setIsShowBtn2(false)
    let div1El = divRef1.current as any
    let div2El = divRef2.current as any
    setDivOld1({width: (divRef1.current as any).offsetWidth, height: (divRef1.current as any).offsetHeight})
    setDivOld2({width: div2El.offsetWidth, height: div2El.offsetHeight})
    if (props.direction === 'horizontal') {
      if ((divRef1.current as any).offsetWidth === 0) {
        div1El.style.width = divOld1.width + 'px'
        div2El.style.width = divOld2.width + 'px'
        setIsShowBtn2(true)
      } else {
        div1El.style.width = 100 + '%'
        div2El.style.width = 0 + 'px'
      }
    } else {
      if ((divRef1.current as any).offsetHeight === 0) {
        div1El.style.height = divOld1.height + 'px'
        div2El.style.height = divOld2.height + 'px'
        setIsShowBtn2(true)
      } else {
        div1El.style.height = 100 + '%'
        div2El.style.height = 0 + 'px'
      }
    }
  }

  const onMouseDown = e => {
    if (!props.allowDrag) return
    boolTransition(false)
    let div1El = divRef1.current as any
    let div2El = divRef2.current as any
    ;(divSplitterRef.current as any).classList.add('dragging')
    if (props.direction === 'horizontal') {
      //水平方向
      let width1 = div1El.offsetWidth
      let width2 = div2El.offsetWidth
      document.onmousemove = e1 => {
        let moveLenX = e1.clientX - e.clientX // 移动距离 = 移动后的位置 - 移动前的位置
        let lastLen1 = width1 + moveLenX
        let lastLen2 = width2 - moveLenX
        if (props.min && props.min[0]) {
          if (lastLen1 < props.min[0]) {
            lastLen1 = props.min[0]
            lastLen2 = width1 + width2 - props.min[0]
          }
        }
        if (props.min && props.min[1]) {
          if (lastLen2 < props.min[1]) {
            lastLen2 = props.min[1]
            lastLen1 = width1 + width2 - props.min[1]
          }
        }
        div1El.style.width = lastLen1 + 'px'
        div2El.style.width = lastLen2 + 'px'
        if (lastLen1 === 0) setIsShowBtn1(false)
        if (lastLen2 === 0) setIsShowBtn2(false)
        if (lastLen1 > 0) setIsShowBtn1(true)
        if (lastLen2 > 0) setIsShowBtn2(true)
      }
    } else {
      // 垂直方向
      let height1 = div1El.offsetHeight
      let height2 = div2El.offsetHeight
      document.onmousemove = e1 => {
        let moveLenY = e1.clientY - e.clientY // 移动距离 = 移动后的位置 - 移动前的位置
        let lastLen1 = height1 + moveLenY
        let lastLen2 = height2 - moveLenY
        if (props.min && props.min[0]) {
          if (lastLen1 < props.min[0]) {
            lastLen1 = props.min[0]
            lastLen2 = height1 + height2 - props.min[0]
          }
        }
        if (props.min && props.min[1]) {
          if (lastLen2 < props.min[1]) {
            lastLen2 = props.min[1]
            lastLen1 = height1 + height2 - props.min[1]
          }
        }
        div1El.style.height = lastLen1 + 'px'
        div2El.style.height = lastLen2 + 'px'
        if (lastLen1 === 0) setIsShowBtn1(false)
        if (lastLen2 === 0) setIsShowBtn2(false)
        if (lastLen1 > 0) setIsShowBtn1(true)
        if (lastLen2 > 0) setIsShowBtn2(true)
      }
      props.resize && props.resize()
    }

    document.onmouseup = () => {
      boolTransition(true)
      ;(divSplitterRef.current as any).classList.remove('dragging')
      document.onmousemove = null
      document.onmouseup = null
      ;(divSplitterRef.current as any).releaseCapture && (divSplitterRef.current as any).releaseCapture()
    }
  }

  return (
    <div className="drag-layout-wrap" ref={dragLayoutRef}>
      <div className="drag-layout-item" ref={divRef1}>
        {props.children && props.children[0] ? props.children[0] : null}
      </div>

      <div className="drag-layout-item" ref={divRef2}>
        {props.children && props.children[1] ? props.children[1] : null}
      </div>

      <div className="drag-layout-splitter" ref={divSplitterRef} onMouseDown={onMouseDown}>
        <div className="drag-layout-splitter-handler" ref={divHandlerRef}>
          {isShowBtn1 && <LeftOutlined className="drag-layout-splitter-handler-button-icon" onClick={onDragBtn1} />}
          {isShowBtn2 && <RightOutlined className="drag-layout-splitter-handler-button-icon" onClick={onDragBtn2} />}
        </div>
      </div>
    </div>
  )
}
PageViewDragLayout.defaultProps = {
  direction: 'horizontal',
  allowDrag: true,
  min: [0, 0],
}

export default PageViewDragLayout
