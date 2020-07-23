/** @format */

export type HttpResponse<T> = Promise<{
  code: number
  msg: string
  timestamp: number
  data: T
}>
