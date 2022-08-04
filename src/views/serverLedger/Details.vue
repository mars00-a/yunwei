<template>
  <el-container>
    <el-header id="header">{{ DetailTitle }}服务器详情</el-header>
    <el-container>
      <el-aside id="aside" :style="MyStyle.Aside" width="40%">
        <Aside @clickRow="clickRow" :row="this.$route.params.row"/>
      </el-aside>
      <el-main :style="MyStyle.Main">
        <el-tabs v-model="Tabs" type="border-card">
          <el-tab-pane label="服务器状态"><div :style="MyStyle.Tab"><StatusTab :myRow="this.$route.params.row"/></div></el-tab-pane>
          <el-tab-pane label="硬件状态"><div :style="MyStyle.Tab"><HardwareTab :myRow="this.$route.params.row"/></div></el-tab-pane>
          <el-tab-pane label="服务信息"><div :style="MyStyle.Tab">
            <div v-if="ServerType === 1">
              <security :myRow='this.myRow'/>
            </div>
            <div v-if="ServerType === 2">
              <smarthome :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 3">
              <patrol :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 4">
              <weixin :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 5">
              <APP :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 6">
              <SMS :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 7">
              <otherSMS :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 8">
              <NVS :myRow='this.myRow' />
            </div>
            <div v-if="ServerType === 9">
              <otherNVS :myRow='this.myRow' />
            </div>
          </div></el-tab-pane>
          <el-tab-pane label="数据统计"><div :style="MyStyle.Tab">
            <el-row>
              <el-col :span="12">
                <span>起始时间：</span>
                <el-date-picker
                  v-model="beginTimeSearchKeyword"
                  type="datetime"
                  placeholder="选择起始日期时间">
                </el-date-picker>
              </el-col>
              <el-col :span="12">
                <span>截止时间：</span>
                <el-date-picker
                  v-model="endTimeSearchKeyword"
                  type="datetime"
                  placeholder="选择截止日期时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <EchartsTab :Date="[this.beginTimeSearchKeyword,this.endTimeSearchKeyword]"/>
          </div></el-tab-pane>
          <el-tab-pane label="异常消息推送"><div :style="MyStyle.Tab"><Abnormal :myRow="this.$route.params.row"/></div></el-tab-pane>
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
import Abnormal from '@/components/ServerDetails/Abnormal'
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
    weixin,
    Abnormal
  },
  data() {
    return {
      beginTimeSearchKeyword:'',
      endTimeSearchKeyword:'',
      // 整体样式
      MyStyle: {
        Main: { height: '', paddingRight: '3.3rem' },
        Aside: { height: '' },
        Tab: { hei: '' }
      },
      DetailTitle: '',
      ServerType: '',
      Tabs: '',
      // 点击左侧的某一行服务时，row就在这里
      myRow:{},
    }
  },
  methods:{
    clickRow(row){
      this.ServerType = row.serviceType;
      this.myRow = row;
      this.Tabs = '2';
    }
  },
  mounted() {
    this.MyStyle.Main.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Aside.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Tab.height = document.body.clientHeight - 45 - 100 - 64 - 70 + 'px'
    if (this.$route.params.row) {
      this.DetailTitle = this.$route.params.row.serverName;
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
  >>>.el-container .el-aside{
    padding-right: 5px;
  }
  >>>.el-container .el-main{
    padding-left: 10px;
  }
</style>
