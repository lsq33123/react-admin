/** @format */

import React, {useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import Store from '@/store'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import App from './app'
import '@/assets/css/app.less'
import {Watermark, theme} from 'antd'
import {getStore} from '@/utils/store'
import Setting from '@/store/setting'
import useThemeCss from '@/hooks/useThemeCss'

const SettingApp = () => {
  const {setting, defaultSetting, globalToken} = Setting.useContainer()

  useEffect(() => {
    if (setting.colorPrimary && setting.colorPrimary !== defaultSetting.colorPrimary) {
      useThemeCss(setting.colorPrimary).setThemeAttr()
    }
  }, [setting])

  const getAlgorithm = (arr: Array<string>) => {
    if (!arr.length) return []
    return arr.map((item: any) => {
      return theme[item]
    })
  }

  return (
    <ConfigProvider
      locale={zhCN}
      componentSize="middle"
      theme={{
        token: {
          colorPrimary: setting.colorPrimary,
          borderRadius: setting.borderRadius,
          colorBgContainer: setting.colorBgContainer,
          colorBgElevated: setting.colorBgElevated,
          colorBgLayout: setting.colorBgLayout,
        },
        algorithm: getAlgorithm(setting.algorithm),
        components: {
          Menu: {
            collapsedWidth: 60,
            collapsedIconSize: 20,
          },
          Button: {
            algorithm: true, // 启用算法
            colorLink: setting.colorPrimary, // 显示bug？ 不配置不生效
            colorLinkHover: globalToken.colorPrimaryBorderHover,
            colorLinkActive: globalToken.colorPrimaryActive,
          },
        },
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
