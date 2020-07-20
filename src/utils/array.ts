/** @format */

/**
 * 数组转化为树
 * 必要字段 id，parentId
 */
export const arrayToTree = (data: Array<any>, pid: any): Array<any> => {
  if (!Array.isArray(data) || !data.length) return []
  let res: Array<any> = []
  data.forEach(item => {
    if (item.parentId === pid) {
      let childrenItem = arrayToTree(data, item.id)
      if (childrenItem.length) item.children = childrenItem
      res.push(item)
    }
  })
  return res
}
