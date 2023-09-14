/** @format */
//来源 https://juejin.cn/post/7251394142683742269
import React from 'react'
import {labelsArr} from './data'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const [isExpand, setIsExpand] = React.useState(false)
  const [labelShowArr, setLabelShowArr] = React.useState(labelsArr)
  const listRef = React.useRef<HTMLDivElement>(null)
  const expandRef = React.useRef<HTMLDivElement>(null)
  const hideLength = React.useRef(0)

  const init = () => {
    const listEl: any = listRef.current
    const labelsEl: any = listEl?.querySelectorAll('.label:not(.expand-btn)') // 所有标签元素
    const expandEl: any = expandRef.current
    const listElBottom = listEl.getBoundingClientRect().bottom // 容器底部距视口顶部距离

    let labelIndex = 0 // 渲染到第几个

    for (let i = 0; i < labelsEl.length; i++) {
      const _top = labelsEl[i].getBoundingClientRect().top
      // 通过top判断如果有标签大于容器bottom则隐藏
      if (_top >= listElBottom) {
        // 如果有标签顶部距离超过容器底部则表示超出容器隐藏
        expandEl.style.display = 'inline-block'
        labelIndex = i
        break
      } else {
        expandEl.style.display = 'none'
      }
    }

    // 如果没有超出容器则不需要隐藏
    if (expandEl.style.display === 'none') {
      return
    }

    let listElRect = listEl.getBoundingClientRect()
    let expandElWidth = expandEl.getBoundingClientRect().width
    const labelMaringRight = parseInt(window.getComputedStyle(labelsEl[0]).marginRight)
    for (let j = labelIndex - 1; j > 0; j--) {
      const labelRight = labelsEl[j].getBoundingClientRect().right - listElRect.left
      if (labelRight + labelMaringRight + expandElWidth <= listElRect.width) {
        // setHideLength(j)
        hideLength.current = j
        setLabelShowArr(labelsArr.slice(0, hideLength.current))
        break
      }
    }
  }

  const onExpand = val => {
    const listEl: any = listRef.current
    setIsExpand(!isExpand)
    listEl.classList.toggle('list-expand')
    if (isExpand) {
      setLabelShowArr(labelsArr.slice(0, hideLength.current))
    } else {
      setLabelShowArr(labelsArr)
    }
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="list-con-title">展开隐藏按钮和标签同级：2、通过计算容器高度对比</div>
      <div className="list-con-wrap list-expand" ref={listRef}>
        {labelShowArr.map((item, index) => {
          return <div className="label">{item}</div>
        })}
        <div className="label ponit" ref={expandRef} onClick={onExpand}>
          {isExpand ? '隐藏∧' : '展开∨'}
        </div>
      </div>
    </>
  )
}
export default PageView
