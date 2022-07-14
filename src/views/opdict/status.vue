<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main">
      <Status/>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import Status from '../../components/Opdict/OpOperate/Status'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    Status
  }
}
</script>

<style scoped>
#Header{
  background: blue;
}
</style>
