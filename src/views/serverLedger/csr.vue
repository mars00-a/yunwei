<template>
  <div>

    <el-button type="success" id="Add" @click="anFangFuWu = true">安防服务3000</el-button>
    <el-dialog title="新增" :visible.sync="anFangFuWu" width="30%">
      <span>内容</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "csr",
  data(){
    return{
      anFangFuWu:false
    }
  }
}
</script>

<style scoped>

</style>
