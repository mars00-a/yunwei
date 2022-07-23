import request from '@/utils/request'




// *************************服务器相关*****************************
// 删除
export  function getOpServerDelete(objectId) {
  return request({
    url: '/api/OpServer/Delete',
    method: 'post',
    params: {objectId}
  })
}
// ***********************客户相关**************************
// 获取所有客户列表
export  function getAllCustomerInfos() {
  return request({
    url: '/api/OpCustomer/All',
    method: 'post',
  })
}
