import * as iconAll from '@ant-design/icons'

export const getIconList = () => {

  let iconList: Array<any> = []
  for (let key in iconAll) {
    iconList.push(key)
  }
  iconList.splice(iconList.length - 4, 4) // 最后4个不是图标 影响渲染
  // tempArr = tempArr.filter(item => item.indexOf('lined') > -1) //过滤掉 实底风格的 和 双色风格的  只保留线条风格
  return { iconList, iconAll }
}