import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import BaseLayout from '@/layouts/basic-layout'
const PageViewNeed: React.FC = () => {
  const match = useRouteMatch()
  return (
    <BaseLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route
            path={`${match.path}/home`}
            component={lazy(() => import('@/views/home'))}
          />
          <Route
            path={`${match.path}/test1`}
            component={lazy(() => import('@/views/test'))}
          />
          <Route
            path={`${match.path}/test2`}
            component={lazy(() => import('@/views/test'))}
          />
          <Route
            path={`${match.path}/test3`}
            component={lazy(() => import('@/views/test'))}
          />
          <Redirect from={match.path} to={'/sys/404'} />
        </Switch>
      </Suspense>
    </BaseLayout>
  )
}

export default PageViewNeed
