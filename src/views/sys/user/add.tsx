/** @format */

import React, {useEffect, useState} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, message, Row, Col, Radio, Select} from 'antd'
import * as api from '@/api'
import {useBoolean} from 'ahooks'

interface IProps {
  isShow: boolean
  isEdit: boolean
  currRow: any
  onOk: () => void
  onCancel: () => void
}

const PageViewUserEdit: React.FC<IProps> = props => {
  const [form] = Form.useForm()
  const [selectLoading, setSelectLoading] = useBoolean(false)
  const [roleList, setRoleList] = useState<Array<any>>([])

  useEffect(() => {
    if (props.isEdit) {
      const temp = {...props.currRow}
      if (temp.role_ids && temp.role_ids.length) {
        temp.role_ids = temp.role_ids.split(',').map(item => Number(item))
      } else {
        temp.role_ids = undefined
      }
      // console.log('temp:', temp)
      form.setFieldsValue({...temp})
    }
    initData()
  }, [])

  const initData = () => {
    setSelectLoading.setTrue()
    api
      .getRoleList({status: 0})
      .then(res => {
        setSelectLoading.setFalse()
        setRoleList(res.data.list)
      })
      .catch(() => {
        setSelectLoading.setFalse()
      })
  }

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
    // initialValues: {
    //   is_disabled: !props.isEdit ? 0 : '',
    // },
  }

  const onOk = () => {
    form
      .validateFields()
      .then(res => {
        //保存
        if (props.isEdit) {
          //编辑
          api.updateUser(props.currRow.user_id, {...props.currRow, ...res}).then(res => {
            message.success('用户更新成功')
            props.onOk()
          })
        } else {
          //新增
          api.addUersList({...res}).then(res => {
            message.success('用户添加成功')
            props.onOk()
          })
        }
      })
      .catch(err => {})
  }

  return (
    <Modal
      title="新增账号"
      destroyOnClose
      centered
      maskClosable={false}
      visible={props.isShow}
      onOk={onOk}
      onCancel={props.onCancel}
      width={800}
      okText="确定"
      cancelText="取消">
      <Form {...formOptions}>
        <Form.Item
          name="nick_name"
          label="昵称"
          rules={[
            {required: true, whitespace: true, message: '昵称不能为空'},
            {min: 2, message: '昵称至少2位'},
            {max: 12, message: '昵称最多12位'},
          ]}>
          <Input style={{width: '610px'}}></Input>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="user_name"
              label="账号"
              rules={[
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                {required: true, whitespace: true, message: '账号不能为空'},
                {min: 4, message: '账号至少4位'},
                {max: 16, message: '账号最多16位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '账号必须是英文、数字或下划线组成'},
              ]}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                {required: !props.isEdit, whitespace: true, message: '密码不能为空'},
                {min: 4, message: '密码至少4位'},
                {max: 12, message: '账号最多12位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '账号必须是英文、数字或下划线组成'},
              ]}>
              <Input type="password"></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phonenumber"
              label="手机号"
              rules={[{pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号'}]}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, message: '请输入正确邮箱'}]}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sex" label="性别">
              <Radio.Group>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="role_ids" label="角色">
              <Select mode="multiple" loading={selectLoading}>
                {roleList.map((item, index) => (
                  <Select.Option value={item.role_id} key={index}>
                    {item.role_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="remark" label="备注">
          <Input style={{width: '610px'}}></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewUserEdit
