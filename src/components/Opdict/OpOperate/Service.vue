<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <!--弹窗-->
      <el-dialog title="修改服务类型" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="90px">
          <!--服务类型-->
          <el-form-item label="服务类型id" :rules="[{ required: true}]">
            <el-input
              :disabled="true"
              v-model="form.serviceType" />
          </el-form-item>
          <!--服务名称-->
          <el-form-item label="服务名称">
            <el-input v-model="form.serviceName" />
          </el-form-item>
          <!--服务数据表-->
          <el-form-item label="服务数据表">
            <el-input v-model="form.serviceTable" />
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注">
            <el-input v-model="form.note"  type="textarea"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm(form.f_service_type)">确 定</el-button>
        </span>
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="danger" @click="Del">删除</el-button>
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
        serviceType: '',
        serviceName: '',
        serviceTable: '',
        note: ''
      }
    }
  },
  methods: {
    //删除功能的事件
    Del() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("Del",this.myData.serviceType);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //点击编辑时将该行的数据传入弹窗中
    Revise(){
      this.form.serviceType = this.myData.serviceType;
      this.form.serviceName = this.myData.serviceName;
      this.form.serviceTable = this.myData.serviceTable;
      this.form.note = this.myData.note;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm(id) {
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('服务类型id不能为空');
      }
      else{
        this.$emit("Revise",this.form);
      }
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
