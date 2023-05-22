/** @format */

import React, {Suspense, lazy, useEffect, useState} from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
import BaseLayout from '@/layouts/basic-layout'
// import {menuList} from '@/store/menuList'
import Global from '@/store/global'
import TagStore from '@/store/tag-view'

const PageViewNeed: React.FC = () => {
  const location = useLocation()
  const {addView} = TagStore.useContainer()
  const {token, menuList, getMenuPath} = Global.useContainer()

  const getViewName = (pathname, menuList) => {
    let title = 'new Page'
    menuList.forEach(item => {
      if (getMenuPath(item.is_frame, item.path) === pathname) {
        title = item.menu_name
      }
    })
    return title
  }
  useEffect(() => {
    if (menuList?.length) {
      addView({pathname: location.pathname, state: {title: getViewName(location.pathname, menuList)}})
    }
  }, [menuList, location.pathname])

  return token ? (
    <BaseLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          {menuList.length &&
            menuList.map((item: any, index) => {
              let Page = lazy(() => import(`@/views${item.component}`))
              // 菜单 并且 需要权限的
              return item.menu_type === 1 && item.is_frame === 0 ? (
                <Route key={index} path={item.path} element={<Page />} />
              ) : null
            })}
          {/* <Route path={`${match.path}/nav/home`} component={lazy(() => import('@/views/sys/home'))} />
          <Route path={`${match.path}/sys/my`} component={lazy(() => import('@/views/sys/my'))} />
          <Route path={`${match.path}/sys/notice`} component={lazy(() => import('@/views/sys/notice'))} /> */}
          {/* <Route path="*" element={<Navigate to="/sys/404" replace={true} />} /> */}
        </Routes>
      </Suspense>
    </BaseLayout>
  ) : (
    <Routes>
      <Route path="/*" element={<Navigate to="/noneed/login" replace={true} />} />
    </Routes>
  )
}

export default PageViewNeed
