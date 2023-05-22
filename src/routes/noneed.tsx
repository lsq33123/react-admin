/** @format */

import React, {Suspense, lazy, useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
import Global from '@/store/global'
// import TagStore from '@/store/tag-view'
let PageLogin = lazy(() => import('@/views/sys/login'))

interface Router {
  name?: string
  path: string
  children?: Array<Router>
  component: any
}

const PageViewNoNeed: React.FC = () => {
  const navigate = useNavigate()
  const {menuList} = Global.useContainer()

  let router: Array<Router> = menuList.map(item => {
    return {
      path: item.path,
      component: lazy(() => import(`@/views${item.component}`)),
    }
  })
  router.push({
    path: '/login',
    component: lazy(() => import('@/views/sys/login')),
  })
  router.push({
    path: '/noneed',
    component: lazy(() => import('@/views/sys/login')),
  })

  // const {addView} = TagStore.useContainer()

  // const getViewName = (pathname, menuList) => {
  //   let title = 'new Page'
  //   menuList.forEach(item => {
  //     if (getMenuPath(item.is_frame, item.path) === pathname) {
  //       title = item.title
  //     }
  //   })
  //   return title
  // }

  // useEffect(() => {
  //   // const unHistory = navigate.listen(route => {
  //   //   console.log('noneed', route)
  //   //   // addView({pathname: route.pathname, state: {title: getViewName(route.pathname, menuList)}})
  //   // })
  //   // return () => {
  //   //   unHistory()
  //   // }
  // }, [])
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 下面的都是在最外层打开的 */}
        {router.length &&
          router.map((item: any, index) => {
            // 菜单 并且 不需要权限的
            return item.menu_type === 1 && item.is_frame === 1 ? (
              <Route key={index} path={item.path} element={<item.component />} />
            ) : null
          })}
        <Route path={`/login`} element={<PageLogin />} />
        <Route path="/noneed" element={<Navigate to="/noneed/login" replace={true} />} />
      </Routes>
    </Suspense>
  )
}

export default PageViewNoNeed
