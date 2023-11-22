/** @format */

import React from 'react'
import {BellOutlined} from '@ant-design/icons'
import './index.less'
import {Badge} from 'antd'
import {useNavigate} from 'react-router-dom'
import Setting from '@/store/setting'
interface IProps {
  number: number
}

const PageView: React.FC<IProps> = props => {
  const {setting} = Setting.useContainer()
  const navigate = useNavigate()
  return (
    <Badge color={setting.theme.token!.colorPrimary} count={props.number} offset={[-10, 0]} size="small">
      <BellOutlined className="notice-tip" onClick={() => navigate('/need/sys/notice', {replace: true})} />
    </Badge>
  )
}
export default PageView
