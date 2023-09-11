/** @format */

import React from 'react'
import {Col, Row} from 'antd'
import Index51 from './index51'
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
          <div className="omit-text-wrap"></div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap"></div>
        </Col>
      </Row>
    </div>
  )
}
export default PageView
