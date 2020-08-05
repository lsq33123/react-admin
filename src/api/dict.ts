/** @format */

import {request} from '@/utils/request'
// import {HttpResponse} from '@/interface'
import {isAvailable, setStore} from '@/utils/store'
const EXPIRED_TIME = 60 * 1 //1小时过期

/**获取数据字典数分类*/
export const getDictTypeTree = async params => {
  let cacheKey = 'dictTree-' + (params.cacheId ? JSON.stringify(params.cacheId) : '')
  let data = isAvailable(cacheKey)
  if (params?.cache && data) {
    return data
  } else {
    const res: any = await request.get('/dict/getTypeList', {params})
    res.code === 0 && setStore(cacheKey, res, 'session', EXPIRED_TIME)
    return res
  }
}
/**获取数据字典数据 */
export const getDictDataList = async params => {
  let cacheKey = 'dictData-' + (params.cacheId ? JSON.stringify(params.cacheId) : '')
  let data = isAvailable(cacheKey)
  if (params?.cache && data) {
    return data
  } else {
    const res: any = await request.get('/dict/getDataList', {params})
    res.code === 0 && setStore(cacheKey, res, 'session', EXPIRED_TIME)
    return res
  }
}

// export const getDictTypeTree = (): HttpResponse<any> => request.get('/dict/getTypeList')

// export const getDictDataList = (params): HttpResponse<any> => request.get('/dict/getDataList', {params})
//新增数据字典分类
export const addDictType = body => request.post('/dict/addTypeList', body)
//修改数据字典分类
export const updateTypeList = body => request.post('/dict/updateTypeList', body)
//新增数据字典
export const addDictData = body => request.post('/dict/addDataList', body)
//修改数据字典
export const updateDataList = body => request.post('/dict/updateDataList', body)
