import React from 'react'
import './index.less'
interface IProps {
  collapsed: boolean
}

const PageView: React.FC<IProps> = (props) => {
  return (
    <div className="logo">
      {!props.collapsed ? <span>某某某系统</span> : <span>某某</span>}
    </div>
  )
}
export default PageView
