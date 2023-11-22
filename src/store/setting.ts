/** @format */

import { createContainer } from 'unstated-next'
import { useState, useEffect, useRef } from 'react'
import { getStore, setStore } from '@/utils/store'
import { settingDefaultData } from '@/config/setting'
import { formatThemeSetting, mergeObjects } from '@/utils'
import useThemeCss from '@/hooks/useThemeCss'
import { theme } from 'antd'
const { getDesignToken } = theme


const settingData = () => {
  let settingStore = getStore('setting') || {}
  let defaultSetting: typeof settingDefaultData = mergeObjects(settingDefaultData, settingStore) as any
  // console.log('defaultSetting:', defaultSetting)
  const [setting, setSetting] = useState(defaultSetting)
  const [themeSetting, setThemeSetting] = useState()

  const globalToken: any = useRef()
  useEffect(() => {
    setStore('setting', setting)
    useThemeCss().setThemeAttr()
    setThemeSetting(formatThemeSetting(setting))
  }, [setting])

  const updateSetting = (obj) => {
    const data = mergeObjects(setting, obj)
    // console.log('updateSettingdata:', data)
    setSetting(pre => {
      return mergeObjects(pre, obj) as any
    })
    setStore('setting', data)
  }

  const resetSetting = () => {
    setSetting(defaultSetting)
    setStore('setting', defaultSetting)
  }
  globalToken.current = getDesignToken(themeSetting)

  return {
    setting,
    themeSetting, //用于配置主题
    defaultSetting: settingDefaultData,
    updateSetting,
    resetSetting,
    globalToken: globalToken.current
  }
}

export default createContainer(settingData)
