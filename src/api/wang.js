import request from '@/utils/request'
//********************************** 事件相关 **************************************************
// 获取未绑定的服务的列表
export  function getOpUserServerEventUnBindList(receiveId,serverId,index,size) {
  return request({
    url: '/api/OpUserServerEvent/UnBindList',
    method: 'get',
    params:{receiveId,serverId,index,size}
  })
}
// 获取已绑定的事件列表
export  function getOpUserServerEventPageList(receiveId,serverId,index,size) {
  return request({
    url: '/api/OpUserServerEvent/PageList',
    method: 'get',
    params:{receiveId,serverId,index,size}
  })
}
// 删除事件
export  function getOpUserServerEventDelete(receiveId,serverId,data) {
  return request({
    url: '/api/OpUserServerEvent/Delete',
    method: 'post',
    params:{receiveId,serverId},
    data
  })
}
// 新增事件
export  function getOpUserServerEventCreate(receiveId,serverId,data) {
  return request({
    url: '/api/OpUserServerEvent/Create',
    method: 'post',
    params:{receiveId,serverId},
    data
  })
}
//**************************************** 服务器相关 *************************************************
// 获取未绑定的服务器的列表
export  function getOpUserServerReceivePageList(receiveId,index,size) {
  return request({
    url: '/api/OpUserServerReceive/PageList',
    method: 'get',
    params:{receiveId,index,size}
  })
}
// 删除服务器
export  function getOpUserServerReceiveDelete(receiveId,serverId) {
  return request({
    url: '/api/OpUserServerReceive/Delete',
    method: 'post',
    params:{receiveId,serverId}
  })
}
// 修改服务器
export  function getOpUserServerReceiveUpdate(data) {
  return request({
    url: '/api/OpUserServerReceive/Update',
    method: 'post',
    data
  })
}

// 绑定服务器
export  function getOpUserServerReceiveCreate(data) {
  return request({
    url: '/api/OpUserServerReceive/Create',
    method: 'post',
    data
  })
}

// 更新服务器事件的阈值等级信息

export  function getOpUserServerEventUpdateThreshold(serverId,opcid,threshold,level) {
  return request({
    url: '/api/OpUserServerEvent/UpdateThreshold',
    method: 'post',
    params:{serverId,opcid,threshold,level}
  })
}
// 获取服务器事件的阈值
export  function getOpEventCidByServerId(serverId) {
  return request({
    url: '/api/OpEventCid/ByServerId',
    method: 'get',
    params:{serverId}
  })
}
