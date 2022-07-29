<template>
<div>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-button type="danger">移除</el-button>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="eventButton">事件</el-button>
    </el-col>
    <el-col :span="8">
      <el-button type="info" @click="historyButton">历史</el-button>
    </el-col>
    <el-dialog
      top="7vh"
      title="服务器事件列表"
      width="40%"
      append-to-body
      :visible.sync="visibleEvent"
    >
      <el-table
        height="480"
        :data="eventList"
        border
      >
        <el-table-column
          prop="eventId"
          label="事件id"
        >
        </el-table-column>
        <el-table-column
          prop="eventName"
          label="事件名称"
        >
        </el-table-column>
        <el-table-column
          prop="threshold"
          label="阈值"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="deleteEvent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div id="targetTable">
        <el-row :gutter="1">
          <el-col :span="16">
            <el-input v-model="searchKeyword" placeholder="输入事件id或事件名称进行查询"/>
          </el-col>
          <el-col :span="4">
            <el-button @click="addSomeEvent">添加选中项</el-button>
          </el-col>
          <el-col :span="4">
          </el-col>
        </el-row>
        <el-table
          :data="searchAllEventList"
          height="555"
          border
          @selection-change="handleSelectionChange"
          width="200"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="eventId"
            label="事件ID"
            width="105%">
          </el-table-column>
          <el-table-column
            prop="eventName"
            label="事件名称"
            width="100%">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="addEvent(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-dialog>
  </el-row>
</div>


</template>

<script>
import {getOpUserServerEventUnBindList,getOpUserServerEventDelete,getOpUserServerEventCreate} from '@/api/wang'
    export default {
      name: "server-event",
      data(){
        return{
          visibleEvent:false,
          // 下两条用于获取事件所属的服务器和 接收id
          myReceive:this.receiveData,
          myServer:this.serverData,
          // 下面两条属性用于获取接收id和服务器id
          controlReceiveId:this.receiveData.receiveId,
          controlServerId:this.serverData.serverId,
          // 服务器绑定的事件列表
          eventList:[
            {
              eventId: 'E000100101',
              eventName: 'CPU占用率',
              threshold: 90,
              level: 4
            },
          ],
          // 即将添加时选中的事件列表
          selectEventList: [],
          // 所有的事件列表和搜索出来的事件列表
          allEventList: [
            {
              eventId: 'E000100101',
              eventName: 'CPU占用率',
              threshold: 90,
              level: 4
            },
            {
              eventId: 'E000',
              eventName: 'Caaa占用率',
              threshold: 80,
              level: 3
            },
            {
              eventId: '100101',
              eventName: '用率',
              threshold: 70,
              level: 2
            },

          ],
          searchAllEventList:[
            {
              eventId: 'E000100101',
              eventName: 'CPU占用率',
              threshold: 90,
              level: 4
            },
            {
              eventId: 'E000',
              eventName: 'Caaa占用率',
              threshold: 80,
              level: 3
            },
            {
              eventId: '100101',
              eventName: '用率',
              threshold: 70,
              level: 2
            },
          ],
          // 用于搜索事件的关键字
          searchKeyword:'',
        }
      },
      props:{
        receiveData:Object,
        serverData:Object,
      },
      methods:{
        // 事件按钮
        eventButton(){
          this.visibleEvent = true
          getOpUserServerEventUnBindList(this.controlReceiveId,this.controlServerId,1,10000).then(request=>{
            console.log("触发了请求未绑定的事件，接收id和服务器id为：",this.controlReceiveId,this.controlServerId,"内容为：",request)
            this.allEventList = request.data.body.data;
            this.searchAllEventList = request.data.body.data;
          });
        },
        //历史按钮
        historyButton(){
          let tmp = this.myReceive
          let Data = Object.assign(this.myReceive, this.myServer);
          this.myReceive = tmp
          console.log('myReceive',this.myReceive)
          console.log('serverData：',this.myServer)
          console.log('serverEventData：',Data)
          this.$router.push({name:'historicalMsg',params:{serverEventData:Data}});
        },
        handleSelectionChange(val){
          this.selectEventList = val
        },
        // 删除事件
        deleteEvent(row){
          console.log("点击了删除事件按钮，即将删除的接收id：",this.controlReceiveId,'即将删除的服务器：',this.controlServerId,"即将删除的事件：",row.eventId)
          let eventIdList = [row.eventId]
          getOpUserServerEventDelete(this.controlReceiveId,this.controlServerId,eventIdList).then(request=>{
            console.log("触发了删除事件，接收id和服务器id为和事件id：",this.controlReceiveId,this.controlServerId,eventIdList)
            if(request.data.body){
              this.delSuccessMessage()
            }
            else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        },
        // 新增事件
        addEvent(row){
          console.log("点击了添加事件按钮，即将添加的事件为：",row.eventId)
          let eventIdList = [row.eventId]
          getOpUserServerEventDelete(this.controlReceiveId,this.controlServerId,eventIdList).then(request=>{
            console.log("触发了新增事件，接收id和服务器id为和事件id：",this.controlReceiveId,this.controlServerId,eventIdList)
            if(request.data.body){
              this.addSuccessMessage()
            }
            else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        },
        addSomeEvent(){
          // console.log("点击了添加某些选中项的按钮，内容为：",this.selectEventList)
          let eventIdList = []
          for(let i=0;i<this.selectEventList.length;i++){
            eventIdList[i] = this.selectEventList[i].eventId
          }
          getOpUserServerEventDelete(this.controlReceiveId,this.controlServerId,eventIdList).then(request=>{
            console.log("触发了新增事件，接收id和服务器id为和事件id：",this.controlReceiveId,this.controlServerId,eventIdList)
            if(request.data.body){
              this.addSuccessMessage()
            }
            else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        },
        // 新增成功提示
        addSuccessMessage(){
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        },
        // 修改成功提示
        confirmSuccessMessage(){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        },
        // 删除成功提示
        delSuccessMessage(){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        },
      },
      watch:{
        searchKeyword:{
          immediate:true,
          handler(val){
            this.searchAllEventList = this.allEventList.filter(p =>{
              return p.eventId.indexOf(val) !== -1 || p.eventName.indexOf(val) !== -1
            })
          }
        }
      }
    }
</script>

<style scoped>
#targetTable{
  position: absolute;
  top: 0;
  left:101%;
}
</style>
