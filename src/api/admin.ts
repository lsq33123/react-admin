/** @format */

import {request} from '@/utils/request'
import {HttpResponse} from '@/interface'

//获取token
export const getToken = (body): HttpResponse<any> => request.post('/token/login', body)
