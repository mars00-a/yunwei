<template>
  <el-container>
    <el-header id="Header">
      <el-row :gutter="10" id="Control">
        <el-col :span="6"><div class="grid-content bg-purple">
          <span id="FilterParameters">过滤参数：</span>
          <el-select v-model="FilterParameter_value" placeholder="请选择" title="过滤参数:" id="FilterBox">
            <el-option
              v-for="item in FilterParameters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span id="Value">值：</span>
          <!--远程搜索框-->
          <el-autocomplete
            v-model="CompleteValue"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"/>
          <el-button type="primary" id="Find" @click="Find()">查找</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="监控的id" :rules="[{ required: true}]">
                <el-input v-model="f_object_id" />
              </el-form-item>
              <el-form-item label="所属系统">
                <el-select
                  v-model="f_system_name"
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
              <el-form-item label="所属模块">
                <el-select
                  v-model="f_module_name"
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
              <el-form-item label="对象名称">
                <el-input v-model="f_object_name" />
              </el-form-item>
              <el-form-item label="对象类型">
                <el-select
                  v-model="f_category"
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
              <el-form-item label="检测内容">
                <el-input v-model="f_item" />
              </el-form-item>
              <el-form-item label="数据类型">
                <el-select v-model="f_type" placeholder="请选择数据类型">
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
          <el-button type="primary" @click="dialogVisible = false,Confirm(f_object_id)">确 定</el-button>
        </span>
          </el-dialog>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
        </div></el-col>
      </el-row>
    </el-header>
    <el-main id="Main" >
      <!--表格主体-->
      <el-table
        :data="tableData"
        height="520"
        border
        style="width: 87.8rem">
        <!--f_object_id-->
        <el-table-column
          prop="f_object_id"
          label="f_object_id"
         >
        </el-table-column>
        <!--f_system_name-->
        <el-table-column
          prop="f_system_name"
          label="f_system_name"
          >
        </el-table-column>
        <!--f_module_name-->
        <el-table-column
          prop="f_module_name"
          label="f_module_name"
         >
        </el-table-column>
        <!--f_object_name-->
        <el-table-column
          prop="f_object_name"
          label="f_object_name"
          >
        </el-table-column>
        <!--f_category-->
        <el-table-column
          prop="f_category"
          label="f_category"
         >
        </el-table-column>
        <!--f_item-->
        <el-table-column
          prop="f_item"
          label="f_item"
        >
        </el-table-column>
        <!--f_type-->
        <el-table-column
          prop="f_type"
          label="f_type"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <OpOperateObject :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <OpStatus/>
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
      }],
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
      //值查询

      //新增
      dialogVisible: false,
      form: {
        name: '',
        number: ''
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
      //用于返回新增的数据值
      Value:[
        {
          f_object_id:'',
          f_system_name:'',
          f_object_name:'',
          f_module_name:'',
          f_category:'',
          f_item:'',
          f_type:''
        }
      ],
      scope:''
    }
  },
  methods:{
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm(id) {
      //非空验证
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('监控的id不能为空');
      }
      else{
        //储存新增的值到Value
        this.Value.f_object_id = this.f_object_id;
        this.Value.f_system_name = this.f_system_name;
        this.Value.f_object_name = this.f_object_name;
        this.Value.f_module_name = this.f_module_name;
        this.Value.f_category = this.f_category;
        this.Value.f_item = this.f_item;
        this.Value.f_type = this.f_type;
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        console.log(this.Value)
      }
    },
    handleEdit(row) {
      console.log(row);
    },
    Find(){
      const msg = [this.FilterParameter_value , this.CompleteValue];
      console.log(msg);
    },
    //修改、删除后的表数据返回到以下两个函数
    GetRevise(msg){
      console.log(msg);
    },
    GetDel(msg){
      console.log(msg);
    },
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
</style>
