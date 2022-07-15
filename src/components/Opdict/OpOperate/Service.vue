<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="监控的id">
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
          <el-button type="primary" @click="dialogVisible = false,Confirm()">确 定</el-button>
        </span>
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'OpOperate',
  data() {
    return {
      //用于弹窗的显示
      dialogVisible: false,
      //编辑弹窗的表单头部（暂无使用）
      form: {
        name: '',
        number: ''
      },
      // 所属系统下拉框数组
      BelongingSystems: [{
        value: '',
        label: ''
      }],
      // 所属模组下拉框数组
      BelongingModules: [],
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
      ]
    }
  },
  methods: {
    //删除功能的事件
    Del() {
      console.log(this);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("Del",this.myData.f_object_id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //点击编辑时将该行的数据传入弹窗中
    Revise(){
      this.f_object_id = this.myData.f_object_id;
      this.f_system_name = this.myData.f_system_name;
      this.f_object_name = this.myData.f_object_name;
      this.f_module_name = this.myData.f_module_name;
      this.f_category = this.myData.f_category;
      this.f_item = this.myData.f_item;
      this.f_type = this.myData.f_type;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm() {
      //储存修改的值到Value
      this.Value.f_object_id = this.f_object_id;
      this.Value.f_system_name = this.f_system_name;
      this.Value.f_object_name = this.f_object_name;
      this.Value.f_module_name = this.f_module_name;
      this.Value.f_category = this.f_category;
      this.Value.f_item = this.f_item;
      this.Value.f_type = this.f_type;
      this.$message('修改成功');
      this.$emit("Revise",this.Value);
    }
  },
  //接入来自../../../views/opdict/object的数据
  props:{
    myData:Array
  }
}

</script>

<style scoped>

</style>
