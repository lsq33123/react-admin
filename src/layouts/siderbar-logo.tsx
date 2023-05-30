/** @format */

import React from 'react'
import './index.less'
interface IProps {
  collapsed: boolean
}

const PageView: React.FC<IProps> = props => {
  return (
    <span className="logo">
      <span>
        <img src={require('@/assets/logo.png')} alt="" style={{width: '20px', height: '20px', marginRight: '6px'}} />
      </span>
      {!props.collapsed ? <span>系统</span> : null}
    </span>
  )
}
export default PageView
