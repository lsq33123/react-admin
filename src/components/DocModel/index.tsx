/** @format */

import React from 'react'
import Title from 'antd/lib/typography/Title'
import './index.less'
import {Anchor} from 'antd'
interface IProps {
  title?: string
  items?: Array<any>
  //props:any
}
const PageViewDocModel: React.FC<IProps> = props => {
  const {Link} = Anchor as any
  return (
    <div className="doc-content-wrap">
      {props.title && <Title level={4}>{props.title}</Title>}
      <div className="doc-body-wrap">
        <div className="doc-left-wrap">
          {props.items && props.items.length > 0 && (
            <Anchor className="doc-anchor">
              {props.items.map((item: any) => (
                <Link key={item.id} href={`#${item.id}`} title={item.title}>
                  {item.children &&
                    item.children.length > 0 &&
                    item.children.map((child: any) => (
                      <Link key={child.id} href={`#${child.id}`} title={child.title} />
                    ))}
                </Link>
              ))}
            </Anchor>
          )}
        </div>
        <div className="doc-right-wrap"></div>
      </div>
    </div>
  )
}
export default PageViewDocModel
