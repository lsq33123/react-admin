/** @format */

import Title from 'antd/lib/typography/Title'
import React from 'react'
import './index.less'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div id="cssLayoutGrid1" className="contrainerBox">
      <div className="showBox flex-cc">
        <div className="wrapper">
          <div className="one item">One</div>
          <div className="two item">Two</div>
          <div className="three item">Three</div>
          <div className="four item">Four</div>
          <div className="five item">Five</div>
          <div className="six item">Six</div>
        </div>
      </div>
    </div>
  )
}
export default PageView
