<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main">
      <OpOperateOpcid/>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import OpOperateOpcid from '../../components/Opdict/OpOperate/Opcid'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    OpOperateOpcid
  }
}
</script>

<style scoped>
#Header{
  background: blue;
}
</style>
