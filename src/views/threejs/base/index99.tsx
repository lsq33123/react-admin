/** @format */

import React from 'react'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div>
      <div>
        <span style={{fontWeight: 'bold'}}>Threejs掘金：</span>
        <span>https://juejin.cn/post/7020396322062598181#heading-9</span>
      </div>
      <div>
        <span style={{fontWeight: 'bold'}}>Threejs掘金（二）：</span>
        <span>https://juejin.cn/post/7020422904248533029#heading-16</span>
      </div>
      <div>
        <span style={{fontWeight: 'bold'}}>Threejs中文文档：</span>
        <span>http://www.webgl3d.cn/pages/aac9ab/</span>
      </div>
      <div>
        <span style={{fontWeight: 'bold'}}>dat.Gui文档：</span>
        <span>https://www.cnblogs.com/fangdongdemao/p/13949773.html</span>
      </div>
    </div>
  )
}
export default PageView
