<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main">
      <Signal/>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import Signal from '../../components/Opdict/OpOperate/Signal'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    Signal
  }
}
</script>

<style scoped>
#Header{
  background: blue;
}
</style>
