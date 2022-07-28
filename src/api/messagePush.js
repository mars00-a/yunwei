import request from '@/utils/request'
export  function getOpCustomerPageList(index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {index,size}
  })
}
