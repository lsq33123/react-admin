/** @format */

import React from 'react'
import './index.less'
import Chart from '@/components/Echarts'
interface IProps {
  //props:any
}

const PageViewBar: React.FC<IProps> = props => {
  // 指定图表的配置项和数据
  var data1 = [20, 30, 20, 30, 20, 30, 20]
  var data2 = [9, 30, 9, 60, 70, 20, 59]
  // var data3 = [20, 30, 20, 30, 20, 30, 20]
  // var data4 = [9, 30, 9, 60, 70, 20, 59]
  var datacity = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  var option = {
    color: ['#388BFF', '#05C3FA', '#F6931C', '#FFD52E'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      bottom: '2%',
      data: ['商品一', '商品二'],
    },
    grid: {
      //图表的位置
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} ',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
        show: true,
      },
    ],
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          interval: 0,
          show: true,
          splitNumber: 15,
          textStyle: {
            fontSize: 10,
            color: '#000',
          },
        },
        data: datacity,
      },
    ],
    series: [
      {
        name: '商品一',
        type: 'bar',
        stack: 'sum',
        barWidth: '20px',
        data: data1,
      },
      {
        name: '商品二',
        type: 'bar',
        barWidth: '20px',
        stack: 'sum',
        data: data2,
      },
      // {
      //   name: '商品三',
      //   type: 'bar',
      //   color: '#F6931C',
      //   stack: 'sum1',
      //   barWidth: '20px',
      //   data: data3,
      // },
      // {
      //   name: '商品四',
      //   type: 'bar',
      //   color: '#FFD52E',
      //   stack: 'sum1',
      //   barWidth: '20px',
      //   data: data4,
      // },
    ],
  }
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
export default PageViewBar
