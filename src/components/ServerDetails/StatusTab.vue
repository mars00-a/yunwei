<template>
  <el-descriptions class="margin-top" title="服务器状态" :column="3" size="medium " border>
    <el-descriptions-item span="1.5">
      <template slot="label">
        服务器名称
      </template>
      {{ this.myRow.serverName }}
    </el-descriptions-item>
    <el-descriptions-item span="1.5">
      <template slot="label">
        服务器IP
      </template>
      {{ this.myRow.serverIp }}
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template slot="label">
        服务器是否联通
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template slot="label">
        软件状态情况
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="1.5">
      <template slot="label">
        报警总数
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="1.5">
      <template slot="label">
        接收消息人数
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="1.5">
      <template slot="label">
        主机离线/总数
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="1.5">
      <template slot="label">
        DVR离线/总数
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template slot="label">
        客户端数
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item span="3">
      <template slot="label">
        数据时间
      </template>
      kooriookami
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  export default {
      name: "status-tab",
    data(){
        return{

        }
    },
    props:{
      myRow:Object
    },
  }
</script>

<style scoped>

</style>
