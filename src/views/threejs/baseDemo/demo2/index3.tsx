/** @format */
import React from 'react'
import {Col, Row} from 'antd'
import Index3_1 from './index3_1'
import Index3_2 from './index3_2'

const PageViewIndex = props => {
  return (
    <>
      <Row gutter={15}>
        <Col span={12}>
          <Index3_1 />
        </Col>
        <Col span={12}>
          <Index3_2 />
        </Col>
      </Row>
    </>
  )
}
export default PageViewIndex
