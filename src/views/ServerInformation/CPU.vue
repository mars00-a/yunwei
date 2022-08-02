<template>
  <el-container>
    <el-header id="Header">
      <el-row id="Control">
        <el-col :span="6">
          <span id="FilterParameters">服务器名称：</span>
          <el-input v-model="serverNameSearchKeyword" placeholder="请输入内容" :style="controlWidth.control2width"/>
        </el-col>
        <el-col :span="6">
          <span>服务器IP：</span>
          <el-input v-model="eventNameSearchKeyword" placeholder="请输入内容" :style="controlWidth.control2width"/>
        </el-col>
        <!--查找、新增功能按钮-->
        <el-col :span="12">
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
          label="CPU名称"
        >
        </el-table-column>
        <!--服务类型名称：serviceName-->
        <el-table-column
          prop="opEvent.opcidName"
          label="已使用比例（%）"
        >
        </el-table-column>
        <!--服务信息存放表：serviceTable-->
        <el-table-column
          prop="time"
          label="数据采集时间"
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
    name: "cpu",
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
            width: "63%"
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
        ReceiveTypes: [
          {
            value: 1,
            label: '邮箱'
          },
          {
            value: 2,
            label: '微信'
          }
        ],
        // 过滤参数列表
        FilterParameters: [
          {
            value: 'serviceName',
            label: '服务器名称'
          },{
            value: 'serviceTable',
            label: '时间名称'
          },{
            value: 'note',
            label: '发生时间'
          }],
        //过滤参数
        FilterParameter_value: '',
        //查找输入框
        CompleteValue:'',
        //**************************新增***********************
        dialogVisible: false,
        form: {
          serviceType: '',
          serviceName: '',
          serviceTable: '',
          note: '',
        },
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
      receiveTypeFormat(row){
        if(row.receive.receiveType === 1){
          return "邮箱"
        }
        if(row.receive.receiveType === 2){
          return "微信"
        }
      },
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
      //新增功能弹窗的取消和确认
      Cancel() {
        this.$message('取消成功')
      },
      Confirm(id) {
        //非空验证
        if(id === ""){
          this.dialogVisible = true;
          this.$message.error('服务类型id不能为空');
        }
        else{
          getOpDictServiceCreate(this.form).then(request=>{
            if(request.data.body){
              this.Find();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }else{
              super.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
      },
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
      //************************修改、删除按钮************************
      //修改、删除后的表数据返回到以下两个函数
      GetRevise(msg){
        getOpDictServiceUpdate(msg).then(request=>{
          if(request.data.body){
            this.Find();
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else{
            super.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        });
      },
      GetDel(msg){
        getOpDictServiceDelete(msg).then(request=>{
          this.Find();
          if(request.data.body){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            super.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        });
      },
    },
    mounted(){
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      };
      this.dealData();
    }
  }
</script>

<style scoped>
  #Header{
    min-height: 3rem;
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
