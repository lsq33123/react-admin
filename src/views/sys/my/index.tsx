/** @format */

import React from 'react'
import {Row, Col, Card, Divider, Form, Input, Tabs, Button, Radio} from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ApartmentOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
const avatarUrl = 'https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i'
import './index.less'
interface IProps {
  //props:any
}

const formOptions = {
  labelCol: {
    flex: '100px',
    // xs: {span: 6},
    // lg: {span: 4},
    // xxl: {span: 3},
  },
  colon: false,
  validateMessages: {
    required: '${label} 为必填字段!',
  },
}

const InfoBar = props => {
  return (
    <div>
      <div className="flex-between info-bar-bofy">
        <span>
          {props.icon} &nbsp;
          {props.label}
        </span>
        <span>{props.value}</span>
      </div>
      <Divider style={{margin: '12px 0px'}} />
    </div>
  )
}

const PageViewMy: React.FC<IProps> = props => {
  return (
    <div id="page-view-my" className="container-body ">
      <Row gutter={20}>
        <Col span={8}>
          <Card title="个人信息">
            <div className="flex-center">
              <img src={avatarUrl} className="page-view-my-avatar" />
            </div>
            <InfoBar label="用户名称" value="admin" icon={<UserOutlined />} />
            <InfoBar label="手机号码" value="12345678901" icon={<PhoneOutlined />} />
            <InfoBar label="用户邮箱" value="xxx@163.com" icon={<MailOutlined />} />
            <InfoBar label="所属部门" value="xx销售人员" icon={<ApartmentOutlined />} />
            <InfoBar label="所属角色" value="超级管理员" icon={<TeamOutlined />} />
            <InfoBar label="创建日期" value="2020-7-3011:43:19" icon={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={16}>
          <Card title="资料修改">
            <Tabs>
              <Tabs.TabPane tab="基本资料" key="1">
                <Form {...formOptions}>
                  <Form.Item label="昵称：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="手机号码：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="邮箱：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="性别：">
                    <Radio.Group>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button type="primary">保存</Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="账号密码" key="2">
                <Form {...formOptions}>
                  <Form.Item label="原始密码：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="新密码：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label="确认密码：" rules={[{required: true}]}>
                    <Input></Input>
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button type="primary">保存</Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default PageViewMy
