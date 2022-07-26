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
          <!--搜索框-->
          <el-input v-model="CompleteValue" placeholder="请输入内容"/>
        </el-col>
        <!--查找、新增功能按钮-->
        <el-col :span="13">
          <el-button type="primary" id="Find" @click="currentPage = 1,Find()">过滤</el-button>
          <el-button @click="dealData" type="primary">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="myStyle" id="Main" >
      <!--表格主体-->
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
        <!--监测对象id：objectId-->
        <el-table-column
          prop="objectId"
          label="监测对象id"
         >
        </el-table-column>
        <!--监控对象所属系统：systemName-->
        <el-table-column
          prop="systemName"
          label="监控对象所属系统"
          >
        </el-table-column>
        <!--监控对象所属模块：moduleName-->
        <el-table-column
          prop="moduleName"
          label="监控对象所属模块"
         >
        </el-table-column>
        <!--监测对象名称：objectName-->
        <el-table-column
          prop="objectName"
          label="监测对象名称"
          >
        </el-table-column>
        <!--监测对象类型：category-->
        <el-table-column
          prop="category"
          label="监测对象类型"
         >
        </el-table-column>
        <!--监测内容：item-->
        <el-table-column
          prop="item"
          label="监测内容"
        >
        </el-table-column>
        <!--数据类型：type-->
        <el-table-column
          prop="type"
          label="数据类型"
          :formatter="stateFormat"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <OpOperateObject
              :myData="scope.row"
              :Modules="BelongingModules"
              :Systems="BelongingSystems"
              :Types="ObjectTypes"
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
    <div>
      <el-dialog top="7vh" title="新建检测对象" :visible.sync="dialogVisible" width="35%">
        <!--弹窗表单-->
        <el-form ref="form" :model="form" label-width="80px">
          <!--监测对象id：f_object_id-->
          <el-form-item label="监控的id" :rules="[{ required: true}]">
            <el-input
              v-model="form.objectId" />
          </el-form-item>
          <!--监控对象所属系统：f_system_name-->
          <el-form-item label="所属系统">
            <el-select
              :style="controlWidth"
              v-model="form.systemName"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <el-option
                v-for="item in BelongingSystems"
                :key=item
                :label=item
                :value=item
              />
            </el-select>
          </el-form-item>
          <!--监控对象所属模块：f_module_name-->
          <el-form-item label="所属模块">
            <el-select
              :style="controlWidth"
              v-model="form.moduleName"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属模块"
            >
              <el-option
                v-for="item in BelongingModules"
                :key=item
                :label=item
                :value=item
              />
            </el-select>
          </el-form-item>
          <!--监测对象名称：f_object_name-->
          <el-form-item label="对象名称">
            <el-input v-model="form.objectName" />
          </el-form-item>
          <!--监测对象类型：f_category-->
          <el-form-item label="对象类型">
            <el-select
              :style="controlWidth"
              v-model="form.category"
              filterable
              allow-create
              default-first-option
              placeholder="请选择对象类型"
            >
              <el-option
                v-for="item in ObjectTypes"
                :key=item
                :label=item
                :value=item
              />
            </el-select>
          </el-form-item>
          <!--监测内容：f_item-->
          <el-form-item label="检测内容">
            <el-input v-model="form.item" />
          </el-form-item>
          <!--数据类型：f_type-->
          <el-form-item label="数据类型">
            <el-select
              :style="controlWidth"
              v-model="form.type"
              placeholder="请选择数据类型">
              <el-option
                v-for="item in DataTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.objectId)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpOperateObject from '../../components/Opdict/OpOperate/Object'
import {getObjectPageList, getObjectSystemList, getObjectModuleList, getObjectCategoryList, getObjectCreate, getObjectDelete, getObjectUpdate,
  getObjectFindObjectId, getObjectFindSystemName, getObjectFindModuleName, getObjectFindObjectName, getObjectFindCategory, getObjectFindItem,
  getObjectFindType,} from '@/api/opdict'
export default{

  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpOperateObject
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
      //过滤参数下拉框
      FilterParameters: [
        {
        value: 'ObjectId',
        label: '监测对象ID'
      }, {
        value: 'SystemName',
        label: '监控对象所属系统'
      }, {
        value: 'ModuleName',
        label: '监控对象所属模块'
      }, {
        value: 'ObjectName',
        label: '监控对象名称'
      }, {
        value: 'Category',
        label: '监控对象类型'
      }, {
        value: 'Item',
        label: '监测内容'
      }, {
        value: 'Type',
        label: '数据类型'
      }],
      //过滤参数
      FilterParameter_value: '',
      //查找输入框
      CompleteValue:'',
      //新增按钮数据，如下：
      //用于弹窗的显示
      dialogVisible: false,
      //弹窗表单数据
      form: {
        //监控的id
        objectId:'',
        //所属系统
        systemName:'',
        //所属模块
        moduleName:'',
        //对象名称
        objectName:'',
        //对象类型
        category:'',
        //检测内容
        item:'',
        //数据类型
        type:'',
      },
      // 所属模组下拉框数组
      BelongingModules:[],
      // 所属系统下拉框
      BelongingSystems: [],
      // 对象类型下拉框数组
      ObjectTypes: [],
      // 数据类型下拉框数组
      DataTypes: [
        {
          value: 1,
          label:'1——是/否'
        },
        {
          value: 2,
          label:'2——整型'
        }
      ],
      scope:'',
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
    stateFormat(row, column){
      if(row.type === 1){
        return "1——是/否"
      }
      if(row.type === 2){
        return "2——整型"
      }
    },
    dealData(){
      getObjectPageList(this.currentPage,this.size).then(request=>{
        this.totalNumber = request.data.body.total;
        this.tableData = request.data.body.data;
      });
      this.FilterParameter_value = '';
      this.CompleteValue='';
    },
    //下拉框数据
    dropDownBox(){
      getObjectSystemList().then(request=>{
        this.BelongingSystems = request.data.body;
      });
      getObjectModuleList().then(request=>{
        this.BelongingModules = request.data.body;
      });
      getObjectCategoryList().then(request=>{
        this.ObjectTypes = request.data.body;
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
    //************************新增与查找按钮************************
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm(id) {
      //非空验证与数据传送
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('监控的id不能为空');
      }
      else{
        getObjectCreate(this.form).then(request=>{
          if(request.data.body){
            this.Find();
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }else {
            this.$message({
              message: request.data.msg,
              type: 'error'
            });
          }
        });
      }
    },
    //查找按钮的事件
    Find(){
      if(this.FilterParameter_value === 'ObjectId'){
        getObjectFindObjectId(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'SystemName'){
        getObjectFindSystemName(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'ModuleName'){
        getObjectFindModuleName(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'ObjectName'){
        getObjectFindObjectName(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'Category'){
        getObjectFindCategory(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'Item'){
        getObjectFindItem(this.CompleteValue,this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      }
      else if(this.FilterParameter_value === 'Type'){
        getObjectFindType(this.CompleteValue,this.currentPage,this.size).then(request=>{
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
    GetRevise(msg){
      getObjectUpdate(msg).then(request=>{
        if(request.data.body){
          this.$message({
            message: '修改成功',
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
    GetDel(msg){
      getObjectDelete(msg).then(request=>{
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
  },
  mounted(){
    this.dealData();
    this.dropDownBox();
    this.myStyle = {
      height: document.body.clientHeight-50-30-64-70+"px"
    }
  },
  watch:{
    'form.systemName':{
      immediate:true,
      handler(val){
        if(this.form.systemName !== '' && this.form.moduleName !== ''){
          console.log("触发了属性的监视，其中所属系统和所属模块分别为：",this.form.systemName,this.form.moduleName)
          let systemIndex = ''
          let moduleIndex = ''
          if (this.form.systemName === '所有系统') systemIndex = '00'
          else if (this.form.systemName === 'SK3000') systemIndex = '01'
          else if (this.form.systemName === 'APP') systemIndex = '02'
          else if (this.form.systemName === '智能家居') systemIndex = '03'
          else if (this.form.systemName === '智慧控电') systemIndex = '04'
          else if (this.form.systemName === '智慧用电') systemIndex = '05'

          if(this.form.moduleName === '硬件') moduleIndex = '00'
          else if(this.form.moduleName === '系统服务') moduleIndex = '01'
          else if(this.form.moduleName === '工作状态') moduleIndex = '02'
          else if(this.form.moduleName === '授权状态') moduleIndex = '03'
          else if(this.form.moduleName === '时刻乐居设备接入') moduleIndex = '04'
          else if(this.form.moduleName === '物联网设备接入') moduleIndex = '05'
          else if(this.form.moduleName === '语音设备接入') moduleIndex = '06'
          else if(this.form.moduleName === '报警设备接入（新）') moduleIndex = '07'
          else if(this.form.moduleName === '报警设备接入（旧）') moduleIndex = '08'
          else if(this.form.moduleName === '设备接入层') moduleIndex = '09'
          else if(this.form.moduleName === '消息队列') moduleIndex = '10'
          else if(this.form.moduleName === '网关接入') moduleIndex = '11'
          else if(this.form.moduleName === '设备数') moduleIndex = '12'
          else if(this.form.moduleName === '用户数') moduleIndex = '13'

          let searchFrontKeyword = systemIndex + moduleIndex
          let serverSearchArr = []
          console.log("被用于搜索的前半部分关键字是：",searchFrontKeyword)
          for(let i=0;1<10;i++){
            // index就是流水号
            let index =''
            if(i<10) index = "00"+i
            else if(i<100) index = "0"+i
            else index = i+''
            let searchKeyword = searchFrontKeyword + index
            let total;
            getObjectFindObjectId(searchKeyword,1,10).then(request=>{
              // this.totalNumber = request.data.body.total;
              // serverSearchArr = request.data.body.data;
              total = request.data.body.total
              console.log(serverSearchArr)
            })
            if (total === 0){
              this.form.objectId = searchFrontKeyword
              break;
            }
          }
        }
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
  /*margin-right: 2rem;*/
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
