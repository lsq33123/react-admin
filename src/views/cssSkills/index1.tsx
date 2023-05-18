/** @format */

import Title from 'antd/lib/typography/Title'
import React from 'react'
import './index.less'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div id="cssSkillsIndex2" className="contrainerBox">
      <Title level={4}>模拟flex布局</Title>

      <div className="showBox flex-center">
        <div className="father ">
          <div className="child">
            <div className="child-item flex-center">13</div>
            <div className="child-item flex-center">3</div>
            <div className="child-item flex-center">66</div>
            <div className="child-item flex-center">47775</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PageView
