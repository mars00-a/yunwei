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
export  function getObjectFind(ObjectId,SystemName,ModuleName,index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {index,size}
  })
}

