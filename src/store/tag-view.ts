/** @format */

import {useState, useEffect} from 'react'
import {createContainer} from 'unstated-next'
import {getStore, setStore} from '@/utils/store'
// import {useHistory} from 'react-router-dom'
const homeView = {
  pathname: '/need/home',
  state: {title: '首页'},
}

const defaultViewList = getStore({name: 'viewList'}) || [homeView]
const defaultCurrView = getStore({name: 'currView'}) || homeView

const useTabView = () => {
  // const history = useHistory()
  const [viewList, setViewList] = useState(defaultViewList)
  const [currView, setCurrView] = useState(defaultCurrView)

  useEffect(() => {
    setStore({name: 'viewList', content: viewList})
  }, [viewList])
  useEffect(() => {
    setStore({name: 'currView', content: currView})
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
          newCurrView = {...oldViewList[index - 1]}
        }
      })
      return oldViewList
    })
    if (isDelCurrView && newCurrView) {
      // debugger
      // setCurrView(newCurrView)
    }
  }

  return {
    viewList,
    currView,
    setViewList,
    setCurrView,
    addView,
    delView,
  }
}

export default createContainer(useTabView)
