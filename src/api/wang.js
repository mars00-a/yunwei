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
// 删除事件
export  function getOpUserServerEventDelete(receiveId,serverId,data) {
  return request({
    url: '/api/OpUserServerEvent/Delete',
    method: 'post',
    params:{receiveId,serverId,data}
  })
}
// 新增事件
export  function getOpUserServerEventCreate(receiveId,serverId,data) {
  return request({
    url: '/api/OpUserServerEvent/Create',
    method: 'post',
    params:{receiveId,serverId,data}
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
