/** @format */

import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, message} from 'antd'
import {useForm} from 'antd/lib/form/util'

interface IProps {
  isShow: boolean
  onCancel: () => void
}

const PageViewUserEdit: React.FC<IProps> = props => {
  const [form] = useForm()
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
    form: form,
    // initialValues: {
    //   is_disabled: !props.isEdit ? 0 : '',
    // },
  }

  const onOk = () => {
    form
      .validateFields()
      .then(res => {
        if (res.password === res.password2) {
          message.error('两次输入的密码不匹配')
        } else {
          //保存
          // doSave
        }
      })
      .catch(err => {})
  }

  return (
    <Modal title="新增" destroyOnClose centered visible={props.isShow} onOk={onOk} onCancel={props.onCancel}>
      <Form {...formOptions}>
        <Form.Item name="nick_name" label="昵称" rules={[{required: true}]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="user_name" label="账号" rules={[{required: true}]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{required: true}]}>
          <Input type="password"></Input>
        </Form.Item>
        <Form.Item name="password2" label="确认密码" rules={[{required: true}]}>
          <Input type="password"></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewUserEdit
