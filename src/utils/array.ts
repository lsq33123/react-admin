/** @format */

/**
 * 数组转化为树
 * data需要转化的数组
 * pid起始的父节点 id
 */
export const arrayToTree = (data: Array<any>, pid: any, key = 'id', pkey = 'parentId'): Array<any> => {
  if (!Array.isArray(data) || !data.length) return []
  let res: Array<any> = []
  data.forEach(item => {
    if (item[pkey] === pid) {
      let childrenItem = arrayToTree(data, item[key], key, pkey)
      if (childrenItem.length) item.children = childrenItem
      res.push(item)
    }
  })
  return res
}

/**
 * 转化一棵树的vlaue field children 对应的字段
 * children 为空数组 则删除该字段
 */
type opt = {
  value?: string // 新字段
  oldValue?: string //老字段
  field?: string
  oldField?: string
  parentField: string //必要
  oldParentField: string //必要
}
export const getTreeDataFormat = (data, option: opt): Array<any> => {
  if (!(data && data.length)) {
    return []
  }
  if (!option) return data
  if (!(option.parentField && option.oldParentField)) return data
  for (var i = 0; i < data.length; i++) {
    if (option.value && option.oldValue) data[i][option.value] = data[i][option.oldValue]
    if (option.field && option.oldField) data[i][option.field] = data[i][option.oldField]
    if (data[i][option.oldParentField] && data[i][option.oldParentField].length) {
      data[i][option.parentField] = data[i][option.oldParentField]
      getTreeDataFormat(data[i][option.parentField], option)
    } else {
      delete data[i][option.oldParentField]
    }
  }
  console.log('tree', data)
  return data
}
