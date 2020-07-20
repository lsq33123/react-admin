/** @format */

import React from 'react'
import TagView from './tag-view'
interface IProps {
  //props:any
}

const StoreView: React.FC<IProps> = props => {
  return <TagView.Provider>{props.children}</TagView.Provider>
}
export default StoreView
