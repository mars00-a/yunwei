<template>
  <el-container>
    <el-header id="Header">
      <el-row id="Control">
        <!--过滤参数选择-->
        <el-col :span="5">
          <span>服务器IP：</span>
          <el-input v-model="UserNameSearchKeyword" placeholder="请输入内容" :style="controlWidth.control2width"/>
        </el-col>
        <!--过滤参数选择-->
        <el-col :span="5">
          <span>服务器名称：</span>
          <el-input v-model="UserNameSearchKeyword" placeholder="请输入内容" :style="controlWidth.control2width"/>
        </el-col>
        <el-col :span="5">
          <span>内存名称：</span>
          <el-input v-model="UserNameSearchKeyword" placeholder="请输入内容" :style="controlWidth.control2width"/>
        </el-col>
        <!--查找、新增功能按钮-->
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-c-scale-to-original" id="Find" @click="currentPage = 1,Find()">过滤</el-button>
          <el-button type="success" icon="el-icon-refresh" @click="dealData()">恢复</el-button>
          <el-button type="info" icon="el-icon-edit-outline">导出</el-button>
          <el-button type="primary" icon="el-icon-tickets">打印</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="myStyle" id="Main" >
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow"
        :cell-class-name="tableCellClassName">
        <!--序号-->
        <el-table-column
          width="50"
          type="index"
          label="序号"
        >
        </el-table-column>
        <!--服务类型id：serviceType-->
        <el-table-column
          prop="receive.user.userName"
          label="服务器名称"
        >
        </el-table-column>
        <!--接收方式-->
        <el-table-column
          prop="receive.receiveType"
          :formatter="receiveTypeFormat"
          label="服务器IP"
        >
        </el-table-column>
        <!--服务类型id：serviceType-->
        <el-table-column
          prop="server.serverName"
          label="内存名称"
        >
        </el-table-column>
        <!--服务类型名称：serviceName-->
        <el-table-column
          prop="opEvent.opcidName"
          label="已占用比例(%)"
        >
        </el-table-column>
        <!--服务信息存放表：serviceTable-->
        <el-table-column
          prop="time"
          label="已用空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="剩余空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="总空间(GB)"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="数据时间"
        >
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <!--当前行数与总数据条数-->
      <el-row :gutter="30">
        <el-col :span="10">
          <div id="now_line_number">第{{nowRow}}条/共{{totalNumber}}条数据</div>
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
            <el-button id="controlPosition" type="primary" round>跳转</el-button>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
  import msgServer from '../../components/messagePush/msgServer'
  import {getOpDictServicePageList, getOpDictServiceCreate, getOpDictServiceFindServiceType, getOpDictServiceFindServiceName,
    getOpDictServiceFindServiceTable, getOpDictServiceFindNote, getOpDictServiceDelete, getOpDictServiceUpdate,} from '@/api/opdict'
  import {getUserEventLogPageList, getUserEventLogFind, } from '@/api/messagePush'
  export default {
    name: "ram",
    components: {
      msgServer
    },
    data() {
      return {
        //*******************页面自适应参数*******************
        controlWidth:{
          control1width:{
            width: "66%"
          },
          control2width:{
            width: "60%"
          },
        },
        myStyle:{
          height:''
        },
        //*******************控制区*******************
        UserNameSearchKeyword:'',
        ReceiveTypeSearchKeyword:'',
        beginTimeSearchKeyword:'',
        endTimeSearchKeyword:'',
        serverNameSearchKeyword: '',
        eventNameSearchKeyword: '',
        //*******************中间主体*******************
        //表格数据
        tableData: [],
        //*******************分页尾部*******************
        // 分页
        //currentPage进入的第一页是第几页
        currentPage: 1,
        //当前行数
        nowRow: 1,
        //数据总数
        totalNumber: '',
        //当前页面显示最大数量
        size: 20,
      }
    },
    methods:{
      //************************分页************************
      //处理页面初始数据
      dealData(){
        getUserEventLogPageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        });
        this.FilterParameter_value = '';
        this.CompleteValue='';
      },
      //鼠标放到某一行上就触发
      tableCellClassName({row,rowIndex}){
        row.index=rowIndex;
      },
      //鼠标放到某一行上就触发
      getNowRow(row){
        this.nowRow = row.index+1+(this.currentPage-1)*this.size;
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
      //************************新增与查找按钮************************
      //查找按钮的事件
      Find(){
        if(this.UserNameSearchKeyword||this.ReceiveTypeSearchKeyword||this.beginTimeSearchKeyword||
          this.endTimeSearchKeyword||this.serverNameSearchKeyword||this.eventNameSearchKeyword !== '') {
          getUserEventLogFind(this.UserNameSearchKeyword,this.ReceiveTypeSearchKeyword,this.beginTimeSearchKeyword, this.endTimeSearchKeyword,
            this.serverNameSearchKeyword,this.eventNameSearchKeyword,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else{
          this.dealData()
        }
      },
    },
    mounted(){
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      };
      if(this.$route.params.msgServerData !== undefined){
        this.UserNameSearchKeyword = this.$route.params.msgServerData.userName;
        this.ReceiveTypeSearchKeyword = this.$route.params.msgServerData.receiveType;
        this.Find();
      }
      else {
        if(this.$route.params.serverEventData !== undefined){
          console.log()
          this.UserNameSearchKeyword = this.$route.params.serverEventData.userName;
          this.ReceiveTypeSearchKeyword = this.$route.params.serverEventData.receiveType;
          this.serverNameSearchKeyword = this.$route.params.serverEventData.server.serverName;
          this.Find();
        }else{
          this.dealData();
        }
      }
    }
  }
</script>

<style scoped>
  #Header{
    min-height: 3.5rem;
    background: #f1f3f4;
  }
  #Find{
    margin-left: 1rem;
  }
  #Control{
    margin-top: 0.8rem;
  }
  #Control1{
    margin-top: 0.8rem;
  }
  #Control2{
    margin-top: 0.8rem;
  }
  /*设置分页属性*/
  #now_line_number{
    font-size: 0.85rem;
    margin-left: 2rem;
    margin-top: 0.6rem;
    color: #606266;
    float:left;
  }
  #paginate{
    float:right;
    margin-right: 2rem;
  }
  #Value{
    line-height: 2.2rem;
    padding-left: 1.2rem;
  }
  #controlPosition{
    display: inline-block;
    position: absolute;
    right: 2rem;
    top: 0;
  }
  #controlBigPosition{
    position: absolute;
    right: 7.2rem;
  }
</style>
