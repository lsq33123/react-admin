/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <DocModel title="模拟flex布局">
      <div className="father ">
        <div className="child">
          <div className="child-item flex-center">13</div>
          <div className="child-item flex-center">3</div>
          <div className="child-item flex-center">66</div>
          <div className="child-item flex-center">47775</div>
        </div>
      </div>
    </DocModel>
  )
}
export default PageView
