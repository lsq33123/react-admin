/** @format */

import React from 'react'
import './index.less'
import Chart from '@/components/Echarts'
interface IProps {
  //props:any
}

const PageViewRadar: React.FC<IProps> = props => {
  // 指定图表的配置项和数据
  var option = (option = {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,250,0.2)',
    },
    radar: {
      indicator: [
        {name: '绩效奖金', max: 100},
        {name: '带薪年假', max: 100},
        {name: '补充医疗保险', max: 100},
        {name: '年底双薪', max: 100},
        {name: '员工旅游', max: 100},
      ],
      splitArea: {
        show: true,
        areaStyle: {
          color: '#fff',
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        rotate: 30,
      },
      axisName: {
        // (圆外的标签)雷达图每个指示器名称的配置项。
        formatter: '{value}',
        fontSize: 10,
        color: '#333',
      },
    },
    series: {
      type: 'radar',
      symbolSize: 0,
      symbol: 'circle',
      areaStyle: {
        color: '#246CFF',
        opacity: 0.3,
      },
      lineStyle: {
        color: '#246CFF ',
        opacity: 0.8,
        width: 2,
      },
      itemStyle: {
        color: '#246CFF ',
        borderColor: '#246CFF',
        opacity: 0.8,
      },
      // label: {
      //   show: true,
      //   formatter: '{c} %',
      //   color: '#333',
      //   fontSize: 15,
      // },
      data: [
        {
          value: [45, 70, 49, 55, 39],
          name: '其他',
          itemStyle: {
            color: '#FF6666',
          },
          areaStyle: {
            color: '#FF6666',
          },
        },

        {
          value: [60, 45, 77, 56, 50, 66],
          name: '我',
          itemStyle: {
            color: '#39A5FE',
          },
          areaStyle: {
            color: '#39A5FE',
          },
        },
      ],
    },
  })
  return (
    <div
      style={{
        width: '100%',
        height: '360px',
        backgroundColor: '#fff',
        padding: '20px',
      }}>
      <Chart key="echartBar" style={{width: '100%', height: '320px'}} option={option}></Chart>
    </div>
  )
}
export default PageViewRadar
