/** @format */

import React from 'react'
import {Menu, Dropdown} from 'antd'
import './index.less'
import Global from '@/store/global'
import TagView from '@/store/tag-view'
import {useHistory} from 'react-router-dom'
import {UserOutlined, LogoutOutlined, QuestionCircleOutlined} from '@ant-design/icons'
interface IProps {
  //props:any
}

const PageViewAvatarMenu: React.FC<IProps> = props => {
  const {logout} = Global.useContainer()
  const {delAllView} = TagView.useContainer()
  const history = useHistory()
  const onLogout = () => {
    history.replace('/noneed/login')
    logout()
    delAllView()
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <span style={{marginLeft: 0, marginRight: 40}} onClick={() => history.replace('/need/sys/my')}>
          个人中心
        </span>
      </Menu.Item>
      <Menu.Item icon={<QuestionCircleOutlined />}>
        <span style={{marginLeft: 0, marginRight: 40}}>关于</span>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <span style={{marginLeft: 0, marginRight: 40}} onClick={onLogout}>
          注销
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="avatar">
      <Dropdown overlay={avatarMenu} placement="bottomRight">
        <img src="https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i" className="avatar-img" />
      </Dropdown>
    </div>
  )
}
export default PageViewAvatarMenu
