/** @format */

import React from 'react'
import './index.less'
import DynamicNumber from '@/components/DynamicNumber'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div id="showTop">
      <div className="show-top-body hvr-float-shadow">
        <div className=" icon icon1"></div>
        <div className="show-top-body-right">
          <p className="title">访客</p>
          <p className="num">
            <DynamicNumber number={2020} />
          </p>
        </div>
      </div>
      <div className="show-top-body hvr-float-shadow">
        <div className=" icon icon2"></div>
        <div className="show-top-body-right">
          <p className="title">消息</p>
          <p className="num">
            <DynamicNumber number={1664} />
          </p>
        </div>
      </div>
      <div className="show-top-body hvr-float-shadow">
        <div className=" icon icon3"></div>
        <div className="show-top-body-right">
          <p className="title">收入</p>
          <p className="num">
            <DynamicNumber number={12034} />
          </p>
        </div>
      </div>
      <div className="show-top-body hvr-float-shadow">
        <div className=" icon icon4"></div>
        <div className="show-top-body-right">
          <p className="title">其他</p>
          <p className="num">
            <DynamicNumber number={3369} />
          </p>
        </div>
      </div>
    </div>
  )
}
export default PageView
