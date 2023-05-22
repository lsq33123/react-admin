/** @format */

import React from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import Store from '@/store'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import App from './app'
// import 'antd/dist/antd.css'
import '@/assets/css/app.less'

const Root = () => {
  return (
    <Store>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Store>
  )
}
createRoot(document.getElementById('root') as any).render(<Root />)
