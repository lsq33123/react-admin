/** @format */

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3333'
}
if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://120.27.95.122:3333'
}
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://120.27.95.122:3333'
}

export const BASE_URL = baseUrl
