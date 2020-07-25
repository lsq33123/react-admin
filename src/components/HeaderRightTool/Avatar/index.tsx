/** @format */

import React from 'react'
import {Menu, Dropdown} from 'antd'
import './index.less'
import Global from '@/store/global'
import TagView from '@/store/tag-view'
import {useHistory} from 'react-router-dom'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
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
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          <span style={{marginLeft: 20, marginRight: 40}}>个人中心</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          <span style={{marginLeft: 20, marginRight: 40}}>关于</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="##" onClick={onLogout}>
          <span style={{marginLeft: 20, marginRight: 40}}>注销</span>
        </a>
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
export default PageView
