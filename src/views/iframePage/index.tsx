/** @format */

import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {queryStringToObject} from '@/utils'
interface IProps {
  //props:any
}

const IframePage: React.FC<IProps> = props => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const width = '100%'
  const height = '100%'

  useEffect(() => {
    console.log('location:', location)
    let queryString = location.search.split('?')[1]
    let searchObj: any = queryStringToObject(queryString)
    console.log('res:', queryStringToObject(queryString))
    setUrl(searchObj!.url)
  }, [location])

  const onLoad = val => {
    //console.log('valFn:', val)
    setLoading(false)
  }

  return (
    <div style={{height: 'calc(100vh - var(--header-height)  - 4px)'}}>
      <iframe src={url} width={width} height={height} frameBorder="0" onLoad={onLoad}></iframe>
    </div>
  )
}
export default IframePage
