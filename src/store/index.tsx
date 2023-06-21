/** @format */

import React from 'react'
import TagView from './tag-view'
import Global from './global'
import Setting from './setting'
interface IProps {
  children?: any
  //props:any
}

const StoreView: React.FC<IProps> = props => {
  return (
    <Global.Provider>
      <Setting.Provider>
        <TagView.Provider>{props.children}</TagView.Provider>
      </Setting.Provider>
    </Global.Provider>
  )
}
export default StoreView
