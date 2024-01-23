/** @format */

import React from 'react'
import './index.less'
interface IProps {
  rows?: number
  maxRows?: number
  ellipsis?: React.ReactNode
  closeText?: React.ReactNode
  children: React.ReactNode
  //props:any
}
const Ellipsis = () => {
  return <span className="btn-text">展开</span>
}
const CloseText = () => {
  return <span className="btn-text">收起</span>
}

const TextExpand: React.FC<IProps> = props => {
  const [isExpand, setIsExpand] = React.useState(false)
  const [mainRows, setMainRows] = React.useState(props.rows)

  // const setLineNum = (rows: number): string => {
  //   return `line-num-${rows} text-expand-body-wrap`
  // }

  const getClassName = React.useMemo(() => {
    return `line-num-${mainRows} text-expand-body-wrap`
  }, [mainRows])

  const onClickEllipsis = () => {
    setMainRows(isExpand ? props.rows : props.maxRows)
    setIsExpand(!isExpand)
  }

  return (
    <div className="text-expand-wrap">
      <div className={getClassName}>
        <div className="float-vertical-line "></div>
        <div className="ellipsis-wrap" onClick={onClickEllipsis}>
          {isExpand ? props.closeText : props.ellipsis}
        </div>
        <div className="content-wrap">{props.children}</div>
      </div>
    </div>
  )
}

TextExpand.defaultProps = {
  rows: 1,
  maxRows: 10,
  ellipsis: <Ellipsis />,
  closeText: <CloseText />,
  children: '',
}

export default TextExpand
