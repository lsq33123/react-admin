/** @format */

import React, {useState, useEffect} from 'react'

interface IProps {
  number: number
}

const PageView: React.FC<IProps> = props => {
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    show(props.number)
  }, [])

  const show = finalNum => {
    let speedNum //增长速率
    let remainder //余数
    if (finalNum > 100) {
      speedNum = Number((finalNum / 100).toFixed(0))
      remainder = Number(finalNum % speedNum)
    } else {
      speedNum = 1
      remainder = 0
    }
    const timer = setInterval(() => {
      setNum(prev => {
        if (prev + speedNum > finalNum) {
          console.log('prev:', prev)
          clearInterval(timer)
          return prev + remainder
        } else {
          return speedNum + prev
        }
      })
    }, 20)
  }

  return <> {num}</>
}
export default PageView
