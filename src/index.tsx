/** @format */

import React from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import Store from '@/store'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import App from './app'
import '@/assets/css/app.less'
import {Watermark} from 'antd'
import {getStore} from '@/utils/store'
import Setting from '@/store/setting'

const SettingApp = () => {
  const {themeSetting} = Setting.useContainer()
  // console.log('SettingApp:', themeSetting)

  return (
    <ConfigProvider locale={zhCN} componentSize="middle" theme={themeSetting}>
      <Watermark content={getStore('user_name')} gap={[200, 200]}>
        <App />
      </Watermark>
    </ConfigProvider>
  )
}

const Root = () => {
  return (
    <Store>
      <SettingApp />
    </Store>
  )
}
createRoot(document.getElementById('root') as any).render(<Root />)
