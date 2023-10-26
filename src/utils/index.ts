/* eslint-disable  */


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

