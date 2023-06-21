/** @format */

import { createContainer } from 'unstated-next'
import { useState, useEffect } from 'react'
import { getStore, setStore } from '@/utils/store'
const settingData = () => {

  let settingData = {
    codeStyle: 'oneDark'
  }

  let defaultSetting = getStore('setting') || settingData


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
    updateSetting,
    resetSetting
  }
}

export default createContainer(settingData)
