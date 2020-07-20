/** @format */

import React, {lazy, Suspense} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
const Need = lazy(() => import('@/views/routes/need'))
const NoNeed = lazy(() => import('@/views/routes/noneed'))
const Sys = lazy(() => import('@/views/routes/sys'))

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* 需要token验证才能访问的模块 */}
            <Route path="/need" component={Need} />
            {/* 不需要token验证能访问的模块 */}
            <Route path="/noneed" component={NoNeed} />
            {/* 系统模块 */}
            <Route path="/sys" component={Sys} />
            <Redirect from={'/'} to={'/noneed'} />
          </Switch>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
