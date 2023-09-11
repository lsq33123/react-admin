/** @format */

import {Col, Row} from 'antd'
import React from 'react'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const article =
    '记录分享每一个日常开发项目中的实用小知识，不整那些虚头巴脑的框架理论与原理，之前分享过抽奖功能、签字功能等，有兴趣的可以看看本人以前的分享。'
  return (
    <div style={{width: '100%', minHeight: '100px'}}>
      <Row gutter={20}>
        <Col span={8}>原文</Col>
        <Col span={8}>省略到一行</Col>
        <Col span={8}>省略到两行</Col>
      </Row>
      <Row gutter={20} className="mt10">
        <Col span={8}>
          <div className="omit-text-wrap">{article}</div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap line-text-omit-1">{article}</div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap line-text-omit-2">{article}</div>
        </Col>
      </Row>
    </div>
  )
}
export default PageView
