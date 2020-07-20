/** @format */

import React from 'react'
import './index.less'
interface IProps {
  collapsed: boolean
}

const PageView: React.FC<IProps> = props => {
  return <span className="logo">{!props.collapsed ? <span>某某某系统</span> : <span>某某</span>}</span>
}
export default PageView
