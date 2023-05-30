/** @format */

import React, {useEffect} from 'react'
import Title from 'antd/lib/typography/Title'
import './index.less'
import {Anchor, Card} from 'antd'
interface IProps {
  title?: string
  items?: Array<any>
  children?: any
  //props:any
}
const PageViewDocModel: React.FC<IProps> = props => {
  console.log('props:', props)
  useEffect(() => {
    let docScrollWrap: any = document.getElementById('doc-scroll-wrap')
    if (
      docScrollWrap &&
      (docScrollWrap.scrollHeight > docScrollWrap.clientHeight ||
        docScrollWrap.offsetHeight > docScrollWrap.clientHeight)
    ) {
      // docScrollWrap.style.padding = '15px 315px 15px 15px'
      ;(document.querySelector('.doc-right-wrap') as any).style.right = '10px'
      // console.log('该div有滚动条！')
    }
  }, [document.getElementById('doc-scroll-wrap')])

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

  const RenderChildren = () => {
    if (props.children instanceof Array && props.children.length > 0) {
      return (
        <>
          {props.children.map((item, index) => (
            <div className="doc-body" key={index}>
              {item}
            </div>
          ))}
        </>
      )
    } else if (props.children) {
      return <div className="doc-body">{props.children}</div>
    } else {
      return null
    }
  }

  return (
    <div className="doc-content-wrap">
      {props.title && <Title level={4}>{props.title}</Title>}
      <div className="doc-body-wrap">
        <div className="doc-left-wrap" id="doc-scroll-wrap">
          <RenderChildren />
        </div>
        <div className="doc-right-wrap">
          {props.items && props.items.length > 0 && (
            <Card title="目录" bordered={false}>
              <Anchor
                affix
                offsetTop={15}
                className="doc-anchor"
                items={props.items}
                onClick={handleAnchorClick}
                getContainer={() => document.getElementById('doc-scroll-wrap') as any}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
export default PageViewDocModel
