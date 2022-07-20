import request from '@/utils/request'
//****************************************Object****************************************
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




//****************************************Opcid****************************************
//Opcid分页
export  function getOpcidPageList(index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {index,size}
  })
}
export  function getOpcidCreate(data) {
  return request({
    url: '/api/OpEventCid/Create',
    method: 'post',
    data
  })
}
export  function getOpcidTypeList() {
  return request({
    url: '/api/OpEventCid/TypeList',
    method: 'get',
  })
}
export  function getOpcidDelete(objectId) {
  return request({
    url: '/api/OpEventCid/Delete',
    method: 'post',
    params:{objectId}
  })
}
export  function getOpcidUpdate(data) {
  return request({
    url: '/api/OpEventCid/Update',
    method: 'post',
    data
  })
}
//Opcid查找
export  function getOpcidFindOpcid(Opcid,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {Opcid,index,size}
  })
}
export  function getOpcidFindOpcidName(OpcidName,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {OpcidName,index,size}
  })
}
export  function getOpcidFindSystemId(SystemId,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {SystemId,index,size}
  })
}
export  function getOpcidFindType(Type,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {Type,index,size}
  })
}
export  function getOpcidFindOpsignalId(OpsignalId,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {OpsignalId,index,size}
  })
}
export  function getOpcidFindEventType(EventType,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {EventType,index,size}
  })
}
export  function getOpcidFindThreshold(Threshold,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {Threshold,index,size}
  })
}
export  function getOpcidFindLevel(Level,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {Level,index,size}
  })
}
export  function getOpcidFindNote(Note,index,size) {
  return request({
    url: '/api/OpEventCid/PageList',
    method: 'get',
    params: {Note,index,size}
  })
}






//****************************************Service****************************************
//Service分页
export  function getOpDictServicePageList(index,size) {
  return request({
    url: '/api/OpDictService/PageList',
    method: 'get',
    params: {index,size}
  })
}
//Service新增
export  function getOpDictServiceCreate(data) {
  return request({
    url: '/api/OpDictService/Create',
    method: 'post',
    data
  })
}
//Service查找
export  function getOpDictServiceFindServiceType(ServiceType,index,size) {
  return request({
    url: '/api/OpDictService/PageList',
    method: 'get',
    params: {ServiceType,index,size}
  })
}
export  function getOpDictServiceFindServiceName(ServiceName,index,size) {
  return request({
    url: '/api/OpDictService/PageList',
    method: 'get',
    params: {ServiceName,index,size}
  })
}
export  function getOpDictServiceFindServiceTable(ServiceTable,index,size) {
  return request({
    url: '/api/OpDictService/PageList',
    method: 'get',
    params: {ServiceTable,index,size}
  })
}
export  function getOpDictServiceFindNote(Note,index,size) {
  return request({
    url: '/api/OpDictService/PageList',
    method: 'get',
    params: {Note,index,size}
  })
}
export  function getOpDictServiceDelete(objectId) {
  return request({
    url: '/api/OpDictService/Delete',
    method: 'post',
    params: {objectId}
  })
}
export  function getOpDictServiceUpdate(data) {
  return request({
    url: '/api/OpDictService/Update',
    method: 'post',
    data
  })
}



//****************************************Signal****************************************
//Signal分页
export  function getOpDictSignalPageList(index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {index,size}
  })
}
//Signal查询
export  function getOpDictSignalFindopsignalId(opsignalId,index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {opsignalId,index,size}
  })
}
export  function getOpDictSignalFindopsignalName(opsignalName,index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {opsignalName,index,size}
  })
}
export  function getOpDictSignalFindparaType(paraType,index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {paraType,index,size}
  })
}
export  function getOpDictSignalFindpara(para,index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {para,index,size}
  })
}
export  function getOpDictSignalFindnote(note,index,size) {
  return request({
    url: '/api/OpDictSignal/PageList',
    method: 'get',
    params: {note,index,size}
  })
}
//Signal新增
export  function getOpDictSignalCreate(body) {
  return request({
    url: '/api/OpDictSignal/Create',
    method: 'post',
    data:body
  })
}
//Signal删除
export  function getOpDictSignalDelete(objectId) {
  return request({
    url: '/api/OpDictSignal/Delete',
    method: 'post',
    params: {objectId}
  })
}
//Signal更新
export  function getOpDictSignalUpdate(data) {
  return request({
    url: '/api/OpDictSignal/Update',
    method: 'post',
    data
  })
}









//****************************************Status****************************************
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
