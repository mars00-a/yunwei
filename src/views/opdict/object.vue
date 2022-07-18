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
          <el-button type="primary" id="Find" @click="Find()">查找</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <!--弹窗-->
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="35%">
            <!--弹窗表单-->
            <el-form ref="form" :model="form" label-width="80px">
              <!--监测对象id：f_object_id-->
              <el-form-item label="监控的id" :rules="[{ required: true}]">
                <el-input v-model="form.f_object_id" />
              </el-form-item>
              <!--监控对象所属系统：f_system_name-->
              <el-form-item label="所属系统">
                <el-select
                  v-model="form.f_system_name"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择所属系统"
                >
                  <el-option
                    v-for="item in BelongingSystems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!--监控对象所属模块：f_module_name-->
              <el-form-item label="所属模块">
                <el-select
                  v-model="form.f_module_name"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择所属模块"
                >
                  <el-option
                    v-for="item in BelongingModules"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!--监测对象名称：f_object_name-->
              <el-form-item label="对象名称">
                <el-input v-model="form.f_object_name" />
              </el-form-item>
              <!--监测对象类型：f_category-->
              <el-form-item label="对象类型">
                <el-select
                  v-model="form.f_category"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择对象类型"
                >
                  <el-option
                    v-for="item in ObjectTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!--监测内容：f_item-->
              <el-form-item label="检测内容">
                <el-input v-model="form.f_item" />
              </el-form-item>
              <!--数据类型：f_type-->
              <el-form-item label="数据类型">
                <el-select v-model="form.f_type" placeholder="请选择数据类型">
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
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.f_object_id)">确 定</el-button>
        </span>
          </el-dialog>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="Main" >
      <!--表格主体-->
      <el-table
        :data="tableData"
        height="520"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow">
        <!--监测对象id：f_object_id-->
        <el-table-column
          prop="f_object_id"
          label="监测对象id"
         >
        </el-table-column>
        <!--监控对象所属系统：f_system_name-->
        <el-table-column
          prop="f_system_name"
          label="监控对象所属系统"
          >
        </el-table-column>
        <!--监控对象所属模块：f_module_name-->
        <el-table-column
          prop="f_module_name"
          label="监控对象所属模块"
         >
        </el-table-column>
        <!--监测对象名称：f_object_name-->
        <el-table-column
          prop="f_object_name"
          label="监测对象名称"
          >
        </el-table-column>
        <!--监测对象类型：f_category-->
        <el-table-column
          prop="f_category"
          label="监测对象类型"
         >
        </el-table-column>
        <!--监测内容：f_item-->
        <el-table-column
          prop="f_item"
          label="监测内容"
        >
        </el-table-column>
        <!--数据类型：f_type-->
        <el-table-column
          prop="f_type"
          label="数据类型"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope" @click="getNowRow(scope.row)">
            <OpOperateObject :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
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
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next, jumper"
          :total="12000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpOperateObject from '../../components/Opdict/OpOperate/Object'
export default{

  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpOperateObject
  },
  data() {
    return {
      tableData: [{
        f_object_id: '0001000',
        f_system_name: '所有系统',
        f_module_name: '硬件',
        f_object_name:'服务器是否存活',
        f_category:'服务器',
        f_item:'存活状态',
        f_type:'1',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },{
        f_object_id: '0001001',
        f_system_name: '系统',
        f_module_name: '硬',
        f_object_name:'服务器是否',
        f_category:'服务',
        f_item:'存活',
        f_type:'2',
      },],
      FilterParameters: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      FilterParameter_value: '',
      CompleteValue:'',
      //新增按钮数据，如下：
      //用于弹窗的显示
      dialogVisible: false,
      //弹窗表单数据
      form: {
        //监控的id
        f_object_id:'',
        //所属系统
        f_system_name:'',
        //所属模块
        f_object_name:'',
        //对象名称
        f_module_name:'',
        //对象类型
        f_category:'',
        //检测内容
        f_item:'',
        //数据类型
        f_type:'',
      },
      // 所属模组下拉框数组
      BelongingSystems: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // 对象类型下拉框数组
      ObjectTypes: [],
      // 数据类型下拉框数组
      DataTypes: [],
      scope:'',
      // 分页
      //currentPage进入的第一页是第几页
      currentPage: 1,
      //当前行数
      nowRow: 1,
      //总页数
      totalNumber: 1200
    }
  },
  methods:{
    //************************分页************************
    //处理页面初始数据
    dealData(){

    },
    //鼠标放到某一行上就触发
    getNowRow(row){
      // console.log(row);
    },
    //每页最大条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    //当前页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    //************************新增按钮************************
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
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        console.log(this.form)
      }
    },
    Find(){
      const msg = [this.FilterParameter_value , this.CompleteValue];
      console.log(msg);
    },
    //************************修改、删除按钮************************
    //修改、删除后的表数据返回到以下两个函数
    GetRevise(msg){
      console.log(msg);
    },
    GetDel(msg){
      console.log(msg);
    },
  },
  mounted(){
    this.dealData();
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
</style>
