<template>
  <div class="myBody">
    <el-descriptions
      class="margin-top"
      :column="2"
      border
      title="服务器基础信息"
    >
      <el-descriptions-item>
        <template slot="label">
          服务器ID
        </template>
        {{ serverDetailedInfo.serverId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          服务器Ip
        </template>
        {{ serverDetailedInfo.serverIp }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          客户名称
        </template>
        {{ serverDetailedInfo.company }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          联系人
        </template>
        {{ serverDetailedInfo.contact }}
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template slot="label">
          联系电话
        </template>
        {{ serverDetailedInfo.contactPhone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          当前状态
        </template>
        kooriookami
      </el-descriptions-item>
    </el-descriptions>
<!--    <div class="buttonDiv">-->
<!--      <el-button class="" type="primary" v-for="(s,index) in serviceList" :key="s.serviceId">{{ s.serviceName }}</el-button>-->
<!--    </div>-->
    <span style="font-weight: bold">服务器安装的服务列表</span>
    <el-table
      :data="tableData"
      height="330"
      border
      @row-click="clickRow"
      style="width: 100%">
      <el-table-column
        prop="serviceId"
        label="服务id">
      </el-table-column>
      <el-table-column
        prop="serviceName"
        label="服务名称">
      </el-table-column>
      <el-table-column
        prop="serviceType"
        label="服务类型"
        :formatter="dealServiceType">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getOpCustomerServerByServer, getServiceFindServerId} from "@/api/serverLedger";

    export default {
        name: "aside",
      data(){
          return{
            row: this.row,
            // 服务器绑定的服务的列表
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
            // 服务器基本信息
            serverDetailedInfo:{
              serverId:'',
              serverIp:'',
              company:'',
              contact:'',
              contactPhone:'',
              warn:'',
              normalTime:'',
              status:'',
            },
            serviceList: [],
          }
      },
      methods:{
        // 处理服务类型的展示
        dealServiceType(row){
          switch (row.serviceType){
            case 1:
              return "1-安防服务（3000）";
            case 2:
              return "2-智慧用电服务";
            case 3:
              return "3-巡更巡检服务";
            case 4:
              return "4-微信服务";
            case 5:
              return "5-APP服务";
            case 6:
              return "6-短信网关服务";
            case 7:
              return "7-第三方短信服务";
            case 8:
              return "8-2030N语音服务";
            case 9:
              return "9-第三方语音服务";
          }
        },
        // 点击服务列表的某一行
        clickRow(row){
          this.$emit("clickRow",row);
        },
        initLeftForm(){
          getServiceFindServerId(this.row.serverId,1,1000).then(request => {
            this.tableData = request.data.body.data;
          })
          this.serverDetailedInfo.serverId = this.row.serverId
          this.serverDetailedInfo.serverIp = this.row.serverIp
          getOpCustomerServerByServer(this.row.serverId).then(request=>{
            if (request.data.body) {
              if(request.data.body[0].customer){
                this.serverDetailedInfo.company = request.data.body[0].customer.company
                this.serverDetailedInfo.contact = request.data.body[0].customer.contact
                this.serverDetailedInfo.contactPhone = request.data.body[0].customer.contactPhone
              }
              else{
                this.serverDetailedInfo.company = '暂无数据'
                this.serverDetailedInfo.contact = '暂无数据'
                this.serverDetailedInfo.contactPhone = '暂无数据'
              }
            } else {
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          })
        }
      },
      mounted() {
        if(this.row)
          this.initLeftForm()
      },
      props:{
          row:Object
      },
      watch:{
          'row':{
            immediate:true,
            handler(val){
              if(val){
                this.initLeftForm()
              }
            }
          },

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
