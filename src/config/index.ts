/** @format */

let baseUrl, title
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3366'
  title = '开发环境'
}
if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://120.27.95.122:3366'
  title = '测试环境'
}
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://120.27.95.122:3366'
  title = '生产环境'
}

export default {
  baseUrl,
  title,
  systemName: '资料管理',
  touristToken: 'QWERTYUIOPASDFGHJKLZXCVBNM'
}
