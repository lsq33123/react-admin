/** @format */
import dayjs from "dayjs"
//格式化请求接口的参数
/*
  tableParams : {
    sorter: {"column":{"title":"访客数","dataIndex":"visitorCount","align":"center"},"order":"ascend","field":"visitorCount"},
    filters: {},
    pageSize: 20,
    current: 1
  }

  params 为用户请求参数
  */
export const formatParams = (tableParams, params) => {
  let sortType
  if (tableParams?.sorter) {
    if (!tableParams.sorter.order) {
      sortType = null
    } else if (tableParams.sorter.order === 'ascend') {
      sortType = '0'
    } else if (tableParams.sorter.order === 'descend') {
      sortType = '1'
    }
  }
  if (params.time && Array.isArray(params.time)) {
    // 去掉日期范围的time 否则接口调用可能有问题
    delete params.time
  }
  if (sortType === '0' || sortType === '1') {
    return {
      ...tableParams, //可删除  留作参考
      ...params,
      sort: sortType,
      sortField: tableParams?.sorter?.field,
      page: tableParams?.current,
      pageSize: tableParams?.pageSize,
    }
  } else {
    return {
      ...tableParams, //可删除  留作参考
      ...params,
      page: tableParams?.current,
      pageSize: tableParams?.pageSize,
    }
  }
}

//form设置日期范围
export const setFormDateRange = (dateStrings, form, startField: string, endField: string) => {
  form.setFieldsValue({
    [startField]: dateStrings[0] ? dateStrings[0] + ' 00:00:00' : '',
    [endField]: dateStrings[1] ? dateStrings[1] + ' 23:59:59' : '',
  })
}
// //form设置日期范围
// export const setFormDateRange2 = (form, dateKey: string, startField: string, endField: string) => {
//   if (!dateKey) {
//     return
//   } else if (form[dateKey] instanceof Array) {
//     let date0 = dayjs(form[dateKey][0]).format('YYYY-MM-DD')
//     let date1 = dayjs(form[dateKey][1]).format('YYYY-MM-DD')
//     form.setFieldsValue({
//       [startField]: date0 + ' 00:00:00',
//       [endField]: date1 + ' 23:59:59',
//     })
//   } else {
//     form.setFieldValue(startField, dayjs(form[dateKey]).format('YYYY-MM-DD') + ' 00:00:00')
//   }
// }
