<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <el-dialog top="1vh" title="新增运维事件" :visible.sync="dialogVisible" width="30%">
        <!--            左侧表单栏-->
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="事件id" :rules="[{ required: true}]">
            <el-input
              disabled="true"
              v-model="form.opcid" />
          </el-form-item>
          <el-form-item label="事件名称">
            <el-input v-model="form.opcidName" />
          </el-form-item>
          <el-form-item label="所属系统">
            <el-select
              :style="controlWidth"
              v-model="form.systemId"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in BelongingSystems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件来源类型">
            <el-select
              :style="controlWidth"
              v-model="form.type"
              filterable
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in EventSourceTypes"
                :key=item
                :label=item
                :value=item
              />
            </el-select>
          </el-form-item>
          <el-form-item label="对应指标">
            <el-input  placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.opsignalId" />
          </el-form-item>
          <el-form-item label="事件类型">
            <el-select
              :style="controlWidth"
              v-model="form.eventType"
              allow-create
              default-first-option
              placeholder="请选择所属系统"
            >
              <!--              label是展示在页面选项中的内容-->
              <el-option
                v-for="item in EventTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件阈值">
            <el-input v-model="form.threshold" placeholder="事件阈值取值范围：0-100"/>
          </el-form-item>
          <el-form-item label="事件默认级别">
            <el-input v-model="form.level" placeholder="事件默认级别范围：1-6"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.note"/>
          </el-form-item>
        </el-form>
        <span id="myFooter" slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible=false,Confirm(form.EventId)">确 定</el-button>
        </span>

        <!--            右侧指标信息栏-->
        <div v-show = controlShow id="targetTable">
          <el-table
            :data="targetTable"
            height="660"
            border
            style="width: 100%">
            <el-table-column
              active-class="targetTableGetFocus"
              prop="opsignalId"
              label="指标id"
              width="105%">
            </el-table-column>
            <el-table-column
              prop="opsignalName"
              label="指标名称"
              width="100%">
            </el-table-column>
            <el-table-column label="添加">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="targetTableGetFocus(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="danger" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>


// Vue.config.productionTip=false;
export default {
  name: 'OpOperate',
  data() {
    return {
      controlWidth:{
        width: "100%"
      },
      controlShow: false,
      // 弹窗右侧的指标列表显示与否
      dialogVisible: false,
      form: {
        opcid : '',//事件id
        opcidName: '',//事件名称
        systemId:'',//所属系统
        type:'',//事件来源类型
        opsignalId:'',//对应指标
        eventType:'',//事件类型
        threshold: '',//阈值
        level:'',//事件默认级别
        note: '',//备注
      },
      //右侧的指标表格
      targetTable: this.serverTable,
      serverTargetTable: this.serverTable,
      //所属系统
      BelongingSystems: [],
      //事件来源类型
      EventSourceTypes: [],
      //事件类型
      EventTypes: [{
        value:1,
        label:'1-报警'
      },{
        value:2,
        label:'2-恢复'
      }],
    }
  },
  methods: {
    Revise(){
      this.EventSourceTypes = this.SourceTypes;
      this.form.opcid = this.MyData.opcid;
      this.form.opcidName = this.MyData.opcidName;
      this.form.systemId = this.MyData.systemId;
      this.form.type = this.MyData.type;
      this.form.opsignalId = this.MyData.opsignalId;
      this.form.eventType = this.MyData.eventType;
      this.form.threshold = this.MyData.threshold;
      this.form.level = this.MyData.level;
      this.form.note = this.MyData.note;
    },
    Del() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("Del",this.MyData.opcid);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Confirm(id) {
      if(this.form.opcid === ""){
        this.dialogVisible = true;
        this.$message.error('运维状态的id不能为空');
      }
      else if(isNaN(this.form.threshold*1)){
        this.dialogVisible = true;
        this.$message.error('事件阈值取值应为数字');
      }
      else if(this.form.threshold<0 || this.form.threshold>100){
        this.dialogVisible = true;
        this.$message.error('事件阈值取值范围为0到100');
      }
      else if(isNaN(this.form.level*1)){
        this.dialogVisible = true;
        this.$message.error('事件默认级别的值应为数字');
      }
      else if(this.form.level<1 || this.form.level>6){
        this.dialogVisible = true;
        this.$message.error('事件默认级别范围为1到6');
      }
      else{
        this.$emit("Revise",this.form);
      }
    },
    Cancel() {
      this.$message('取消成功')
    },
    //当输入框被选中后显示右侧指标列表
    getFocus(){
      this.controlShow = true
    },
    // 点击选择按钮后将输入框的值设置为选中的
    targetTableGetFocus(index,row){
      this.form.opsignalId = row.opsignalId;
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索
    'form.opsignalId':{
      immediate:true,
      handler(val){
        let Arr = val.split("S")
        if (Arr[0] === '')
          val = Arr[1]
        else
          val = Arr[0]
        if (val === undefined)
          val = ''
        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.opsignalName.indexOf(val) !== -1 || p.opsignalId.indexOf(val) !== -1
        })

      },

    }
  },
  props:{
    MyData:Array,
    // 未经过搜索的指标列表
    serverTable:Array,
    SourceTypes:Array
  },
}

</script>

<style scoped>
  .dialog-footer{
    margin: 0 auto;
  }
  /*指标列表*/
  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
  }
  .targetTableGetFocus{
    background-color: #4A9FF9;
  }
  #myFooter{
    position: absolute;
    right: 4vh;
    bottom: 2vh;
  }
</style>
