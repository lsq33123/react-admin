import React from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { Linear } from 'gsap/gsap-core'
import { emojisStr, icons, wordStr } from './data'
import { getIconList } from './antdIcon'

export default class Layer {
  addIcon: any
  speed: any
  fontSize: any
  type: any
  styleType: any
  constructor(fontSize: number, speed: number, styleType?: number) {
    this.addIcon = this.addIconFun
    this.speed = speed || 10
    this.fontSize = fontSize || 14
    this.styleType = styleType
  }


  addIconFun = () => {
    const words = wordStr.split('')
    const emojis: any = []
    for (let val of emojisStr) {
      emojis.push(val)
    }
    let { iconList, iconAll } = getIconList()
    var random_icon = icons[Math.floor(Math.random() * icons.length)]
    var random_icon_antd = iconList[Math.floor(Math.random() * iconList.length)]
    var random_number = parseInt((Math.random() * 10) as any)
    var random_word = words[Math.floor(Math.random() * words.length)]
    var random_emoji = emojis[Math.floor(Math.random() * emojis.length)]
    var $random_x = Math.floor(Math.random() * 2000 + 1)

    let $icon: any = document.createElement('span')
    $icon.setAttribute('aria-hidden', 'true')

    var type = this.styleType
    if (type === 0) {
      //混合模式
      type = parseInt((Math.random() * 7 + 1) as any)
    }
    switch (type) {
      case 1: // 雪花
        $icon = document.createElement('span')
        $icon.className = 'fa fa-snowflake-o' + ` fa-${this.fontSize % 6}x`
        // $icon.setAttribute('style', `font-size: ${this.fontSize} px`)
        break;
      case 2: // 符  号
        $icon = document.createElement('i')
        $icon.className = 'fa ' + random_icon + ` fa-${this.fontSize % 6}x` + `${$random_x % 2 === 1 ? 'fa-spin' : ''}`
        // $icon.setAttribute('style', `font-size: ${this.fontSize} px`)
        break;
      case 3: //Antd符号
        $icon = document.createElement('span')
        $icon.className = 'fa '
        let iconNode = React.createElement(iconAll[random_icon_antd], {
          style: {
            fontSize: `${this.fontSize}px`
          },
        })
        createRoot($icon as any).render(iconNode)
        break;
      case 4: //表  情
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = random_emoji
        $icon.setAttribute('style', `font-size: ${this.fontSize}px;`)
        break;
      case 5: //数  字
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = random_number
        $icon.setAttribute('style', `font-size: ${this.fontSize}px`)
        break;
      case 6: //字  母
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = random_word
        $icon.setAttribute('style', `font-size: ${this.fontSize}px`)
        break;
      case 7: //名  字
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = this.getRandomName(1)
        $icon.setAttribute('style', `font-size: ${this.fontSize}px`)
        break;
      case 999: //关  闭
        break;

      default:
        break;
    }
    document.querySelector('.page-view-snow-wrap')?.appendChild($icon)


    //initial position
    //#2222ff 起始颜色 
    gsap.to($icon, 0, { x: $random_x - Math.random() * 800, opacity: 0.8, color: '#1890ff', y: -80 })
    //main animation
    //ff00ff 终止颜色
    var g1: any = gsap.to($icon, this.speed, {
      color: '#1890ff',
      y: 800,
      x: $random_x - Math.random() * 400,
      opacity: 0,
      ease: Linear.easeNone,
      onComplete: function (obj) {
        // console.log('obj:', obj)
        // obj.target.remove()
        // obj.remove
        document.querySelector('.page-view-snow-wrap')?.removeChild($icon)
        g1 = null
      },
      // onCompleteParams: ['{self}'],
      // onCompleteParams: [{ self }],
    })

    //rotate animation
    var rotation_speed = Math.random() + 10
    gsap.to($icon, rotation_speed, { rotation: 390, ease: Linear.easeNone, repeat: -1 })
  }

  //随机数
  randomAccess(min, max) {
    return Math.floor(Math.random() * (min - max) + max)
  }

  //随机名字
  getRandomName(length) {
    let name = ""
    for (let i = 0; i < length; i++) {
      name += String.fromCharCode(this.randomAccess(0x4E00, 0x9FA5))
    }
    return name
  }


}