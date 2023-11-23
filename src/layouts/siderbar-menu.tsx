/** @format */

import React, {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars-2'
// import {menus} from '@/store/menus'
import {arrayToTree} from '@/utils/array'
import {getStore, setStore} from '@/utils/store'
import Global from '@/store/global'
import TagView from '@/store/tag-view'
import * as icon from '@ant-design/icons'
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

  useEffect(() => {
    // console.log('menuList:', menuList)
    let menuListTemp = menuList.filter(item => isShowMenu(item))
    setMenusTree(arrayToTree(menuListTemp, 0, 'menu_id', 'parent_id'))
  }, [menuList])

  useEffect(() => {
    // console.log('routeUrl:', routeUrl)
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

  const getIcon = val =>
    icon && icon[val]
      ? React.createElement(icon && icon[val], {
          style: {
            fontSize: '14px',
          },
        })
      : null

  const isShowMenu = (item: any) => !parseInt(item.visible) && !parseInt(item.status)

  const getUrl = (url: string) => (url.indexOf('http') > -1 ? url : 'https://' + url)

  const getMenuItem = () => {
    if (!menusTree.length) return []
    return menusTree.map((item, index) => {
      if (item.children?.length) {
        return {
          ...item,
          key: item.perms,
          icon: getIcon(item.icon),
          label: item.menu_name,
          children: item.children.map(ele => {
            return {
              ...ele,
              key: ele.perms,
              icon: getIcon(ele.icon),
              label: ele.menu_name,
              url: getMenuPath(ele.is_frame, ele.path),
            }
          }),
        }
      }

      // 没有父节点的菜单
      if (!item.children?.length) {
        return {
          ...item,
          key: item.perms,
          icon: getIcon(item.icon),
          label: item.menu_name,
          url: getMenuPath(item.is_frame, item.path),
        }
      }
    })
  }

  const onClickMenuItem = ({item, key, keyPath, domEvent}) => {
    setCurrMenuKey(key)
    if (item.props.is_frame === 2) {
      window.open(item.props.path)
    } else {
      navigate(item.props.url)
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
            items={getMenuItem()}
            onClick={onClickMenuItem}
          />
        )}
      </Scrollbars>
    </Layout>
  )
}
export default PageView
