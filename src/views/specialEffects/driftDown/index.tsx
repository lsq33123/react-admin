/** @format */

import React, {useState} from 'react'
import './index.less'
import '@/assets/css/font-awesome-4.7.0/less/font-awesome.less'
import Snow from './components/index'
import {Select} from 'antd'

interface IProps {
  //props:any
}

const PageView: React.FC<IProps> = props => {
  const [type, setType] = useState(0)
  let childRef: any = React.createRef()

  const handleChange = val => {
    childRef.current.setTypeNum(val)
    setType(val)
  }

  return (
    <div className="page-drift-down-wrap">
      <div className="select-drift-down">
        <Select
          value={type}
          placeholder="请选择飘落物"
          className="w150 "
          onChange={handleChange}
          options={[
            {label: '混  合', value: 0},
            {label: '雪  花', value: 1},
            {label: '符  号', value: 2},
            {label: 'Antd符号', value: 3},
            {label: '表  情', value: 4},
            {label: '数  字', value: 5},
            {label: '字  母', value: 6},
            {label: '名  字', value: 7},
            {label: '关  闭', value: 999},
          ]}></Select>
      </div>
      <Snow onRef={childRef} initTypeNum={type} />
    </div>
  )
}
export default PageView
