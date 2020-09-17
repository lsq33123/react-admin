/** @format */

import React, {Suspense, lazy, useEffect} from 'react'
import {Switch, Route, useRouteMatch, Redirect, useHistory} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
import Global from '@/store/global'
// import TagStore from '@/store/tag-view'

const PageViewNoNeed: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const {menuList} = Global.useContainer()
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

  useEffect(() => {
    const unHistory = history.listen(route => {
      console.log('noneed', route)
      // addView({pathname: route.pathname, state: {title: getViewName(route.pathname, menuList)}})
    })
    return () => {
      unHistory()
    }
  }, [])
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* 下面的都是在最外层打开的 */}
        {menuList.length &&
          menuList.map((item: any, index) => {
            // 菜单 并且 不需要权限的
            return item.menu_type === 1 && item.is_frame === 1 ? (
              <Route
                key={index}
                path={`${match.path}${item.path}`}
                component={lazy(() => import(`@/views${item.component}`))}
              />
            ) : null
          })}
        <Route path={`${match.path}/login`} component={lazy(() => import('@/views/sys/login'))} />
        <Redirect from={match.path} to={`${match.path}/login`} />
      </Switch>
    </Suspense>
  )
}

export default PageViewNoNeed
