
import { theme } from 'antd'
const { getDesignToken } = theme
const useThemeCss = (colorPrimary: string) => {
  //循环设置css变量
  const setGlobalCss = (obj: object): void => {
    if (!obj) return
    Object.keys(obj).forEach(key => {
      document.documentElement.style.setProperty(key, obj[key])
    })
  }

  const globalToken = getDesignToken()

  const setThemeAttr = () => {
    setGlobalCss({
      '--color-menu-bg': '#ffffff',
      '--color-primary': globalToken.colorPrimary,
      '--color-primary-bg': globalToken.colorPrimaryBg,
      '--color-primary-hover': globalToken.colorPrimaryHover,
      '--color-primary-active': globalToken.colorPrimaryActive,
      '--color-primary-bg-hover': globalToken.colorPrimaryBgHover,
      '--color-primary-text-hover': globalToken.colorPrimaryTextHover,
      '--color-bg-base': globalToken.colorBgBase,
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
