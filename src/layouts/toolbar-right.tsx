/** @format */

import React from 'react'
import {Menu, Dropdown} from 'antd'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
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
        <a target="_blank" rel="noopener noreferrer" href="">
          <span style={{marginLeft: 20, marginRight: 40}}>注销</span>
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div id="toolbar-right">
      <div className="avatar">
        <Dropdown overlay={avatarMenu} placement="bottomRight">
          <img src="https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i" className="avatar-img" />
        </Dropdown>
      </div>
    </div>
  )
}
export default PageView
