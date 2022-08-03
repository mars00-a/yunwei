<template>
  <el-descriptions class="margin-top" title="APP服务信息" :column="2" size="medium " border>
    <el-descriptions-item>
      <template slot="label">
        服务实例ID
      </template>
      {{form.serviceId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务名称
      </template>
      {{form.serviceName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        安装的服务器ID
      </template>
      {{form.serverId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        域名
      </template>
      {{form.url}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务IP
      </template>
      {{form.serviceIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务端口
      </template>
      {{form.servicePort}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库IP
      </template>
      {{form.mysqlIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库端口
      </template>
      {{form.mysqlPort}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库用户名
      </template>
      {{form.mysqlUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库密码
      </template>
      {{form.mysqlPwd}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import {getOpsvAppByService} from '@/api/serverLedger'
  export default {
    name: "a-p-p",
    data() {
      return {
        serviceId: '',
        form: {}
      }
    },
    props:{
      myRow:Object
    },
    watch:{
      'myRow':{
        immediate:true,
        handler(val){
          if(val){
            this.serviceId = val.serviceId;
            getOpsvAppByService(this.serviceId).then(request => {
              this.form = request.data.body
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
