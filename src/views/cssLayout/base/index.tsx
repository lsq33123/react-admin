/** @format */

import React from 'react'
import './index.less'
import DocModel from '@/components/DocModel'
import CodeHighlighter from '@/components/CodeHighlighter'
import {Card, Space, Divider, Switch} from 'antd'
import Index1 from './index1'
import Index2 from './index2'
import Index3 from './index3'
import Index4 from './index4'
import Index5 from './index5'
import Index6 from './index6'

import {codeArr as codeArr1} from './index1/code'

const PageView: React.FC = props => {
  const [cards, setCards] = React.useState<any[]>([
    {
      key: 'part1',
      href: '#part1',
      title: '模拟flex布局',
      component: <Index1 />,
      codeArr: codeArr1,
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
      key: 'part4',
      href: '#part4',
      title: '相机插件（移动）',
      component: <Index4 />,
    },
    {
      key: 'part5',
      href: '#part5',
      title: '粒子实现星空效果',
      component: <Index5 />,
    },
    {
      key: 'part6',
      href: '#part6',
      title: '导入模型数据(json)',
      component: <Index6 />,
    },
  ])

  return (
    <DocModel items={cards}>
      {cards.map(item => {
        return (
          <Card
            title={item.title}
            key={item.key}
            bordered={false}
            id={item.key}
            extra={
              <Space>
                <Switch
                  checkedChildren="显示"
                  unCheckedChildren="隐藏"
                  checked={!!item.showCode}
                  onChange={() => {
                    item.showCode = !item.showCode
                    setCards([...cards])
                  }}
                />
              </Space>
            }>
            {/* {JSON.stringify(item)} */}
            {item.component}
            {item.showCode && (
              <>
                <Divider>Code</Divider>
                {item.codeArr &&
                  item.codeArr.map((code, index) => {
                    return (
                      <CodeHighlighter key={index} codeType={code.codeStyle}>
                        {code.code}
                      </CodeHighlighter>
                    )
                  })}
              </>
            )}
          </Card>
        )
      })}
    </DocModel>
  )
}
export default PageView
