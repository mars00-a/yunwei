<template>
  <el-descriptions class="margin-top" title="安防服务信息" :column="2" size="small " border>
    <el-descriptions-item>
      <template slot="label">
        服务实例ID
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库密码
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权数目
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        服务名称
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        软件名称
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权人员
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        安装的服务器ID
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        版本信息
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        客户数量
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库类型
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权方式
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        是否巡检
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库IP
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权时间
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        是否永久授权
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库端口
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        授权状态
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        备注
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        数据库名称
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        过期时间
      </template>
      18100000000
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  import {getOpsvSecurityByService} from '@/api/serverLedger'
  export default {
    name: "security",
    data(){
      return{
        serviceId:'',
        form:{}
      }
    },
    mounted(){
      this.serviceId = '';
      getOpsvSecurityByService(this.serviceId).then(request=>{

      })
    }
  }
</script>

<style scoped>

</style>
