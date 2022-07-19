<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <el-dialog top="1vh" title="修改维运事件" :visible.sync="dialogVisible" width="30%">
<!--            左侧表单栏-->
              <el-form ref="form" :model="form" label-width="100px">
                <!--opcid-->
                <el-form-item label="事件id" :rules="[{ required: true}]">
                  <el-input
                    :disabled="true"
                    v-model="form.EventId" />
                </el-form-item>
                <!--opcidname-->
                <el-form-item label="事件名称">
                  <el-input v-model="form.EventName" />
                </el-form-item>
                <!--systemid-->
                <el-form-item label="所属系统">
                  <el-select
                    :style="controlWidth"
                    v-model="form.System"
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
                <!--type-->
                <el-form-item label="事件来源类型">
                  <el-select
                    :style="controlWidth"
                    v-model="form.EventSourceType"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择所属系统"
                  >
                    <!--              label是展示在页面选项中的内容-->
                    <el-option
                      v-for="item in EventSourceTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <!--opsignalid-->
                <el-form-item label="对应指标">
                  <el-input  placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.target" />
                </el-form-item>
                <!--eventtype-->
                <el-form-item label="事件类型">
                  <el-select
                    :style="controlWidth"
                    v-model="form.EventType"
                    filterable
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
                <!--threshold-->
                <el-form-item label="事件阈值">
                  <el-input v-model="form.Threshold" />
                </el-form-item>
                <!--level-->
                <el-form-item label="事件默认级别">
                  <el-input v-model="form.Level" />
                </el-form-item>
                <!--note-->
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.Remark"/>
                </el-form-item>
              </el-form>
              <span id="myFooter"  slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false,Confirm(form.EventId)">确 定</el-button>
              </span>

<!--            右侧指标信息栏-->
            <div v-show = controlShow id="targetTable">
              <el-table
                :data="targetTable"
                height="625"
                border
                style="width: 100%">
                <el-table-column
                  active-class="targetTableGetFocus"
                  prop="id"
                  label="指标id"
                  width="100%">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="指标名称"
                  width="100%">
                </el-table-column>
                <el-table-column label="选择">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="targetTableGetFocus(scope.$index, scope.row)">选择</el-button>
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
        EventId : '',//事件id
        EventName: '',//事件名称
        System:'',//所属系统
        EventSourceType:'',//事件来源类型
        target:'',//对应指标
        EventType:'',//事件类型
        Threshold: '',//阈值
        Level:'',//事件默认级别
        Remark: '',//备注
      },
      //右侧的指标表格
      targetTable: this.serverTable,
      serverTargetTable: this.serverTable,
      //所属系统
      BelongingSystems: [
        {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      //事件来源类型
      EventSourceTypes: [
        {
        value: '选项1',
        label: '事件来源1'
      }, {
        value: '选项2',
        label: '事件来源2'
      },{
        value: '选项3',
        label: '事件来源3'
      }, {
        value: '选项4',
        label: '事件来源4'
      }],
      //事件类型
      EventTypes: [
        {
        value: '选项1',
        label: '1--报警'
      }, {
        value: '选项2',
        label: '2--恢复'
      }
      ],
    }
  },
  methods: {
    Revise(){
      this.form.EventId = this.MyData.f_opcid;
      this.form.EventName = this.MyData.f_opcid_name;
      this.form.System = this.MyData.f_system_id;
      this.form.EventSourceType = this.MyData.f_type;
      this.form.target = this.MyData.f_opsignal_id;
      this.form.EventType = this.MyData.f_event_type;
      this.form.Threshold = this.MyData.f_threshold;
      this.form.Level = this.MyData.f_level;
      this.form.Remark = this.MyData.f_note;
    },
    Del() {
      console.log(this);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("Del",this.MyData.f_opcid);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Confirm(id) {
      console.log(id);
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('运维状态id不能为空');
      }
      else{
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
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
      this.form.target = "@"+row.id;
      // this.targetTable = row
      // event
      // console.log(row.id)
      // console.log("点击了某个东西")
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索
    'form.target':{
      immediate:true,
      handler(val){
        let Arr = val.split("@")
        // console.log(Arr)
        if (Arr[0] === '')
          val = Arr[1]
        else
          val = Arr[0]
        if (val === undefined)
          val = ''
        // console.log(val)
        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.name.indexOf(val) !== -1 || p.id.indexOf(val) !== -1
        })
      }
    }
  },
  props:{
    MyData:Array,
    // 未经过搜索的指标列表
    serverTable:Array,
  }
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
