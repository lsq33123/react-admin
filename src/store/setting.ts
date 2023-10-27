/** @format */

import { createContainer } from 'unstated-next'
import { useState, useEffect } from 'react'
import { getStore, setStore } from '@/utils/store'
import { settingDefaultData } from '@/config/setting'
import { theme } from 'antd'
const { getDesignToken } = theme

const settingData = () => {
  let settingStore = getStore('setting')
  let defaultSetting: typeof settingDefaultData = { ...settingDefaultData, ...settingStore }
  const [setting, setSetting] = useState(defaultSetting)

  useEffect(() => {
    setStore('setting', setting)
  }, [setting])

  const updateSetting = (key, val) => {
    const data = { ...setting, [key]: val }
    setSetting(data)
    setStore('setting', data)
  }

  const resetSetting = () => {
    setSetting(defaultSetting)
    setStore('setting', defaultSetting)
  }
  const globalToken = getDesignToken({
    token: {
      colorPrimary: setting.colorPrimary,
    },
  })

  return {
    setting,
    defaultSetting: settingDefaultData,
    updateSetting,
    resetSetting,
    globalToken
  }
}

export default createContainer(settingData)
