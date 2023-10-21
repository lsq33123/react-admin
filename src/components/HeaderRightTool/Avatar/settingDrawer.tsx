/** @format */

import {Button, ColorPicker, Drawer, Switch} from 'antd'
import React, {useState} from 'react'
import './index.less'
import {CheckOutlined} from '@ant-design/icons'
import type {ColorPickerProps} from 'antd'
import Setting from '@/store/setting'
import less from 'less'
interface IProps {
  //props:any
  isShow: boolean
  onClose: () => void
}

const PageViewSettingDrawer: React.FC<IProps> = props => {
  const {setting, updateSetting} = Setting.useContainer()

  // 修改变量的值
  function updateLessVariable(variableName, value) {
    const styleSheet: any = document.styleSheets[0]
    // 查找要修改的变量规则
    let variableRule
    for (const rule of styleSheet.cssRules) {
      console.log('rule.selectorText:', rule.selectorText)
      if (rule.selectorText === ':root') {
        variableRule = rule
        break
      }
    }
    variableRule?.style.setProperty(variableName, value)
  }

  const [options, setOptions] = useState<ColorPickerProps>({
    presets: [
      {
        label: '推荐使用',
        colors: ['#1890ff', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#2f54eb', '#722ed1'],
      },
      {
        label: '最近使用',
        colors: ['#000000', '#000000E0'],
      },
    ],
    onChange: color => {
      console.log('color:', color.toHexString())
      updateSetting('colorPrimary', color.toHexString())
      less.modifyVars({
        '@colorPrimary': color.toHexString(),
        '@color-primary': color.toHexString(),
        '@colorPrimaryff': color.toHexString(),
        '@menuBgColor': color.toHexString(),
        '--menuBg-color': color.toHexString(),
      })
      console.log('less:', less)
      // updateLessVariable('colorPrimary', color.toHexString())
      // updateLessVariable('orange', color.toHexString())
      updateLessVariable('menuBgColor', color.toHexString())
      updateLessVariable('--menuBg-color', color.toHexString())
      document.body.style.setProperty('--menu-bg-color', color.toHexString())
    },
  })

  const ttt = val => {
    //console.log('valFn:', val)
  }

  return (
    <Drawer open={props.isShow} title="设置" placement="right" width={300} onClose={props.onClose}>
      <div className="setting-drawer-wrap">
        <div className="setting-item-wrap">
          <div className="setting-item-title">整体风格设置</div>
          <div className="setting-item-content">
            <div className="setting-style-item-wrap" onClick={() => updateSetting('algorithm', ['defaultAlgorithm'])}>
              <div className="style-block"></div>
              {setting.algorithm.includes('defaultAlgorithm') && <CheckOutlined className="style-block-check" />}
            </div>
            <div className="setting-style-item-wrap" onClick={() => updateSetting('algorithm', ['darkAlgorithm'])}>
              <div className="style-block dark"></div>
              {setting.algorithm.includes('darkAlgorithm') && <CheckOutlined className="style-block-check" />}
            </div>
          </div>
        </div>
        <div className="setting-item-wrap">
          <div className="setting-item-title">主题颜色</div>
          <div className="setting-item-content">
            <ColorPicker {...options}></ColorPicker>
          </div>
        </div>
        <div className="setting-item-wrap">
          <div className="setting-item-title">其他设置</div>
          <div className="setting-item-content">
            <div className="setting-switch-wrap">
              <div>紧凑排列</div>
              <Switch onChange={ttt} />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
export default PageViewSettingDrawer
