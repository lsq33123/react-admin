/** @format */

import React, {Suspense, lazy} from 'react'
import {Routes, Route} from 'react-router-dom'

interface Router {
  name?: string
  path: string
  children?: Array<Router>
  component: any
}

const router: Array<Router> = [
  {
    path: '/404',
    component: lazy(() => import('@/views/sys/errorPage/404')),
  },
  {
    path: '/500',
    component: lazy(() => import('@/views/sys/errorPage/500')),
  },
]

const PageViewSys: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {router.map((item, i) => {
          return <Route key={i} path={item.path} element={<item.component />} />
        })}
      </Routes>
    </Suspense>
  )
}

export default PageViewSys
