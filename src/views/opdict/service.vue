<template>
  <el-container>
    <el-header id="Header">
      <OpControl/>
    </el-header>
    <el-main id="Main">
      <Service/>
    </el-main>
    <el-footer id="Footer">
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import Service from '../../components/Opdict/OpOperate/Service'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    Service
  }
}
</script>

<style scoped>
#Header{
  background: blue;
}
</style>
