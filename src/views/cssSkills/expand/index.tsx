/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import {Card} from 'antd'
import Index1 from './index1'
import Index2 from './index2'
import Index3 from './index3'
import Index4 from './index4'
import Index5 from './index5'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const items = [
    // {
    //   key: 'part1',
    //   href: '#part1',
    //   title: '文字省略(CSS)',
    //   component: <Index1 />,
    // },
    // {
    //   key: 'part2',
    //   href: '#part2',
    //   title: '文字省略(Antd)',
    //   component: <Index2 />,
    // },
    // {
    //   key: 'part3',
    //   href: '#part3',
    //   title: '文字中间省略(Antd)',
    //   component: <Index3 />,
    // },
    // {
    //   key: 'part4',
    //   href: '#part4',
    //   title: '文字动态省略(手写)',
    //   component: <Index4 />,
    // },
    {
      key: 'part5',
      href: '#part5',
      title: '文字动态省略(手写)',
      component: <Index5 />,
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
