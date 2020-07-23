/** @format */

import {createContainer} from 'unstated-next'
import {useState} from 'react'
import {getStore, setStore} from '@/utils/store'
const globalData = () => {
  const [token, setToken] = useState(getStore({name: 'token'}))

  const updateToken = data => {
    setToken(data)
    setStore({name: 'token', content: data})
  }

  return {
    token,
    updateToken,
  }
}

export default createContainer(globalData)
