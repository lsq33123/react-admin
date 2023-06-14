/** @format */

import {Card, Col, Menu, Row, Space} from 'antd'
import React, {useState} from 'react'
import {Typography} from 'antd'
import './index.less'

interface IProps {
  //props:any
}

const PageViewAnimationCss: React.FC<IProps> = props => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>(['2'])
  const {Link, Title, Text} = Typography

  const onMenuClick = e => {
    setSelectedKeys([e.key])
  }
  return (
    <div id="PageViewAnimationCss">
      <div className="side-div">
        <Menu mode="inline" selectedKeys={selectedKeys} onClick={onMenuClick}>
          <Menu.Item key="1">Transition</Menu.Item>
          <Menu.Item key="2">Animation</Menu.Item>
          <Menu.Item key="3">菜单三</Menu.Item>
          <Menu.Item key="4">菜单四</Menu.Item>
        </Menu>
      </div>
      {selectedKeys.length && selectedKeys[0] === '1' && (
        <div className="right-div">
          <div style={{padding: '20px', fontSize: '20px'}}>
            <Link
              underline
              href="http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html"
              target="_blank"
              className="ahooks-class-link">
              参考：CSS动画简介
            </Link>
          </div>

          <Row gutter={20} className="right-div-row">
            <Col span={12} className=" right-div-col">
              <Card title="Hover事件1-简单例子" bordered={false}>
                <div className="img bg-img1 demo1"></div>
              </Card>
            </Col>
            <Col span={12} className=" right-div-col">
              <Card title="Hover事件2-不同属性变更时间不同" bordered={false}>
                <div className="img bg-img1 demo2"></div>
              </Card>
            </Col>
          </Row>
          <Row gutter={20} className="right-div-row">
            <Col span={12} className=" right-div-col">
              <Card title="Hover事件3-延时执行" bordered={false}>
                <div className="img bg-img3 demo3"></div>
              </Card>
            </Col>
            <Col span={12} className=" right-div-col">
              <Card title="Hover事件4-延时执行" bordered={false}>
                <div className="img bg-img3 demo4"></div>
              </Card>
            </Col>
          </Row>
          <Row gutter={20} className="right-div-row">
            <Col span={24} className=" right-div-col">
              <Card title="Hover事件5-transition-timing-function" bordered={false}>
                <div className="demo55">
                  <div className="img2 bg-img1 demo51"></div>
                  <div className="img2 bg-img1 demo52"></div>
                  <div className="img2 bg-img1 demo53"></div>
                  <div className="img2 bg-img1 demo54"></div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={20} className="">
            <Col span={24} className=" ">
              <Title level={3}>transition的使用注意</Title>
              <Space direction="vertical">
                <Text>
                  （1）目前，各大浏览器（包括IE
                  10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。
                </Text>
                <Text>（2）不是所有的CSS属性都支持transition，</Text>
                <Text>
                  （3）transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height:
                  auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background:
                  url(foo.jpg)到url(bar.jpg)等等。
                </Text>
              </Space>
            </Col>
          </Row>
          <Row gutter={20} className="" style={{marginTop: '20px'}}>
            <Col span={24} className=" ">
              <Title level={3}>transition的局限</Title>
              <Space direction="vertical">
                <Text>（1）transition需要事件触发，所以没法在网页加载时自动发生。</Text>
                <Text>（2）transition是一次性的，不能重复发生，除非一再触发。</Text>
                <Text>（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。</Text>
                <Text>（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。</Text>
                <Text>CSS Animation就是为了解决这些问题而提出的。</Text>
              </Space>
            </Col>
          </Row>
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

          <Row gutter={20} className="right-div-row">
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
