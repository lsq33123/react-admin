/** @format */

import React from 'react'
import {Menu, Dropdown} from 'antd'
import './index.less'
import Global from '@/store/global'
import TagView from '@/store/tag-view'
import {useNavigate} from 'react-router-dom'
import SettingDrawer from './settingDrawer'
import {UserOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined} from '@ant-design/icons'
interface IProps {
  //props:any
}

const PageViewAvatarMenu: React.FC<IProps> = props => {
  const [visible, setVisible] = React.useState(false)
  const {logout} = Global.useContainer()
  const {delAllView} = TagView.useContainer()
  const navigate = useNavigate()
  const onLogout = () => {
    console.log('123:', 123)
    navigate('/noneed/login', {replace: true})
    logout()
    delAllView()
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} onClick={() => navigate('/need/sys/my', {replace: true})}>
        <span style={{marginLeft: 0, marginRight: 40}}>个人中心</span>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} onClick={() => setVisible(true)}>
        <span style={{marginLeft: 0, marginRight: 40}}>设置</span>
      </Menu.Item>
      <Menu.Item icon={<QuestionCircleOutlined />}>
        <span style={{marginLeft: 0, marginRight: 40}}>关于</span>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={onLogout}>
        <span style={{marginLeft: 0, marginRight: 40}}>注销</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="avatar">
        <Dropdown overlay={avatarMenu} placement="bottomRight">
          <img src="https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i" className="avatar-img" />
        </Dropdown>
      </div>
      <SettingDrawer isShow={visible} onClose={() => setVisible(false)} />
    </>
  )
}
export default PageViewAvatarMenu
