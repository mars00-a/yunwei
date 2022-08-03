<template>
  <el-descriptions class="margin-top" title="第三方短信网关服务信息" :column="1" size="medium " border>
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
        http地址
      </template>
      {{form.http}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        账号
      </template>
      {{form.user}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        密码
      </template>
      {{form.pwd}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import { getOpsvOtherSmsByService } from '@/api/serverLedger'
  export default {
    name: "other-s-m-s",
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
            getOpsvOtherSmsByService(this.serviceId).then(request => {
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
