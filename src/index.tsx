/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {ConfigProvider} from 'antd'
import Store from '@/store'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/antd.css'
import '@/assets/css/app.less'

const Root = () => {
  return (
    <Store>
      <ConfigProvider locale={zh_CN}>
        <App />
      </ConfigProvider>
    </Store>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
