/** @format */

import React, {Suspense, lazy, useEffect} from 'react'
import {Switch, Route, Redirect, useRouteMatch, useHistory} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
import BaseLayout from '@/layouts/basic-layout'
import {menus} from '@/store/menus'
import Global from '@/store/global'
import TagStore from '@/store/tag-view'
const PageViewNeed: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const {addView} = TagStore.useContainer()
  const {token} = Global.useContainer()

  const getViewName = (pathname, menus) => {
    let title = 'new Page'
    menus.forEach(item => {
      if (item.path === pathname) {
        title = item.title
      }
    })
    return title
  }
  useEffect(() => {
    // if (menus?.length) {
    const unHistory = history.listen(route => {
      console.log('route', route)
      addView({pathname: route.pathname, state: {title: getViewName(route.pathname, menus)}})
    })
    return () => {
      unHistory()
    }
    // }
  }, [menus])

  return token ? (
    <BaseLayout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={`${match.path}/home`} component={lazy(() => import('@/views/sys/home'))} />
          <Route path={`${match.path}/test1`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test2`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test3`} component={lazy(() => import('@/views/test'))} />
          <Route path={`${match.path}/test31`} component={lazy(() => import('@/views/test/index1'))} />
          <Route path={`${match.path}/test32`} component={lazy(() => import('@/views/test/index2'))} />
          <Route path={`${match.path}/test33`} component={lazy(() => import('@/views/test/index3'))} />
          <Route path={`${match.path}/test34`} component={lazy(() => import('@/views/test/index4'))} />
          <Route path={`${match.path}/test35`} component={lazy(() => import('@/views/test/index5'))} />
          <Route path={`${match.path}/test36`} component={lazy(() => import('@/views/test/index6'))} />
          <Route path={`${match.path}/my`} component={lazy(() => import('@/views/sys/my'))} />
          <Redirect from={match.path} to={'/sys/404'} />
        </Switch>
      </Suspense>
    </BaseLayout>
  ) : (
    <Redirect to="/noneed/login" />
  )
}

export default PageViewNeed
