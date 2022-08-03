<template>
  <el-container>
    <el-header id="header">{{ DetailTitle }}服务器详情</el-header>
    <el-container>
      <el-aside id="aside" :style="MyStyle.Aside" width="40%">
        <Aside :row="this.$route.params.row"/>
      </el-aside>
      <el-main :style="MyStyle.Main">
        <el-tabs v-model="Tabs" type="border-card">
          <el-tab-pane label="服务器状态"><div :style="MyStyle.Tab"><StatusTab /></div></el-tab-pane>
          <el-tab-pane label="硬件状态"><div :style="MyStyle.Tab"><HardwareTab /></div></el-tab-pane>
          <el-tab-pane label="服务信息"><div :style="MyStyle.Tab">
            <div v-if="ServerType === 1">
              <security/>
            </div>
            <div v-if="ServerType === 2">
              <smarthome />
            </div>
            <div v-if="ServerType === 3">
              <patrol />
            </div>
            <div v-if="ServerType === 4">
              <weixin />
            </div>
            <div v-if="ServerType === 5">
              <APP />
            </div>
            <div v-if="ServerType === 6">
              <SMS />
            </div>
            <div v-if="ServerType === 7">
              <otherSMS />
            </div>
            <div v-if="ServerType === 8">
              <NVS />
            </div>
            <div v-if="ServerType === 9">
              <otherNVS />
            </div>
          </div></el-tab-pane>
          <el-tab-pane label="数据统计"><div :style="MyStyle.Tab"><EchartsTab /></div></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/ServerDetails/Aside'
import HardwareTab from '@/components/ServerDetails/HardwareTab'
import NVS from '@/components/ServerDetails/ServiceTab/2030NVS'
import APP from '@/components/ServerDetails/ServiceTab/APP'
import otherNVS from '@/components/ServerDetails/ServiceTab/otherNVS'
import otherSMS from '@/components/ServerDetails/ServiceTab/otherSMS'
import patrol from '@/components/ServerDetails/ServiceTab/patrol'
import security from '@/components/ServerDetails/ServiceTab/security'
import smarthome from '@/components/ServerDetails/ServiceTab/smarthome'
import SMS from '@/components/ServerDetails/ServiceTab/SMS'
import weixin from '@/components/ServerDetails/ServiceTab/weixin'
import EchartsTab from '@/components/ServerDetails/EchartsTab'
import StatusTab from '@/components/ServerDetails/StatusTab'
export default {
  name: 'Details',
  components: {
    Aside,
    HardwareTab,
    EchartsTab,
    StatusTab,
    NVS,
    APP,
    otherNVS,
    otherSMS,
    patrol,
    security,
    smarthome,
    SMS,
    weixin
  },
  data() {
    return {
      // 整体样式
      MyStyle: {
        Main: { height: '', paddingRight: '3.3rem' },
        Aside: { height: '' },
        Tab: { hei: '' }
      },
      DetailTitle: '',
      ServerType: 2,
      Tabs: ''
    }
  },
  mounted() {
    this.MyStyle.Main.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Aside.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Tab.height = document.body.clientHeight - 45 - 100 - 64 - 70 + 'px'
    if (this.$route.params.ServerId !== undefined) {
      this.DetailTitle = this.$route.params.ServerId
    }
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
    background: white;
    margin-top: 0.5rem;
  }
  >>>.el-main{
    padding-bottom: 0
  }
</style>
