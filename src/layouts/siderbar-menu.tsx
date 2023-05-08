/** @format */

import React, {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {Link, useHistory} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars'
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
  const history = useHistory()
  const routeUrl = history.location.pathname

  useEffect(() => {
    console.log('menuList:', menuList)
    setMenusTree(arrayToTree(menuList, 0, 'menu_id', 'parent_id'))
  }, [menuList])

  useEffect(() => {
    console.log('routeUrl:', routeUrl)
    if (routeUrl === '/need/nav/home') {
      setCurrMenuKey('home')
    } else {
      if (!menuList.length) {
        history.replace('/noneed/login')
        logout()
        delAllView()
      } else {
        const temp: any = menuList.find((item: any) => getMenuPath(item.is_frame, item.path) === routeUrl)
        console.log('menuList:', menuList)
        console.log('temp:', temp)
        setCurrMenuKey(temp?.perms || '')
      }
    }
  }, [routeUrl])

  const onOpenChange = keyArr => {
    setActiveSubMenu(keyArr)
    setStore('activeSubMenu', keyArr)
  }

  const handleClick = e => {
    console.log('e:', e)
    console.log('e.key:', e.key)
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
          theme="dark"
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
          {/* 
          <SubMenu
            key="tit2"
            title={
              <span>
                <MenuOutlined />
                <span>菜单</span>
              </span>
            }>
            <Menu.Item key="dataSurvey1">
              <Link to="/need/home">菜单-1</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey2">
              <Link to="/need/home">菜单-2</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey3">
              <Link to="/need/home">菜单-3</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey4">
              <Link to="/need/home">菜单-4</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey5">
              <Link to="/need/home">菜单-5</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey6">
              <Link to="/need/home">菜单-6</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="tit3"
            title={
              <span>
                <MenuOutlined />
                <span>其他</span>
              </span>
            }>
            <Menu.Item key="dataSurvey11">
              <Link to="/need/home">其他-1</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey12">
              <Link to="/need/home">其他-2</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey13">
              <Link to="/need/home">其他-3</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey14">
              <Link to="/need/home">其他-4</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey15">
              <Link to="/need/home">其他-5</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey16">
              <Link to="/need/home">其他-6</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="tit4"
            title={
              <span>
                <MenuOutlined />
                <span>测试</span>
              </span>
            }>
            <Menu.Item key="dataSurvey111">
              <Link to="/need/home">测试-1</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey112">
              <Link to="/need/home">测试-2</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey113">
              <Link to="/need/home">测试-3</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey114">
              <Link to="/need/home">测试-4</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey115">
              <Link to="/need/home">测试-5</Link>
            </Menu.Item>
            <Menu.Item key="dataSurvey116">
              <Link to="/need/home">测试-6</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item> */}
        </Menu>
      </Scrollbars>
    </Layout>
  )
}
export default PageView
