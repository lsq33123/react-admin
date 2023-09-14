/** @format */

import React from 'react'
import {labelsArr} from './data'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const [isExpand, setIsExpand] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)
  const init = () => {
    //console.log('valFn:', val)
    const listEl: any = listRef.current
    const labelsEl: any = listEl?.querySelectorAll('.label') // 所有标签元素
    let firstLabelOffsetLeft = 0 // 第一个标签左侧偏移值
    let line = 1 // 行数
    labelsEl.forEach((item, index) => {
      if (index === 0) {
        firstLabelOffsetLeft = item.offsetLeft
      } else if (item.offsetLeft === firstLabelOffsetLeft) {
        line++
      }
    })
    if (line > 2) {
      setIsExpand(false)
    } else {
      setIsExpand(true)
    }
  }

  const onExpand = val => {
    const listEl: any = listRef.current
    setIsExpand(!isExpand)
    listEl.classList.toggle('list-expand')
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="list-con-title">通过第一个标签偏移值判断</div>
      <div className="list-con-wrap list-expand" ref={listRef}>
        {labelsArr.map((item, index) => {
          return <div className="label">{item}</div>
        })}
      </div>
      <div className="expand-btn" onClick={onExpand}>
        {isExpand ? '隐藏∧' : '展开∨'}
      </div>
    </>
  )
}
export default PageView