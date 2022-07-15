<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <!--弹窗-->
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="90px">
          <!--服务类型-->
          <el-form-item label="服务类型" :rules="[{ required: true}]">
            <el-input v-model="form.f_service_type" />
          </el-form-item>
          <!--服务名称-->
          <el-form-item label="服务名称">
            <el-input v-model="form.f_service_name" />
          </el-form-item>
          <!--服务数据表-->
          <el-form-item label="服务数据表">
            <el-input v-model="form.f_service_table" />
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注">
            <el-input v-model="form.f_note" />
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
        f_service_type: '',
        f_service_name: '',
        f_service_table: '',
        f_note: ''
      }
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
        this.$emit("Del",this.myData.f_service_type);
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
      this.form.f_service_type = this.myData.f_service_type;
      this.form.f_service_name = this.myData.f_service_name;
      this.form.f_service_table = this.myData.f_service_table;
      this.form.f_note = this.myData.f_note;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm() {
      //储存修改的值到Value
      this.$message({
        message: '修改成功',
        type: 'success'
      });
      this.$emit("Revise",this.form);
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
