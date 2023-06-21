/** @format */

import React, {useEffect} from 'react'
import {CheckOutlined, FontColorsOutlined, UnorderedListOutlined} from '@ant-design/icons'
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism' // 代码高亮主题风格
import Setting from '@/store/setting'
import type {MenuProps} from 'antd'
import {Dropdown} from 'antd'
import './index.less'
interface IProps {
  //props:any
}

const CodeStyle: React.FC<IProps> = props => {
  const {setting, updateSetting} = Setting.useContainer()

  const [items, setItems] = React.useState<MenuProps['items']>([])

  useEffect(() => {
    const keys = Object.keys(prismStyles)
    setItems(
      keys.map((key, index) => {
        return {
          key,
          icon: setting.codeStyle === key ? <CheckOutlined /> : <UnorderedListOutlined />,
          label: <span style={{marginLeft: 0, marginRight: 40}}>{key}</span>,
        }
      }),
    )
  }, [setting.codeStyle])

  const handleMenuClick: MenuProps['onClick'] = e => {
    updateSetting('codeStyle', e.key)
  }

  return (
    <Dropdown
      placement="bottomRight"
      menu={{items, selectable: true, defaultSelectedKeys: [setting.codeStyle], onClick: handleMenuClick}}
      overlayClassName="custom-dro-code-style">
      <FontColorsOutlined className="notice-tip" />
    </Dropdown>
  )
}
export default CodeStyle
