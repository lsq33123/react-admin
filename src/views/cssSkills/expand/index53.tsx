/** @format */
//来源 https://juejin.cn/post/7251394142683742269
import React from 'react'
import {labelsArr} from './data'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const [isExpand, setIsExpand] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)
  const [labelShowArr, setLabelShowArr] = React.useState(labelsArr)
  const expandRef = React.useRef<HTMLDivElement>(null)
  const hideLength = React.useRef(0)

  const init = () => {
    //console.log('valFn:', val)
    const listEl: any = listRef.current
    const expandEl: any = expandRef.current
    const labelsEl: any = listEl?.querySelectorAll('.label:not(.expand-btn)') // 所有标签元素
    let firstLabelOffsetLeft = labelsEl[0].getBoundingClientRect().left // 第一个标签左侧偏移量
    const labelMaringRight = parseInt(window.getComputedStyle(labelsEl[0]).marginRight)
    let line = 0 // 行数
    let labelIndex = 0 // 渲染第几个
    for (let i = 0; i < labelsEl.length; i++) {
      const _left = labelsEl[i].getBoundingClientRect().left
      if (_left === firstLabelOffsetLeft) {
        line++
      }
      if (line > 2) {
        labelIndex = i
        expandEl.style.display = 'inline-block'
        break
      } else {
        // labelIndex = labelsEl.length
        expandEl.style.display = 'none'
      }
    }
    // 如果没有超出容器则不需要隐藏
    if (expandEl.style.display === 'none') {
      return
    }
    let listElRect = listEl.getBoundingClientRect()
    let expandElWidth = expandEl.getBoundingClientRect().width
    for (let j = labelIndex - 1; j > 0; j--) {
      const labelRight = labelsEl[j].getBoundingClientRect().right - listElRect.left
      if (labelRight + labelMaringRight + expandElWidth <= listElRect.width) {
        hideLength.current = j
        setLabelShowArr(labelsArr.slice(0, j))
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
      <div className="list-con-title">
        展开隐藏按钮和标签同级：1、通过第一个标签偏移值判断{JSON.stringify(hideLength)}
      </div>
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
