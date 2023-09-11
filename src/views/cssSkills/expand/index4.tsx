/** @format */

import React, {useState} from 'react'
import DragLayout from '@/components/DragLayout'
import {Button} from 'antd'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const article =
    '记录分享每一个日常开发项目中的实用小知识，不整那些虚头巴脑的框架理论与原理，之前分享过抽奖功能、签字功能等，有兴趣的可以看看本人以前的分享。'

  return (
    <div style={{width: '100%', height: '100px', display: 'flex', flexDirection: 'column'}}>
      <div>1、查看按钮位置随文字长度发生变化；2、查看按钮位置固定居右</div>
      <DragLayout direction="horizontal">
        <div style={{background: '#5ab699', width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
          <div>555555555555555</div>
          <div className="line-num-1" style={{}}>
            {article}
          </div>
          <Button type="link"> 查看</Button>
        </div>
        <div
          style={{
            background: '#ca8fef',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div className="flex-cc">
            <div>555555555555555</div>
            <div className="line-num-1" style={{}}>
              {article}
            </div>
          </div>
          <Button type="link"> 查看</Button>
        </div>
      </DragLayout>
    </div>
  )
}
export default PageView
