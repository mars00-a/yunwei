<template>
  <div class="myBody">
    <el-descriptions
      class="margin-top"
      :column="1"
      border
      title="服务器详细信息"
    >
      <el-descriptions-item>
        <template slot="label">
          服务器类型
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          服务器ip
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          客户名称
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          联系人
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          联系电话
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          当前状态
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          本天/周/月报警总数
        </template>
        181000000000000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          正常运行时长
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          当前状态
        </template>
        kooriookami
      </el-descriptions-item>
    </el-descriptions>
    <div class="buttonDiv">
      <el-button class="" type="primary" v-for="(s,index) in serviceList" :key="s.serviceId">{{ s.serviceName }}</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "aside",
      data(){
          return{
            tableData: [
              {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            serviceList: [
              {
                serviceId:1,
                serviceName:'金华江南保安3000系统'
              },
              {
                serviceId:2,
                serviceName:'西安曲长春3000系统'
              },
            ],
          }
      }
    }
</script>

<style scoped>
>>>.el-descriptions .el-descriptions__header{
  margin-bottom: 0;
}
.myBody{
  border: #dfe4ed solid 1px;
  padding: 5px 15px;
  margin-top: 5px;
  height: 97%;
  width: 100%;
  box-shadow: 0 0 3px 2px #dfe4ed;
}
>>>.el-descriptions__table .el-descriptions-item__cell{
  padding: 4px 10px;
}
.buttonDiv{
  padding-top: 20px;
}
</style>
