<template>
  <el-descriptions class="margin-top" title="智慧用电服务信息" :column="2" size="small " border>
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
        版本信息
      </template>
      {{form.version}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        小程序版本
      </template>
      {{form.appVersion}}
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
    <el-descriptions-item>
      <template slot="label">
        数据库IP
      </template>
      {{form.influxdbIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库端口
      </template>
      {{form.influxdbPort}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库用户名
      </template>
      {{form.influxdbUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库密码
      </template>
      {{form.influxdbPwd}}
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
        备注
      </template>
      {{form.note}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import { getOpsvSmartHomeByService } from '@/api/serverLedger'
  export default {
    name: "smarthome",
    data(){
      return{
        serviceId: '',
        form: {}
      }
    },
    mounted() {
      this.serviceId = ''
      getOpsvSmartHomeByService(this.serviceId).then(request => {

      })
    }
  }
</script>

<style scoped>

</style>
