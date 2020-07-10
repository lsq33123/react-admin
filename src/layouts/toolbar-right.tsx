import React from 'react'
import { Menu, Dropdown } from 'antd'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = (props) => {
  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          关于
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          注销
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div id="toolbar-right">
      <Dropdown overlay={avatarMenu} placement="bottomRight">
        <div className="avatar">
          <img
            src="https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i"
            className="avatar-img"
          />
        </div>
      </Dropdown>
    </div>
  )
}
export default PageView
