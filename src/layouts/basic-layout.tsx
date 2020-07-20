/** @format */

import React, {useState} from 'react'
import {Layout} from 'antd'
import './index.less'
import SiderBarMenu from './siderbar-menu'
import SiderBarLogo from './siderbar-logo'
import ToolbarRight from './toolbar-right'
import ToolbarTabs from './toolbar-tabs'

import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
interface IProps {
  //props:any
}
const PageView: React.FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{overflow: 'hidden', height: '100vh'}}>
      <Layout.Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <SiderBarLogo collapsed={collapsed} />
        <SiderBarMenu />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="header" style={{padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <ToolbarTabs />
          <ToolbarRight />
        </Layout.Header>
        <Layout.Content className="content">{props.children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
export default PageView
