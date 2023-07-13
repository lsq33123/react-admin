/** @format */

import React, {useEffect} from 'react'
import './index.less'
import gsap from 'gsap'
interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  // useEffect(() => {
  gsap
    .timeline({
      ScrollTrigger: {
        trigger: '.g-scroll',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // pin: true,
        // anticipatePin: 1,
        // markers: true,
      },
    })
    .fromTo('.bg', {y: 0}, {y: '-75%'}, 0)
  // }, [])

  return (
    <div className="right-div demo-index2">
      <div className="g-wrap">
        <div className="text">
          灵动的 iPhone 新玩法，迎面而来。重大的安全新功能，为拯救生命而设计。创新的 4800
          万像素主摄，让细节纤毫毕现。更有 iPhone 芯片中的速度之王，为一切提供强大原动力。
          <div className="bg"></div>
        </div>
      </div>
      <div className="g-scroll"></div>
    </div>
  )
}
export default PageView
