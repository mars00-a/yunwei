<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <!--弹窗-->
      <el-dialog  top="7vh" title="修改检测对象" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <!--监测对象id：f_object_id-->
          <el-form-item label="监控的id" :rules="[{ required: true}]">
            <el-input
              :disabled="true"
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
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.f_object_id)">确 定</el-button>
        </span>
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="danger" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
import {getObjectCreate, getObjectUpdate} from "@/api/opdict";

export default {
  name: 'OpOperate',
  data() {
    return {
      controlWidth:{
        width: "100%"
      },
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
      // 所属系统下拉框数组
      BelongingSystems: [],
      // 所属模组下拉框数组
      BelongingModules: [],
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
        this.$emit("Del",this.myData.objectId);
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
      this.BelongingModules = this.Modules;
      this.BelongingSystems = this.Systems;
      this.ObjectTypes = this.Types;
      this.form.objectId = this.myData.objectId;
      this.form.systemName = this.myData.systemName;
      this.form.objectName = this.myData.objectName;
      this.form.moduleName = this.myData.moduleName;
      this.form.category = this.myData.category;
      this.form.item = this.myData.item;
      this.form.type = this.myData.type;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm(id) {
      //非空判断与数据传送
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('监控的id不能为空');
      }
      else{
        // alert("触发了id不为空")
        // console.log(this.form)
        getObjectUpdate(this.form).then(request=>{
          // alert("触发了更新事件")
          // console.log(request.data.body)
          if(request.data.body){
            // console.log(this)
            // console.log(request.data.body)
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else{
            super.$message({
              message: '修改',
              type: 'warning'
            });
          }
        });
        this.$emit("Revise",this.form);
      }
    }
  },
  //接入来自../../../views/opdict/object的数据
  props:{
    myData:Array,
    Modules:Array,
    Systems:Array,
    Types:Array
  }
}

</script>

<style scoped>

</style>
