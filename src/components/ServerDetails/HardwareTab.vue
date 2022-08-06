<template>
  <el-table
    :data="tableData"
    height="330"
    border
    @row-click="clickRow"
    style="width: 100%">
    <el-table-column
      prop="serviceId"
      label="设备名称">
    </el-table-column>
    <el-table-column
      prop="serviceName"
      label="已占用比例">
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="已占用空间">
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="剩余空间">
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="总空间">
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="数据时间">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "statistics-tab",
    data(){
      return{
        tableData:[],
      }
    }
  }
</script>

<style scoped>

</style>
