import React, { Suspense, lazy } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

const PageViewNoNeed: React.FC = () => {
  const match = useRouteMatch()
  return (
    <Suspense fallback={''}>
      <Switch>
        <Route
          path={`${match.path}/login`}
          component={lazy(() => import('@/views/login'))}
        />
        <Redirect from={match.path} to={`${match.path}/login`} />
      </Switch>
    </Suspense>
  )
}

export default PageViewNoNeed
