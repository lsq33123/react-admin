/** @format */

import React from 'react'
import Title from 'antd/lib/typography/Title'
import './index.less'
import {Anchor} from 'antd'
interface IProps {
  title?: string
  items?: Array<any>
  children?: any
  //props:any
}
const PageViewDocModel: React.FC<IProps> = props => {
  const {Link} = Anchor as any
  const handleAnchorClick = (e, link) => {
    e.preventDefault()
    // if (link.href) {
    //   // 找到锚点对应得的节点
    //   let element = document.getElementById(link.href.slice(1))
    //   // 如果对应id的锚点存在，就跳滚动到锚点顶部
    //   element && element.scrollIntoView({block: 'start', behavior: 'smooth'})
    // }
  }

  return (
    <div className="doc-content-wrap">
      {props.title && <Title level={4}>{props.title}</Title>}
      <div className="doc-body-wrap">
        <div className="doc-left-wrap" id="doc-scroll-wrap">
          {props.children &&
            props.children.length &&
            props.children.map((item, index) => (
              <div className="doc-body" key={index}>
                {item}
              </div>
            ))}
        </div>
        <div className="doc-right-wrap">
          {props.items && props.items.length > 0 && (
            <Anchor
              className="doc-anchor"
              items={props.items}
              onClick={handleAnchorClick}
              getContainer={() => document.getElementById('doc-scroll-wrap') as any}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default PageViewDocModel
