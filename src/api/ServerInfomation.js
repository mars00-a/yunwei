import request from '@/utils/request'

export function getServerHardStatus(serverIp,serverName,index,size) {
  return request({
    url:'/api/ServerHardStatus/HardStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getCpuStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/ServerHardStatus/CpuStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getDiskStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/ServerHardStatus/DiskStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getMemoryStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/ServerHardStatus/MemoryStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}

