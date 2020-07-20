/** @format */

import React from 'react'
import {Layout, Menu} from 'antd'
import {UserOutlined, VideoCameraOutlined, UploadOutlined, MenuOutlined} from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu'
import {Link} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars'
import {menus} from '@/store/menus'
import {arrayToTree} from '@/utils/array'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const menusTree = arrayToTree(menus, 0)
  return (
    <Layout>
      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} className="scroller-menu">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="menu">
          {menusTree.map((item, index) => (
            <SubMenu
              key={item.name}
              title={
                <span>
                  <MenuOutlined />
                  <span>{item.title}</span>
                </span>
              }>
              {item.children?.length &&
                item.children.map(ele => (
                  <Menu.Item key={ele.name}>
                    <Link to={ele.path}>{ele.title}</Link>
                  </Menu.Item>
                ))}
            </SubMenu>
          ))}

          <SubMenu
            key="tit1"
            title={
              <span>
                <MenuOutlined />
                <span>统计</span>
              </span>
            }>
            <Menu.Item key="need/test1">
              <Link to="/need/test1">测试页面1</Link>
            </Menu.Item>
            <Menu.Item key="need/test2">
              <Link to="/need/test2">测试页面2</Link>
            </Menu.Item>
            <Menu.Item key="need/test3">
              <Link to="/need/test3">测试页面3</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu
            key="tit2"
            title={
              <span>
                <MenuOutlined />
                <span>菜单</span>
              </span>
            }
          >
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
            }
          >
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
            }
          > 
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
*/}
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Scrollbars>
    </Layout>
  )
}
export default PageView
