<template>
  <el-row :gutter="5">
    <el-col :span="5.7">
      <el-button type="primary" @click="Revise">修 改</el-button>
    </el-col>
    <el-col :span="5.7">
      <el-button type="danger" @click="Del">删 除</el-button>
    </el-col>
    <el-col :span="6.9">
      <el-button type="success" @click="serverButton">服务器</el-button>
    </el-col>
    <el-col :span="5.7">
      <el-button type="info" @click="historyButton">历 史</el-button>
    </el-col>
    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <!--服务类型-->
        <el-form-item label="接收id" :rules="[{ required: true}]">
          <el-input
            :disabled="true"
            v-model="form.serviceType" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="用户名称">
          <el-input v-model="form.serviceName" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="接收类型">
          <el-select v-model="form.serviceTable" :style="controlWidth" placeholder="请选择">
            <el-option
              v-for="item in receiveTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--备注-->
        <el-form-item label="接收地址">
          <el-input v-model="form.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm(form.f_service_type)">确 定</el-button>
        </span>
    </el-dialog>
    <!--服务器弹窗-->
    <el-dialog top="8vh" title="需要推送信息的服务器" :visible.sync="dialogServerVisible" width="50%">
      <el-table
        :data="myServerTable"
        height="500"
        border
        style="width: 100%">
        <el-table-column
          prop="serverId"
          label="服务器ID">
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="服务器级别">
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="报警时间间隔">
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="平安报周期">
        </el-table-column>
        <el-table-column
          label="操作"
          width="230">
          <template slot-scope="scope">
            <ServerEvent
              :receiveData="myData"
              :serverData = "scope.row"
              @click="dealServerData(scope.row)"
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
          :data="targetServerTable"
          height="580"
          border
          style="width: 100%">
          <el-table-column
            active-class="targetTableGetFocus"
            prop="serverName"
            label="服务器名称"
            width="105%">
          </el-table-column>
          <el-table-column
            prop="serverIp"
            label="服务器IP"
            width="100%">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="targetTableGetFocus(scope.$index, scope.row)">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  import ServerEvent from './serverEvent'
  export default {
    name: 'msgServer',
    components:{
      ServerEvent,
    },
    data() {
      return {
        myOwnData:this.myData,
        //组件交互的数据
        msgEventData:{},
        //***********宽度自适应**********
        controlWidth:{
          width: "100%"
        },
        //**********编辑按钮的弹窗**********
        dialogVisible: false,   //用于弹窗的显示
        form: {
          serviceType: '',
          serviceName: '',
          serviceTable: '',
          note: ''
        },   //编辑弹窗的表单
        receiveTypes:[
          {
          value:'微信',
          label:'微信'
        },{
          value:'邮箱',
          label:'邮箱'
        }],   //接收类型下拉框
        //**********服务器按钮的弹窗**********
        dialogServerVisible:false,   //用于弹窗的显示
        myServerTable:[
          {
            serverId:123,

          }
        ],   //需要推送信息的服务器
        backupServerTable:[
          {
          serverName: '123',
          serverIp:'123'
        },{
          serverName: '111',
          serverIp:'121'
        },{
          serverName: '333',
          serverIp:'334'
        }],   //服务器信息表备份
        targetServerTable:[{
          serverName: '123',
          serverIp:'123'
        },{
          serverName: '111',
          serverIp:'121'
        },{
          serverName: '333',
          serverIp:'334'
        }],   //服务器信息表
        ServerTableCompleteValue:'',
      }
    },
    methods: {
      //删除功能的事件
      Del() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("Del",this.myData.serviceType);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //点击编辑时将该行的数据传入弹窗中
      Revise(){
        this.dialogVisible = true
        this.form= {...this.myData}
      },
      //编辑弹窗点击取消时响应
      Cancel() {
        this.$message('取消成功')
      },
      // 点击历史按钮
      historyButton(){
        this.$router.push({name:'historicalMsg',params:{msgServerData:this.myOwnData}});
      },
      //编辑弹窗点击确认时响应
      Confirm(id) {
        if(id === ""){
          this.dialogVisible = true;
          this.$message.error('服务类型id不能为空');
        }
        else{
          this.$emit("Revise",this.form);
        }
      },
      dealServerData(row){
        this.msgEventData.users = {...this.myData};
        this.msgEventData.servers = {...row}
      },
      serverButton(){
        this.dialogServerVisible = true
      }
    },
    //接入来自../../../views/opdict/object的数据
    props:{
      myData: Object
    },
    watch:{
      'ServerTableCompleteValue':{
        immediate:true,
        handler(val){
          if(val !== ''){
            this.targetServerTable = this.backupServerTable.filter(p =>{
              return p.serverName.indexOf(val) !== -1 || p.serverIp.indexOf(val) !== -1
            });
          } else{
            this.targetServerTable = this.backupServerTable;
          }
        }
      }
    },
    mounted() {
      console.log(this.myData)
    }
  }
</script>

<style scoped>
  #targetTable{
    position: absolute;
    top: 0;
    left:103%;
  }
</style>
