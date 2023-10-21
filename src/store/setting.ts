/** @format */

import { createContainer } from 'unstated-next'
import { useState, useEffect } from 'react'
import { getStore, setStore } from '@/utils/store'
import { settingDefaultData } from '@/config/setting'
const settingData = () => {

  let defaultSetting: typeof settingDefaultData = getStore('setting') || settingDefaultData
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

  return {
    setting,
    defaultSetting: settingDefaultData,
    updateSetting,
    resetSetting
  }
}

export default createContainer(settingData)
