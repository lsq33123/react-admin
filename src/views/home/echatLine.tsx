import React, { useState, useEffect, useRef, useCallback } from 'react'
import './index.less'
interface IProps {
  //props:any
}

// const PageView: React.FC<IProps> = (props) => {
//   return <div id="echartLine"></div>
// }
// export default PageView

const PageView: React.FC<IProps> = (props) => {
  const [count, setCount] = useState(0)
  const timer = useRef<any>()
  let timer2

  useEffect(() => {
    let id = setInterval(() => {
      setCount((count) => count + 1)
    }, 500)

    timer.current = id
    timer2 = id
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  const onClickRef = useCallback(() => {
    clearInterval(timer.current)
  }, [])

  const onClick = useCallback(() => {
    clearInterval(timer2)
  }, [])

  return (
    <div>
      点击次数: {count}
      <button onClick={onClick}>普通</button>
      <button onClick={onClickRef}>useRef</button>
    </div>
  )
}

export default PageView
