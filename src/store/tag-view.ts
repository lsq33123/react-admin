/** @format */

import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { getStore, setStore, removeStore } from '@/utils/store'
const homeView = {
  pathname: '/need/nav/home',
  state: { title: '首页' },
}

const defaultViewList = getStore('viewList') || [homeView]
const defaultCurrView = getStore('currView') || homeView

const useTabView = () => {
  const [viewList, setViewList] = useState(defaultViewList)
  const [currView, setCurrView] = useState(defaultCurrView)

  useEffect(() => {
    setStore('viewList', viewList)
  }, [viewList])
  useEffect(() => {
    setStore('currView', currView)
  }, [currView])

  const addView = view => {
    setCurrView(view)
    setViewList(prev => {
      const oldViewList = [...prev]
      if (oldViewList.some(val => val.pathname === view.pathname)) {
        return oldViewList
      }
      if (view.state && view.state.type === 'replace') {
        delete view.state.type
        for (let v of oldViewList) {
          if (v.pathname === view.pathname) {
            v = Object.assign(v, view)
            break
          }
        }
      } else {
        oldViewList.push(view)
      }
      return oldViewList
    })
  }

  const delView = view => {
    const isDelCurrView = currView.pathname === view.pathname
    let newCurrView
    setViewList(prev => {
      const oldViewList = [...prev]
      oldViewList.forEach((item, index, arr) => {
        if (item.pathname === view.pathname) {
          arr.splice(index, 1)
          newCurrView = { ...oldViewList[index - 1] }
        }
      })
      return oldViewList
    })
    if (isDelCurrView && newCurrView) {
      // setCurrView(newCurrView)
    }
  }

  const delAllView = () => {
    removeStore('viewList')
    removeStore('currView')
    setCurrView(homeView)
    setViewList([homeView])
  }

  return {
    viewList,
    currView,
    setViewList,
    setCurrView,
    addView,
    delView,
    delAllView,
  }
}

export default createContainer(useTabView)
