/** @format */

import React, {useEffect} from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import {Card} from 'antd'
import Index0 from './index0'
import Index1 from './index1'
import Index2 from './index2'
import Index3 from './index3'
import Index99 from './index99'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const items = [
    {
      key: 'part0',
      href: '#part0',
      title: '基本模型',
      component: <Index0 />,
    },
    {
      key: 'part1',
      href: '#part1',
      title: '相机',
      component: <Index1 />,
    },
    {
      key: 'part2',
      href: '#part2',
      title: '插件（GUI）',
      component: <Index2 />,
    },
    {
      key: 'part3',
      href: '#part3',
      title: '性能监控',
      component: <Index3 />,
    },
    {
      key: 'part99',
      href: '#part99',
      title: '相关资料',
      component: <Index99 />,
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
