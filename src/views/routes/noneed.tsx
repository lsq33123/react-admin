/** @format */

import React, {Suspense, lazy, useEffect} from 'react'
import {Switch, Route, useRouteMatch, Redirect, useHistory} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
const PageViewNoNeed: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  useEffect(() => {
    const unHistory = history.listen(route => {
      console.log('noneed', route)
      // addView({pathname: route.pathname, state: {title: getViewName(route.pathname, menus)}})
    })
    return () => {
      unHistory()
    }
  }, [])
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={`${match.path}/login`} component={lazy(() => import('@/views/login'))} />
        <Redirect from={match.path} to={`${match.path}/login`} />
      </Switch>
    </Suspense>
  )
}

export default PageViewNoNeed
