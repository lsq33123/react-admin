/** @format */
//来源 https://juejin.cn/post/7251394142683742269
import React from 'react'
import {Col, Row} from 'antd'
import Index51 from './index51'
import Index52 from './index52'
import Index53 from './index53'
import Index54 from './index54'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div style={{width: '100%', minHeight: '300px'}} className="omit-container-wrap">
      <Row gutter={20} className="mt10">
        <Col span={8}>
          <div className="omit-text-wrap">
            <Index51 />
          </div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap">
            <Index52 />
          </div>
        </Col>
        <Col span={8}>{/* <div className="omit-text-wrap"></div> */}</Col>
      </Row>
      <Row gutter={20} className="mt10">
        <Col span={8}>
          <div className="omit-text-wrap">
            <Index53 />
          </div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap">
            <Index54 />
          </div>
        </Col>
        <Col span={8}>{/* <div className="omit-text-wrap"></div> */}</Col>
      </Row>
    </div>
  )
}
export default PageView
