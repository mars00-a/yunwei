<template>
  <el-container>
    <el-header id="Header">
      <el-row :gutter="10" id="Control">
        <!--过滤参数选择-->
        <el-col :span="6">
          <span id="FilterParameters">过滤参数：</span>
          <el-select v-model="FilterParameter_value" placeholder="请选择" title="过滤参数:" id="FilterBox">
            <el-option
              v-for="item in FilterParameters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!--查找输入框-->
        <el-col :span="1">
          <span id="Value">值：</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="CompleteValue" placeholder="请输入内容"/>
        </el-col>
        <!--查找、新增功能按钮-->
        <el-col :span="13">
          <el-button type="primary" id="Find" @click="currentPage = 1, Find()">过滤</el-button>
          <el-button type="primary" @click="dealData()">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
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
        <!--接收id：receiveId-->
        <el-table-column
          prop="receiveId"
          label="接收id"
        >
        </el-table-column>
        <!--用户名称：userName-->
        <el-table-column
          prop="userName"
          label="用户名称"
        >
        </el-table-column>
        <!--接收类型：receiveType-->
        <el-table-column
          prop="receiveType"
          :formatter="receiveTypeFormat"
          label="接收类型"
        >
        </el-table-column>
        <!--接收地址：receiveAccount-->
        <el-table-column
          prop="receiveAccount"
          label="接收地址"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="350">
          <template slot-scope="scope">
            <msgServer :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
          </template>
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
    <!--新增按钮的弹窗-->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <!--用户名称-->
        <el-form-item label="用户名称">
          <el-input v-model="form.userName" @focus="dealUserTableData()"/>
        </el-form-item>
        <!--接收类型-->
        <el-form-item label="接收类型">
          <el-select v-model="form.receiveType" placeholder="请选择" :style="controlWidth">
            <el-option
              v-for="item in ReceiveTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--接收地址-->
        <el-form-item label="接收地址">
          <el-input v-model="form.receiveAccount"/>
        </el-form-item>
        <!--用户选择表格-->
        <div v-show = showUserTable id="userTable">
          <el-table
            :data="userTable"
            height="400"
            border
            style="width: 100%">
            <el-table-column
              active-class="targetTableGetFocus"
              prop="userId"
              label="用户id"
              width="105%">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称"
              width="100%">
            </el-table-column>
            <el-table-column label="添加">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="getUser(scope.$index,scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import msgServer from '../../components/messagePush/msgServer'
  import {getOpDictServicePageList, getOpDictServiceCreate, getOpDictServiceFindServiceType, getOpDictServiceFindServiceName,
    getOpDictServiceFindServiceTable, getOpDictServiceFindNote, getOpDictServiceDelete, getOpDictServiceUpdate,} from '@/api/opdict'
  import {getOpUserReveicePageList, getOpUserReveiceFindUserName, getOpUserReveiceFindReceiveId, getOpUserReveiceFindReceiveType,
    getOpUserReveiceFindReceiveAccount, getOpUserReveiceCreate, getOpUserReveiceUserList, getOpUserReveiceUpdate, getOpUserReveiceDelete,
  } from '@/api/messagePush'
  export default {
    name: 'msg-push',
    components: {
      msgServer
    },
    data() {
      return {
        controlWidth:{
          width:"100%"
        },
        myStyle:{
          height:"29rem"
        },
        //*******************控制区*******************
        FilterParameters: [{
            value: 'userName',
            label: '用户名称'
          },{
            value: 'receiveType',
            label: '接收类型'
          },{
            value: 'receiveAccount',
            label: '接收地址'
          }],
        //过滤参数
        FilterParameter_value: '',
        //查找输入框
        CompleteValue:'',
        //新增
        showUserTable: false,
        dialogVisible: false,
        userTable:[],   //用户列表
        backupUserTable:[],
        ReceiveTypes:[{
          value:1,
          label:'邮箱'
        },{
          value:2,
          label:'微信'
        }],
        form: {
          userName:'',
          receiveType:'',
          receiveAccount:''
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
        if(row.receiveType === 1){
          return "邮箱"
        }
        if(row.receiveType === 2){
          return "微信"
        }
      },
      //处理页面初始数据
      dealData(){
        getOpUserReveicePageList(this.currentPage,this.size).then(request=>{
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
      Confirm() {
        getOpUserReveiceCreate(this.form).then(request=>{
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
      },
      dealUserTableData(){
        this.showUserTable = true;
        getOpUserReveiceUserList().then(request=>{
          if(request.data.body){
            this.userTable = request.data.body;
            this.backupUserTable = request.data.body;
          }else{
            super.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        })
      },
      getUser(index,row){
        this.form.userName = row.userName;
      },
      //查找按钮的事件
      Find(){
        if(this.FilterParameter_value === 'userName'){
          getOpUserReveiceFindUserName(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'receiveType'){
          getOpUserReveiceFindReceiveType(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'receiveAccount'){
          getOpUserReveiceFindReceiveAccount(this.CompleteValue,this.currentPage,this.size).then(request=>{
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
        getOpUserReveiceUpdate(msg).then(request=>{
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
        getOpUserReveiceDelete(msg).then(request=>{
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
      this.dealData();
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      }
    },
    watch:{
      'form.userName':{
        immediate:true,
        handler(val){
          this.userTable = this.backupUserTable.filter(p =>{
            if(p.userId !== null || p.userName !== null){
              return p.userId.toString().indexOf(val) !== -1 || p.userName.indexOf(val) !== -1
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  #Header{
    background: #f1f3f4;
  }
  #Find{
    margin-left: 1rem;
  }
  #Control{
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
  #userTable{
    position: absolute;
    top: 0;
    left:103%;
  }
</style>
