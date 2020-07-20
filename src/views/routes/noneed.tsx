/** @format */

import React, {Suspense, lazy} from 'react'
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
const PageViewNoNeed: React.FC = () => {
  const match = useRouteMatch()
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
