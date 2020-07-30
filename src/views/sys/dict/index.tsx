/** @format */

import React from 'react'
import {useBoolean} from 'ahooks'
import {Row, Col, Card, Button, Tree, Table, Input, Space} from 'antd'
import Add from './add'
// import {
//   UserOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   ApartmentOutlined,
//   TeamOutlined,
//   CalendarOutlined,
// } from '@ant-design/icons'
import './index.less'
interface IProps {
  //props:any
}

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{title: <span style={{color: '#1890ff'}}>sss</span>, key: '0-0-1-0'}],
      },
    ],
  },
]

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: (value, row, index) => `${index + 1}`,
  },
  {
    title: '编码',
    dataIndex: 'type',
  },
  {
    title: '名称',
    dataIndex: 'content',
  },
  {
    title: '状态',
    dataIndex: 'content',
  },
  {
    title: '排序',
    dataIndex: 'content',
  },
  {
    title: '扩展属性1',
    dataIndex: 'content',
  },
  {
    title: '扩展属性2',
    dataIndex: 'content',
  },
  {
    title: '扩展属性3',
    dataIndex: 'content',
  },
  {
    title: '操作',
    dataIndex: '',
  },
]

const PageViewDict: React.FC<IProps> = props => {
  const [showEdit, setShowEdit] = useBoolean(true)
  const height = document.body.clientHeight - 104

  const onOkLeft = () => {
    setShowEdit.setFalse()
  }
  const onCancelLeft = () => {
    setShowEdit.setFalse()
  }

  const LetfExtra = () => (
    <Space>
      <Input.Search enterButton="查询"></Input.Search>
      <Button type="primary" onClick={() => setShowEdit.setTrue()}>
        新增
      </Button>
    </Space>
  )

  return (
    <div id="page-view-dict" className="container-body ">
      <Row gutter={20}>
        <Col span={8}>
          <Card title=" " extra={<LetfExtra />} style={{height: height}}>
            <Tree treeData={treeData}></Tree>
          </Card>
        </Col>
        <Col span={16}>
          <Card title=" " extra={<LetfExtra />} style={{height: height}}>
            <Table columns={columns} />
          </Card>
        </Col>
      </Row>
      {showEdit && <Add visible={showEdit} onOk={onOkLeft} onCancel={onCancelLeft} />}
    </div>
  )
}
export default PageViewDict
