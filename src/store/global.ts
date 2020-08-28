/** @format */

import {createContainer} from 'unstated-next'
import {useState, useEffect} from 'react'
import {getStore, setStore, removeStoreType} from '@/utils/store'
import * as api from '@/api'
const globalData = () => {
  const [token, setToken] = useState(getStore('token'))
  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    if (token) {
      // 初始化 一些用户的相关信息
      ;(async () => {
        const menuInfo = await api.getMenuList({status: 0})
        setMenuList(menuInfo.data)
      })()
    }
  }, [token])

  const updateToken = data => {
    setToken(data)
    setStore('token', data)
  }

  const logout = () => {
    setToken('')
    removeStoreType() //清除出缓存
  }

  /** is_frame 权限验证 0需要 1不需要 2外链    path:定义的路径*/
  const getMenuPath = (is_frame: number, path: string) => {
    //重组菜单路径
    let prePath = ''
    if (is_frame === 0) prePath = '/need'
    else if (is_frame === 1) prePath = '/noneed'
    return prePath + path
  }

  return {
    token,
    menuList,
    updateToken,
    getMenuPath,
    logout,
  }
}

export default createContainer(globalData)
