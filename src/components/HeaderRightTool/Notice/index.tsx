/** @format */

import React from 'react'
import {BellOutlined} from '@ant-design/icons'
import './index.less'
import {Badge} from 'antd'
import {useHistory} from 'react-router-dom'
interface IProps {
  number: number
}

const PageView: React.FC<IProps> = props => {
  const history = useHistory()
  return (
    <Badge count={props.number} offset={[-10, 0]}>
      <BellOutlined className="notice-tip" onClick={() => history.replace('/need/sys/notice')} />
    </Badge>
  )
}
export default PageView
