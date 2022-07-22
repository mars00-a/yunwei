import request from '@/utils/request'

// 服务器分页
export  function getServicePageList(index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {index,size}
  })
}
// 服务器查询分页
export  function getServiceFindServiceId(ServiceId,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceId,index,size}
  })
}
export  function getServiceFindServiceType(ServiceType,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceType,index,size}
  })
}
export  function getServiceFindServiceName(ServiceName,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceName,index,size}
  })
}
export  function getServiceFindServerId(ServerId,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServerId,index,size}
  })
}
// 删除export
export function getServiceDelete(objectId) {
  return request({
    url: '/api/OpServices/Delete',
    method: 'post',
    params:{objectId}
  })
}
// 获取所有用户列表
export function getAllCustomer() {
  return request({
    url: '/api/OpCustomer/All',
    method: 'get',
  })
}
