import request from '@/utils/request'
//Object分页
export default function getMonitorObjectPageList(index,size) {
  return request({
    url: '/api/MonitorObject/PageList',
    method: 'get',
    params: {index,size}
  })
}


