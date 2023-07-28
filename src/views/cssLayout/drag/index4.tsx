/** @format */

import React from 'react'
import DragLayout from '@/components/DragLayout'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div style={{width: '100%', height: '300px'}}>
      <DragLayout direction="horizontal" allowDrag={false}>
        <div style={{background: '#5ab699', width: '100%', height: '100%'}}>part1</div>
        <div style={{background: '#ca8fef', width: '100%', height: '100%'}}>part2</div>
      </DragLayout>
    </div>
  )
}
export default PageView
