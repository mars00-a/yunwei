<template>
  <el-container>
    <el-header id="Header">
      <el-row :gutter="10" id="Control">
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
          <!--查找输入框-->
          <el-input v-model="CompleteValue" placeholder="请输入内容"/>
        </el-col>
        <el-col :span="13">
          <el-button type="primary" id="Find" @click="currentPage = 1,Find()">过滤</el-button>
          <el-button type="primary" @click="dealData()">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
        </div></el-col>
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
        <el-table-column
          width="50"
          type="index"
          label="序号"
        >
        </el-table-column>
        <!--运维事件id：opcid-->
        <el-table-column
          prop="opcid"
          label="运维事件id"
        >
        </el-table-column>
        <!--运维事件名称：opcidName-->
        <el-table-column
          prop="opcidName"
          label="运维事件名称"
        >
        </el-table-column>
        <!--所属系统id：systemId-->
        <el-table-column
          prop="systemId"
          label="所属系统id"
          :formatter="dealSystemId"
        >
        </el-table-column>
        <!--事件类型：type-->
        <el-table-column
          prop="type"
          label="事件来源类型"
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
        <!--事件类型：eventType-->
        <el-table-column
          prop="eventType"
          label="事件类型"
          :formatter="dealEventType"
        >
        </el-table-column>
        <!--默认阈值：threshold-->
        <el-table-column
          prop="threshold"
          label="默认阈值"
        >
        </el-table-column>
        <!--事件默认级别：level-->
        <el-table-column
          prop="level"
          label="事件默认级别"
        >
        </el-table-column>
        <!--备注：note-->
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>
        <!--操作-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <OpOperateOpcid
              :server-table="serverTargetTable"
              :MyData="scope.row"
              :SourceTypes="EventSourceTypes"
              @Revise='GetRevise'
              @Del='GetDel'/>
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
    <!--弹窗-->
    <el-dialog top="1vh" title="新增运维事件" :visible.sync="dialogVisible" width="30%">
      <!--            左侧表单栏-->
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="事件id" :rules="[{ required: true}]">
            <el-input
              disabled="true"
              v-model="form.opcid" />
          </el-form-item>
          <el-form-item label="事件名称">
            <el-input v-model="form.opcidName" />
          </el-form-item>
          <el-form-item label="所属系统">
            <el-select
              :style="controlWidth"
              v-model="form.systemId"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in BelongingSystems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件来源类型">
            <el-select
              :style="controlWidth"
              v-model="form.type"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in EventSourceTypes"
                :key=item
                :label=item
                :value=item
              />
            </el-select>
          </el-form-item>
          <el-form-item label="对应指标">
            <el-input  placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.opsignalId" />
          </el-form-item>
          <el-form-item label="事件类型">
            <el-select
              :style="controlWidth"
              v-model="form.eventType"
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in EventTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件阈值">
              <el-input v-model="form.threshold" placeholder="事件阈值取值范围：0-100"/>
          </el-form-item>
          <el-form-item label="事件默认级别">
              <el-input v-model="form.level" placeholder="事件默认级别范围：1-6"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.note"/>
          </el-form-item>
        </el-form>
        <span id="myFooter" slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible=false,Confirm()">确 定</el-button>
        </span>
      <!--            右侧指标信息栏-->
      <div v-show = controlShow id="targetTable">
        <el-table
          :data="targetTable"
          height="660"
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
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpOperateOpcid from '../../components/Opdict/OpOperate/Opcid'
import {getOpcidPageList, getOpcidCreate, getOpcidTypeList, getOpcidDelete, getOpcidUpdate, getOpcidFindOpcid, getOpcidFindOpcidName,
  getOpcidFindSystemId, getOpcidFindType, getOpcidFindOpsignalId, getOpcidFindEventType, getOpcidFindThreshold, getOpcidFindLevel,
  getOpcidFindNote, getSTable} from '@/api/opdict'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpOperateOpcid
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
      FilterParameters: [
        {
        value: 'opcid',
        label: '运维事件id'
      },{
        value: 'opcidName',
        label: '运维事件名称'
      },{
        value: 'systemId',
        label: '所属系统id'
      },{
        value: 'type',
        label: '事件来源类型'
      },{
        value: 'opsignalId',
        label: '运维指标id'
      },{
        value: 'eventType',
        label: '事件类型'
      },{
        value: 'threshold',
        label: '默认阈值'
      },{
        value: 'level',
        label: '事件默认级别'
      },{
        value: 'note',
        label: '备注'
      }],
      //过滤参数
      FilterParameter_value: '',
      //查找输入框
      CompleteValue:'',
      //新增
      controlShow: false,
      dialogVisible: false,
      form: {
        opcid : '',//事件id
        opcidName: '',//事件名称
        systemId:'',//所属系统
        type:'',//事件来源类型
        opsignalId:'',//对应指标
        eventType:'',//事件类型
        threshold: '',//阈值
        level:'',//事件默认级别
        note: '',//备注
      },
      //右侧的指标表格
      targetTable:[],
      //右侧的指标表格
      serverTargetTable:[],
      // 所属系统
      BelongingSystems: [],
      //事件来源类型
      EventSourceTypes: [],
      //事件类型
      EventTypes: [
        {
          value:1,
          label:'1-报警'
        },{
          value:2,
          label:'2-恢复'
        }],
      //*******************中间主体*******************
      //表格数据
      tableData: [],
      //*******************分页尾部*******************
      // 分页
      //currentPage进入的第一页是第几页
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
  methods: {
    //************************分页************************
    dealSystemId(row){
      switch (row.systemId){
        case 0:
          return "0-所有系统";
        case 1:
          return "1-SK3000";
        case 2:
          return "2-APP服务";
        case 3:
          return "3-智能家居";
        case 4:
          return "4-智慧用电";
      }
    },
    dealEventType(row){
      switch (row.eventType){
        case 1:
          return "1-报警";
        case 2:
          return "2-恢复";
      }
    },
    //处理页面初始数据
    dealData(){
      getOpcidPageList(this.currentPage,this.size).then(request=>{
        this.totalNumber = request.data.body.total;
        this.tableData = request.data.body.data;
      });
      this.FilterParameter_value = '';
      this.CompleteValue='';
    },
    //下拉框数据
    dropDownBox(){
      getOpcidTypeList().then(request=>{
        this.EventSourceTypes = request.data.body;
      });
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
      this.size = val;
      this.Find();
    },
    //当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Find();
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(index,row){
      this.form.opsignalId = row.opsignalId;
    },
    //************************新增与查找按钮************************
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm() {
      if(this.form.opcid === ""){
        this.dialogVisible = true;
        this.$message.error('运维状态的id不能为空');
      }
      else if(isNaN(this.form.threshold*1)){
        this.dialogVisible = true;
        this.$message.error('事件阈值取值应为数字');
      }
      else if(this.form.threshold<0 || this.form.threshold>100){
        this.dialogVisible = true;
        this.$message.error('事件阈值取值范围为0到100');
      }
      else if(isNaN(this.form.level*1)){
        this.dialogVisible = true;
        this.$message.error('事件默认级别的值应为数字');
      }
      else if(this.form.level<1 || this.form.level>6){
        this.dialogVisible = true;
        this.$message.error('事件默认级别范围为1到6');
      }
      else{
        getOpcidCreate(this.form).then(request=>{
          if(request.data.body){
            this.Find();
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }else {
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
      this.currentPage = 1
      if(this.FilterParameter_value === 'opcid'){
        getOpcidFindOpcid(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'opcidName') {
        getOpcidFindOpcidName(this.CompleteValue, this.currentPage, this.size).then(request => {
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'systemId'){
        getOpcidFindSystemId(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'type'){
        getOpcidFindType(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'opsignalId'){
        getOpcidFindOpsignalId(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'eventType'){
        getOpcidFindEventType(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'threshold'){
        getOpcidFindThreshold(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'level'){
        getOpcidFindLevel(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'note'){
        getOpcidFindNote(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else{
        this.dealData();
      }
    },
    //************************修改、删除按钮************************
    //修改、删除后的表数据返回到以下两个函数
    GetRevise(msg) {
      getOpcidUpdate(msg).then(request=>{
        if(request.data.body){
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.Find();
        }else{
          super.$message({
            message: request.data.msg,
            type: 'warning'
          });
        }
      });
    },
    GetDel(msg) {
      getOpcidDelete(msg).then(request=>{
        if(request.data.body){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.Find();
        }else{
          super.$message({
            message: request.data.msg,
            type: 'warning'
          });
        }
      });
    },
    // 处理表格中运维指标id的提示
    tableOpsignalIdGet(id){
      for(let i=0;i<this.serverTargetTable.length; i++){
        if (id === this.serverTargetTable[i].opsignalId){
          return this.serverTargetTable[i].opsignalName
        }
      }
    }
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
          val = '';
        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.opsignalName.indexOf(val) !== -1 || p.opsignalId.indexOf(val) !== -1
        })


        if(this.form.eventType !== '' && val.length === 10){
          this.form.opcid = 'E' + val.substr(1,7) + '0' + this.form.eventType
        }
      }
    },
    'form.eventType':{
      immediate:true,
      handler(val) {
        if(this.form.opsignalId.length === 10 && val !== ''){
          this.form.opcid = 'E' + this.form.opsignalId.substr(1,7) + '0' + this.form.eventType
        }
      }
    }

  },
  mounted(){
    this.dealData();
    this.myStyle = {
      height: document.body.clientHeight-50-30-64-70+"px"
    };
    this.dropDownBox();
    getSTable().then(request=>{
      this.serverTargetTable = request.data.body.slice(0, request.data.body.length)
      this.targetTable = request.data.body.slice(0, request.data.body.length)
    })
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
  .dialog-footer{
    margin: 0 auto;
  }
  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
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
  #myFooter{
    position: absolute;
    right: 4vh;
    bottom: 2vh;
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
