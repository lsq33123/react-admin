/** @format */

import React from 'react'
import {Spin} from 'antd'

const loadingWrap: React.CSSProperties = {
  paddingTop: '100px',
  textAlign: 'center',
}

const PageLoading = () => {
  return (
    <div style={loadingWrap}>
      <Spin size="large" />
    </div>
  )
}

export default PageLoading
