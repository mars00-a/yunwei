import request from '@/utils/request'

export function getServerHardStatus(serverIp,serverName,index,size) {
  return request({
    url:'/api/ServerHardStatus/HardStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}

