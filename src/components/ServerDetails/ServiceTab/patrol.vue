<template>
  <el-descriptions class="margin-top" title="巡更巡检服务信息" :column="2" size="medium " border>
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
        数据库类型
      </template>
      {{form.dbType}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库IP
      </template>
      {{form.dbIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库端口
      </template>
      {{form.dbPort}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库用户名
      </template>
      {{form.dbUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库密码
      </template>
      {{form.dbPwd}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        版本信息
      </template>
      {{form.version}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权方式
      </template>
      {{form.authorize}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权时间
      </template>
      {{form.authorizeTime}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权状态
      </template>
      {{form.authorizeStatus}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权数目
      </template>
      {{form.authorizeNum}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权人员
      </template>
      {{form.authorizePerson}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        公司备注信息
      </template>
      {{form.note}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import { getOpsvPatrolByService } from '@/api/serverLedger'
  export default {
    name: "patrol",
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
            getOpsvPatrolByService(this.serviceId).then(request => {
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
