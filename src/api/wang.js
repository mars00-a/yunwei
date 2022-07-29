import request from '@/utils/request'

// 获取未绑定的服务的列表
export  function getOpUserServerEventUnBindList(receiveId,serverId,index,size) {
  return request({
    url: '/api/OpUserServerEvent/UnBindList',
    method: 'get',
    params:{receiveId,serverId,index,size}
  })
}
