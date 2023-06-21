/** @format */

import React from 'react'
import FullScreen from '@/components/HeaderRightTool/FullScreen'
import Avatar from '@/components/HeaderRightTool/Avatar'
import CodeStyle from '@/components/HeaderRightTool/CodeStyle'
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
      <CodeStyle />
    </div>
  )
}
export default PageView
