/** @format */

import React from 'react'
import {Table, Tabs} from 'antd'
// import {CalendarOutlined} from '@ant-design/icons'
import './index.less'
interface IProps {
  //props:any
}

const columns = [
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
]

const PageViewNotice: React.FC<IProps> = props => {
  return (
    <div id="page-view-notice" className="container-wrap ">
      <Tabs>
        <Tabs.TabPane tab="通知" key="1">
          <Table columns={columns}></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab="待办" key="2">
          <Table columns={columns}></Table>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
export default PageViewNotice
