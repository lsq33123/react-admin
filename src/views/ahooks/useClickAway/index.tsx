/** @format */

import React, {useRef, useState} from 'react'
import '../index.less'
import {Typography, Divider} from 'antd'
import {useClickAway} from 'ahooks'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const {Title, Text, Link} = Typography
  const [counter, setCounter] = useState<number>(0)

  const delUndefined = ref => {
    if (ref !== undefined) {
      return ref
    }
  }

  const refBox1 = delUndefined(useRef<HTMLDivElement>())
  // const refBox2 = delUndefined(useRef<HTMLDivElement>())
  // const tempArr = [refBox1, refBox2] as any
  useClickAway(() => {
    setCounter(pre => {
      console.log('pre:', pre)
      return pre + 1
    })
  }, refBox1)

  return (
    <div className="ahooks-class container-wrap">
      <Title level={2} className="ahooks-class-title">
        useClickAway
      </Title>
      <Link
        underline
        href="https://ahooks.js.org/zh-CN/hooks/dom/use-click-away/"
        target="_blank"
        className="ahooks-class-link">
        链接
      </Link>
      <div>
        <Text>优雅的管理目标元素外点击事件的 Hook。</Text>
      </div>
      <div className="ahooks-show-body" style={{height: 100}}>
        <div
          style={{
            width: 150,
            height: 50,
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          ref={refBox1}>
          {counter}
        </div>
        {/* <div style={{width: 50, height: 50, border: '1px solid #ebedf1'}} ref={refBox2}>
          {counter}
        </div> */}
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
