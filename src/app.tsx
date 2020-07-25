/** @format */

import React, {lazy, Suspense} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          {/* 需要token验证才能访问的模块 */}
          <Route path="/need" component={lazy(() => import('@/routes/need'))} />
          {/* 不需要token验证能访问的模块 */}
          <Route path="/noneed" component={lazy(() => import('@/routes/noneed'))} />
          {/* 系统模块 */}
          <Route path="/sys" component={lazy(() => import('@/routes/sys'))} />
          <Redirect from={'/'} to={'/noneed'} />
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default App

// class App extends React.Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={<Loading />}>
//           <Switch>
//             {/* 需要token验证才能访问的模块 */}
//             <Route path="/need" component={Need} />
//             {/* 不需要token验证能访问的模块 */}
//             <Route path="/noneed" component={NoNeed} />
//             {/* 系统模块 */}
//             <Route path="/sys" component={Sys} />
//             <Redirect from={'/'} to={'/noneed'} />
//           </Switch>
//         </Suspense>
//       </HashRouter>
//     )
//   }
// }
