/** @format */

import { createContainer } from 'unstated-next'
import { useState, useEffect } from 'react'
import { getStore, setStore, removeStoreType } from '@/utils/store'
import { sysMenus } from '../routes/menus'
import config from '@/config'
import * as api from '@/api'
const globalData = () => {
  const [token, setToken] = useState(getStore('token'))
  const [menuList, setMenuList] = useState<Array<any>>([])
  const [userInfo, setUserInfo] = useState({})

  const formatMenu = (arr: Array<any> = []): Array<any> =>
    arr.map((item: any) => {
      //处理数据
      item.value = item.menu_id
      item.key = item.menu_id
      // item.title = item.menu_name
      return item
    })

  useEffect(() => {
    // 初始化 一些用户的相关信息
    setMenuList(formatMenu(sysMenus)) //初始化路由
    if (token && token != config.touristToken) {
      ; (async () => {
        const user_name = getStore('user_name')
        const Info = await api.getUserInfo(user_name)
        const finalMenu = sysMenus.concat(Info.data.menus || []) //系统菜单  + 权限菜单
        finalMenu.forEach((item: any) => {
          //处理数据
          item.value = item.menu_id
          item.key = item.menu_id

          // item.title = item.menu_name
        })
        // console.log('formatMenu(finalMenu):', formatMenu(finalMenu))
        setMenuList(formatMenu(finalMenu))
        setUserInfo(Info.data.user)
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

  /** is_frame 打开方式 0系统 1全屏 2外链    path:定义的路径*/
  const getMenuPath = (is_frame: number, path: string) => {
    //重组菜单路径
    let prePath = ''
    if (is_frame === 0) prePath = '/need'
    else if (is_frame === 1) prePath = '/noneed'
    return prePath + path
  }

  return {
    token,
    userInfo,
    menuList,
    updateToken,
    getMenuPath,
    logout,
  }
}

export default createContainer(globalData)
