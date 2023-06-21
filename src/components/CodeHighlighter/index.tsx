/** @format */

import React from 'react'
import Setting from '@/store/setting'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism' // 代码高亮主题风格
import {copyText} from '@/utils'
import './index.less'
import {message} from 'antd'
interface IProps {
  codeType?: string
  children: any
  //props:any
}

const CodeHighlighter: React.FC<IProps> = props => {
  const {setting} = Setting.useContainer()
  // console.log('prismStyles[setting.codeStyle]:', prismStyles[setting.codeStyle])

  const onCopy = text => {
    copyText(text).then(res => {
      message.success('复制成功')
    })
  }

  return (
    <div className="syntax-highlighter-wrap">
      <div
        className="copy-text-btn"
        style={prismStyles[setting.codeStyle].doctype}
        onClick={() => onCopy(props.children)}>
        复制
      </div>
      <SyntaxHighlighter
        language={props.codeType}
        style={prismStyles[setting.codeStyle]}
        className="custom-code"
        showLineNumbers={true}
        wrapLines={true}
        lineProps={lineNumber => {
          const style: React.CSSProperties = {
            display: 'block',
            cursor: 'pointer',
          }
          return {style}
        }}
        lineNumberStyle={{
          color: '#ccc',
          fontSize: '14px',
          paddingRight: '10px',
        }}
        lineNumberContainerStyle={{
          float: 'left',
          paddingRight: '10px',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace',
            fontSize: '14px',
          },
        }}
        wrapLongLines={true}
        customStyle={{padding: '10px 0px'}}>
        {props.children}
      </SyntaxHighlighter>
    </div>
  )
}

CodeHighlighter.defaultProps = {
  codeType: 'jsx',
}

export default CodeHighlighter
