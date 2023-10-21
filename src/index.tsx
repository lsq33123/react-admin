/** @format */

import React from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import Store from '@/store'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import App from './app'
// import 'antd/dist/antd.css'
import '@/assets/css/app.less'
import {Watermark, theme} from 'antd'
import {getStore} from '@/utils/store'
import Setting from '@/store/setting'

const SettingApp = () => {
  const {setting, defaultSetting} = Setting.useContainer()
  return (
    <ConfigProvider
      locale={zhCN}
      componentSize="middle"
      theme={{
        token: {
          colorPrimary: setting.colorPrimary || defaultSetting.colorPrimary,
        },
        algorithm: theme[setting.algorithm || defaultSetting.algorithm],
      }}>
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
