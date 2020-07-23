/** @format */

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3366'
}
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
}

export const BASE_URL = baseUrl
