<template>
  <el-descriptions class="margin-top" title="短信网关服务信息" :column="1" size="medium " border>
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
        节点ID
      </template>
      {{form.nodeId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        用户名
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
  import { getOpsvSmsByService } from '@/api/serverLedger'
  export default {
    name: "s-m-s",
    data() {
      return {
        serviceId: '',
        form: {}
      }
    },
    mounted() {
      this.serviceId = ''
      getOpsvSmsByService(this.serviceId).then(request => {

      })
    }
  }
</script>

<style scoped>

</style>
