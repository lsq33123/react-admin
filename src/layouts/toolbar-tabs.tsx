/** @format */

import React from 'react'
import {Tabs} from 'antd'
import TagViewStore from '@/store/tag-view'
import {useNavigate} from 'react-router-dom'

interface IProps {
  //props:any
}

const ToolBarTabs: React.FC<IProps> = props => {
  const {currView, viewList, delView} = TagViewStore.useContainer()
  const navigate = useNavigate()

  const onChange = key => {
    const currView = viewList.find(item => item.pathname === key)
    currView && navigate(currView)
  }

  const onEdit = key => {
    let currIndex
    let currDelView

    if (viewList.length === 1) {
      return
    }
    viewList.forEach((item, index) => {
      if (item.pathname === key) {
        currDelView = item
        currIndex = index
      }
    })
    if (!currDelView) {
      return
    }
    delView(currDelView)
    if (currDelView.pathname === currView.pathname) {
      if (viewList[currIndex + 1]) {
        navigate(viewList[currIndex + 1])
      } else {
        navigate(viewList[currIndex - 1])
      }
    }
  }

  return (
    <div className="tag-view">
      <Tabs hideAdd size="small" type="editable-card" activeKey={currView.pathname} onChange={onChange} onEdit={onEdit}>
        {viewList.map((item, index) => (
          <Tabs.TabPane tab={item.state && item.state.title} key={item.pathname} closable={index !== 0}></Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  )
}
export default ToolBarTabs
