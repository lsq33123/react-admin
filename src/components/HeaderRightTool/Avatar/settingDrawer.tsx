/** @format */

import {ColorPicker, Drawer, Slider, Switch} from 'antd'
import React, {useRef, useState} from 'react'
import './index.less'
import {CheckOutlined} from '@ant-design/icons'
import type {ColorPickerProps} from 'antd'
import Setting from '@/store/setting'
import useThemeCss from '@/hooks/useThemeCss'
import {debounce} from '@/utils'
interface IProps {
  //props:any
  isShow: boolean
  onClose: () => void
}

const PageViewSettingDrawer: React.FC<IProps> = props => {
  const {setting, updateSetting} = Setting.useContainer()
  const [opacity, setOpacity] = useState(setting.bgOpacity)
  const [borderRadius, setBorderRadius] = useState(setting.theme.token!.borderRadius)

  // 通过静态方法获取
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
      updateSetting({theme: {token: {colorPrimary: color.toHexString()}}})
      useThemeCss().setThemeAttr()
    },
  })

  const onClickAlgorithm = (type: 'light' | 'dark') => {
    if (type === 'light' && !setting.algorithm.includes('defaultAlgorithm')) {
      updateSetting({
        algorithm: ['defaultAlgorithm', ...setting.algorithm.filter(item => item !== 'darkAlgorithm')],
      })
    } else if (type === 'dark' && !setting.algorithm.includes('darkAlgorithm')) {
      updateSetting({
        algorithm: ['darkAlgorithm', ...setting.algorithm.filter(item => item !== 'defaultAlgorithm')],
      })
    }
  }

  const setCompactAlgorithm = val => {
    if (val) {
      updateSetting({
        algorithm:
          setting.algorithm.indexOf('defaultAlgorithm') > -1
            ? ['compactAlgorithm', ...setting.algorithm.filter(item => item !== 'defaultAlgorithm')]
            : ['compactAlgorithm', ...setting.algorithm],
      })
    } else {
      let algorithm = setting.algorithm.filter(item => item !== 'compactAlgorithm')
      updateSetting({
        algorithm: algorithm.length ? algorithm : ['defaultAlgorithm'],
      })
    }
  }

  const debounceSetOpacity = useRef(
    //使用useRef保存函数 保证函数不会被重复创建
    debounce(opacity => {
      updateSetting({bgOpacity: opacity})
    }, 500),
  )
  const debounceSetBorderRadius = useRef(
    //使用useRef保存函数 保证函数不会被重复创建
    debounce(borderRadius => {
      // console.log('borderRadius:', borderRadius)
      updateSetting({theme: {token: {borderRadius}}})
    }, 500),
  )

  return (
    <Drawer open={props.isShow} title="设置" placement="right" width={300} onClose={props.onClose}>
      <div className="setting-drawer-wrap">
        <div className="setting-item-wrap">
          <div className="setting-item-title">整体风格设置</div>
          <div className="setting-item-content">
            <div className="setting-style-item-wrap" onClick={() => onClickAlgorithm('light')}>
              <div className="style-block"></div>
              {(setting.algorithm.includes('defaultAlgorithm') || !setting.algorithm.includes('darkAlgorithm')) && (
                <CheckOutlined className="style-block-check" />
              )}
            </div>
            <div className="setting-style-item-wrap" onClick={() => onClickAlgorithm('dark')}>
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
              <Switch onChange={setCompactAlgorithm} />
            </div>
          </div>
          <div className="setting-item-content">
            <div className="setting-switch-wrap">
              <div>背景透明度</div>
              <Slider
                value={opacity}
                step={0.1}
                max={1}
                min={0}
                style={{width: '150px'}}
                onChange={val => {
                  setOpacity(val)
                  debounceSetOpacity.current(val)
                }}
              />
            </div>
          </div>
          <div className="setting-item-content">
            <div className="setting-switch-wrap">
              <div>组件圆角</div>
              <Slider
                value={borderRadius}
                step={1}
                max={20}
                min={0}
                style={{width: '150px'}}
                onChange={val => {
                  setBorderRadius(val)
                  debounceSetBorderRadius.current(val)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
export default PageViewSettingDrawer
