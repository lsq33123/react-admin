/** @format */

import React from 'react'
import './index.less'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div className="right-div demo-index1">
      <div style={{width: '100%', padding: '10px 0px'}}>来源：https://www.51cto.com/article/721013.html</div>
      <div className="g-wrap">
        <p>
          灵动的 iPhone 新玩法，迎面而来。重大的安全新功能，为拯救生命而设计。创新的 4800
          万像素主摄，让细节纤毫毕现。更有 iPhone 芯片中的速度之王，为一切提供强大原动力。
        </p>
      </div>
      <div className="g-scroll"></div>
    </div>
  )
}
export default PageView
