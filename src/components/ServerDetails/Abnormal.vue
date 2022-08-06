<template>
<div>
  <el-table
    :data="tableData"
    height="415"
    border
  >
    <!--序号-->
    <!--服务类型id：serviceType-->
    <el-table-column
      prop="receive.user.userName"
      label="用户名称"
    >
    </el-table-column>
    <el-table-column
      prop="receive.receiveType"
      :formatter="receiveTypeFormat"
      label="接收方式"
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
  <el-footer id="Footer">
    <!--分页功能-->
    <!--当前行数与总数据条数-->
    <el-row :gutter="30">
      <el-col :span="10">
      </el-col>
      <el-col :span="14">
        <div>
          <el-pagination
            id="controlBigPosition"
            background
            :current-page="currentPage"
            :page-sizes="[20, 50, 100, 200, 300]"
            :page-size="size"
            layout="sizes, prev, pager, next, jumper"
            :total="totalNumber"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </el-footer>
</div>
</template>

<script>
import {getUserEventLogFind} from "@/api/messagePush";

export default {
  name: "UnusualInfo",
  data(){
    return{
      tableData:[],
      currentPage:1,
      size:20,
      totalNumber:0,

    }
  },
  methods:{
    Find(){
      if(this.myRow)
        getUserEventLogFind('','','', '', this.myRow.serverName,'',this.currentPage,this.size).then(request=>{
          console.log("请求到的异常信息：",request)
          this.tableData = request.data.body.data;
          this.totalNumber=request.data.body.total
        })
    },
    //每页最大条数
    handleSizeChange(val) {
      this.size = val;
      this.Find();
    },
    //当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Find();
    },
    receiveTypeFormat(row){
      if(row.receive.receiveType === 1 || row.receive.receiveType === '1'){
        return "邮箱"
      }
      if(row.receive.receiveType === 2 || row.receive.receiveType === '2'){
        return "微信"
      }
    },
  },
  props:{
    myRow:Object
  },
  mounted() {

  },
  watch:{
    myRow:{
      immediate:true,
      handler(val){
        if(this.myRow)
          getUserEventLogFind('','','', '', this.myRow.serverName,'',this.currentPage,this.size).then(request=>{
            console.log("请求到的异常信息：",request)
            this.tableData = request.data.body.data;
            this.totalNumber=request.data.body.total
          })
      }
    }
  }

}
</script>

<style scoped>

#controlBigPosition{
  position: absolute;
  right: 0.5rem;
}
>>>.el-footer .el-pagination{
  padding-top: 8px;
}
</style>
