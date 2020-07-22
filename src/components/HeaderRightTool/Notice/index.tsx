/** @format */

import React from 'react'
import {BellOutlined} from '@ant-design/icons'
import './index.less'
import {Badge} from 'antd'
interface IProps {
  number: number
}

const PageView: React.FC<IProps> = props => {
  return (
    <Badge count={props.number} offset={[-10, 0]}>
      <BellOutlined className="notice-tip" />
    </Badge>
  )
}
export default PageView
