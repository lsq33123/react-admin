/** @format */
// import {isEmpty} from './validate'

const KEYNAME = 'lsq-' //名字的key
const DEFAULTPOSITION = 'session' //默认存储位置

type NameType = {
  name: string
  type?: 'session' | 'local'
}

type StoreParam = NameType & {
  content: any
  expired?: number
}

type IStore = {
  dataType: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function'
  content: any
  type: 'session' | 'local'
  datetime: number
  expired: number
}
/**存数据  expired过期时间（分钟） */
export const setStore = (params: StoreParam) => {
  params.type = params.type ?? DEFAULTPOSITION
  params.name = KEYNAME + params.name
  const obj: IStore = {
    dataType: typeof params.content,
    content: params.content,
    type: params.type,
    datetime: new Date().getTime(),
    expired: params.expired ? Date.now() + 1000 * 60 * params.expired : Infinity,
  }
  window[params.type + 'Storage'].setItem(params.name, JSON.stringify(obj))

  // params.type === 'session' &&
  //   window.sessionStorage.setItem(params.name, JSON.stringify(obj))
  // params.type === 'local' &&
  //   window.localStorage.setItem(params.name, JSON.stringify(obj))
}

export const getStore = (params: NameType) => {
  params.name = KEYNAME + params.name
  params.type = params.type ?? DEFAULTPOSITION
  let data
  let obj
  if (hasStore(params)) {
    data = window[params.type + 'Storage'].getItem(params.name)
  }
  try {
    obj = JSON.parse(data)
  } catch (err) {
    console.log('err:', err)
  }
  return obj
}

/**判断是否存在 */
export const hasStore = (params: NameType) => {
  params.name = KEYNAME + params.name
  params.type = params.type ?? DEFAULTPOSITION
  return !!window[params.type + 'Storage'].getItem(params.name)
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
export const isAvailable = (params: NameType) => {
  params.name = KEYNAME + params.name
  params.type = params.type ?? DEFAULTPOSITION
  let data
  let obj: IStore
  if (hasStore(params)) {
    data = window[params.type + 'Storage'].getItem(params.name)
    obj = JSON.parse(data)
    if (!isExpired(obj)) return obj
    else {
      removeStore(params) //删除
      return false
    }
  } else {
    return false
  }
}

/**删除指定缓存 */
export const removeStore = (params: NameType) => {
  params.name = KEYNAME + params.name
  params.type = params.type ?? DEFAULTPOSITION
  window[params.type + 'Storage'].removeItem(name)
}
/**删除指定类型缓存 */
export const removeStoreType = (type: 'session' | 'local') => {
  type = type ?? DEFAULTPOSITION
  window[type + 'Storage'].clear()
}
/**删除指定全部缓存 */
export const removeStoreAll = () => {
  window.sessionStorage.clear()
  window.localStorage.clear()
}
