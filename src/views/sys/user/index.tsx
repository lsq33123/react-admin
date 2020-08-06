/** @format */

import React from 'react'
import {Table, Input, Button, Space, Form} from 'antd'
import Toolbars from '@/components/Toolbars'
import './index.less'

interface IProps {
  //props:any
}

const PageViewUser: React.FC<IProps> = props => {
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
  ]

  return (
    <div id="page-view-user" className="container-body ">
      <Space size={20} direction="vertical" style={{width: '100%'}}>
        <Toolbars>
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="333请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Input placeholder="请输入..."></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary">查询</Button>
            </Form.Item>
          </Form>
        </Toolbars>
        <Table columns={column}></Table>
      </Space>
    </div>
  )
}
export default PageViewUser
