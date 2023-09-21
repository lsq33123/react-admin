/** @format */

import {Card, Col, Menu, Row, Space, Affix} from 'antd'

import React, {useState} from 'react'
import {Typography} from 'antd'
import './index.less'
import Index1 from './index1'

interface IProps {
  //props:any
}

const height = document.body.clientHeight - 200 + 50

const PageViewAnimationCss: React.FC<IProps> = props => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['1'])
  const {Link, Title, Text} = Typography
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const onMenuClick = e => {
    setSelectedKeys([e.key])
  }
  return (
    <div id="PageViewThreeJsLight" ref={setContainer}>
      <Affix offsetTop={20} target={() => container}>
        <div className="side-div">
          <Menu mode="inline" selectedKeys={selectedKeys} onClick={onMenuClick}>
            <Menu.Item key="1">Transition</Menu.Item>
            <Menu.Item key="2">Animation</Menu.Item>
            <Menu.Item key="3">菜单三</Menu.Item>
            <Menu.Item key="4">菜单四</Menu.Item>
          </Menu>
        </div>
      </Affix>
      {selectedKeys.length && selectedKeys[0] === '1' && (
        <div className="right-div">
          <Card title="Hover事件1-简单例子" bordered={false}>
            <div className="" style={{height: height + 'px'}}>
              <Index1 />
            </div>
          </Card>
        </div>
      )}

      {selectedKeys.length && selectedKeys[0] === '2' && (
        <div className="right-div">
          <div style={{padding: '20px', fontSize: '20px'}}>
            <Link
              underline
              href="https://projects.verou.me/animatable/#outline-offset"
              target="_blank"
              className="ahooks-class-link">
              参考：CSS动画animatable
            </Link>
          </div>

          <Row gutter={20} className="right-div-row auto-height">
            <Col span={6} className=" right-div-col">
              <Card title="动画-简单例子" bordered={false}>
                <div className=" img animation1"></div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-重复" bordered={false}>
                <div className=" img animation2"></div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-3次" bordered={false}>
                <div className=" img animation3"></div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-停留在结束" bordered={false}>
                <div className=" img animation4"></div>
              </Card>
            </Col>
          </Row>
          <Row gutter={20} className="right-div-row">
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-正常" bordered={false}>
                <div className=" img animation51 flex-cc">normal</div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-原路返回" bordered={false}>
                <div className=" img animation52 flex-cc">alternate</div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-反向运动（和1相反）" bordered={false}>
                <div className=" img animation53 flex-cc">reverse</div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-原路返回（和2相反）" bordered={false}>
                <div className=" img animation54 flex-cc">alternate-reverse</div>
              </Card>
            </Col>
          </Row>
          <Row gutter={20} className="right-div-row">
            <Col span={6} className=" right-div-col">
              <Card title="动画-分布动画-steps(10)" bordered={false}>
                <div className=" img animation6 flex-cc"></div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-变化/停止" bordered={false}>
                <div className="animation7-div">
                  <div className=" img animation7 flex-cc"></div>
                </div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-反向运动（和1相反）" bordered={false}>
                <div className=" img animation53 flex-cc">reverse</div>
              </Card>
            </Col>
            <Col span={6} className=" right-div-col">
              <Card title="动画-循环模式-原路返回（和2相反）" bordered={false}>
                <div className=" img animation54 flex-cc">alternate-reverse</div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}
export default PageViewAnimationCss
