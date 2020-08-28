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
          {/*<Route path={`${match.path}/home`} component={lazy(() => import('@/views/sys/home'))} />
          <Route path={`${match.path}/test1`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test2`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test3`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test31`} component={lazy(() => import('@/views/test/index1'))} />
          <Route path={`${match.path}/test32`} component={lazy(() => import('@/views/test/index2'))} />
          <Route path={`${match.path}/test33`} component={lazy(() => import('@/views/test/index3'))} />
          <Route path={`${match.path}/test34`} component={lazy(() => import('@/views/test/index4'))} />
          <Route path={`${match.path}/test35`} component={lazy(() => import('@/views/test/index5'))} />
          <Route path={`${match.path}/test36`} component={lazy(() => import('@/views/test/index6'))} />
          <Route path={`${match.path}/sys/dict`} component={lazy(() => import('@/views/sys/dict'))} />
          <Route path={`${match.path}/sys/user`} component={lazy(() => import('@/views/sys/user'))} />
          <Route path={`${match.path}/sys/role`} component={lazy(() => import('@/views/sys/role'))} />
        <Route path={`${match.path}/sys/menu`} component={lazy(() => import('@/views/sys/menu'))} /> */}
          <Route path={`${match.path}/sys/my`} component={lazy(() => import('@/views/sys/my'))} />
          <Route path={`${match.path}/sys/notice`} component={lazy(() => import('@/views/sys/notice'))} />
          <Redirect from={match.path} to={'/sys/404'} />
        </Switch>
      </Suspense>
    </BaseLayout>
  ) : (
    <Redirect to="/noneed/login" />
  )
}

export default PageViewNeed
