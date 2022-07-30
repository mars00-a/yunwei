<template>
  <el-row :gutter="5">
    <el-col :span="5.7">
      <el-button type="primary" @click="ReviseReceive">修 改</el-button>
    </el-col>
    <el-col :span="5.7">
      <el-button type="danger" @click="DelReceive">删 除</el-button>
    </el-col>
    <el-col :span="6.9">
      <el-button type="success" @click="serverButton">服务器</el-button>
    </el-col>
    <el-col :span="5.7">
      <el-button type="info" @click="historyButton">历 史</el-button>
    </el-col>
    <!--修改接收信息弹窗-->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <!--用户名称-->
        <el-form-item label="用户名称">
          <el-input v-model="form.userName" @focus="showUserTable = true"/>
        </el-form-item>
        <!--接收类型-->
        <el-form-item label="接收类型">
          <el-select v-model="form.receiveType" :style="controlWidth" placeholder="请选择">
            <el-option
              v-for="item in receiveTypes"
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
          <el-button type="primary" @click="dialogVisible = false,ReviseConfirm()">确 定</el-button>
        </span>
    </el-dialog>
    <!--服务器弹窗-->
    <el-dialog top="8vh" title="需要推送信息的服务器" :visible.sync="dialogServerVisible" width="75%" style="padding-right: 15rem">
      <el-table
        :data="myServerTable"
        height="500"
        border
        class="ServerTable"
        style="width: 100%">
        <el-table-column
          prop="server.serverId"
          label="服务器ID">
        </el-table-column>
        <el-table-column
          prop="server.serverName"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          prop="eventLevel"
          label="服务器级别">
        </el-table-column>
        <el-table-column
          prop="alarmCycle"
          label="报警时间间隔">
        </el-table-column>
        <el-table-column
          prop="keepAlive"
          label="平安报周期">
        </el-table-column>
        <el-table-column
          label="操作"
          width="320">
          <template slot-scope="scope">
            <ServerEvent
              :receiveData="myData"
              :serverData = "scope.row"
              @click="dealServerData(scope.row)"
              @Revise='GetRevise'
              @Del='GetDel'
            />
          </template>
        </el-table-column>
      </el-table>
      <!--服务器选择列表-->
      <div id="targetTable">
        <el-row :gutter="30">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="输入服务器名称/IP进行查询" placement="top">
              <el-input v-model="ServerTableCompleteValue" placeholder="查询输入"/>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-table
          :data="searchServerList"
          height="575"
          border
          style="width: 100%">
          <el-table-column
            active-class="targetTableGetFocus"
            prop="serverId"
            label="服务器id"
            width="105%">
          </el-table-column>
          <el-table-column
            prop="serverName"
            label="服务器名称"
            width="100%">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="addServerButton(scope.row)">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="关联" :visible.sync="dialogAssociationVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <!--服务类型-->
        <el-form-item label="服务器级别">
          <el-input v-model="AssociationForm.eventLevel" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="报警时间间隔">
          <el-input v-model="AssociationForm.alarmCycle" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="平安报周期">
          <el-input v-model="AssociationForm.keepAlive" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAssociationVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddServer">确 定</el-button>
        </span>
    </el-dialog>
  </el-row>
</template>
<script>
  import ServerEvent from './serverEvent'
  import {
    getOpUserServerEventUnBindList,
    getOpUserServerReceivePageList,
    getOpUserServerReceiveCreate,
    getOpUserServerEventCreate
  } from '@/api/wang'
  import {getOpUserReveiceUserList, getOpUserServerReceiveUnBindList} from '@/api/messagePush'
  export default {
    name: 'msgServer',
    components:{
      ServerEvent,
    },
    data() {
      return {
        //组件交互的数据
        msgEventData:{},
        //************************************************** 宽度自适应 **********
        controlWidth:{
          width: "100%"
        },
        //************************************************** 编辑按钮的弹窗 *****
        dialogVisible: false,   //用于弹窗的显示
        showUserTable:false,
        userTable:[],
        backupUserTable:[],
        form: {
          userName: '',
          receiveType: '',
          receiveAccount: '',
        },   //编辑弹窗的表单
        receiveTypes:[
          {
          value: 1,
          label:'微信'
        },{
          value: 2,
          label:'邮箱'
        }],   //接收类型下拉框
        //*********************************************** 服务器按钮的弹窗 **************
        dialogServerVisible:false,   //用于弹窗的显示
        myServerTable:[],   //需要推送信息的服务器
        //所有服务器信息表备份
        allServerList:[],
        //展示出来经过搜索的服务器信息表
        searchServerList:[],
        ServerTableCompleteValue:'',
        dialogAssociationVisible:false,
        AssociationForm:{
          receiveId:'',
          serverId:'',
          eventLevel:'',
          keepAlive:'',
          alarmCycle:''
        }
      }
    },
    methods: {
      // 确认添加服务器
      confirmAddServer(){
        this.dialogAssociationVisible = false
        console.log(this.AssociationForm)
        getOpUserServerReceiveCreate(this.AssociationForm).then(request=>{
          console.log("触发了绑定服务器，内容为：",this.AssociationForm)
          if(request.data.body){
            this.addSuccessMessage()
            this.serverButton()
          }
          else{
            this.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        });
      },
      // 添加服务器
      addServerButton(row){
        this.dialogAssociationVisible = true
        this.AssociationForm.receiveId=this.myData.receiveId
        this.AssociationForm.serverId = row.serverId
      },
      GetDel(){
        this.ServerTableCompleteValue = '';
        getOpUserServerReceivePageList(this.myData.receiveId,1,10000).then(request=>{
          this.myServerTable = request.data.body.data;
        });
        getOpUserServerReceiveUnBindList(this.myData.receiveId).then(request=>{
          this.allServerList = request.data.body;
          this.searchServerList = request.data.body;
        })
      },
      GetRevise(){
        this.ServerTableCompleteValue = '';
        getOpUserServerReceivePageList(this.myData.receiveId,1,10000).then(request=>{
          this.myServerTable = request.data.body.data;
        });
        getOpUserServerReceiveUnBindList(this.myData.receiveId).then(request=>{
          this.allServerList = request.data.body;
          this.searchServerList = request.data.body;
        })
      },
      //删除功能的事件
      DelReceive() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("Del",this.myData.receiveId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //点击编辑时将该行的数据传入弹窗中
      ReviseReceive(){
        this.dialogVisible = true;
        getOpUserReveiceUserList().then(request=>{
          if(request.data.body){
            this.userTable = request.data.body;
            this.backupUserTable = request.data.body;
            this.form= {...this.myData};
          }else{
            super.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        });
      },
      getUser(index,row){
        this.form.userName = row.userName;
      },
      //编辑弹窗点击取消时响应
      Cancel() {
        this.$message('取消成功')
      },
      // 点击历史按钮
      historyButton(){
        console.log('historyButton',this.myData);
        this.$router.push({name:'historicalMsg',params:{msgServerData:this.myData}});
      },
      //编辑弹窗点击确认时响应
      ReviseConfirm() {
        this.$emit("Revise",this.form)
      },
      dealServerData(row){
        this.msgEventData.users = {...this.myData};
        this.msgEventData.servers = {...row}
      },
      // 点击服务器按钮
      serverButton(){
        this.dialogServerVisible = true;
        this.ServerTableCompleteValue = '';
        getOpUserServerReceivePageList(this.myData.receiveId,1,10000).then(request=>{
          this.myServerTable = request.data.body.data;
        });
        getOpUserServerReceiveUnBindList(this.myData.receiveId).then(request=>{
          this.allServerList = request.data.body;
          this.searchServerList = request.data.body;
        })
      },

      // 新增成功提示
      addSuccessMessage(){
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      },
      // 修改成功提示
      reviseSuccessMessage(){
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },
      // 删除成功提示
      delSuccessMessage(){
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      },
    },
    props:{
      myData: Object
    },
    watch:{
      'ServerTableCompleteValue':{
        immediate:true,
        handler(val){
          if(val !== ''){
            console.log(val);
            console.log(this.allServerList);
            this.searchServerList = this.allServerList.filter(p =>{
              if(p.serverName !== null && p.serverIp !== null){
                return p.serverName.indexOf(val) !== -1 || p.serverIp.indexOf(val) !== -1
              }
            });
          } else{
            this.searchServerList = this.allServerList;
          }
        }
      },
      'form.userName':{
        immediate:true,
        handler(val){
          console.log(val);
          this.userTable = this.backupUserTable.filter(p =>{
            if(p.userId !== null || p.userName !== null){
              return p.userId.toString().indexOf(val) !== -1 || p.userName.indexOf(val) !== -1
            }
          });
        }
      }
    },
    mounted() {
      // console.log(this.myData)
    }
  }
</script>

<style scoped>
  #targetTable{
    position: absolute;
    top: 0;
    left:101%;
  }
  #userTable{
    position: absolute;
    top: 0;
    left:103%;
  }
</style>
