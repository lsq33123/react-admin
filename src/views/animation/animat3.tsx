/** @format */

import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'
import './index.less'
interface IProps {
  //props:any
}
const PageViewAnimat3: React.FC<IProps> = props => {
  const [flipped, set] = useState(false)
  const {transform, opacity}: {transform: any; opacity: any} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })
  return (
    <div onClick={() => set(state => !state)}>
      <animated.div className="c back" style={{opacity: opacity.to((o: any) => 1 - o), transform}} />
      <animated.div className="c front" style={{opacity, transform: transform.to(t => `${t} rotateX(180deg)`)}} />
    </div>
  )
}
export default PageViewAnimat3
