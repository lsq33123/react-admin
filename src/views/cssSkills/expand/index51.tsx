/** @format */
//来源 https://juejin.cn/post/7251394142683742269
import React from 'react'

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
        <div className="label">人工智能</div>
        <div className="label">人工智能与应用</div>
        <div className="label">行业分析</div>
        <div className="label">市场数据调查</div>
        <div className="label">标签标签标签标签标签标签标签标签</div>
        <div className="label">标签</div>
        <div className="label">啊啊啊</div>
        <div className="label">宝宝贝贝</div>
        <div className="label">微信微信</div>
        <div className="label">吧啊啊吧啊啊</div>
        <div className="label">冰西瓜</div>
        <div className="label">苹果</div>
        <div className="label">西红柿</div>
        <div className="label">甜甜哈密瓜</div>
      </div>
      <div className="expand-btn" onClick={onExpand}>
        {isExpand ? '隐藏∧' : '展开∨'}
      </div>
    </>
  )
}
export default PageView
