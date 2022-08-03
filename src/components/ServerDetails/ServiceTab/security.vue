<template>
  <el-descriptions class="margin-top" title="安防服务信息" :column="2" size="small " border>
    <el-descriptions-item>
      <template slot="label">
        服务实例ID
      </template>
      {{form.serviceId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库密码
      </template>
      {{form.dbPwd}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权数目
      </template>
      {{form.authorizeNum}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务名称
      </template>
      {{form.serviceName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        软件名称
      </template>
      {{form.software}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权人员
      </template>
      {{form.authorizePerson}}
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
        客户数量
      </template>
      {{form.clientNum}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库类型
      </template>
      {{form.dbType}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权方式
      </template>
      {{form.authorize}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        是否巡检
      </template>
      {{form.ispatrol}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库IP
      </template>
      {{form.dbIp}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权时间
      </template>
      {{form.authorizeTime}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        是否永久授权
      </template>
      {{form.isPermanentAuthorize}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库端口
      </template>
      {{form.dbPort}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权状态
      </template>
      {{form.authorizeStatus}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        备注
      </template>
      {{form.note}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库名称
      </template>
      {{form.dbUser}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        过期时间
      </template>
      {{form.expireDate}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { getOpsvSecurityByService } from '@/api/serverLedger'
export default {
  name: 'Security',
  data() {
    return {
      serviceId: '',
      form: {}
    }
  },
  mounted() {
    this.serviceId = ''
    getOpsvSecurityByService(this.serviceId).then(request => {

    })
  }
}
</script>

<style scoped>

</style>
