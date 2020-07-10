import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import 'antd/dist/antd.css'

const Root = () => {
  return (
    <div>
      <App />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
