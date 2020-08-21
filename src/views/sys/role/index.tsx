/** @format */

import React, {useEffect, useState} from 'react'
import {Table, Input, Button, Space, Form, DatePicker, Select, Switch, message} from 'antd'
import {SearchOutlined, PlusOutlined} from '@ant-design/icons'
import Toolbars from '@/components/Toolbars'
import * as api from '@/api'
import dayjs from 'dayjs'
import './index.less'
import {useForm} from 'antd/lib/form/util'
import Edit from './edit'
import {useBoolean} from 'ahooks'

interface IProps {
  //props:any
}

const PageViewRole: React.FC<IProps> = props => {
  const [tableData, setTableData] = useState<Array<any>>([])
  const [isShowEdit, setIsShowEdit] = useBoolean(false)
  const [isEdit, setIsEdit] = useBoolean(false)
  const [currRow, setCurrRow] = useState({})
  const [tableLoading, setTableLoading] = useBoolean(false)
  const [form] = useForm()

  useEffect(() => {
    loadData({})
  }, [])

  const loadData = params => {
    setTableLoading.setTrue()
    api
      .getRoleList(params)
      .then(res => {
        setTableLoading.setFalse()
        setTableData(res.data)
      })
      .catch(() => {
        setTableLoading.setFalse()
      })
  }

  const onStatusChange = (row, value) => {
    const val = value ? 0 : 1
    api
      .updateRoleStatus(row.id, val)
      .then(res => {
        message.success('操作成功')
        setTableData(pre => {
          const tempArr = [...pre]
          tempArr.forEach((item, index, arr) => {
            if (item.id === row.id) {
              item.status = val
            }
          })
          return tempArr
        })
      })
      .catch(err => {
        message.error('操作失败')
      })
  }

  const onSearch = () => {
    const formData = (form.getFieldValue as any)()
    loadData(formData)
  }

  const column = [
    {
      title: '序号',
      // dataIndex: 'name',
      render: (val, row, index) => `${index + 1}`,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render: (val, row) => (val === '0' ? '启用' : '禁用'),
      render: (val, row) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={!val}
          onChange={val => onStatusChange(row, val)}
        />
      ),
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'create_time',
    //   render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''),
    // },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      render: (val, row) =>
        val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      render: (val, row, index) => (
        <Button
          type="link"
          onClick={() => {
            setIsShowEdit.setTrue()
            setIsEdit.setTrue()
            setCurrRow(row)
          }}>
          编辑
        </Button>
      ),
    },
  ]

  return (
    <div id="page-view-user" className="container-body ">
      <Space size={20} direction="vertical" style={{width: '100%'}}>
        <Toolbars>
          <Form layout="inline" form={form}>
            <Form.Item name="name">
              <Input placeholder="请输入角色名称" allowClear className="tool-input-w-150"></Input>
            </Form.Item>
            <Form.Item name="code">
              <Input placeholder="请输入角色编码" allowClear className="tool-input-w-150"></Input>
            </Form.Item>
            <Form.Item name="status">
              <Select allowClear placeholder="请选择状态" className="tool-input-w-150">
                <Select.Option value={0}>启用</Select.Option>
                <Select.Option value={1}>禁用</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="tempDate">
              <DatePicker.RangePicker
                allowClear
                className="tool-datepacker-w-230"
                onChange={(dates, dateStrs) =>
                  api.setFormDateRange(dateStrs, form, 'beginDate', 'endDate')
                }></DatePicker.RangePicker>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setIsShowEdit.setTrue()
                  setIsEdit.setFalse()
                }}>
                新增
              </Button>
            </Form.Item>
          </Form>
        </Toolbars>
        <Table columns={column} dataSource={tableData} rowKey="id" loading={tableLoading}></Table>
      </Space>
      {isShowEdit && (
        <Edit
          isShow={isShowEdit}
          isEdit={isEdit}
          currRow={currRow}
          onOk={() => {
            setIsShowEdit.setFalse()
            onSearch()
          }}
          onCancel={() => setIsShowEdit.setFalse()}
        />
      )}
    </div>
  )
}
export default PageViewRole
