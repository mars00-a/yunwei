<template>
  <el-row :gutter="10">
    <el-col :span="6.8">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
    </el-col>
    <el-col :span="6.8"><div class="grid-content bg-purple">
      <el-button type="danger" @click="Del">删除</el-button>
    </div></el-col>
    <el-col :span="10.4">
      <el-button type="success" @click="dialogServerVisible = true">服务器</el-button>
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
          prop="serverName"
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
          width="170">
          <template slot-scope="scope">
            <ServerEvent/>
          </template>
        </el-table-column>
      </el-table>
      <!--服务器选择列表-->
      <div id="targetTable">
        <el-row :gutter="30">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="输入服务器IP/名称进行查询" placement="top">
              <el-input v-model="CustomerIdTableCompleteValue" placeholder="查询输入"/>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-table
          :data="targetCustomerIdTable"
          height="580"
          border
          style="width: 100%">
          <el-table-column
            active-class="targetTableGetFocus"
            prop="customerId"
            label="客户ID"
            width="105%">
          </el-table-column>
          <el-table-column
            prop="company"
            label="客户名称"
            width="100%">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="targetTableGetFocus(scope.$index, scope.row)">绑定</el-button>
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
        receiveTypes:[{
          value:'微信',
          label:'微信'
        },{
          value:'邮箱',
          label:'邮箱'
        }],   //接收类型下拉框
        //**********服务器按钮的弹窗**********
        dialogServerVisible:false,   //用于弹窗的显示
        myServerTable:[{}],   //需要推送信息的服务器
        serverTable:[],   //服务器信息表
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
        this.form= {...this.myData}
      },
      //编辑弹窗点击取消时响应
      Cancel() {
        this.$message('取消成功')
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
      }
    },
    //接入来自../../../views/opdict/object的数据
    props:{
      myData:Array
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
