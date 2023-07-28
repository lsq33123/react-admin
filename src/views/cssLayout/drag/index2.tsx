/** @format */

import React from 'react'
import DragLayout from '@/components/DragLayout'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div style={{width: '100%', height: '300px'}}>
      <DragLayout direction="horizontal" firstWidth="30%">
        <div style={{background: '#5ab699', width: '100%', height: '100%'}}>part1</div>
        <DragLayout direction="vertical">
          <div style={{background: '#ca8fef', width: '100%', height: '100%'}}>part2</div>
          <div style={{background: '#8fd4ef', width: '100%', height: '100%'}}>part3</div>
        </DragLayout>
      </DragLayout>
    </div>
  )
}
export default PageView
