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
//编辑
export  function getOpUserReveiceUpdate(data) {
  return request({
    url: '/api/OpUserReveice/Update',
    method: 'post',
    data
  })
}
//删除
export  function getOpUserReveiceDelete(receiveId) {
  return request({
    url: '/api/OpUserReveice/Delete',
    method: 'post',
    params:{receiveId}
  })
}






//获取未绑定的服务器
export  function getOpUserServerReceiveUnBindList(receiveId) {
  return request({
    url: '/api/OpUserServerReceive/UnBindList',
    method: 'post',
    params:{receiveId}
  })
}




//************************用户日志相关接口
//获取记录分页
export  function getUserEventLogPageList(index,size) {
  return request({
    url: '/api/UserEventLog/PageList',
    method: 'get',
    params: {index,size}
  })
}
//分页查找
export  function getUserEventLogFind(index,size) {
  return request({
    url: '/api/UserEventLog/PageList',
    method: 'get',
    params: {index,size}
  })
}
