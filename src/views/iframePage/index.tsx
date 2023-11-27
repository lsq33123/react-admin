/** @format */

import React, {useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
interface IProps {
  src: string
  width: string
  height: string
  //props:any
}

const IframePage: React.FC<IProps> = props => {
  const location = useLocation()
  const {src, width, height} = props

  useEffect(() => {
    console.log('location:', location)
  }, [location])

  return (
    <div>
      未完成 不打算做了
      {/* <iframe src={src} width={width} height={height} scrolling="no"></iframe> */}
      <div>444444</div>
    </div>
  )
}
export default IframePage
