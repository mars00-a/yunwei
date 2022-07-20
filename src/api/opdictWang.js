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
export  function getStatusFindStatusName(statusName,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {statusName,index,size}
  })
}
export  function getStatusFindOpsignalId(opsignalId,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {opsignalId,index,size}
  })
}
export  function getStatusFindUpthres(upthres,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {upthres,index,size}
  })
}
export  function getStatusFindDownthres(downthres,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {downthres,index,size}
    // params: {Category,Item,Type,index,size}
  })
}
export  function getStatusFindLevel(level,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {level,index,size}
  })
}
export  function getStatusFindNote(note,index,size) {
  return request({
    url: '/api/OpDictStatus/PageList',
    method: 'get',
    params: {note,index,size}
  })
}
// 删除
export  function getStatusDelete(objectId) {
  return request({
    url: '/api/OpDictStatus/Delete',
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
// 更新
export  function getStatusUpdate(data) {
  return request({
    url: '/api/OpDictStatus/Update/',
    method: 'post',
    data
  })
}
