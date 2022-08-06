<template>
  <el-descriptions title="服务器状态" :column="3" size="medium " border>
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
