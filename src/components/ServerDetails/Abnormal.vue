<template>
<div>
  <el-table
    :data="tableData"
    height="438"
    border
  >
    <!--序号-->
    <!--服务类型id：serviceType-->
    <el-table-column
      prop="server.serverName"
      label="服务器名称"
    >
    </el-table-column>
    <!--服务类型名称：serviceName-->
    <el-table-column
      prop="opEvent.opcidName"
      label="事件名称"
    >
    </el-table-column>
    <!--服务信息存放表：serviceTable-->
    <el-table-column
      prop="time"
      label="发生时间"
    >
    </el-table-column>
    <!--操作栏-->
  </el-table>
</div>
</template>

<script>
export default {
  name: "UnusualInfo",
  data(){
    return{
      tableData:[],

    }
  },
  props:{
    myRow:
  }
}
</script>

<style scoped>

</style>
