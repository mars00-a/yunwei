<template>
  <el-container>
    <el-header id="header">Header</el-header>
    <el-container>
      <el-aside id="aside">
        <Aside/>
      </el-aside>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="消息中心"><StatisticsTab/></el-tab-pane>
          <el-tab-pane label="角色管理"><ServiceTab/></el-tab-pane>
          <el-tab-pane label="定时任务补偿"><EchartsTab/></el-tab-pane>
          <el-tab-pane label="定时任务补偿"><StatusTab/></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from '@/components/ServerDetails/Aside'
  import StatisticsTab from '@/components/ServerDetails/StatisticsTab'
  import ServiceTab from '@/components/ServerDetails/ServiceTab'
  import EchartsTab from '@/components/ServerDetails/EchartsTab'
  import StatusTab from '@/components/ServerDetails/StatusTab'
  export default {
    name: "details",
    components:{
      Aside,
      StatisticsTab,
      ServiceTab,
      EchartsTab,
      StatusTab
    }
  }
</script>

<style scoped>
  #header{
    width: 100%;
    height: 3rem;
    background: #f1f3f4;
  }
  #aside{
    width: 40%;
    height: 50rem;
  }
</style>
