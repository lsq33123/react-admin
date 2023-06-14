/** @format */

import React from 'react'
import ShowTop from './showTop'
import EchatLine from './echatLine'
import EchatPie from './echatPie'
import EchatBar from './echatBar'
import EchatRadar from './echatRadar'
import './index.less'
const PageHome = props => {
  return (
    <div className="container-wrap">
      <ShowTop />
      <EchatLine />
      <div className="other-echart">
        <div className="other-echart-body">
          <EchatPie />
        </div>
        <div className="other-echart-body">
          <EchatBar />
        </div>
        <div className="other-echart-body">
          <EchatRadar />
        </div>
      </div>
      {/* <div className="other-echart">
        <div className="other-echart-body">
          <EchatPie />
        </div>
        <div className="other-echart-body">
          <EchatPie />
        </div>
        <div className="other-echart-body">
          <EchatPie />
        </div>
      </div> */}
    </div>
  )
}
export default PageHome
