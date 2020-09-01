/** @format */

import React, {Suspense, lazy, useEffect} from 'react'
import {Switch, Route, Redirect, useRouteMatch, useHistory} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
import BaseLayout from '@/layouts/basic-layout'
// import {menuList} from '@/store/menuList'
import Global from '@/store/global'
import TagStore from '@/store/tag-view'

const PageViewNeed: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const {addView} = TagStore.useContainer()
  const {token, menuList, getMenuPath} = Global.useContainer()

  const getViewName = (pathname, menuList) => {
    let title = 'new Page'
    menuList.forEach(item => {
      if (getMenuPath(item.is_frame, item.path) === pathname) {
        title = item.title
      }
    })
    return title
  }
  useEffect(() => {
    // if (menuList?.length) {
    const unHistory = history.listen(route => {
      console.log('route', route)
      addView({pathname: route.pathname, state: {title: getViewName(route.pathname, menuList)}})
    })
    return () => {
      unHistory()
    }
    // }
  }, [menuList])

  return token ? (
    <BaseLayout>
      <Suspense fallback={<Loading />}>
        <Switch>
          path.join(__dirname, '../src')
          {menuList.length &&
            menuList.map((item: any, index) => {
              return item.menu_type === 1 ? (
                <Route
                  key={index}
                  path={`${match.path}${item.path}`}
                  component={lazy(() => import(`@/views${item.component}`))}
                  // component={lazy(() => import(`~/src${item.component}`))}
                />
              ) : null
            })}
          {/* <Route path={`${match.path}/nav/home`} component={lazy(() => import('@/views/sys/home'))} />
          <Route path={`${match.path}/sys/my`} component={lazy(() => import('@/views/sys/my'))} />
          <Route path={`${match.path}/sys/notice`} component={lazy(() => import('@/views/sys/notice'))} /> */}
          <Redirect from={match.path} to={'/sys/404'} />
        </Switch>
      </Suspense>
    </BaseLayout>
  ) : (
    <Redirect to="/noneed/login" />
  )
}

export default PageViewNeed
