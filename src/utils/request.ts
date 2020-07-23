/** @format */

import axios from 'axios'
import {BASE_URL} from '@/config'
import {message} from 'antd'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
})

// const whiteList = ['/login']

request.interceptors.request.use(
  req => {
    return req
  },
  err => {
    return err
  },
)

request.interceptors.response.use(
  res => res.data,
  err => {
    message.error(err.message)
  },
)
