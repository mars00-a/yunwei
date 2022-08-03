<template>
  <el-descriptions class="margin-top" title="微信服务信息" :column="2" size="small " border>
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
        中心ID
      </template>
      {{form.centerId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        域名
      </template>
      {{form.domain}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        FTP/IP
      </template>
      {{form.ftpIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        FTP/UserName
      </template>
      {{form.ftpUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        FTP/Password
      </template>
      {{form.ftpPwd}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        微信公众号用户名
      </template>
      {{form.wxUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        微信公众号密码
      </template>
      {{form.wxPwd}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权密钥
      </template>
      {{form.wxAuthkey}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        Appid
      </template>
      {{form.wxAppid}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        AppSecret
      </template>
      {{form.wxAppsecret}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务器固定IP
      </template>
      {{form.serverIp}}
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
        公司备注信息
      </template>
      {{form.note}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import { getOpsvWeixinByService } from '@/api/serverLedger'
  export default {
    name: "weixin",
    data() {
      return {
        serviceId: '',
        form: {}
      }
    },
    mounted() {
      this.serviceId = ''
      getOpsvWeixinByService(this.serviceId).then(request => {

      })
    }
  }
</script>

<style scoped>

</style>
