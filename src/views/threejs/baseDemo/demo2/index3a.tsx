/** @format */
import React from 'react'
import {Col, Row} from 'antd'
import Index3a_1 from './index3a_1'
import Index3a_2 from './index3a_2'

const PageViewIndex = props => {
  return (
    <>
      <Row gutter={15}>
        <Col span={12}>
          <Index3a_1 />
        </Col>
        <Col span={12}>
          <Index3a_2 />
        </Col>
      </Row>
    </>
  )
}
export default PageViewIndex
