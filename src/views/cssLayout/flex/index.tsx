/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import {Card} from 'antd'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const items = [
    {
      key: 'part1',
      href: 'part1',
      title: '模拟flex布局',
    },
  ]

  return (
    <DocModel items={items}>
      <Card title={items[0].title} bordered={false} id={items[0].key}>
        <div>拖拽 </div>
      </Card>
    </DocModel>
  )
}
export default PageView
