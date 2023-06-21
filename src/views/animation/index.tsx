/** @format */

import {Col, Row} from 'antd'
/** @format */

import React from 'react'
import {useSpring, animated} from 'react-spring'
import './index.less'
import Animat1 from './animat1'
import Animat2 from './animat2'
import Animat3 from './animat3'
import Animat4 from './animat4'
import Animat5 from './animat5'

interface IProps {
  //props:any
}

const PageViewAnimat: React.FC<IProps> = props => {
  const action = useSpring({
    opacity: 1,
    from: {opacity: 0},
    reset: true,
    config: {duration: 1000},
    loop: {reverse: true},
  })
  const action2 = useSpring({x: 100, from: {x: 0}, reset: true, loop: {reverse: true}})
  const action3 = useSpring({number: 10000, from: {number: 0}, reset: true})
  const action4 = useSpring({
    // loop: true,
    number: 1,
    from: {number: 0},
    reset: true,
    vector: [0, 10, 30],
    display: 'block',
    padding: 20,
    background: 'linear-gradient(to right, #009fff, #ec2f4b)',
    transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)',
    boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.4)',
    borderBottom: '10px solid #2D3747',
    shape: 'M20,20 L20,380 L380,380 L380,20 L20,20 Z',
    textShadow: '0px 5px 15px rgba(255,255,255,0.5)',
  })
  return (
    <div id="PageViewAnimation">
      <Row>
        <Col span={8} className="flex-cc item-body">
          <animated.div style={action}>
            <span style={{fontSize: '22px', fontWeight: 'bold'}}> 加载时，1s内显示,循环</span>
          </animated.div>
        </Col>
        <Col span={8} className="flex-cc item-body">
          <animated.span style={{fontSize: '22px', fontWeight: 'bold'}}>{action3.number}</animated.span>
        </Col>
        <Col span={8} className="flex-cc item-body">
          <animated.div style={action2}>
            <span style={{fontSize: '22px', fontWeight: 'bold'}}> 移动</span>
          </animated.div>
        </Col>
        <Col span={8} className="flex-cc item-body">
          <animated.span>{action4.number}</animated.span>
        </Col>

        <Col span={8} className="flex-cc item-body">
          <Animat1 />
        </Col>

        <Col span={8} className="flex-cc item-body">
          <Animat2 />
        </Col>
        <Col span={8} className="flex-cc item-body">
          <Animat3 />
        </Col>
        <Col span={8} className="flex-cc item-body">
          <Animat4 />
        </Col>
        <Col span={8} className="flex-cc item-body">
          <Animat5 />
        </Col>
      </Row>
    </div>
  )
}
export default PageViewAnimat
