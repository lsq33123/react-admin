/** @format */
import {isEmpty} from './validate'

const KEYNAME = 'lsq-' //名字的key
const DEFAULTPOSITION = 'session' //默认存储位置

// type NameType = {
//   name: string
//   type?: 'session' | 'local'
// }

// type StoreParam = NameType & {
//   content: any
//   expired?: number
// }

type IType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function'
type IStore = {
  dataType: IType
  content: any
  type: 'session' | 'local'
  datetime: number
  expired: number
}

/**存数据  expired过期时间（分钟） */
export const setStore = (name: string, content: any, type: 'session' | 'local' = DEFAULTPOSITION, expired?: number) => {
  name = KEYNAME + name
  const obj: IStore = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime(),
    expired: expired ? Date.now() + 1000 * 60 * expired : Infinity,
  }
  window[type + 'Storage'].setItem(name, JSON.stringify(obj))

  // type === 'session' &&
  //   window.sessionStorage.setItem(name, JSON.stringify(obj))
  // type === 'local' &&
  //   window.localStorage.setItem(name, JSON.stringify(obj))
}

export const getStore = (name: string, type: 'session' | 'local' = DEFAULTPOSITION) => {
  let data
  let obj
  if (hasStore(name, type)) {
    data = window[type + 'Storage'].getItem(KEYNAME + name)
  }

  if (isEmpty(data)) return
  try {
    obj = JSON.parse(data)
  } catch (err) {
    console.log('err:', err)
  }
  return obj.content ?? null
}

/**判断是否存在 */
export const hasStore = (name: string, type: 'session' | 'local' = DEFAULTPOSITION) => {
  name = KEYNAME + name
  return !!window[type + 'Storage'].getItem(name)
}

/**判断是否过期 */
export const isExpired = (params: IStore) => {
  if (Date.now() > params.expired) {
    console.log(name, '缓存过期了')
    return true
  } else {
    return false
  }
}
/**判断是否有效  有效则返回该对象*/
export const isAvailable = (name: string, type: 'session' | 'local' = DEFAULTPOSITION) => {
  let data
  let obj: IStore
  if (hasStore(name, type)) {
    data = window[type + 'Storage'].getItem(KEYNAME + name)
    obj = JSON.parse(data)
    if (!isExpired(obj)) return obj.content
    else {
      removeStore(name, type) //删除
      return false
    }
  } else {
    return false
  }
}

/**删除指定缓存 */
export const removeStore = (name: string, type: 'session' | 'local' = DEFAULTPOSITION) => {
  name = KEYNAME + name

  window[type + 'Storage'].removeItem(name)
}
/**删除指定类型缓存 */
export const removeStoreType = (type: 'session' | 'local' = DEFAULTPOSITION) => {
  window[type + 'Storage'].clear()
}
/**删除指定全部缓存 */
export const removeStoreAll = () => {
  window.sessionStorage.clear()
  window.localStorage.clear()
}
