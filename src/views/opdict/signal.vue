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
          <el-button type="primary" id="Find" @click="currentPage = 1,Find()">过滤</el-button>
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
          :formatter="dealParaType"
        >
        </el-table-column>
        <!--运维指标计算公式：para-->
        <el-table-column
          prop="para"
          label="运维指标计算公式"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="tableOpsignalIdGet(scope.row.paraType,scope.row.para)" placement="top-start">
              <span>{{scope.row.para}}</span>
            </el-tooltip>
          </template>
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
    <el-dialog title="新增运维指标" :visible.sync="dialogVisible" width="35%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="指标id" :rules="[{ required: true}]">
          <el-input
            disabled="true"
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
          <el-button type="primary" @click="dialogVisible = false,Confirm()">确 定</el-button>
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
            prop="objectId"
            label="对象id"
            width="100%">
          </el-table-column>
          <el-table-column
            prop="objectName"
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
import {
  getOpDictSignalPageList,
  getOpDictSignalFindopsignalId,
  getOpDictSignalFindopsignalName,
  getOpDictSignalFindparaType,
  getOpDictSignalFindpara,
  getOpDictSignalFindnote,
  getOpDictSignalCreate,
  getOpDictSignalDelete,
  getOpDictSignalUpdate,
  getOTable
} from '@/api/opdict'
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
      FilterParameters: [
        {
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
      targetTable:[],
      //右侧的指标表格
      serverTargetTable:[],
      //指标类型
      opsignalId_types:[
        {
        value: 1,
        label:'1--监控对象',
      },{
        value: 2,
        label:'2--计算公式',
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
    dealParaType(row){
      switch (row.paraType){
        case 1:
          return "1-监控对象";
        case 2:
          return "2-计算公式";
      }
    },
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
    Confirm() {
      //非空验证
      if(this.form.opsignalId === ""){
        this.dialogVisible = true;
        this.$message.error('运维指标id不能为空');
      }
      else if(this.form.paraType !== 1 && this.form.paraType !== 2){
        this.dialogVisible = true;
        this.$message.error('请正确选择指标类型');
      }
      else if(this.form.paraType === 1 && this.form.objectIds.length !== 1){
        this.dialogVisible = true;
        this.$message.error('指标类型为1时请输入单独的对象id作为指标公式');
      }
      else if(this.form.paraType === 2 && !(this.form.objectIds.length > 1)){
        this.dialogVisible = true;
        this.$message.error('指标类型为2时请输入对象的计算公式作为指标公式');
      }
      else{
        getOpDictSignalCreate(this.form).then(request=>{
          if(request.data.body){
            this.Find();
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        });
      }
    },
    //查找按钮的事件
    Find(){
      if(this.FilterParameter_value === 'opsignalId'){
        getOpDictSignalFindopsignalId(this.CompleteValue,this.currentPage,this.size).then(request=>{
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
        }else{
          super.$message({
            message: request.data.msg,
            type: 'warning'
          });
        }
      });
    },
    GetDel(msg){
      getOpDictSignalDelete(msg).then(request=>{
        if(request.data.body){
          this.Find();
          this.$message({
            message: '删除成功',
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
      val = myValArr[myValArr.length-1];
      this.form.para = FrontStr+"@"+row.objectId;
    },
    // 处理表格中的指标公式的解释
    tableOpsignalIdGet(type, id){
      if(type === 1){
        let myIdArr = id.split("@")
        id = myIdArr[1]
        for(let i=0;i<this.serverTargetTable.length; i++){
          if (id === this.serverTargetTable[i].objectId){
            return this.serverTargetTable[i].objectName
          }
        }
      }
      else{
        // 获取所有的id和操作数到myIDArr里
        let myNumberArr = id.split(/[-,+,*,/,(,),^,@]/);
        myNumberArr = myNumberArr.filter(function (s) {
          return s && s.trim();
        });
        // 获取带有@的id以及不带@的操作数的数组
        let myIdArr = id.split(/[-,+,*,/,(,),^]/);
        myIdArr = myIdArr.filter(function (s) {
          return s && s.trim();
        });
        // 获取所有的字符到myOperatorArr里
        let myOperatorArr = id.split(/[0,1,2,3,4,5,6,7,8,9]/);
        myOperatorArr = myOperatorArr.filter(function (s) {
          return s && s.trim();
        });
        // 将对应的id变为名称，对于操作数保留
        let myNameArr = Array
        for(let i=0; i<myIdArr.length; i++){
          let myOperatorAndIdArr = myIdArr[i].split("@")
          if(myOperatorAndIdArr.length === 2){
            for(let j=0; j<this.serverTargetTable.length; j++){
              if(this.serverTargetTable[j].objectId === myOperatorAndIdArr[1]){
                myNameArr[i] = this.serverTargetTable[j].objectName
              }
            }
          }
          else{
            myNameArr[i] = myIdArr[i]
          }

        }
        for(let i=0;i<myNameArr.length; i++){
          if(myNameArr[i] === '' || myNameArr===undefined || myNameArr === null){
            myNameArr.splice(i,1)
          }
        }
        let myTip = ''
        for(let i=0;i<myOperatorArr.length;i++){
          myTip += myOperatorArr[i]
          if (myNameArr[i])
            myTip += myNameArr[i]
        }
        return myTip
      }
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索
    'form.para':{
      immediate:true,
      handler(val){
        //当输入框里值为空时，将提示标为指定内容
        if(val === '' || val === undefined || val === null){
          this.tip = '请输入指标公式'
        }
        else{
          //获取@符号后面的数据，用于搜索
          let myValArr = val.split("@");
          let mySearch = myValArr[myValArr.length-1];
          // 获取所有的id和操作数到myNumberArr里
          let myNumberArr = val.split(/[-,+,*,/,(,),^,@]/);
          myNumberArr = myNumberArr.filter(function (s) {
            return s && s.trim();
          });
          // 获取带有@的id以及不带@的操作数的数组
          let myIdArr = val.split(/[-,+,*,/,(,),^]/);
          myIdArr = myIdArr.filter(function (s) {
            return s && s.trim();
          });
          this.form.objectIds = myIdArr;
          //获取所有的符号，用于添加在注释的指标名称之间解释指标名称作用
          let myOperatorArr = val.split(/[0,1,2,3,4,5,6,7,8,9]/);
          myOperatorArr = myOperatorArr.filter(function (s) {
            return s && s.trim();
          });
          // 将id转化为名称
          let myNameArr = []
          for(let i=0; i<myIdArr.length; i++){
            let myOperatorAndIdArr = myIdArr[i].split("@")
            if(myOperatorAndIdArr.length === 2){
              for(let j=0; j<this.serverTargetTable.length; j++){
                if(this.serverTargetTable[j].objectId === myOperatorAndIdArr[1]){
                  myNameArr[i] = this.serverTargetTable[j].objectName
                }
              }
            }
            else{
              myNameArr[i] = myIdArr[i]
            }

          }
          //将指标名称和运算符组合成一句话传入到tip中
          this.tip = ''

          for(let i=0;i<myOperatorArr.length;i++){
            this.tip += myOperatorArr[i]
            if (myNameArr[i])
              this.tip += myNameArr[i]
          }
          this.targetTable = this.serverTargetTable.filter(p =>{
            return p.objectName.indexOf(mySearch) !== -1 || p.objectId.indexOf(mySearch) !== -1
          })

          // 获取只有id的数组
          let myOnlyIdArr = []
          for(let i=0,j=0;i<myIdArr.length;i++){
            if(myIdArr[i] !== '' && myIdArr[i] !== '@' && myIdArr[i].indexOf("@") !== -1){
              myOnlyIdArr[j] = myIdArr[i].substr(1,7)
              j++
            }
          }
          // 获取最小的id并将其补全七位
          console.log("myOnlyIdArr：",myOnlyIdArr)
          if(myOnlyIdArr !== []){

          }
          let getID = Math.min.apply(null,myOnlyIdArr);
          if(getID !== Infinity){
            for(let i=0;i<7;i++){
              if(getID.length !== 7) getID = "0"+getID
              else if(getID.length === 7) break
            }
          }
          else{
            getID = '1'
          }
          console.log('最小的id为：',getID)
          // 根据最小id查询已有的流水号
          let mySearchKeyword = "S"+getID
          let searchArr = []
          getOpDictSignalFindopsignalId(mySearchKeyword,1,40).then(request=>{
            searchArr = request.data.body.data;
            console.log("搜索到的数据为：",searchArr)
            let dealSearchArr =[]
            for(let i=0;i<searchArr.length;i++){
              console.log("即将处理的字符串为：",searchArr[i].opsignalId)
              dealSearchArr[i] = searchArr[i].opsignalId.substr(8,2)
            }
            let myIndex = Math.max.apply(null,dealSearchArr)+1
            if(myIndex !== Infinity && myIndex<10){
              myIndex = "0"+myIndex
            }
            if(myIndex === '0-Infinity'){
              myIndex = '01'
            }
            console.log("经过处理后的序列号为：",dealSearchArr)
            console.log("即将使用的序列号为：",myIndex)
            this.form.opsignalId = "S"+getID +myIndex
          })
        }

      }
    },
  },
  mounted(){
    this.dealData();
    this.myStyle = {
      height: document.body.clientHeight-50-30-64-70+"px"
    }
    getOTable().then(request=>{
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
