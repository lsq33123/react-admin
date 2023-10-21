/** @format */

import React, {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
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
    setMenusTree(arrayToTree(menuList, 0, 'menu_id', 'parent_id'))
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
        // console.log('menuList:', menuList)
        // console.log('temp:', temp)
        setCurrMenuKey(temp?.perms || '')
      }
    }
  }, [routeUrl])

  const onOpenChange = keyArr => {
    setActiveSubMenu(keyArr)
    setStore('activeSubMenu', keyArr)
  }

  const handleClick = e => {
    // console.log('e:', e)
    setCurrMenuKey(e.key)
    // setStore('currMenuKey', e.key)
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

  return (
    <Layout>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} className="scroller-menu">
        {/* {JSON.stringify(currMenuKey)}
        {JSON.stringify(activeSubMenu)} */}
        <Menu
          mode="inline"
          className="menu"
          onClick={handleClick}
          onOpenChange={onOpenChange}
          selectedKeys={currMenuKey}
          openKeys={activeSubMenu}>
          {/* <SubMenu
            key="nav"
            title={
              <span>
                <AppstoreOutlined />
                <span>系统导航</span>
              </span>
            }>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/need/nav/home">首页</Link>
            </Menu.Item>
          </SubMenu> */}
          {menusTree.map((item, index) => {
            if (isShowMenu(item) && item.children?.length) {
              return (
                <SubMenu
                  key={item.perms}
                  title={
                    <span>
                      {/* <MenuOutlined /> */}
                      {getIcon(item.icon)}
                      <span>{item.menu_name}</span>
                    </span>
                  }>
                  {item.children.map(ele => {
                    if (isShowMenu(ele)) {
                      if (ele.is_frame === 2) {
                        // 外链
                        return (
                          <Menu.Item key={ele.perms} icon={getIcon(ele.icon)}>
                            <span>
                              <a href={getUrl(ele.path)} target="_blank" rel="noopener noreferrer">
                                {ele.menu_name}
                              </a>
                            </span>
                          </Menu.Item>
                        )
                      } else {
                        return (
                          <Menu.Item key={ele.perms} icon={getIcon(ele.icon)}>
                            <Link to={getMenuPath(ele.is_frame, ele.path)}>{ele.menu_name}</Link>
                          </Menu.Item>
                        )
                      }
                    } else {
                      return ''
                    }
                  })}
                </SubMenu>
              )
            }
            // 没有父节点的菜单
            if (isShowMenu(item) && !item.children?.length) {
              if (item.is_frame === 2) {
                // 外链
                return (
                  <Menu.Item key={item.perms} icon={getIcon(item.icon)}>
                    <span>
                      <a href={getUrl(item.path)} target="_blank" rel="noopener noreferrer">
                        {item.menu_name}
                      </a>
                    </span>
                  </Menu.Item>
                )
              } else {
                return (
                  <Menu.Item key={item.perms} icon={getIcon(item.icon)}>
                    <Link to={getMenuPath(item.is_frame, item.path)}>{item.menu_name}</Link>
                  </Menu.Item>
                )
              }
            }
            return ''
          })}
        </Menu>
      </Scrollbars>
    </Layout>
  )
}
export default PageView
