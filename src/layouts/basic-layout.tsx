/** @format */

import React, {useState} from 'react'
import {Layout} from 'antd'
import './index.less'
import SiderBarMenu from './siderbar-menu'
import SiderBarLogo from './siderbar-logo'
import ToolbarRight from './toolbar-right'
import ToolbarTabs from './toolbar-tabs'
import {getStore, setStore} from '@/utils/store'

import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
interface IProps {
  children?: any
  //props:any
}
const PageView: React.FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState(getStore('collapsed') === 'true' ? true : false)
  return (
    <Layout className="layout-main">
      <Layout.Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <SiderBarLogo collapsed={collapsed} />
        <SiderBarMenu />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="header" style={{padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {
              setCollapsed(!collapsed)
              setStore('collapsed', (!collapsed).toString())
            },
          })}
          <ToolbarTabs />
          <ToolbarRight />
        </Layout.Header>
        <Layout.Content className="main-content">{props.children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
export default PageView
