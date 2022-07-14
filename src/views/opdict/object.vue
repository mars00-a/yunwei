<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main">
      <OpOperate/>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import OpOperate from '../../components/Opdict/OpOperate'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    OpOperate
  }
}
</script>

<style scoped>
#Header{
  background: blue;
}
</style>
