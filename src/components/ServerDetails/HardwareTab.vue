<template>
  <el-container>
    <el-main :style="myStyle" id="Main" >
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow"
        :cell-class-name="tableCellClassName">
        <!--服务类型id：serviceType-->
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="100"
        >
        </el-table-column>
        <!--服务类型名称：serviceName-->
        <el-table-column
          prop="ratio"
          label="已使用比例(%)"
        >
        </el-table-column>
        <!--服务信息存放表：serviceTable-->
        <el-table-column
          prop="value"
          label="已用空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="surplus"
          label="剩余空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="total"
          label="总空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="数据时间"
          width="100"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import {getServerHardStatus} from '@/api/ServerInfomation'
  export default {
    name: "hardware",
    components: {
    },
    data() {
      return {
        myStyle:{
          height:''
        },
        //*******************中间主体*******************
        //表格数据
        tableData: []
      }
    },
    methods:{
      //************************分页************************
      //处理页面初始数据
      dealData(){
        getServerHardStatus(this.myRow.serverIp,this.myRow.serverName,1,100).then(request=>{
          this.tableData = request.data.body.data;
          for(let i=0;i<request.data.body.data.length;i++){
            this.tableData[i].ratio = Math.round(this.tableData[i].ratio*100)/100;
            this.tableData[i].total = Math.round((request.data.body.data[i].value / (request.data.body.data[i].ratio/100))*100)/100;
            this.tableData[i].surplus = Math.round(this.tableData[i].total*(1-request.data.body.data[i].ratio/100)*100)/100;
          }
        });
      }
    },
    mounted(){
      this.myStyle = {
        height: document.body.clientHeight-130-30-64-70+"px"
      };
    },
    watch:{
      'myRow.serverIp':{
        immediate:true,
        handler(val){
          if(val){
            this.dealData();
          }
        }
      }
    },
    props:{
      myRow:Object
    }
  }
</script>

<style scoped>

</style>
