
import type { ThemeConfig } from 'antd';

interface IsettingDefaultData {
  codeStyle: string
  algorithm: Array<'defaultAlgorithm' | 'darkAlgorithm' | 'compactAlgorithm'>
  bgOpacity: number
  theme: ThemeConfig
}


// 设置默认数据
export const settingDefaultData: IsettingDefaultData = {
  codeStyle: 'oneDark', // 代码主题
  algorithm: ['defaultAlgorithm'], // 主题算法
  bgOpacity: 0.3, // 背景透明度
  theme: {
    token: {
      colorPrimary: '#1890ff', // 主题色
      // colorBgContainer: '#ffffff', // 组件容器背景色
      // colorBgElevated: '#ffffff', // 浮层容器背景色
      // colorBgLayout: '#f5f5f5', // 布局背景色
      borderRadius: 6, // 圆角
    },
    components: {
      Menu: {
        collapsedWidth: 60,
        collapsedIconSize: 20,
      },
    },
  }
}