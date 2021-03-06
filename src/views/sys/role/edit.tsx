/** @format */

import React, {useEffect} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, message, InputNumber, Radio} from 'antd'
import {useForm} from 'antd/lib/form/util'
import * as api from '@/api'

interface IProps {
  isShow: boolean
  isEdit: boolean
  currRow: object
  onOk: () => void
  onCancel: () => void
}

const PageViewRoleEdit: React.FC<IProps> = props => {
  const [form] = useForm()

  useEffect(() => {
    if (props.isEdit) {
      form.setFieldsValue({...props.currRow})
    }
  }, [])

  const formOptions = {
    labelCol: {
      flex: '100px',
      // xs: {span: 6},
      // lg: {span: 4},
      // xxl: {span: 3},
    },
    wrapperCol: {span: 15},
    colon: false,
    validateMessages: {
      required: '${label} 为必填字段!',
    },
    form: form,
    initialValues: {
      sort: !props.isEdit ? 0 : '',
      status: !props.isEdit ? 0 : '',
    },
  }

  const onOk = () => {
    form
      .validateFields()
      .then(res => {
        //保存
        if (props.isEdit) {
          const formData = (form.getFieldValue as any)()
          debugger
          api
            .updateRole(formData.id, formData)
            .then(res => {
              message.success('更新成功')
              props.onOk()
            })
            .catch(err => {
              message.error('更新失败')
            })
        } else {
          api
            .addRoleList({...res})
            .then(res => {
              message.success('添加成功')
              props.onOk()
            })
            .catch(err => {
              message.error('添加失败')
            })
        }
      })
      .catch(err => {})
  }

  return (
    <Modal
      title={props.isEdit ? '编辑' : '新增'}
      destroyOnClose
      centered
      maskClosable={false}
      visible={props.isShow}
      onOk={onOk}
      onCancel={props.onCancel}
      okText="确定"
      cancelText="取消">
      <Form {...formOptions}>
        <Form.Item name="name" label="角色名称" rules={[{required: true}]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="code" label="角色编码" rules={[{required: true}]}>
          <Input disabled={props.isEdit}></Input>
        </Form.Item>
        <Form.Item name="sort" label="排序" rules={[{required: true}]}>
          <InputNumber min={0} max={999} />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{required: true}]}>
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewRoleEdit
