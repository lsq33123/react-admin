/** @format */

import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input} from 'antd'
import {useForm} from 'antd/lib/form/util'

interface IProps {
  isShow: boolean
  isEdit: boolean
  onOk: () => void
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
    initialValues: {
      is_disabled: !props.isEdit ? 0 : '',
    },
  }

  return (
    <Modal
      title={props.isEdit ? '编辑' : '新增'}
      destroyOnClose
      centered
      width={900}
      visible={props.isShow}
      onOk={props.onOk}
      onCancel={props.onCancel}>
      <Form {...formOptions}>
        <Form.Item name="nick_name" label="昵称">
          <Input></Input>
        </Form.Item>
        <Form.Item name="user_name" label="账号">
          <Input></Input>
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input></Input>
        </Form.Item>
        <Form.Item name="password2" label="确认密码">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewUserEdit
