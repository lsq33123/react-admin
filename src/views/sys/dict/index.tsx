/** @format */

import React, {useEffect, useState} from 'react'
import {useBoolean} from 'ahooks'
import {Row, Col, Card, Button, Tree, Table, Input, Space, message} from 'antd'
import {DownOutlined, EditTwoTone} from '@ant-design/icons'
import {Scrollbars} from 'react-custom-scrollbars-2'
import Add from './add'
import * as api from '@/api'
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

const PageViewDict: React.FC<IProps> = props => {
  const [showEdit, setShowEdit] = useBoolean(false) //是否显示编辑页面
  const [isEdit, setIsEdit] = useBoolean(false) //是否为编辑
  const [isType, setIsType] = useBoolean(false) //是否为字典分类
  const [tableLoading, setTableLoading] = useBoolean(false) //是否表格加载状态
  const [treeData, setTreeData] = useState([])
  const [currTypeId, setCurrTypeId] = useState('')
  const [currFormData, setCurrFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [seachType, setSeachType] = useState('')
  const [seachData, setSeachData] = useState('')
  const height = document.body.clientHeight - 94

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (value, row, index) => `${index + 1}`,
    },
    {
      title: '编码',
      dataIndex: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'is_disabled',
      render: value => (value === 0 ? '启用' : '禁用'),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: (a, b) => a.sort - b.sort,
    },
    {
      title: '扩展属性1',
      dataIndex: 'extra1',
    },
    {
      title: '扩展属性2',
      dataIndex: 'extra2',
    },
    {
      title: '扩展属性3',
      dataIndex: 'extra3',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (val, row, index) => {
        return (
          <Button
            type="link"
            size="small"
            onClick={() => {
              setIsEdit.setTrue()
              setIsType.setFalse()
              setShowEdit.setTrue()
              setCurrFormData(row)
            }}>
            修改
          </Button>
        )
      },
    },
  ]

  const onOk = formData => {
    if (isType && !isEdit) {
      //新增分类
      api.addDictType(formData).then(res => {
        // console.log('res:', res)
        message.success('新增分类成功')
        getTypeTree({status: 0})
      })
    }
    if (isType && isEdit) {
      //修改分类
      api.updateTypeList(formData).then(res => {
        // console.log('res:', res)
        message.success('修改分类成功')
        getTypeTree({status: 0})
      })
    }
    if (!isType && !isEdit) {
      //新增字典
      formData.type_id = currTypeId
      api.addDictData(formData).then(res => {
        // console.log('res:', res)
        message.success('新增字典成功')
        getDataList({type_id: currTypeId, status: 0, name: seachData})
      })
    }
    if (!isType && isEdit) {
      //新增字典
      api.updateDataList(formData).then(res => {
        // console.log('res:', res)
        message.success('修改字典成功')
        getDataList({type_id: currTypeId, status: 0, name: seachData})
      })
    }
    setShowEdit.setFalse()
    setCurrFormData({})
  }

  const onCancelLeft = () => {
    setShowEdit.setFalse()
  }

  useEffect(() => {
    getTypeTree({cache: true, status: 0})
    // getDataList({type_id: currTypeId, cache: true, status: 0})
  }, [])

  useEffect(() => {
    if (currTypeId) {
      getDataList({type_id: currTypeId, status: 0})
    }
  }, [currTypeId])

  const getTypeTree = params => {
    api.getDictTypeTree(params).then(res => {
      // console.log('res:', res)
      setTreeData(res.data)
    })
  }
  const getDataList = params => {
    setTableLoading.setTrue()
    api.getDictDataList(params).then(res => {
      // console.log('res:', res)
      setTableLoading.setFalse()
      setTableData(res.data)
    })
  }

  const onSearchType = val => {
    // getDataList({type_id: currTypeId, status: 0, name: val})
    getTypeTree({status: 0, name: val})
  }
  const onSearchData = val => {
    getDataList({type_id: currTypeId, status: 0, name: val})
  }
  const getTreeNode = data => {
    return data.map(item => {
      return (
        <Tree.TreeNode title={() => getTreeTitle(item)} key={item.id}>
          {item.children && getTreeNode(item.children)}
        </Tree.TreeNode>
      )
    })
  }

  const getTreeTitle = item => (
    <span className="custom-tree-node">
      <span
        onClick={() => {
          setCurrTypeId(item.id)
        }}>
        {item.name}
      </span>
      <span className="tree-edit-btn">
        &nbsp;&nbsp;
        <EditTwoTone
          onClick={() => {
            setIsEdit.setTrue()
            setIsType.setTrue()
            setShowEdit.setTrue()
            setCurrFormData(item)
          }}
        />
      </span>
    </span>
  )

  return (
    <div id="page-view-dict" className="container-body ">
      <Row gutter={15}>
        <Col span={7}>
          <Card
            title=" "
            extra={
              <Space>
                <Input.Search
                  value={seachType}
                  allowClear
                  enterButton="查询"
                  placeholder="请输入名称查询"
                  onChange={e => setSeachType(e.target.value)}
                  onSearch={onSearchType}></Input.Search>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsEdit.setFalse()
                    setIsType.setTrue()
                    setShowEdit.setTrue()
                    setCurrFormData({})
                  }}>
                  新增
                </Button>
              </Space>
            }
            style={{height: height}}>
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} className="scroller-menu">
              <Tree showLine switcherIcon={<DownOutlined />} defaultExpandAll={true}>
                {getTreeNode(treeData)}
              </Tree>
            </Scrollbars>
          </Card>
        </Col>
        <Col span={17}>
          <Card
            title=" "
            extra={
              <Space>
                <Input.Search
                  allowClear
                  value={seachData}
                  enterButton="查询"
                  placeholder="请输入名称查询"
                  onChange={e => setSeachData(e.target.value)}
                  onSearch={onSearchData}></Input.Search>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsEdit.setFalse()
                    setIsType.setFalse()
                    setCurrFormData({})
                    if (currTypeId) {
                      setShowEdit.setTrue()
                    } else {
                      message.warning('请先选择字典分类')
                    }
                  }}>
                  新增
                </Button>
              </Space>
            }
            style={{height: height}}>
            <Table columns={columns} dataSource={tableData} loading={tableLoading} />
          </Card>
        </Col>
      </Row>
      {showEdit && (
        <Add
          visible={showEdit}
          isEdit={isEdit}
          isType={isType}
          formData={currFormData}
          currTypeId={currTypeId}
          onOk={onOk}
          onCancel={onCancelLeft}
        />
      )}
    </div>
  )
}
export default PageViewDict
