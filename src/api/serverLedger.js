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
//获取所有客户信息
export  function getOpCustomerAll() {
  return request({
    url: '/api/OpCustomer/All',
    method: 'grr',
  })
}





//****************************************客户服务器相关接口****************************************
//通过客户ID查找客户拥有的服务器
export  function getOpCustomerServerByCustomer(customerId) {
  return request({
    url: '/api/OpCustomerServer/ByCustomer',
    method: 'get',
    params:{customerId}
  })
}
//通过服务器ID寻找服务器所属的用户
export  function getOpCustomerServerByServer(serverId) {
  return request({
    url: '/api/OpCustomerServer/ByServer',
    method: 'get',
    params:{serverId}
  })
}
export  function getOpCustomerServerDelete(customerId,serverId) {
  return request({
    url: '/api/OpCustomerServer/Delete',
    method: 'post',
    params:{customerId,serverId}
  })
}
export  function getOpCustomerServerCreate(data) {
  return request({
    url: '/api/OpCustomerServer/Create',
    method: 'post',
    data
  })
}
//获取未绑定服务器列表
export  function getOpServerUnBindList() {
  return request({
    url: '/api/OpServer/UnBindList',
    method: 'get',
  })
}





//****************************************客户服务相关接口****************************************
export  function getOpCustomerServicesByCustomer(customerId) {
  return request({
    url: '/api/OpCustomerServices/ByCustomer',
    method: 'get',
    params:{customerId}
  })
}
export  function OpCustomerServicesCreate(data) {
  return request({
    url: '/api/OpCustomerServices/Create',
    method: 'post',
    data
  })
}
export  function getOpCustomerServicesDelete(customerId,serviceId) {
  return request({
    url: '/api/OpCustomerServices/Delete',
    method: 'post',
    params:{customerId,serviceId}
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
export  function getOpServerCreate(data) {
  return request({
    url: '/api/OpServer/Create',
    method: 'post',
    data
  })
}
export  function getOpServerUpdate(data) {
  return request({
    url: '/api/OpServer/Update',
    method: 'post',
    data
  })
}
//获取服务器登录列表
export function getOpServerLoginByServerId(serverId) {
  return request({
    url:'/api/OpServerLogin/ByServerId',
    method:'get',
    params:{serverId}
  })
}
//新增服务器登录信息
export function getOpServerLoginCreate(data) {
  return request({
    url:'/api/OpServerLogin/Create',
    method:'post',
    data
  })
}
//删除务器登录信息
export function getOpServerLoginDelete(serverId,loginSoft) {
  return request({
    url:'/api/OpServerLogin/Delete',
    method:'post',
    params:{serverId,loginSoft}
  })
}







//****************************************Service****************************************
// 服务分页
export  function getServicePageList(index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {index,size}
  })
}
// 服务查询分页
export  function getServiceFindServiceId(ServiceId,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceId,index,size}
  })
}
export  function getServiceFindServiceType(ServiceType,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceType,index,size}
  })
}
export  function getServiceFindServiceName(ServiceName,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServiceName,index,size}
  })
}
export  function getServiceFindServerId(ServerId,index,size) {
  return request({
    url: '/api/OpServices/PageList',
    method: 'get',
    params: {ServerId,index,size}
  })
}
// 删除export
export function getServiceDelete(objectId) {
  return request({
    url: '/api/OpServices/Delete',
    method: 'post',
    params:{objectId}
  })
}
// 获取所有用户列表
export function getAllCustomer() {
  return request({
    url: '/api/OpCustomer/All',
    method: 'get',
  })
}






// *******************************服务相关
// 新增
export function getOpServiceCreate(data) {
  return request({
    url: '/api/OpServices/Create',
    method: 'post',
    data
  })
}
// 修改
export function getOpServiceUpdate(data) {
  return request({
    url: '/api/OpServices/Update',
    method: 'post',
    data
  })
}

// *************************服务器相关*****************************
// 删除
export  function getOpServerDelete(objectId) {
  return request({
    url: '/api/OpServer/Delete',
    method: 'post',
    params: {objectId}
  })
}
// ***********************客户相关**************************
// 获取所有客户列表
export  function getAllCustomerInfos() {
  return request({
    url: '/api/OpCustomer/All',
    method: 'get',
  })
}
// 通过服务id查找使用服务的客户
export  function getOpCustomerByService(serviceId) {
  return request({
    url: '/api/OpCustomerServices/ByService',
    method: 'get',
    params: {serviceId}
  })
}
// 创建关联
export  function getOpCustomerServicesCreate(data) {
  return request({
    url: '/api/OpCustomerServices/Create',
    method: 'post',
    data
  })
}

// ***********************************九种类型服务的创建
export  function getOpsvSecurityCreate(data) {
  return request({
    url: '/api/OpsvSecurity/Create',
    method: 'post',
    data
  })
}
export  function getOpsv2030NvsCreate(data) {
  return request({
    url: '/api/Opsv2030Nvs/Create',
    method: 'post',
    data
  })
}
export  function getOpsvAppCreate(data) {
  return request({
    url: '/api/OpsvApp/Create',
    method: 'post',
    data
  })
}
export  function getOpsvOtherSmsCreate(data) {
  return request({
    url: '/api/OpsvOtherSms/Create',
    method: 'post',
    data
  })
}
export  function getOpsvOtherVsCreate(data) {
  return request({
    url: '/api/OpsvOtherVs/Create',
    method: 'post',
    data
  })
}
export  function getOpsvPatrolCreate(data) {
  return request({
    url: '/api/OpsvPatrol/Create',
    method: 'post',
    data
  })
}
export  function getOpsvSmartHomeCreate(data) {
  return request({
    url: '/api/OpsvSmartHome/Create',
    method: 'post',
    data
  })
}
export  function getOpsvSmsCreate(data) {
  return request({
    url: '/api/OpsvSms/Create',
    method: 'post',
    data
  })
}
export  function getOpsvWeixinCreate(data) {
  return request({
    url: '/api/OpsvWeixin/Create',
    method: 'post',
    data
  })
}
// ***********************************九种类型服务的更新
export  function getOpsvSecurityUpdate(data) {
  return request({
    url: '/api/OpsvSecurity/Update',
    method: 'post',
    data
  })
}
export  function getOpsv2030NvsUpdate(data) {
  return request({
    url: '/api/Opsv2030Nvs/Update',
    method: 'post',
    data
  })
}
export  function getOpsvAppUpdate(data) {
  return request({
    url: '/api/OpsvApp/Update',
    method: 'post',
    data
  })
}
export  function getOpsvOtherSmsUpdate(data) {
  return request({
    url: '/api/OpsvOtherSms/Update',
    method: 'post',
    data
  })
}
export  function getOpsvOtherVsUpdate(data) {
  return request({
    url: '/api/OpsvOtherVs/Update',
    method: 'post',
    data
  })
}
export  function getOpsvPatrolUpdate(data) {
  return request({
    url: '/api/OpsvPatrol/Update',
    method: 'post',
    data
  })
}
export  function getOpsvSmartHomeUpdate(data) {
  return request({
    url: '/api/OpsvSmartHome/Update',
    method: 'post',
    data
  })
}
export  function getOpsvSmsUpdate(data) {
  return request({
    url: '/api/OpsvSms/Update',
    method: 'post',
    data
  })
}
export  function getOpsvWeixinUpdate(data) {
  return request({
    url: '/api/OpsvWeixin/Update',
    method: 'post',
    data
  })
}
// *************************************&&********九种表的删除
export  function getOpsvSecurityDelete(serviceId) {
  return request({
    url: '/api/OpsvSecurity/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsv2030NvsDelete(serviceId) {
  return request({
    url: '/api/Opsv2030Nvs/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvAppDelete(serviceId) {
  return request({
    url: '/api/OpsvApp/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvOtherSmsDelete(serviceId) {
  return request({
    url: '/api/OpsvOtherSms/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvOtherVsDelete(serviceId) {
  return request({
    url: '/api/OpsvOtherVs/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvPatrolDelete(serviceId) {
  return request({
    url: '/api/OpsvPatrol/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvSmartHomeDelete(serviceId) {
  return request({
    url: '/api/OpsvSmartHome/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvSmsDelete(serviceId) {
  return request({
    url: '/api/OpsvSms/Delete',
    method: 'post',
    params: {serviceId}
  })
}
export  function getOpsvWeixinDelete(serviceId) {
  return request({
    url: '/api/OpsvWeixin/Delete',
    method: 'post',
    params: {serviceId}
  })
}
// ***************************九种表的获取指定id的信息
export  function getOpsvSecurityByService(serviceId) {
  return request({
    url: '/api/OpsvSecurity/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsv2030NvsByService(serviceId) {
  return request({
    url: '/api/Opsv2030Nvs/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvAppByService(serviceId) {
  return request({
    url: '/api/OpsvApp/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvOtherSmsByService(serviceId) {
  return request({
    url: '/api/OpsvOtherSms/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvOtherVsByService(serviceId) {
  return request({
    url: '/api/OpsvOtherVs/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvPatrolByService(serviceId) {
  return request({
    url: '/api/OpsvPatrol/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvSmartHomeByService(serviceId) {
  return request({
    url: '/api/OpsvSmartHome/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvSmsByService(serviceId) {
  return request({
    url: '/api/OpsvSms/ByService',
    method: 'get',
    params: {serviceId}
  })
}
export  function getOpsvWeixinByService(serviceId) {
  return request({
    url: '/api/OpsvWeixin/ByService',
    method: 'get',
    params: {serviceId}
  })
}


