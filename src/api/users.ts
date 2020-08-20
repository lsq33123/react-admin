/** @format */

import {request} from '@/utils/request'
import {HttpResponse} from '@/interface'
// 获取用户列表
export const getUersList = (params): HttpResponse<any> => request.get('/users/getUsersList', {params})
