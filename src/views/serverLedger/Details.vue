<template>
  <el-container>
    <el-header id="header">{{DetailTitle}}服务器详情</el-header>
    <el-container>
      <el-aside id="aside" :style="MyStyle.Aside" width="30%">
        <Aside/>
      </el-aside>
      <el-main :style="MyStyle.Main">
        <el-tabs type="border-card">
          <el-tab-pane label="服务器状态"><StatusTab/></el-tab-pane>
          <el-tab-pane label="统计信心"><StatisticsTab/></el-tab-pane>
          <el-tab-pane label="服务信息"><ServiceTab/></el-tab-pane>
          <el-tab-pane label="数据统计"><div style="height: 100rem"><EchartsTab/></div></el-tab-pane>
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
    },
    data(){
      return{
        //整体样式
        MyStyle:{
          Main:{height:''},
          Aside:{height:''}
        },
        DetailTitle:'',
      }
    },
    mounted(){
      this.MyStyle.Main.height = document.body.clientHeight-45-64-70+"px";
      this.MyStyle.Aside.height = document.body.clientHeight-45-64-70+"px";
      this.DetailTitle = "xxxx"
    }
  }
</script>

<style scoped>
  #header{
    width: 100%;
    background: #f1f3f4;
    font-size: 1.5rem;
    text-align: center;
    padding-top: 1rem;

  }
  #aside{
    margin-top: 0.5rem;
  }
</style>
