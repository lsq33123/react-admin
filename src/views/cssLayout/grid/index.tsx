/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import {Card} from 'antd'
import Index1 from './index1'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const items = [
    {
      key: 'part1',
      href: '#part1',
      title: 'Grid布局',
      component: <Index1 />,
    },
  ]

  return (
    <DocModel items={items}>
      {items.map(item => {
        return (
          <Card title={item.title} key={item.key} bordered={false} id={item.key}>
            {item.component}
          </Card>
        )
      })}
    </DocModel>
  )
}
export default PageView
