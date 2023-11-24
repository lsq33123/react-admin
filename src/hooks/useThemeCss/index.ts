
import { theme } from 'antd'
import type { ThemeConfig } from 'antd';
import { getStore, setStore } from '@/utils/store'
import { formatThemeSetting } from '@/utils'
const { getDesignToken } = theme
const useThemeCss = (config?: ThemeConfig) => {
  if (!config) {
    let settingStore = getStore('setting')
    config = formatThemeSetting(settingStore)
  }
  //循环设置css变量
  const setGlobalCss = (obj: object): void => {
    if (!obj) return
    Object.keys(obj).forEach(key => {
      document.documentElement.style.setProperty(key, obj[key])
    })
  }

  const globalToken = getDesignToken(config)

  const setThemeAttr = () => {
    setGlobalCss({
      // '--color-menu-bg': '#ffffff',
      '--color-primary': globalToken.colorPrimary,
      '--color-primary-bg': globalToken.colorPrimaryBg,
      '--color-primary-hover': globalToken.colorPrimaryHover,
      '--color-primary-active': globalToken.colorPrimaryActive,
      '--color-primary-bg-hover': globalToken.colorPrimaryBgHover,
      '--color-primary-text-hover': globalToken.colorPrimaryTextHover,
      '--color-bg-base': globalToken.colorBgBase,
      '--color-bg-container': globalToken.colorBgContainer,
      //这个属性不知道为什么没有变化 bug?
      '--color-bg-layout': globalToken.colorBgBase === '#000' ? '#000' : globalToken.colorBgLayout,
      '--color-bg-elevated': globalToken.colorBgElevated,
      '--color-text-base': globalToken.colorTextBase,
      '--color-text': globalToken.colorText,
      '--color-text-secondary': globalToken.colorTextSecondary,
      '--color-text-tertiary': globalToken.colorTextTertiary,
      '--color-text-quaternary': globalToken.colorTextQuaternary,
      '--color-border': globalToken.colorBorder,
      '--color-border-secondary': globalToken.colorBorderSecondary,
      '--box-shadow': globalToken.boxShadow,
      '--box-shadow-secondary': globalToken.boxShadowSecondary,
      '--box-shadow-tertiary': globalToken.boxShadowTertiary,
      // '--box-shadow-card': (globalToken as any).boxShadowCard,
      '--border-radius': globalToken.borderRadius,
    })
  }
  return {
    globalToken,
    setGlobalCss,
    setThemeAttr
  }
}

export default useThemeCss
