/* eslint-disable  */
import { theme } from 'antd'

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: Function, wait: number, immediate: boolean = false) {
  let timeout: NodeJS.Timeout | null

  return function (...args: any[]) {
    const later = () => {
      timeout = null
      if (!immediate) {
        func(...args)
      }
    }

    const callNow = immediate && !timeout
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) {
      func(...args)
    }
  }
}

//复制文本
export function copyText(text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    resolve(text)
  })
}

// 格式化配置
export const formatThemeSetting = setting => {
  const getAlgorithm = (arr: Array<string>) => {
    if (!arr.length) return []
    return arr.map((item: any) => {
      return theme[item]
    })
  }
  let temp = { ...setting.theme, algorithm: getAlgorithm(setting.algorithm) }
  temp.token = {
    ...temp.token,
    colorBgLayout: temp.token.colorBgLayout,
    borderRadiusLG: temp.token.borderRadius,
    colorLink: temp.token.colorPrimary,
    colorInfo: temp.token.colorPrimary,
  }
  return temp
}


/**
 * 
 * @param obj1 
 * @param obj2 
 * @returns 
 */
export function mergeObjects(obj1, obj2) {
  let mergedObj = {};
  if (obj2 instanceof Array) {
    mergedObj = obj2
  } else {
    mergedObj = Object.assign({}, obj1, obj2);
  }
  // 递归处理嵌套对象
  Object.keys(mergedObj).forEach((key) => {
    if (typeof mergedObj[key] === "object" && obj1[key] && obj2[key]) {
      mergedObj[key] = mergeObjects(obj1[key], obj2[key]);
    }
  });
  return mergedObj;
}