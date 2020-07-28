/** @format */

import React, {Suspense, lazy} from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

const PageViewSys: React.FC = () => {
  const match = useRouteMatch()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={`${match.path}/404`} component={lazy(() => import('@/views/sys/errorPage/404'))} />
        <Route path={`${match.path}/500`} component={lazy(() => import('@/views/sys/errorPage/500'))} />
      </Switch>
    </Suspense>
  )
}

export default PageViewSys
