/** @format */

import React, {lazy, Suspense} from 'react'
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom'
import Loading from '@/components/PageLoading/loading'
let PageSys = lazy(() => import('@/routes/sys'))
let PageNoneed = lazy(() => import('@/routes/noneed'))
let PageNeed = lazy(() => import('@/routes/need'))

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 需要token验证才能访问的模块 */}
          <Route path="/need/*" element={<PageNeed />} />
          {/* 不需要token验证能访问的模块 */}
          <Route path="/noneed/*" element={<PageNoneed />} />
          {/* 系统模块 */}
          <Route path="/sys/*" element={<PageSys />} />
          <Route path="/*" element={<Navigate to="/noneed/login" replace={true} />} />
        </Routes>
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
