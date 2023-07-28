/** @format */

import React from 'react'
import DragLayout from '@/components/DragLayout'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div style={{width: '100%', height: '300px'}}>
      <DragLayout direction="horizontal" min={[100, 200]}>
        <div style={{background: '#5ab699', width: '100%', height: '100%'}}>100px</div>
        <div style={{background: '#ca8fef', width: '100%', height: '100%'}}>200px</div>
      </DragLayout>
    </div>
  )
}
export default PageView
