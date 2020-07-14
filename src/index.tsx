import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import 'antd/dist/antd.css'
import '@/assets/css/app.less'

const Root = () => {
  return (
    <div>
      <App />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
