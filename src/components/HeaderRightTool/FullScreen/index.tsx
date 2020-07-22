/** @format */

import React, {Component} from 'react'
import {Button} from 'antd'
import {judgeIsSupportFull, fullScreen, fullExit} from './screen'
import {FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons'
import './index.less'
export default class FullScreen extends Component {
  state = {
    isSupportFull: false,
    isFull: false,
  }
  componentDidMount() {
    window.addEventListener('resize', this.changeFullStatus)
    this.judgeIsSupportFull()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeFullStatus)
  }
  // 判断当前浏览器是否支持全屏API
  judgeIsSupportFull = () => {
    let isSupportFull = judgeIsSupportFull()
    this.setState({isSupportFull})
  }
  // 计算当前是否处于全屏
  changeFullStatus = () => {
    // 判断网页的高度或者宽度是否等于屏幕对应大小
    // true: 当前处于全屏状态
    // false: 当前不处于全屏状态
    if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
      this.setState({isFull: true})
    } else {
      this.setState({isFull: false})
    }
  }
  // click button
  handClick = () => {
    this.state.isFull ? fullExit() : fullScreen()
  }
  // ============================================================
  render() {
    let {isSupportFull} = this.state

    if (!isSupportFull) {
      return null
    }

    return (
      <Button
        style={{border: 'none', color: '#696969'}}
        className="fullscreen"
        onClick={this.handClick}
        shape="circle"
        icon={this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
    )
  }
}
