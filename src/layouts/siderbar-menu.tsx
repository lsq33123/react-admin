/** @format */

import React, {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars-2'
// import {menus} from '@/store/menus'
// import {arrayToTree} from '@/utils/array'
import {getStore, setStore} from '@/utils/store'
import Global from '@/store/global'
import TagView from '@/store/tag-view'
import * as icon from '@ant-design/icons'
import {objectToQueryString} from '@/utils'
// import {VideoCameraOutlined, UserOutlined, MenuOutlined, UploadOutlined} from '@ant-design/icons'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  // const menusTree = arrayToTree(menus, 0)
  const {menuList, getMenuPath, logout} = Global.useContainer()
  const {delAllView} = TagView.useContainer()
  const [menusTree, setMenusTree] = useState<Array<any>>([])
  const [activeSubMenu, setActiveSubMenu] = useState(getStore('activeSubMenu') || ['nav'])
  const [currMenuKey, setCurrMenuKey] = useState<any>('home')
  const navigate = useNavigate()
  const location = useLocation()
  const routeUrl = location.pathname

  const getIcon = val =>
    icon && icon[val]
      ? React.createElement(icon && icon[val], {
          style: {
            fontSize: '16px',
          },
        })
      : null

  const isShowMenu = (item: any) => !parseInt(item.visible) && !parseInt(item.status)

  const getUrl = (url: string) => (url.indexOf('http') > -1 ? url : 'https://' + url)

  const arrayToTree = (data: Array<any>, pid: any, key = 'id', pkey = 'parentId'): Array<any> => {
    if (!Array.isArray(data) || !data.length) return []
    let res: Array<any> = []
    data.forEach(item => {
      if (item[pkey] === pid) {
        item.key = item.perms
        item.icon = getIcon(item.icon)
        item.label = item.menu_name
        if (item.is_frame === 2) {
          item.url = getUrl(item.path)
        } else {
          item.url = getMenuPath(item.is_frame, item.path)
        }
        let childrenItem = arrayToTree(data, item[key], key, pkey)
        if (childrenItem.length) item.children = childrenItem
        res.push(item)
      }
    })
    return res
  }

  useEffect(() => {
    let menuListTemp = menuList.filter(item => isShowMenu(item))
    setMenusTree(arrayToTree(menuListTemp, 0, 'menu_id', 'parent_id'))
  }, [menuList])

  useEffect(() => {
    if (routeUrl === '/need/nav/home') {
      setCurrMenuKey('home')
    } else {
      if (!menuList.length) {
        navigate('/noneed/login', {replace: true})
        logout()
        delAllView()
      } else {
        const temp: any = menuList.find((item: any) => getMenuPath(item.is_frame, item.path) === routeUrl)
        setCurrMenuKey(temp?.perms || '')
      }
    }
  }, [routeUrl])

  const onOpenChange = keyArr => {
    setActiveSubMenu(keyArr)
    setStore('activeSubMenu', keyArr)
  }

  const onClickMenuItem = ({item, key, keyPath, domEvent}) => {
    setCurrMenuKey(key)
    if (item.props.is_frame === 2) {
      window.open(item.props.path)
    } else {
      let queryString = item.props.params ? objectToQueryString(eval('(' + item.props.params + ')'), true) : ''
      navigate(item.props.url + (queryString ? '?' + queryString : ''))
    }
  }

  return (
    <Layout>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} className="scroller-menu">
        {menusTree.length && (
          <Menu
            mode="inline"
            className="menu"
            onOpenChange={onOpenChange}
            selectedKeys={currMenuKey}
            openKeys={activeSubMenu}
            items={menusTree}
            onClick={onClickMenuItem}
          />
        )}
      </Scrollbars>
    </Layout>
  )
}
export default PageView
