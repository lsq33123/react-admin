/** @format */

import {createContainer} from 'unstated-next'
import {useState} from 'react'
import {getStore, setStore, removeStoreType} from '@/utils/store'
const globalData = () => {
  const [token, setToken] = useState(getStore('token'))

  const updateToken = data => {
    setToken(data)
    setStore('token', data)
  }

  const logout = () => {
    setToken('')
    removeStoreType() //清除出缓存
  }
  return {
    token,
    updateToken,
    logout,
  }
}

export default createContainer(globalData)
