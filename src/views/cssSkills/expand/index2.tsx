/** @format */

import {Col, Row, Typography} from 'antd'
import React from 'react'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const article =
    '记录分享每一个日常开发项目中的实用小知识，不整那些虚头巴脑的框架理论与原理，之前分享过抽奖功能、签字功能等，有兴趣的可以看看本人以前的分享。'
  const {Paragraph, Text} = Typography
  return (
    <div style={{width: '100%', minHeight: '100px'}}>
      <Row gutter={20}>
        <Col span={8}>省略到一行</Col>
        <Col span={8}>省略到一行附加展开按钮</Col>
        <Col span={8}>省略到一行Tooltip提示</Col>
      </Row>
      <Row gutter={20} className="mt10">
        <Col span={8}>
          <div className="omit-text-wrap">
            <Paragraph ellipsis>{article}</Paragraph>
          </div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap">
            <Paragraph ellipsis={{rows: 2, expandable: true, symbol: '更多'}}>{article}</Paragraph>
          </div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap">
            <Text
              style={{width: 100}}
              ellipsis={{
                tooltip: article,
              }}>
              {article}
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default PageView
