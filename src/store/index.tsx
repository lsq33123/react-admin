/** @format */

import React from 'react'
import TagView from './tag-view'
import Global from './global'
interface IProps {
  children?: any
  //props:any
}

const StoreView: React.FC<IProps> = props => {
  return (
    <Global.Provider>
      <TagView.Provider>{props.children}</TagView.Provider>
    </Global.Provider>
  )
}
export default StoreView
