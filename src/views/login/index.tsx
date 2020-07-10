import React from 'react'
import './index.less'
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
interface IProps {
  //props:any
}

const PageLogin: React.FC<IProps> = (props) => {
  const hisotry = useHistory()
  const login = (props) => {
    //console.log(props)
    hisotry.push('/need/home')
  }

  return (
    <div id="pageLogin">
      <div className="login-body">
        <div className="login-body-title">XXX系统</div>
        <div className="login-body-form">
          <Form>
            <Form.Item>
              <Input placeholder="请输入账号" className="input-width"></Input>
            </Form.Item>
            <Form.Item style={{ marginTop: 20 }}>
              <Input
                type="password"
                placeholder="请输入密码"
                className="input-width"
              ></Input>
            </Form.Item>
            <Form.Item style={{ marginTop: 20 }}>
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
