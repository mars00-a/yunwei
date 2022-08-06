<template>
  <el-container>
    <el-header id="header">{{ DetailTitle }}服务器详情</el-header>
    <el-container>
      <el-aside id="aside" :style="MyStyle.Aside" width="40%">
        <Aside @FirstServiceData="FirstServiceData" @clickRow="clickRow" :row="this.$route.params.row"/>
      </el-aside>
      <el-main :style="MyStyle.Main">
        <el-tabs v-model="Tabs" type="border-card">
          <el-tab-pane label="服务器状态"><div :style="MyStyle.Tab" id="status">
            <el-descriptions title="SK3000" :column="3" size="medium"  v-if="security" border>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  主机总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  主机离线数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  DVR总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  DVR离线数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="3">
                <template slot="label">
                  客户端在线数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1">
                <template slot="label">
                  接警服务器
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1">
                <template slot="label">
                  转警服务器
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1">
                <template slot="label">
                  视频服务器
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  数据库备份信息
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  服务器授权状态
                </template>
                kooriookami
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="APP服务" :column="3" size="medium" v-else-if="APP" style="margin-top: 2rem" border>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  时刻乐居数据包总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  时刻乐居数据包未处理量
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  物联网数据包总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  物联网数据包未处理量
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  语音数据包总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  语音数据包未处理量
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  报警数据包总数（新）
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  报警数据包未处理量（新）
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  报警数据包未处理量（新）
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  报警数据包未处理量（旧）
                </template>
                kooriookami
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="智能家居" :column="3" size="medium" v-else-if="smarthome" style="margin-top: 2rem" border>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  主机总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  主机离线数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  数据包总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  数据包未处理量
                </template>
                kooriookami
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="智慧控电" :column="3" size="medium" v-else-if="smarthome" style="margin-top: 2rem" border>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  消息队列（下发）
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  消息队列（上报）
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  网关总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  网关在线数目
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  网关停用数目
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  设备安装总数
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="1.5">
                <template slot="label">
                  注册用户数
                </template>
                kooriookami
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="智慧用电" :column="3" size="medium" v-else-if="smarthome" style="margin-top: 2rem" border>
              <el-descriptions-item span="3">
                <template slot="label">
                  业主端后台服务状态
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item span="3">
                <template slot="label">
                  运维端后台服务状态
                </template>
                kooriookami
              </el-descriptions-item>
            </el-descriptions>
            <el-empty description="暂无数据" v-else/>
          </div></el-tab-pane>
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
import Abnormal from '@/components/ServerDetails/Abnormal'
export default {
  name: 'Details',
  components: {
    Aside,
    HardwareTab,
    EchartsTab,
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
        Tab: {height: ''}
      },
      DetailTitle: '',
      ServerType: '',
      Tabs: '',
      // 点击左侧的某一行服务时，row就在这里
      myRow:{},
      //判断显示内容
      security:'',
      smarthome:'',
      patrol:'',
      weixin:'',
      APP:'',
      SMS:'',
      otherSMS:'',
      NVS:'',
      otherNVS:''
    }
  },
  methods:{
    clickRow(row){
      this.ServerType = row.serviceType;
      this.myRow = row;
      this.Tabs = '2';
    },
    FirstServiceData(msg){
      this.security = false;
      this.smarthome = false;
      this.patrol = false;
      this.weixin = false;
      this.APP = false;
      this.SMS = false;
      this.otherSMS = false;
      this.NVS = false;
      this.otherNVS = false;
      if(msg[0]){
        this.ServerType = msg[0].serviceType;
        this.myRow = msg[0];
        msg.forEach(a=>{
          switch (a.serviceType){
            case 1:
              this.security = true;
              break;
            case 2:
              this.smarthome = true;
              break;
            case 3:
              this.patrol = true;
              break;
            case 4:
              this.weixin = true;
              break;
            case 5:
              this.APP = true;
              break;
            case 6:
              this.SMS = true;
              break;
            case 7:
              this.otherSMS = true;
              break;
            case 8:
              this.NVS = true;
              break;
            case 9:
              this.otherNVS = true;
              break;
          }
        })
      }
    }
  },
  mounted() {
    this.MyStyle.Main.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Aside.height = document.body.clientHeight - 45 - 64 - 70 + 'px'
    this.MyStyle.Tab.height = document.body.clientHeight - 45 - 100 - 64 - 70 + 'px'
  },
  watch:{
    '$route.params.row.serverName':{
      immediate:true,
      handler(val){
        this.DetailTitle = val;
      }
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
  #status{
    overflow:auto
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
