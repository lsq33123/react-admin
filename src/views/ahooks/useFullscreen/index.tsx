/** @format */

import React, {useRef} from 'react'
import '../index.less'
import {Typography, Divider, Button} from 'antd'
import {useFullscreen, useHover} from 'ahooks'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const {Title, Text, Link} = Typography
  const ref1 = useRef<any>()
  const [isFullScreen, setIsFullScreen] = useFullscreen(ref1)
  const isHovering = useHover(ref1)
  return (
    <div className="ahooks-class container-body">
      <Title level={2} className="ahooks-class-title">
        useFullscreen
      </Title>
      <Link
        underline
        href="https://ahooks.js.org/zh-CN/hooks/dom/use-fullscreen/"
        target="_blank"
        className="ahooks-class-link">
        链接
      </Link>
      <div>
        <Text>一个用于处理 dom 全屏的 Hook。</Text>
      </div>
      <Title level={2} className="ahooks-class-title" style={{marginTop: 20}}>
        useHover
      </Title>
      <Link
        underline
        href="https://ahooks.js.org/zh-CN/hooks/dom/use-hover/"
        target="_blank"
        className="ahooks-class-link">
        链接
      </Link>
      <div>
        <Text>一个用于追踪 dom 元素是否有鼠标悬停的 Hook。</Text>
      </div>
      <div className="ahooks-show-body" ref={ref1}>
        <div>
          位置：<span style={{color: 'red', marginRight: 20}}>{isHovering ? '里面' : '外面'}</span>
        </div>
        {isFullScreen}
        <Button onClick={() => setIsFullScreen.setFull()}> setFull</Button>
        <Button onClick={() => setIsFullScreen.exitFull()}> exitFull</Button>
        <Button onClick={() => setIsFullScreen.toggleFull()}> toggleFull</Button>
        <img
          src="https://photo.harsonserver.com/FkGsm-taLCgNF5DxASb2-g6XuQ2i"
          style={{height: 'auto', width: 'auto', display: 'inline-block'}}
        />
      </div>
      <div style={{marginTop: 40}}>
        {/* <Title level={4}>问题</Title> */}
        <Divider orientation="left">问题</Divider>
        <Text>1、传入多个ref会报错，待解决</Text>
      </div>
    </div>
  )
}
export default PageView
