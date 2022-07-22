import request from '@/utils/request'
//****************************************Customer****************************************
//Customer分页
export  function getOpCustomerPageList(index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {index,size}
  })
}
//Customer过滤
export  function getOpCustomerFindCustomerId(CustomerId,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {CustomerId,index,size}
  })
}
export  function getOpCustomerFindAreaManager(AreaManager,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {AreaManager,index,size}
  })
}
export  function getOpCustomerFindCompany(Company,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {Company,index,size}
  })
}
export  function getOpCustomerFindContact(Contact,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {Contact,index,size}
  })
}
export  function getOpCustomerFindContactPhone(ContactPhone,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {ContactPhone,index,size}
  })
}
export  function getOpCustomerFindRevisitTime(RevisitTime,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {RevisitTime,index,size}
  })
}
export  function getOpCustomerFindAddress(Address,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {Address,index,size}
  })
}
export  function getOpCustomerFindNote(Note,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {Note,index,size}
  })
}
export  function getOpCustomerFindAreaManagerId(AreaManagerId,index,size) {
  return request({
    url: '/api/OpCustomer/PageList',
    method: 'get',
    params: {AreaManagerId,index,size}
  })
}
//Customer获取客户经理ID
export  function getOpCustomerAreaManagerList() {
  return request({
    url: '/api/OpCustomer/AreaManagerList',
    method: 'get',
  })
}
//Customer新增
export  function getOpCustomerCreate(data) {
  return request({
    url: '/api/OpCustomer/Create',
    method: 'post',
    data
  })
}
//Customer修改
export  function getOpCustomerUpdate(data) {
  return request({
    url: '/api/OpCustomer/Update',
    method: 'post',
    data
  })
}
//Customer删除
export  function getOpCustomerDelete(customerId) {
  return request({
    url: '/api/OpCustomer/Delete',
    method: 'post',
    params:{customerId}
  })
}


//****************************************客户服务器相关接口****************************************
export  function getOpCustomerServerByCustomer(customerId) {
  return request({
    url: '/api/OpCustomerServer/ByCustomer',
    method: 'get',
    params:{customerId}
  })
}
export  function getOpCustomerServerDelete(customerId,serverId) {
  return request({
    url: '/api/OpCustomerServer/Delete',
    method: 'post',
    params:{customerId,serverId}
  })
}
export  function getOpCustomerServerCreate(body) {
  return request({
    url: '/api/OpCustomerServer/Create',
    method: 'post',
    body
  })
}







//****************************************Server****************************************
//Server分页
export  function getOpServerPageList(index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {index,size}
  })
}
//Server过滤
export  function getOpServerFindServerId(ServerId,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {ServerId,index,size}
  })
}
export  function getOpServerFindServerName(ServerName,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {ServerName,index,size}
  })
}
export  function getOpServerFindServerIp(ServerIp,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {ServerIp,index,size}
  })
}
export  function getOpServerFindServerPort(ServerPort,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {ServerPort,index,size}
  })
}
export  function getOpServerFindMonitored(Monitored,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {Monitored,index,size}
  })
}
export  function getOpServerFindControlled(Controlled,index,size) {
  return request({
    url: '/api/OpServer/PageList',
    method: 'get',
    params: {Controlled,index,size}
  })
}


















