import request from '@/utils/request'
//Object分页
export  function getObjectPageList(index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {index,size}
  })
}
//Object所属系统下拉框
export  function getObjectSystemList() {
  return request({
    url: '/api/MonitorObject/SystemList',
    method: 'get',
    params: {}
  })
}
//Object所属模块下拉框
export  function getObjectModuleList() {
  return request({
    url: '/api/MonitorObject/ModuleList',
    method: 'get',
    params: {}
  })
}
//Object监测对象下拉框
export  function getObjectCategoryList() {
  return request({
    url: '/api/MonitorObject/CategoryList',
    method: 'get',
    params: {}
  })
}
//Object创建新的数据
export  function getObjectCreate(data) {
  return request({
    url: '/api/MonitorObject/Create',
    method: 'post',
    data
  })
}
//Object删除数据
export  function getObjectDelete(objectId) {
  return request({
    url: '/api/MonitorObject/Delete/',
    method: 'post',
    params: {objectId}
  })
}
//Object更新新的数据
export  function getObjectUpdate(data) {
  return request({
    url: '/api/MonitorObject/Update/',
    method: 'post',
    data
  })
}
//Object查找
export  function getObjectFindObjectId(ObjectId,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {ObjectId,index,size}
  })
}
export  function getObjectFindSystemName(SystemName,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {SystemName,index,size}
  })
}
export  function getObjectFindModuleName(ModuleName,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {ModuleName,index,size}
  })
}
export  function getObjectFindObjectName(ObjectName,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {ObjectName,index,size}
  })
}
export  function getObjectFindCategory(Category,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {Category,Item,Type,index,size}
  })
}
export  function getObjectFindItem(Item,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {Item,index,size}
  })
}
export  function getObjectFindType(Type,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {Type,index,size}
  })
}

