/** @format */

import React from 'react'
import './index.less'

interface IProps {
  children?: any
  //props:any
}

const PageViewToolbars: React.FC<IProps> = props => {
  return (
    <div id="page-view-toolbars" className="toolbar">
      {props.children}
    </div>
  )
}
export default PageViewToolbars
