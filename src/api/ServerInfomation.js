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




export function getAuthServerHardStatusHardStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'api/AuthServerHardStatus/HardStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getAuthServerHardStatusCpuStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/AuthServerHardStatus/CpuStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getAuthServerHardStatusMemoryStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/AuthServerHardStatus/MemoryStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}
export function getAuthServerHardStatusDiskStatusPageList(serverIp,serverName,index,size) {
  return request({
    url:'/api/AuthServerHardStatus/DiskStatusPageList',
    method: 'get',
    params: {serverIp,serverName,index,size}
  })
}

