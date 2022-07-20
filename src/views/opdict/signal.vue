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
          <el-button type="primary" id="Find" @click="Find()">过滤</el-button>
          <el-button type="primary" @click="dealData()">恢复</el-button>
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
        <!--序号-->
        <el-table-column
          width="50"
          type="index"
          label="序号"
        >
        </el-table-column>
        <!--运维指标id：opsignalId-->
        <el-table-column
          prop="opsignalId"
          label="运维指标id"
        >
        </el-table-column>
        <!--运维指标名称：opsignalName-->
        <el-table-column
          prop="opsignalName"
          label="运维指标名称"
        >
        </el-table-column>
        <!--运维指标参数类型：paraType-->
        <el-table-column
          prop="paraType"
          label="运维指标参数类型"
        >
        </el-table-column>
        <!--运维指标计算公式：para-->
        <el-table-column
          prop="para"
          label="运维指标计算公式"
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
            <Signal
              :server-table="serverTargetTable"
              :myData="scope.row"
              @Revise='GetRevise'
              @Del='GetDel'/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <!--当前行数与总数据条数-->
      <div id="now_line_number">第{{nowRow}}条/共{{totalNumber}}条数据</div>
      <!--分页-->
      <div id="paginate">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200, 300]"
          :page-size="size"
          layout="sizes, prev, pager, next, jumper"
          :total="totalNumber"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-footer>
<!--    弹窗-->
    <el-dialog title="新增运维指标" :visible.sync="dialogVisible" width="35%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="指标id" :rules="[{ required: true}]">
          <el-input
            v-model="form.opsignalId" />
        </el-form-item>
        <el-form-item label="指标名称">
          <el-input v-model="form.opsignalName" />
        </el-form-item>
        <el-form-item label="指标类型">
          <el-select
            :style="controlWidth"
            v-model="form.paraType"
            filterable
            allow-create
            default-first-option
            placeholder="请选择指标类型">
            <el-option
              v-for="item in opsignalId_types"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="指标公式">
          <el-tooltip class="item" effect="dark" :content="tip" placement="bottom">
            <el-input placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.para" />
          </el-tooltip>
        </el-form-item>
        <!--note-->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.note"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm(form.f_opsignal_id)">确 定</el-button>
        </span>

      <!--        弹窗的右侧表单-->
      <div v-show = controlShow id="targetTable">
        <el-table
          :data="targetTable"
          height="480"
          border
          style="width: 100%">
          <el-table-column
            active-class="targetTableGetFocus"
            prop="id"
            label="对象id"
            width="100%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="对象名称"
            width="100%">
          </el-table-column>
          <el-table-column label="添加">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="targetTableGetFocus(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import Signal from '../../components/Opdict/OpOperate/Signal'
import {getOpDictSignalPageList, getOpDictSignalFindopsignalId, getOpDictSignalFindopsignalName, getOpDictSignalFindparaType, getOpDictSignalFindpara,
  getOpDictSignalFindnote, getOpDictSignalCreate, getOpDictSignalDelete, getOpDictSignalUpdate} from '@/api/opdict'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    Signal
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
      FilterParameters: [{
        value:'opsignalId',
        label:'运维指标id'
      },{
        value:'opsignalName',
        label:'运维指标名称'
      },{
        value:'paraType',
        label:'运维指标参数类型'
      },{
        value:'para',
        label:'运维指标计算公式'
      },{
        value:'note',
        label:'备注'
      },],
      //过滤参数
      FilterParameter_value: '',
      //查找输入框
      CompleteValue:'',
      //新增功能的弹窗
      //用于显示弹窗
      dialogVisible: false,
      //用于显示公式表格
      controlShow: false,
      //弹窗的内容
      form: {
        opsignalId: '',
        opsignalName: '',
        paraType: '',
        para: '',
        note: '',
        objectIds: [],
      },
      tip:'此处输入指标公式',
      //右侧的指标表格
      targetTable:[
        {
          id:'001',
          name:'指标名称1'
        },{
          id:'002',
          name:'指标名称2'
        },{
          id:'003',
          name:'指标名称3'
        },{
          id:'004',
          name:'指标名称4'
        },{
          id:'005',
          name:'指标名称1'
        },{
          id:'006',
          name:'指标名称2'
        },{
          id:'007',
          name:'指标名称3'
        },{
          id:'008',
          name:'指标名称4'
        },{
          id:'009',
          name:'指标名称1'
        },{
          id:'010',
          name:'指标名称2'
        },{
          id:'011',
          name:'指标名称3'
        },{
          id:'012',
          name:'指标名称4'
        },{
          id:'013',
          name:'指标名称1'
        },{
          id:'014',
          name:'指标名称2'
        },{
          id:'015',
          name:'指标名称3'
        },{
          id:'016',
          name:'指标名称4'
        },{
          id:'017',
          name:'指标名称1'
        },{
          id:'018',
          name:'指标名称2'
        },{
          id:'019',
          name:'指标名称3'
        },{
          id:'020',
          name:'指标名称4'
        },
      ],
      //右侧的指标表格
      serverTargetTable:[
        {
          id:'001',
          name:'指标名称1'
        },{
          id:'002',
          name:'指标名称2'
        },{
          id:'003',
          name:'指标名称3'
        },{
          id:'004',
          name:'指标名称4'
        },{
          id:'005',
          name:'指标名称1'
        },{
          id:'006',
          name:'指标名称2'
        },{
          id:'007',
          name:'指标名称3'
        },{
          id:'008',
          name:'指标名称4'
        },{
          id:'009',
          name:'指标名称1'
        },{
          id:'010',
          name:'指标名称2'
        },{
          id:'011',
          name:'指标名称3'
        },{
          id:'012',
          name:'指标名称4'
        },{
          id:'013',
          name:'指标名称1'
        },{
          id:'014',
          name:'指标名称2'
        },{
          id:'015',
          name:'指标名称3'
        },{
          id:'016',
          name:'指标名称4'
        },{
          id:'017',
          name:'指标名称1'
        },{
          id:'018',
          name:'指标名称2'
        },{
          id:'019',
          name:'指标名称3'
        },{
          id:'020',
          name:'指标名称4'
        },
      ],
      //指标类型
      opsignalId_types:[
        {
        value: 0,
        label:'0--监控对象',
      },{
        value: 1,
        label:'1--计算公式',
      }],
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
      getOpDictSignalPageList(this.currentPage,this.size).then(request=>{
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
        this.$message.error('运维指标id不能为空');
      }
      else{
        console.log(this.form);
        getOpDictSignalCreate(this.form).then(request=>{
          if(request.data.body){
            this.Find();
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }
        });
      }
    },
    //查找按钮的事件
    Find(){
      if(this.FilterParameter_value === 'opsignalId'){
        getOpDictSignalFindopsignalId(this.CompleteValue,this.currentPage,this.size).then(request=>{
          console.log(request);
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'opsignalName'){
        getOpDictSignalFindopsignalName(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'paraType'){
        getOpDictSignalFindparaType(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'para'){
        getOpDictSignalFindpara(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'note'){
        getOpDictSignalFindnote(this.CompleteValue,this.currentPage,this.size).then(request=>{
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
      getOpDictSignalUpdate(msg).then(request=>{
        if(request.data.body){
          this.Find();
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      });
    },
    GetDel(msg){
      getOpDictSignalDelete(msg).then(request=>{
        if(request.data.body){
          this.Find();
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      });
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(row){
      let val = this.form.para
      let myValArr = val.split("@");
      let FrontArr = val.split("@",myValArr.length-1);
      let FrontStr = '';
      for(let i = 0;i<myValArr.length-1;i++){
        if (FrontArr[i] === "(") {
          FrontStr += FrontArr[i]
        }else if(FrontArr[i] === ""){
        }else{
          FrontStr += "@"+FrontArr[i]
        }
      }
      // console.log("maVal:",myVal)
      // console.log("FrontArr",FrontArr)
      // console.log("FrontStr",FrontStr)
      val = myValArr[myValArr.length-1];
      this.form.para = FrontStr+"@"+row.id;
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索
    'form.para':{
      immediate:true,
      handler(val){
        //当输入框里值为空时，将提示标为指定内容
        if(val === ''||val === undefined||val === null){
          // console.log("发生了改变，值为：",val)
          this.tip = '请输入指标公式'
        }
        //获取@符号后面的数据，用于搜索
        let myValArr = val.split("@");
        let mySearch = myValArr[myValArr.length-1];
        //获取所有的id变成数组，用于查找指标名称
        let myIdArr = val.split(/[-,+,*,/,(,),^,@]/);
        myIdArr = myIdArr.filter(function (s) {
          return s && s.trim();
        });
        this.form.objectIds = myIdArr;
        // console.log("id数组为：",myIdArr)
        //获取所有的符号，用于添加在注释的指标名称之间解释指标名称作用
        let myOperatorArr = val.split(/[0,1,2,3,4,5,6,7,8,9]/);
        myOperatorArr = myOperatorArr.filter(function (s) {
          return s && s.trim();
        });
        // console.log("符号数组为：",myOperatorArr)
        //以id为依据获取到对应的指标名称
        let myNameArr = []
        for(let i=0; i<myIdArr.length; i++){
          for(let j=0; j<this.serverTargetTable.length; j++){
            if(this.serverTargetTable[j].id === myIdArr[i]){
              // console.log("发现了指定id的指标")
              // console.log("对应的指标id和指标名称为：",this.serverTargetTable[j].id,this.serverTargetTable[j].name)
              myNameArr[i] = this.serverTargetTable[j].name
            }
          }
        }
        // console.log("指标名称数组为：",myNameArr)
        //将指标名称和运算符组合成一句话传入到tip中
        this.tip = ''
        for(let i=0;i<myOperatorArr.length;i++){
          this.tip += myOperatorArr[i]
          if (myNameArr[i])
            this.tip += myNameArr[i]
        }


        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.name.indexOf(mySearch) !== -1 || p.id.indexOf(mySearch) !== -1
        })
      }
    },
    'tip':{
      handler(val){
        if(val === ''){
          this.tip = "请输入指标公式"
        }
      }
    }
  },
  mounted(){
    this.dealData();
    this.myStyle = {
      height: document.body.clientHeight-50-30-64-70+"px"
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
</style>
