/** @format */

import React, {useEffect, useState} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, message, InputNumber, Radio, Row, Col, TreeSelect, Popover} from 'antd'
import * as icon from '@ant-design/icons'
import {CloseOutlined} from '@ant-design/icons'

import * as api from '@/api'
// import {useBoolean} from 'ahooks'
import './index.less'

interface IProps {
  isShow: boolean
  isEdit: boolean
  currRow: any
  treeData: Array<any>
  onOk: () => void
  onCancel: () => void
}

const PageViewMenuEdit: React.FC<IProps> = props => {
  const [menuType, setMenuType] = useState(1)
  // const [showSelect, setShowSelect] = useBoolean(false)
  const [iconList, setIconList] = useState<Array<any>>([])
  const [showIconList, setShowIconList] = useState<Array<any>>([])
  const [currIcon, setCurrIcon] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    if (props.isEdit) {
      const temp = {...props.currRow}
      temp.parent_id = temp.parent_id === 0 ? '' : temp.parent_id
      form.setFieldsValue(temp)
      setMenuType(props.currRow.menu_type)
    }
    let tempArr: Array<any> = []
    for (const key in icon) {
      tempArr.push(key)
    }
    tempArr.splice(tempArr.length - 4, 4) // 最后4个不是图标 影响渲染
    tempArr = tempArr.filter(item => item.indexOf('lined') > -1) //过滤掉 实底风格的 和 双色风格的  只保留线条风格
    setIconList(tempArr)
    setShowIconList(tempArr)
  }, [])

  useEffect(() => {
    if (iconList.length) {
      if (currIcon) {
        let arr = iconList.filter(item => item.toLowerCase().indexOf(currIcon) > -1)
        setShowIconList(arr)
      } else {
        setShowIconList(iconList)
      }
    }
  }, [currIcon])

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
      menu_type: !props.isEdit ? 1 : '',
      is_frame: !props.isEdit ? 0 : '',
      visible: !props.isEdit ? 0 : '',
      order_num: !props.isEdit ? 0 : '',
      status: !props.isEdit ? 0 : '',
    },
  }

  const delIcon = () => {
    form.setFieldsValue({icon: ''})
    setCurrIcon('')
  }

  const onOk = () => {
    form
      .validateFields()
      .then(res => {
        //保存
        if (props.isEdit) {
          const formData = (form.getFieldValue as any)()
          api.updateMenu(formData.menu_id, formData).then(res => {
            message.success('更新成功')
            props.onOk()
          })
        } else {
          api.addMenuList({...res}).then(res => {
            message.success('添加成功')
            props.onOk()
          })
        }
      })
      .catch(err => {})
  }

  // const createIcon = name => React.createElement(icon && icon[name], {style: {fontSize: '16px'}})

  const showIcon = () => {
    return (
      <div className="icon-list-body">
        {showIconList.map((item, index) => {
          // return React.createElement(item, {style: {fontSize: '16px'}})
          return (
            <Popover
              title={`${item}`}
              key={index}
              content={
                <div className="flex-center">
                  {React.createElement(icon && icon[item], {
                    style: {
                      fontSize: '100px',
                    },
                    onClick: val => {
                      form.setFieldsValue({icon: item})
                      setCurrIcon(item)
                    },
                  })}
                </div>
              }
              trigger="hover">
              {React.createElement(icon && icon[item], {
                style: {
                  fontSize: '20px',
                  margin: '0px 10px 10px 0px',
                },
                onClick: val => {
                  form.setFieldsValue({icon: item})
                  setCurrIcon(item)
                },
              })}
            </Popover>
          )
        })}
      </div>
    )
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
      width={800}
      cancelText="取消">
      {/* {JSON.stringify(iconList)} */}

      <Form {...formOptions}>
        <Row>
          <Col span={24}>
            <Form.Item name="parent_id" label="上级菜单" wrapperCol={{flex: '612px'}}>
              <TreeSelect
                // style={{ width: '100%' }}
                // value={this.state.value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={props.treeData}
                placeholder="请选择上级菜单"
                // treeDefaultExpandAll
                // treeNodeLabelProp="name"
                // onChange={this.onChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="menu_type" label="菜单类型" rules={[{required: true}]}>
              <Radio.Group onChange={e => setMenuType(e.target.value)}>
                <Radio value={0}>目录</Radio>
                <Radio value={1}>菜单</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Popover content={showIcon} trigger="focus">
              <Form.Item name="icon" label="菜单图标">
                <Input
                  allowClear
                  onChange={e => setCurrIcon(e.target.value)}
                  readOnly
                  suffix={currIcon ? <CloseOutlined onClick={delIcon} /> : null}
                />
              </Form.Item>
            </Popover>
          </Col>
          <Col span={2}>
            <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.icon !== curValues.icon}>
              {({getFieldValue}) => {
                // <UserOutlined className="site-form-item-icon" />
                return icon[getFieldValue('icon')] ? (
                  React.createElement(icon && icon[getFieldValue('icon')], {
                    style: {
                      fontSize: '20px',
                      marginLeft: '-10px',
                    },
                  })
                ) : (
                  <></>
                )
              }}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="menu_name" label="菜单名称" rules={[{required: true}]}>
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="perms" label="菜单编码" rules={[{required: true}]}>
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="path" label="路由地址" rules={[{required: true}]}>
              <Input placeholder="以/开头"></Input>
            </Form.Item>
          </Col>
          {menuType ? (
            <Col span={12}>
              <Form.Item name="component" label="组件路径" rules={[{required: true}]}>
                <Input placeholder="以/开头"></Input>
              </Form.Item>
            </Col>
          ) : null}

          <Col span={12}>
            <Form.Item name="order_num" label="显示排序" rules={[{required: true}]}>
              <InputNumber min={0} max={99} style={{width: '100%'}} />
            </Form.Item>
          </Col>

          {menuType ? (
            <Col span={12}>
              <Form.Item name="is_frame" label="打开方式" rules={[{required: true}]}>
                <Radio.Group>
                  <Radio value={0}>系统</Radio>
                  <Radio value={1}>全屏</Radio>
                  <Radio value={2}>外链</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          ) : null}

          {/* <Col span={12}>
            <Form.Item name="perms" label="权限标识" rules={[{required: true}]}>
              <Input></Input>
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item name="visible" label="显示状态" rules={[{required: true}]}>
              <Radio.Group>
                <Radio value={0}>显示</Radio>
                <Radio value={1}>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="菜单状态" rules={[{required: true}]}>
              <Radio.Group>
                <Radio value={0}>启用</Radio>
                <Radio value={1}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* <Form.Item name="code" label="角色编码" rules={[{required: true}]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="order_num" label="排序" rules={[{required: true}]}>
          <InputNumber min={0} max={999} />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{required: true}]}>
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>禁用</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  )
}
export default PageViewMenuEdit
