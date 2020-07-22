/** @format */

import React from 'react'
import FullScreen from '@/components/HeaderRightTool/FullScreen'
import Avatar from '@/components/HeaderRightTool/Avatar'
import Notice from '@/components/HeaderRightTool/Notice'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  return (
    <div id="toolbar-right">
      <Avatar />
      <FullScreen />
      <Notice number={69} />
    </div>
  )
}
export default PageView
