/** @format */

import React, {useEffect, useState} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {message, Tree, Spin} from 'antd'
import {arrayToTree} from '@/utils/array'
import * as api from '@/api'
import {useBoolean} from 'ahooks'
import {Scrollbars} from 'react-custom-scrollbars'
import './index.less'

interface IProps {
  isShow: boolean
  currRow: any
  onOk: () => void
  onCancel: () => void
}

const PageViewRoleEdit: React.FC<IProps> = props => {
  const [tableLoading, setTableLoading] = useBoolean(false)
  const [treeData, setTreeData] = useState<Array<any>>([])
  const [checkList, setCheckList] = useState<string[]>([])

  useEffect(() => {
    loadData({status: 0})
  }, [])

  const loadData = params => {
    setTableLoading.setTrue()
    api
      .getMenuList(params)
      .then(res => {
        setTableLoading.setFalse()
        setTreeData(arrayToTree(res.data, 0, 'id', 'parent_id'))
        if (props.currRow.menu_ids && props.currRow.menu_ids.length) {
          const tempStrArr = props.currRow.menu_ids?.split(',') || []
          setCheckList(tempStrArr.map(item => Number(item)))
        }
      })
      .catch(() => {
        setTableLoading.setFalse()
      })
  }

  const onSelect = props => {
    console.log(123, props)
  }
  const onCheck = props => {
    console.log(333, props)
    setCheckList(props)
  }

  const onOk = () => {
    // 保存
    api
      .updateRole(props.currRow.id, {menu_ids: checkList.join(',')})
      .then(res => {
        if (res.code === 0) {
          message.success('更新成功')
          props.onOk()
        } else {
          message.error('更新失败')
        }
      })
      .catch(err => {
        props.onCancel()
      })
  }

  return (
    <Modal
      title={`${props.currRow.name} - 绑定菜单 `}
      destroyOnClose
      centered
      maskClosable={false}
      visible={props.isShow}
      onOk={onOk}
      onCancel={props.onCancel}
      okText="确定"
      cancelText="取消">
      {JSON.stringify(checkList)}
      <Spin spinning={tableLoading}>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} className="scroller-menu-role">
          <Tree checkable onSelect={onSelect} onCheck={onCheck} checkedKeys={checkList} treeData={treeData} />
        </Scrollbars>
      </Spin>
    </Modal>
  )
}
export default PageViewRoleEdit
