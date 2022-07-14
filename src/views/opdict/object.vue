<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main" >
      <el-table
        :data="tableData"
        height="520"
        border
        style="width: 87.8rem">
        <el-table-column
          prop="date"
          label="f_object_id"
          width="147rem">
        </el-table-column>
        <el-table-column
          prop="name"
          label="f_system_nar"
          width="166rem">
        </el-table-column>
        <el-table-column
          prop="address"
          label="f_module"
          width="166rem">
        </el-table-column>
        <el-table-column
          prop="address"
          label="f_object_name"
          width="246rem">
        </el-table-column>
        <el-table-column
          prop="address"
          label="f_category"
          width="166rem">
        </el-table-column>
        <el-table-column
          prop="address"
          label="f_item"
          width="166rem">
        </el-table-column>
        <el-table-column
          prop="address"
          label="f_type"
          width="166rem">
        </el-table-column>
        <el-table-column
          label="操作" width="180rem">
          <OpOperateObject/>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import OpOperateObject from '../../components/Opdict/OpOperate/Object'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    OpOperateObject
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped>
#Header{
  background: #f1f3f4;
}
</style>
