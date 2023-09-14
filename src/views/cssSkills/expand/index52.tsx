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
  const expandRef = React.useRef<HTMLDivElement>(null)
  const init = () => {
    //console.log('valFn:', val)
    const listEl: any = listRef.current
    const expandEl: any = expandRef.current
    const labelsEl: any = listEl?.querySelectorAll('.label') // 所有标签元素
    const listElHeight = listEl.getBoundingClientRect().bottom
    for (let i = 0; i < labelsEl.length; i++) {
      const _top = labelsEl[i].getBoundingClientRect().top
      // 通过top判断如果有标签大于容器bottom则隐藏
      if (_top >= listElHeight) {
        expandEl.style.display = 'block'
        break
      } else {
        expandEl.style.display = 'none'
      }
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
      <div className="list-con-title">通过计算容器高度对比</div>
      <div className="list-con-wrap list-expand" ref={listRef}>
        {labelsArr.map((item, index) => {
          return <div className="label">{item}</div>
        })}
      </div>
      <div className="expand-btn" ref={expandRef} onClick={onExpand}>
        {isExpand ? '隐藏∧' : '展开∨'}
      </div>
    </>
  )
}
export default PageView
