/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import Store from '@/store'
import 'antd/dist/antd.css'
import '@/assets/css/app.less'

const Root = () => {
  return (
    <Store>
      <App />
    </Store>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
