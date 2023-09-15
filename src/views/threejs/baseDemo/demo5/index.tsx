/** @format */

import React, {useEffect} from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import {Card} from 'antd'
import Index0 from './index0'
// import Index1 from './index1'
// import Index2 from './index2'
// import Index3 from './index3'
// import Index4 from './index4'
// import Index5 from './index5'
// import Index6 from './index6'
// import Index7 from './index7'
// import Index8 from './index8'
// import Index99 from './index99'

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
    // {
    //   key: 'part1',
    //   href: '#part1',
    //   title: '相机',
    //   component: <Index1 />,
    // },
    // {
    //   key: 'part2',
    //   href: '#part2',
    //   title: '插件（GUI）',
    //   component: <Index2 />,
    // },
    // {
    //   key: 'part3',
    //   href: '#part3',
    //   title: '性能监控',
    //   component: <Index3 />,
    // },
    // {
    //   key: 'part4',
    //   href: '#part4',
    //   title: '相机插件（移动）',
    //   component: <Index4 />,
    // },
    // {
    //   key: 'part5',
    //   href: '#part5',
    //   title: '粒子实现星空效果',
    //   component: <Index5 />,
    // },
    // {
    //   key: 'part6',
    //   href: '#part6',
    //   title: '导入模型数据(json)',
    //   component: <Index6 />,
    // },
    // {
    //   key: 'part7',
    //   href: '#part7',
    //   title: '导入模型数据(gltf)',
    //   component: <Index7 />,
    // },
    // {
    //   key: 'part8',
    //   href: '#part8',
    //   title: '模型拖拽',
    //   component: <Index8 />,
    // },
    // {
    //   key: 'part99',
    //   href: '#part99',
    //   title: '相关资料',
    //   component: <Index99 />,
    // },
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
