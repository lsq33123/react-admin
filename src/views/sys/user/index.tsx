/** @format */

import React, {useState} from 'react'
import {Table, Input, Button, Space, Form, DatePicker, Select, Switch, message} from 'antd'
import {SearchOutlined, PlusOutlined} from '@ant-design/icons'
import Toolbars from '@/components/Toolbars'
import * as api from '@/api'
import {formatMobile} from '@/utils/format'
import dayjs from 'dayjs'
import './index.less'
import Add from './add'
import {useBoolean, useAntdTable} from 'ahooks'

interface IProps {
  //props:any
}

const PageViewUser: React.FC<IProps> = props => {
  const [tableData, setTableData] = useState<Array<any>>([])
  const [isShowEdit, setIsShowEdit] = useBoolean(false)
  const [isEdit, setIsEdit] = useBoolean(false)
  // const [tableLoading, setTableLoading] = useBoolean(false)
  const [currRow, setCurrRow] = useState({})
  const [form] = Form.useForm()

  // useEffect(() => {
  //   loadData({})
  // }, [])

  // const loadData = params => {
  //   setTableLoading.setTrue()
  //   api
  //     .getUersList(params)
  //     .then(res => {
  //       setTableLoading.setFalse()
  //       setTableData(res.data)
  //     })
  //     .catch(() => {
  //       setTableLoading.setFalse()
  //     })
  // }
  const getTableData = (page, formData) =>
    api.getUersList({...formData, ...page}).then(res => {
      setTableData(res.data.list)
      return {
        list: res.data.list,
        total: res.data.total,
      }
    })

  const {tableProps, search} = useAntdTable(getTableData, {
    defaultPageSize: 20,
    form,
  })
  const {submit} = search

  const onStatusChange = (row, value) => {
    const val = value ? 0 : 1
    api
      .updateUersStatus(row.id, val)
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
        // tableProps.dataSource.forEach((item, index, arr) => {
        //   if (item.id === row.id) {
        //     item.status = val
        //   }
        // })
      })
      .catch(err => {
        message.error('操作失败')
      })
  }

  const onSearch = () => {
    submit()
    // const formData = (form.getFieldValue as any)()
    // loadData(formData)
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
      render: val => (val == 0 ? '男' : val == 1 ? '女' : '-'),
    },
    {
      title: '角色',
      dataIndex: 'role_names',
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
                  setIsEdit.setFalse()
                }}>
                新增
              </Button>
            </Form.Item>
          </Form>
        </Toolbars>
        <Table
          columns={column}
          rowKey="id"
          // dataSource={tableData}
          // loading={tableProps.loading}
          {...{...tableProps, dataSource: tableData}}
          pagination={{
            pageSizeOptions: ['10', '20', '50'],
            showSizeChanger: true,
            total: tableProps.pagination.total,
            current: tableProps.pagination.current,
            showTotal: total => `共 ${total} 条`,
            pageSize: tableProps.pagination.pageSize,
          }}></Table>
      </Space>
      {isShowEdit && (
        <Add
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
export default PageViewUser
