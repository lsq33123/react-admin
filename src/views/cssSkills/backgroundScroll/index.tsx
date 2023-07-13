/** @format */

import {Card, Col, Menu, Row, Space, Affix} from 'antd'

import React, {useState} from 'react'
import {Typography} from 'antd'
import Index1 from './index1'
import Index2 from './index2'
import Index3 from './index3'
import Index4 from './index4'
import './index.less'

interface IProps {
  //props:any
}

const PageViewAnimationCss: React.FC<IProps> = props => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['3'])
  const {Link, Title, Text} = Typography
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const onMenuClick = e => {
    setSelectedKeys([e.key])
  }
  return (
    <div id="PageViewAnimationCss" ref={setContainer}>
      <Affix offsetTop={20} target={() => container}>
        <div className="side-div">
          <Menu mode="inline" selectedKeys={selectedKeys} onClick={onMenuClick}>
            <Menu.Item key="1">示例1</Menu.Item>
            <Menu.Item key="2">示例2</Menu.Item>
            <Menu.Item key="3">示例3</Menu.Item>
            <Menu.Item key="4">示例4</Menu.Item>
          </Menu>
        </div>
      </Affix>
      {selectedKeys.length && selectedKeys[0] === '1' && <Index1 />}
      {selectedKeys.length && selectedKeys[0] === '2' && <Index2 />}
      {selectedKeys.length && selectedKeys[0] === '3' && <Index3 />}
      {selectedKeys.length && selectedKeys[0] === '4' && <Index4 />}
    </div>
  )
}
export default PageViewAnimationCss
