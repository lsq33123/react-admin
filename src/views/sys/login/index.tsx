/** @format */

import React from 'react'
import './index.less'
import {Form, Input, Button, message} from 'antd'
import {useHistory} from 'react-router-dom'
import Global from '@/store/global'
import * as api from '@/api'
interface IProps {
  //props:any
}

const PageLogin: React.FC<IProps> = props => {
  const [form] = Form.useForm()
  const hisotry = useHistory()
  const {updateToken} = Global.useContainer()
  // const isload = useBoolean()
  const login = () => {
    const username = form.getFieldValue('username')
    const password = form.getFieldValue('password')
    if (!username) {
      message.warning('请输入用户名')
      return
    }
    if (!password) {
      message.warning('请输入密码')
      return
    }

    api.getToken({username, password}).then(res => {
      if (res.code === 0 && res.data) {
        updateToken(res.data.token)
        hisotry.replace('/need/home')
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <div id="pageLogin">
      <div className="login-body">
        <div className="login-body-title">XXX系统</div>
        <div className="login-body-form">
          <Form
            form={form}
            initialValues={{
              username: 'admin',
              password: '123',
            }}>
            <Form.Item name="username">
              <Input placeholder="请输入账号" className="input-width"></Input>
            </Form.Item>
            <Form.Item name="password" style={{marginTop: 20}}>
              <Input type="password" placeholder="请输入密码" className="input-width"></Input>
            </Form.Item>
            <Form.Item style={{marginTop: 20}}>
              <Button type="primary" className="input-width" onClick={login}>
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default PageLogin
