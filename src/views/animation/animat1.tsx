/** @format */

import React from 'react'
import {useSpring, animated, to} from 'react-spring'
import range from 'lodash-es/range'
import './index.less'
interface IProps {
  //props:any
}
const items = range(4)
const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`
const PageViewAnimat1: React.FC<IProps> = props => {
  const {radians} = useSpring({
    // to: async animate => {
    //   while (1) await animate({radians: 2 * Math.PI})
    // },
    to: {radians: 2 * Math.PI},
    from: {radians: 0},
    config: {duration: 3500},
    reset: true,
    loop: true,
  }) as any
  return items.map(i => <animated.div key={i} className="script-bf-box" style={{transform: radians.to(interp(i))}} />)
}
export default PageViewAnimat1
