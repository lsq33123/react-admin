/** @format */

import React, {useEffect, useState} from 'react'
import {Table, Input, Button, Space, Form, DatePicker, Select, Switch} from 'antd'
import {SearchOutlined, PlusOutlined} from '@ant-design/icons'
import Toolbars from '@/components/Toolbars'
import * as api from '@/api'
import {formatMobile} from '@/utils/format'
import dayjs from 'dayjs'
import './index.less'
import {useForm} from 'antd/lib/form/util'
import Add from './add'
import {useBoolean} from 'ahooks'

interface IProps {
  //props:any
}

const PageViewUser: React.FC<IProps> = props => {
  const [tableData, setTableData] = useState<Array<any>>([])
  const [isShowEdit, setIsShowEdit] = useBoolean(true)
  const [form] = useForm()

  useEffect(() => {
    loadData({})
  }, [])

  const loadData = params => {
    api.getUersList(params).then(res => {
      // console.log('res:', res)
      setTableData(res.data)
      // debugger
    })
  }

  const onStatusChange = (row, val) => {
    setTableData(pre => {
      const tempArr = [...pre]
      tempArr.forEach((item, index, arr) => {
        if (item.user_id === row.user_id) {
          item.status = val ? 0 : 1
        }
      })
      return tempArr
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
      title: '昵称',
      dataIndex: 'nick_name',
    },
    {
      title: '账号',
      dataIndex: 'user_name',
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      render: val => formatMobile(val),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: val => (val === 0 ? '男' : val === 1 ? '女' : '-'),
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
    {
      title: '最后登录时间',
      dataIndex: 'login_date',
      render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''),
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''),
    },
    {
      title: '操作',
      render: (val, row, index) => (
        <Button
          type="link"
          onClick={() => {
            setIsShowEdit.setTrue()
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
            <Form.Item name="nick_name">
              <Input placeholder="请输入昵称" allowClear className="tool-input-w-150"></Input>
            </Form.Item>
            <Form.Item name="user_name">
              <Input placeholder="请输入账号" allowClear className="tool-input-w-150"></Input>
            </Form.Item>
            <Form.Item name="phonenumber">
              <Input placeholder="请输入手机号" allowClear className="tool-input-w-150"></Input>
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
                }}>
                新增
              </Button>
            </Form.Item>
          </Form>
        </Toolbars>
        {JSON.stringify(tableData)}
        <Table columns={column} dataSource={tableData} rowKey="user_id"></Table>
      </Space>

      <Add isShow={isShowEdit} onCancel={() => setIsShowEdit.setFalse()} />
    </div>
  )
}
export default PageViewUser
