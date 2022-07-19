import request from '@/utils/request'
// 分页列表
export  function getStatusPageList(index,size) {
  return request({
    url: '/api/OpdictStatus/PageList',
    method: 'get',
    params: {index,size}
  })
}
// 查询分页
export  function getStatusFindStatusId(StatusId,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {StatusId,index,size}
  })
}
export  function getObjectFindSystemName(SystemName,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {SystemName,index,size}
  })
}
export  function getObjectFindModuleName(ModuleName,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {ModuleName,index,size}
  })
}
export  function getObjectFindObjectName(ObjectName,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {ObjectName,index,size}
  })
}
export  function getObjectFindCategory(Category,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {Category,Item,Type,index,size}
  })
}
export  function getObjectFindItem(Item,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {Item,index,size}
  })
}
export  function getObjectFindType(Type,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {Type,index,size}
  })
}
// 删除
export  function getStatusDelete(objectId) {
  return request({
    url: '/api/OpDictStatus/Delete/',
    method: 'post',
    params: {objectId}
  })
}
// 新增
export  function getStatusCreate(data) {
  return request({
    url: '/api/OpDictStatus/Create',
    method: 'post',
    data
  })
}
