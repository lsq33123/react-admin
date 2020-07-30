/** @format */

import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import {Form, Input, InputNumber, Radio, TreeSelect, Button, Row, Col} from 'antd'
import {useBoolean} from 'ahooks'

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
      {
        title: 'Child Node3',
        value: '0-0-3',
      },
      {
        title: 'Child Node4',
        value: '0-0-4',
      },
      {
        title: 'Child Node5',
        value: '0-0-5',
      },
      {
        title: 'Child Node6',
        value: '0-0-6',
      },
      {
        title: 'Child Node7',
        value: '0-0-7',
      },
      {
        title: 'Child Node8',
        value: '0-0-8',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
]

interface IProps {
  //props:any
  visible: boolean
  onOk: () => void
  onCancel: () => void
}

const PageViewDictAdd: React.FC<IProps> = props => {
  const [showExtra, showExtraAct] = useBoolean(false)
  // const onOk = props => {
  //   //console.log(props)
  // }
  // const onCancel = props => {
  //   //console.log(props)
  // }

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

  return (
    <Modal
      visible={props.visible}
      title="新增"
      // centered
      maskClosable={false}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okText="确定"
      cancelText="取消">
      <Form {...formOptions}>
        <Form.Item label="父节点：">
          <TreeSelect
            // style={{ width: '100%' }}
            // value={this.state.value}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            // onChange={this.onChange}
          />
        </Form.Item>
        <Form.Item label="名称：">
          <Input></Input>
        </Form.Item>
        <Form.Item label="编码：">
          <Input></Input>
        </Form.Item>
        <Row>
          <Col span={18}>
            <Form.Item label="排序：">
              <InputNumber min={1} max={999} style={{width: '200px'}} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button type="link" onClick={() => showExtraAct.toggle()}>
              {showExtra ? '隐藏扩展信息' : '显示扩展信息'}
            </Button>
          </Col>
        </Row>
        {showExtra && (
          <>
            <Form.Item label="扩展1：">
              <Input></Input>
            </Form.Item>
            <Form.Item label="扩展2：">
              <Input></Input>
            </Form.Item>
            <Form.Item label="扩展3：">
              <Input></Input>
            </Form.Item>
          </>
        )}

        <Form.Item label="状态：">
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PageViewDictAdd
