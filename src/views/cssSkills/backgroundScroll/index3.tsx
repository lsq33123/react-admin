/** @format */

import React, {useEffect} from 'react'
import './index.less'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  useEffect(() => {
    const html = document.documentElement
    const canvas: any = document.getElementById('apple')
    const context: any = canvas.getContext('2d')
    const imgCount = 65
    const currentImg = index =>
      index < 10
        ? `https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/000${index}.png`
        : `https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/00${index}.png`
    const preloadImg = () => {
      for (let i = 1; i < imgCount; i++) {
        const img = new Image()
        img.src = currentImg(i)
      }
    }

    const img = new Image()
    img.src = currentImg(1)
    canvas.width = 1440
    canvas.height = 810
    img.onload = function () {
      context.drawImage(img, 0, 0)
    }

    const updateImg = index => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      img.src = currentImg(index)
      context.drawImage(img, 0, 0)
    }

    document.getElementById('PageViewAnimationCss')?.addEventListener('scroll', () => {
      const el: any = document.getElementById('PageViewAnimationCss')
      const scrollTop = el?.scrollTop || 0

      const maxScrollTop = el.scrollHeight - window.innerHeight
      const scrollFraction = scrollTop / maxScrollTop
      //Math.ceil()  “向上取整”， 即小数部分直接舍去，并向正数部分进1
      const index = Math.min(imgCount - 1, Math.ceil(scrollFraction * imgCount))
      requestAnimationFrame(() => updateImg(index + 1))
    })
    preloadImg()
  }, [])

  return (
    <div className="right-div demo-index3">
      <div style={{color: '#ffffff'}}>来源：https://blog.csdn.net/asd577007722/article/details/126990803</div>
      <canvas id="apple"></canvas>
    </div>
  )
}
export default PageView
