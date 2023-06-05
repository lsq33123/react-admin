/** @format */

import React, {useEffect, useState} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, InputNumber, Radio, TreeSelect, Button, Row, Col} from 'antd'
import {useBoolean} from 'ahooks'
import * as api from '@/api'

interface IProps {
  //props:any
  visible: boolean
  isEdit: boolean
  isType: boolean
  formData: any
  currTypeId: string
  onOk: (form) => void
  onCancel: () => void
}

const PageViewDictAdd: React.FC<IProps> = props => {
  const [showExtra, showExtraAct] = useBoolean(false)
  const [treeData, setTreeData] = useState([])
  const [form] = Form.useForm()
  // const onOk = props => {
  //   //console.log(props)
  // }
  // const onCancel = props => {
  //   //console.log(props)
  // }

  useEffect(() => {
    if (props.isType) {
      getTypeTree() //加载父节点
    } else {
      getDataTree()
    }
    if (JSON.stringify(props.formData) !== '{}') {
      form.setFieldsValue({...props.formData})
    }
  }, [])

  const getTypeTree = () => {
    api.getDictTypeTree({cache: true, is_disable: 0}).then(res => {
      // console.log('res:', res)
      setTreeData(res.data)
    })
  }
  const getDataTree = () => {
    api.getDictDataList({type_id: props.currTypeId, is_disable: 0}).then(res => {
      // console.log('res:', res)
      setTreeData(res.data)
    })
  }

  const formOptions = {
    labelCol: {
      flex: '80px',
      // xs: {span: 6},
      // lg: {span: 4},
      // xxl: {span: 3},
    },
    wrapperCol: {span: 17},
    colon: false,
    validateMessages: {
      required: '${label} 为必填字段!',
    },
    form: form,
    initialValues: {
      sort: !props.isEdit ? 0 : '',
      is_disabled: !props.isEdit ? 0 : '',
    },
  }

  const onOk = () => {
    const data = (form.getFieldValue as any)()
    props.onOk(data)
  }

  return (
    <Modal
      visible={props.visible}
      title={props.isEdit ? '编辑数据字典' : '新增数据字典'}
      // centered
      maskClosable={false}
      onOk={onOk}
      onCancel={props.onCancel}
      okText="确定"
      cancelText="取消">
      <Form {...formOptions}>
        <Form.Item name="pid" label="父节点">
          <TreeSelect
            // style={{ width: '100%' }}
            // value={this.state.value}
            fieldNames={{label: 'name', value: 'id'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder="请选择父节点"
            treeDefaultExpandAll
            // onChange={this.onChange}
          />
        </Form.Item>
        <Form.Item name="name" label="名称">
          <Input></Input>
        </Form.Item>
        <Form.Item name="code" label="编码">
          <Input disabled={props.isEdit}></Input>
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input></Input>
        </Form.Item>
        <Row>
          <Col span={15}>
            <Form.Item name="sort" label="排序">
              <InputNumber min={0} max={999} style={{width: '100px'}} />
            </Form.Item>
          </Col>
          <Col flex="120px">
            <Button type="link" onClick={() => showExtraAct.toggle()}>
              {showExtra ? '隐藏扩展信息' : '显示扩展信息'}
            </Button>
          </Col>
        </Row>
        {showExtra && (
          <>
            <Form.Item name="extra1" label="扩展1">
              <Input></Input>
            </Form.Item>
            <Form.Item name="extra2" label="扩展2">
              <Input></Input>
            </Form.Item>
            <Form.Item name="extra3" label="扩展3">
              <Input></Input>
            </Form.Item>
          </>
        )}

        <Form.Item name="is_disabled" label="状态">
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewDictAdd
