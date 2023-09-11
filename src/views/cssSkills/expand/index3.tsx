/** @format */

import {Col, Row, Slider, Typography} from 'antd'
import React, {useState} from 'react'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const article =
    '记录分享每一个日常开发项目中的实用小知识，不整那些虚头巴脑的框架理论与原理，之前分享过抽奖功能、签字功能等，有兴趣的可以看看本人以前的分享。'
  const [rows, setRows] = useState(1)
  const {Paragraph, Text} = Typography

  const EllipsisMiddle: React.FC<{suffixCount: number; children: string}> = ({suffixCount, children}) => {
    const start = children.slice(0, children.length - suffixCount).trim()
    const suffix = children.slice(-suffixCount).trim()
    return (
      <Text style={{maxWidth: '100%'}} ellipsis={{suffix}}>
        {start}
      </Text>
    )
  }

  return (
    <div style={{width: '100%', minHeight: '100px'}}>
      <Row gutter={20}>
        <Col span={8}>省略到一行</Col>
        <Col span={8}>省略到一行附加展开按钮</Col>
        {/* <Col span={8}>省略到一行Tooltip提示</Col> */}
      </Row>
      <Row gutter={20} className="mt10">
        <Col span={8}>
          <div className="omit-text-wrap">
            <EllipsisMiddle suffixCount={12}>{article}</EllipsisMiddle>
          </div>
        </Col>
        <Col span={8}>
          <div className="omit-text-wrap">
            <Slider value={rows} min={1} max={10} onChange={setRows} />
            <Paragraph
              ellipsis={{
                rows,
                expandable: true,
                suffix: '--William Shakespeare',
                onEllipsis: ellipsis => {
                  console.log('Ellipsis changed:', ellipsis)
                },
              }}
              title={`${article}--William Shakespeare`}>
              {article}
            </Paragraph>
          </div>
        </Col>
        <Col span={8}>{/* <div className="omit-text-wrap"></div> */}</Col>
      </Row>
    </div>
  )
}
export default PageView
