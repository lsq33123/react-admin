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
      key: 'part-1',
      href: '#part-1',
      title: '模拟flex布局',
    },
    {
      key: 'part-2',
      href: '#part-2',
      title: 'Part 2',
    },
    {
      key: 'part-3',
      href: '#part-3',
      title: 'Part 3',
    },
    {
      key: 'part-4',
      href: '#part-4',
      title: 'Part 4',
    },
    {
      key: 'part-5',
      href: '#part-5',
      title: 'Part 5',
    },
  ]

  return (
    <DocModel items={items}>
      <Card title={items[0].title} bordered={false} id={items[0].key}>
        <div className="father ">
          <div className="child">
            <div className="child-item flex-cc">13</div>
            <div className="child-item flex-cc">3</div>
            <div className="child-item flex-cc">66</div>
            <div className="child-item flex-cc">47775</div>
          </div>
        </div>
      </Card>
      <Card title={items[1].title} bordered={false} id={items[1].key}>
        <div className="father ">
          <div className="child">
            <div className="child-item flex-cc">13</div>
            <div className="child-item flex-cc">3</div>
            <div className="child-item flex-cc">66</div>
            <div className="child-item flex-cc">47775</div>
          </div>
        </div>
      </Card>
      <div id="part-3" style={{width: '100px', height: '300px'}}>
        part-3
      </div>
      <div id="part-4" style={{width: '100px', height: '300px'}}>
        part-4
      </div>
      <div id="part-5" style={{width: '100px', height: '300px'}}>
        part-5
      </div>
    </DocModel>
  )
}
export default PageView
