import React from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { Linear } from 'gsap/gsap-core'
import { emojisStr, wordStr } from './data'
import { faIconList640, brandIconList, iconsRegularList, iconSolidList } from './fontAwesome6_4_0'
import { getIconList } from './antdIcon'

export default class Layer {
  addIcon: any
  speed: any
  fontSize: any
  type: any
  styleType: any
  iconList: any
  iconAll: any
  emojis: any
  words: any
  constructor(fontSize: number, speed: number, styleType?: number) {
    this.addIcon = this.addIconFun
    this.speed = speed || 10
    this.fontSize = fontSize || 14
    this.styleType = styleType

    let { iconList, iconAll } = getIconList()
    this.iconList = iconList
    this.iconAll = iconAll

    this.emojis = []
    for (let val of emojisStr) {
      this.emojis.push(val)
    }

    this.words = wordStr.split('')
  }

  addIconFun = () => {

    let $icon: any = document.createElement('span')
    $icon.setAttribute('aria-hidden', 'true')

    let type = this.styleType
    if (type === 0) {
      //混合模式
      type = parseInt((Math.random() * 7 + 1) as any)
    }
    switch (type) {
      case 1: // 雪花
        $icon = document.createElement('span')
        // $icon.className = 'fa fa-snowflake-o' + ` fa-${this.fontSize % 6 + 1}x`
        $icon.className = 'fa  fa-snowflake ' + ` fa-${this.fontSize % 6 + 1}x`
        // $icon.setAttribute('style', `font-size: ${this.fontSize} px`)
        break;
      case 2: // 符  号 有些图标必须加前缀才生效
        const random_icon = faIconList640[Math.floor(Math.random() * faIconList640.length)]
        let random_icon_pre = ''
        if (brandIconList.includes(random_icon)) {
          random_icon_pre += ' fa-brands '
        } else if (iconsRegularList.includes(random_icon)) {
          random_icon_pre += ' fa-regular '
        } else if (iconSolidList.includes(random_icon)) {
          random_icon_pre += ' fa-solid '
        }

        $icon = document.createElement('i')
        $icon.className = ' fa ' + random_icon + random_icon_pre + ` fa-${this.fontSize % 6 + 1}x `
        // $icon.className = '' + random_icon + ` ${isBrandIcon ? 'fa-brands' : ''}`
        // $icon.setAttribute('style', `font-size: ${this.fontSize} px`)
        break;
      case 3: //Antd符号
        const random_icon_antd = this.iconList[Math.floor(Math.random() * this.iconList.length)]
        $icon = document.createElement('span')
        $icon.className = 'fa '
        let iconNode = React.createElement(this.iconAll[random_icon_antd], {
          style: {
            fontSize: `${this.fontSize}px`
          },
        })
        createRoot($icon as any).render(iconNode)
        break;
      case 4: //表  情
        const random_emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)]
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = random_emoji
        $icon.setAttribute('style', `font-size: ${this.fontSize}px;`)
        break;
      case 5: //数  字
        const random_number = parseInt((Math.random() * 10) as any)
        $icon = document.createElement('span')
        $icon.className = 'fa '
        $icon.innerHTML = random_number
        $icon.setAttribute('style', `font-size: ${this.fontSize}px`)
        break;
      case 6: //字  母
        const random_word = this.words[Math.floor(Math.random() * this.words.length)]
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
    let $random_x = Math.floor(Math.random() * 2000 + 1)
    //#2222ff 起始颜色 
    gsap.to($icon, 0, { x: $random_x - Math.random() * 800, opacity: 0.8, color: '#1890ff', y: -80 })
    //main animation
    //ff00ff 终止颜色
    let g1: any = gsap.to($icon, this.speed, {
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
    let rotation_speed = Math.random() + 10
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