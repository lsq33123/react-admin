/** @format */

import React, {createRef, useEffect} from 'react'
import * as THREE from 'three'
import Game from './game'
import './index.less'
interface IProps {
  //props:any
}

const PageViewJump: React.FC<IProps> = props => {
  const threeBaseRef = createRef<HTMLDivElement>()
  const [score, setScore] = React.useState<number>(0)
  const [game, setGame] = React.useState<Game>()
  const [visible, setVisible] = React.useState<boolean>(false)

  useEffect(() => {
    let game = new Game(threeBaseRef.current as HTMLDivElement)
    setGame(game)
    game?.init()
    game.successCallback = val => {
      setScore(val)
    }
    game.failedCallback = () => {
      // setScore(game.score)
      // setVisible(true)
    }
  }, [])

  const onRestart = () => {
    setVisible(false)
    game!.restart()
  }

  return (
    <div className="curriculum-vitae-wrap">
      <div ref={threeBaseRef} className="three-wrap"></div>
      <div className="context-wrap">
        <div style={{textAlign: 'left'}}>
          <h3>来源：https://github.com/luosijie/threejs-examples</h3>
        </div>
        <h3>分数：{score}</h3>
        <h3 style={{cursor: 'pointer'}} onClick={() => game!.restart()}>
          重新开始
        </h3>
        {/* <h3 style={{cursor: 'pointer'}} onClick={() => game!._createCube()}>
          添加方块
        </h3>
        <h3 style={{cursor: 'pointer'}} onClick={() => game!._jump()}>
          跳一次
        </h3> */}
      </div>
      {visible && (
        <div className="mask-wrap">
          <div className="content">
            <div className="score-container">
              <p className="title">本次得分</p>
              <p className="score">{score}</p>
            </div>
            <div className="restart" onClick={onRestart}>
              重新开始
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PageViewJump
