import request from '@/utils/request'
//分页查询
export  function getOpUserReveicePageList(index,size) {
  return request({
    url: '/api/OpUserReveice/PageList',
    method: 'get',
    params: {index,size}
  })
}
export  function getOpUserReveiceFindUserName(userName,index,size) {
  return request({
    url: '/api/OpUserReveice/PageList',
    method: 'get',
    params: {userName,index,size}
  })
}
export  function getOpUserReveiceFindReceiveId(receiveId,index,size) {
  return request({
    url: '/api/OpUserReveice/PageList',
    method: 'get',
    params: {receiveId,index,size}
  })
}
export  function getOpUserReveiceFindReceiveType(receiveType,index,size) {
  return request({
    url: '/api/OpUserReveice/PageList',
    method: 'get',
    params: {receiveType,index,size}
  })
}
export  function getOpUserReveiceFindReceiveAccount(receiveAccount,index,size) {
  return request({
    url: '/api/OpUserReveice/PageList',
    method: 'get',
    params: {receiveAccount,index,size}
  })
}
//新增
export  function getOpUserReveiceCreate(data) {
  return request({
    url: '/api/OpUserReveice/Create',
    method: 'post',
    data
  })
}
//获取所有用户列表
export  function getOpUserReveiceUserList() {
  return request({
    url: '/api/OpUserReveice/UserList',
    method: 'get',
  })
}
