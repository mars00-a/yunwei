<template>
  <el-container>
    <el-header height="4rem" id="Header">
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
          <el-button type="primary" id="Find" @click="currentPage = 1,find()">过滤</el-button>
          <el-button @click="clearDealData" type="primary">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <!--新增按钮的弹窗-->
        </el-col>
      </el-row>
    </el-header>
    <el-main  :style="myStyle" id="Main" >
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow"
        :cell-class-name="tableCellClassName">
<!--        序号列-->
        <el-table-column
          width="50"
          type="index"
          label="序号"
        >
        </el-table-column>
        <!--运维状态id：statusId-->
        <el-table-column
          prop="statusId"
          label="运维状态id"
        >
        </el-table-column>
        <!--运维状态名称：statusName-->
        <el-table-column
          prop="statusName"
          label="运维状态名称"
        >
        </el-table-column>
        <!--运维指标id：opsignalId-->
        <el-table-column
          prop="opsignalId"
          label="运维指标id"
        >
          <template slot-scope="scope">

            <el-tooltip class="item" effect="dark" :content="tableOpsignalIdGet(scope.row.opsignalId)" placement="top-start">
              <span>{{scope.row.opsignalId}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--阈值默认上限：upthres-->
        <el-table-column
          prop="upthres"
          label="阈值默认上限"
        >
        </el-table-column>
        <!--阈值默认下限：downthres-->
        <el-table-column
          prop="downthres"
          label="阈值默认下限"
        >
        </el-table-column>
        <!--事件默认级别：level-->
        <el-table-column
          prop="level"
          label="状态类型"
          :formatter="dealLevel"
        >
        </el-table-column>
        <!--备注：note-->
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <Status
              :server-table="serverTargetTable"
              :myData="scope.row"
              :level-list="levelList"
              @Revise='GetRevise'
              @Del='GetDel'
            />
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
    <!--    弹窗-->
    <div>
      <el-dialog :before-close="handleClose" top="5vh" title="新增运维状态" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <!--statusId-->
          <el-form-item label="状态的id" :rules="[{ required: true}]">
            <el-input
              disabled="true"
              v-model="form.statusId"
            />
<!--            :disabled="true"-->
          </el-form-item>
          <!--statusName-->
          <el-form-item label="状态名称">
            <el-input v-model="form.statusName" />
          </el-form-item>
          <!--opsignalId-->
          <el-form-item label="对应指标">
            <el-input v-model="form.opsignalId" placeholder="输入指标名称或指标id可查找对应指标" @focus="getFocus"/>
          </el-form-item>
          <!--upthres-->
          <el-form-item label="阈值上限"  :rules="[{ required: true}]">
            <el-input v-model="form.upthres" placeholder="按百分比形式输入，不需要输入百分号" />
          </el-form-item>
          <!--downthres-->
          <el-form-item label="阈值下限"  :rules="[{ required: true}]">
            <el-input v-model="form.downthres"  placeholder="按百分比形式输入，不需要输入百分号"/>
          </el-form-item>
          <!--level-->
          <el-form-item label="状态类型">
            <el-select
              :style="controlWidth"
              v-model="form.level"
              filterable
              allow-create
              default-first-option
              placeholder="请选择状态类型">
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!--note-->
          <el-form-item label="备注">
            <el-input v-model="form.note"  type="textarea"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.statusId)">确 定</el-button>
        </span>
        <!--对应指标列表-->
        <div v-show = controlShow id="targetTable">
          <el-table
            :data="targetTable"
            height="95%"
            border
            style="width: 100%">
            <el-table-column
              active-class="targetTableGetFocus"
              prop="opsignalId"
              label="指标id"
              width="105%">
            </el-table-column>
            <el-table-column
              prop="opsignalName"
              label="指标名称"
              width="100%">
            </el-table-column>
            <el-table-column label="添加">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="targetTableGetFocus(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
  import OpStatus from '../../components/Opdict/OpStatus'
  import Status from '../../components/Opdict/OpOperate/Status'
  import {getStatusCreate,getStatusDelete,getStatusPageList,getStatusUpdate} from '@/api/opdict'
  import {
    getStatusFindStatusId,
    getStatusFindStatusName,
    getStatusFindOpsignalId,
    getStatusFindUpthres,
    getStatusFindDownthres,
    getStatusFindLevel,
    getStatusFindNote,
    getSTable
  }from '@/api/opdict'
  import {getObjectDelete, getObjectUpdate} from "@/api/opdict";

  export default {
    name: 'MonitorObjectPage',
    components: {
      OpStatus,
      Status
    },
    data() {
      return {
        myStyle:{
          height:"29rem"
        },
        controlWidth:{
          width: "100%"
        },
        //*******************控制区*******************
        // 过滤参数列表
        FilterParameters: [
          {
            value: 'StatusId',
            label: '运维状态id'
          }, {
            value: 'StatusName',
            label: '运维指标名称'
          }, {
            value: 'OpsignalId',
            label: '运维指标id'
          }, {
            value: 'Upthres',
            label: '阈值上限'
          }, {
            value: 'Downthres',
            label: '阈值下限'
          }, {
            value: 'Level',
            label: '状态类型'
          }, {
            value: 'Note',
            label: '备注'
          }],
        //过滤参数的值
        FilterParameter_value: '',
        //查找输入框
        CompleteValue:'',
        //新增弹窗
        //用于显示弹窗中的表格
        controlShow: false,
        //用于显示弹窗
        dialogVisible: false,
        //弹窗表格内容
        targetTable:[],
        serverTargetTable:[],
        levelList:[
          {
            label:"正常--1",
            value: 1
          },{
            label:"隐患--2",
            value: 2
          },{
            label:"危险--3",
            value: 3
          },
        ],
        //弹窗数据
        form: {
          // 状态id
          statusId: '',
          statusName: '',
          opsignalId: '',
          upthres: '',
          downthres: '',
          level: '',
          note: ''
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
        // 每页最大数
        size : 20,
        //总条数
        totalNumber: 1200
      }
    },
    methods:{
      dealLevel(row){
        switch (row.level){
          case 1:
            return "1-正常";
          case 2:
            return "2-隐患";
          case 3:
            return "3-危险";
        }
      },
      //************************分页************************
      //处理页面初始数据
      clearDealData(){
        // 将过滤的参数和数值都清空，直接查询列表
        this.FilterParameter_value = '';
        this.CompleteValue = '';
        getStatusPageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      },
      // 使用查询的方法刷新列表
      dealData(){
        if(this.FilterParameter_value === 'StatusId'){
          getStatusFindStatusId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'StatusName'){
          getStatusFindStatusName(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'OpsignalId'){
          getStatusFindOpsignalId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Upthres'){
          getStatusFindUpthres(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Downthres'){
          getStatusFindDownthres(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Level'){
          getStatusFindLevel(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Note'){
          getStatusFindNote(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else{
          this.clearDealData()
        }
      },
      tableCellClassName({row,rowIndex}){
        row.index=rowIndex;
      },
      //鼠标放到某一行上就触发
      getNowRow(row){
        this.nowRow = row.index+1+(this.currentPage-1)*this.size;
      },
      //每页最大条数
      handleSizeChange(val) {
        this.size = val
        this.dealData()
      },
      //点击分页的某一页
      handleCurrentChange(val) {
        this.currentPage = val
        this.find();
      },
      //************************新增与查找按钮************************
      //新增功能弹窗的取消和确认
      Cancel() {
        this.$message('取消成功')
      },
      // 弹窗的新增
      Confirm(id) {
        if(id === ""){
          this.dialogVisible = true;
          this.$message.error('状态的id不能为空');
        }
        else if(this.form.downthres === '' || this.form.upthres === ''){
          this.dialogVisible = true;
          this.$message.error('请输入阈值');
        }
        else if(isNaN(this.form.downthres*1)){
          this.dialogVisible = true;
          this.$message.error('阈值上限请输入0-100数字');
        }
        else if(isNaN(this.form.upthres*1)){
          this.dialogVisible = true;
          this.$message.error('阈值下限请输入0-100数字');
        }
        else if(this.form.downthres > this.form.upthres){
          this.dialogVisible = true;
          this.$message.error('阈值上限需大于阈值下限');
        }
        else if(this.form.downthres<0 || this.form.downthres>100 || this.form.upthres<0 || this.form.upthres>100){
          this.dialogVisible = true;
          this.$message.error('阈值下限或阈值上限需在0-100之内');
        }
        else if(this.form.level !== 1 && this.form.level !== 2 && this.form.level !== 3){
          this.dialogVisible = true;
          this.$message.error('请正确的选择状态类型');
        }
        else{
          getStatusCreate(this.form).then(request=>{
            if(request.data.body){
              this.dealData();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }else{
              this.dialogVisible = true;
              this.$message({
                message: '新增失败',
                type: 'warning'
              });
            }
          });
        }
      },
      //查找按钮的事件
      find(){
        if(this.FilterParameter_value === 'StatusId'){
          getStatusFindStatusId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'StatusName'){
          getStatusFindStatusName(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'OpsignalId'){
          getStatusFindOpsignalId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Upthres'){
          getStatusFindUpthres(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Downthres'){
          getStatusFindDownthres(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Level'){
          getStatusFindLevel(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Note'){
          getStatusFindNote(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else{
          this.clearDealData();
        }
      },
      //************************修改、删除按钮************************
      //修改、删除后的表数据返回到以下两个函数
      GetRevise(msg){
        getStatusUpdate(msg).then(request=>{
          if(request.data.body){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.find();
          }else{
            super.$message({
              message: '修改',
              type: 'warning'
            });
          }
        });
      },
      GetDel(msg){
        getStatusDelete(msg).then(request=>{
          if(request.data.body === true){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.find();
          }
          else if(request.data.body === false){
            this.$message({
              message: '删除失败',
              type: 'error'
            });
          }
        });
      },
      getFocus(){
        this.controlShow = true
      },
      targetTableGetFocus(index,row){
        this.form.opsignalId = row.opsignalId;
      },
      handleClose(done){
          this.form.statusId = '';
          this.form.statusName = '';
          this.form.opsignalId = '';
          this.form.upthres = '';
          this.form.downthres = '';
          this.form.level = '';
          this.form.note = '';
          this.controlShow = false
          done();
      },
      tableOpsignalIdGet(id){
        for(let i=0;i<this.serverTargetTable.length; i++){
          if (id === this.serverTargetTable[i].opsignalId){
            return this.serverTargetTable[i].opsignalName
          }
        }
      }
    },
    mounted(){
      this.dealData();
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      }
      getSTable().then(request=>{
        this.serverTargetTable = request.data.body.slice(0, request.data.body.length)
        this.targetTable = request.data.body.slice(0, request.data.body.length)
      })
    },
    watch:{
      //当对应指标中输入东西的时候搜索
      'form.opsignalId':{
        immediate:true,
        handler(val){
          let Arr = val.split("S")
          if (Arr[0] === '')
            val = Arr[1]
          else
            val = Arr[0]
          if (val === undefined)
            val = ''
          this.targetTable = this.serverTargetTable.filter(p =>{
            return p.opsignalName.indexOf(val) !== -1 || p.opsignalId.indexOf(val) !== -1
          })

          if(val.length === 9){
            let mySearchKeyword = "A" + val.substr(0,7)
            console.log("对应指标填写完成，用于查找运维状态id的字符串为：", mySearchKeyword)
            let checkLengthArr = []
            let checkLength = 1
            getStatusFindStatusId(mySearchKeyword,1,20).then(request=>{
              checkLengthArr = request.data.body.data
              checkLength = checkLengthArr.length+1
              this.form.statusId = 'A' + val.substr(0,7) + '0' + checkLength
            })
          }
        }
      }
    },
  }
</script>

<style scoped>

  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
    height: 100%;
  }
  #Header{
    background: #f1f3f4;
  }
  /*#Main{*/
  /*  height: 28.5rem;*/
  /*}*/
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

</style>
