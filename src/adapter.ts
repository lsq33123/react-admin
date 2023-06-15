import { debounce } from '@/utils'

export const adaptation = () => {
  //分辨率适配函数
  //body设置了最小宽高度1280px

  const fn = () => {
    let fontSize = 16 //初始化字体



    // 相对于1920像素的缩放比
    let scale: string | number = document.documentElement.clientWidth / 1920
    // 根据屏幕变化 1rem 对应的 font-size
    scale = scale > 1 ? 1 : scale;
    const realFont = JSON.stringify(fontSize * scale)
    scale = JSON.stringify(scale)

    sessionStorage.setItem('fontSizeStorage', realFont)
    sessionStorage.setItem('fontSizeScale', scale)
    document.documentElement.style.fontSize = realFont + 'px'
  }

  fn()
  window.addEventListener('resize', debounce(() => {
    fn()
  }, 200));
}