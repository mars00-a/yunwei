<template>
  <el-descriptions class="margin-top" title="语音服务信息" :column="1" size="medium " border>
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
        2030设备GUID
      </template>
      {{form._2030Guid}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        手机卡号
      </template>
      {{form.phoneNum}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        通道号
      </template>
      {{form.channelNum}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import { getOpsv2030NvsByService } from '@/api/serverLedger'
  export default {
    name: "2030-n-v-s",
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
            getOpsv2030NvsByService(this.serviceId).then(request => {
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
