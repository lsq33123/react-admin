/** @format */

import axios from 'axios'
import { BASE_URL } from '@/config'
import { message } from 'antd'
import { getStore } from './store'
import { isEmpty } from './validate'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
})

// const whiteList = ['/login']

request.interceptors.request.use(
  req => {
    const token = getStore('token')
    req.headers['Authorization'] = token //添加token验证

    const { params } = req //请求参数
    for (const key in params) {
      if (isEmpty(params[key])) {
        delete params[key]
      }
    }

    return req
  },
  err => {
    return err
  },
)

request.interceptors.response.use(
  res => {
    if (res.data.code === 0) {
      return res.data
    } else {
      message.error(res.data.msg)
      return Promise.reject(res.data)
    }
  },
  err => {
    message.error(err.message)
    return Promise.reject(err)
  },
)
