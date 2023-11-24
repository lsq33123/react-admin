/** @format */

/** @format */

import React from 'react'
import './index.less'
import Chart from '@/components/Echarts'
interface IProps {
  //props:any
}

const PageViewLine: React.FC<IProps> = props => {
  const value1 = [120, 132, 101, 134, 90, 230, 210]
  const value2 = [320, 332, 301, 334, 390, 330, 320]
  const dateFeild = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const title = ['访客人数', '访客次数']
  const options = {
    backgroundColor: '', //设置无背景色
    title: {
      text: '数量',
    },
    color: ['#FDA695', '#3DC8BD'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: title,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#F1F2F3',
        },
      },
      data: dateFeild, // data.data.time
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#F1F2F3',
        },
      },
    },
    series: [
      {
        name: title[0],
        type: 'line',
        smooth: true,
        data: value1, //data.data.count
        lineStyle: {
          shadowColor: 'rgba(253, 130, 104, 0.1)',
          shadowBlur: 2,
          shadowOffsetY: 10,
        },
      },
      {
        name: title[1],
        type: 'line',
        smooth: true,
        data: value2,
        lineStyle: {
          shadowColor: 'rgba(61,200,189, 0.1)',
          shadowBlur: 2,
          shadowOffsetY: 10,
        },
      },
    ],
  }

  return (
    <div className="home-chart-wrap">
      <Chart key="echartLine" style={{width: '100%', height: '320px'}} option={options}></Chart>
    </div>
  )
}
export default PageViewLine
