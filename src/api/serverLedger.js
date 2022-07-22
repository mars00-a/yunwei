import request from '@/utils/request'
//****************************************Object****************************************
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
