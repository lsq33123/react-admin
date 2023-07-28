/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import Index1 from './index1'
import Index2 from './index2'
import Index3 from './index3'
import Index4 from './index4'
import {Card} from 'antd'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const items = [
    {
      key: 'part1',
      href: '#part1',
      title: '默认宽度(50%)',
      component: <Index1 />,
    },
    {
      key: 'part2',
      href: '#part2',
      title: '组合拖拽',
      component: <Index2 />,
    },
    {
      key: 'part3',
      href: '#part3',
      title: '设置最小宽度',
      component: <Index3 />,
    },
    {
      key: 'part4',
      href: '#part4',
      title: '不允许拖拽',
      component: <Index4 />,
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
