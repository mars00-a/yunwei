<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Add">修改</el-button>
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">

<!--            左侧表单栏-->
            <div>
              <el-form ref="form" :model="form" label-width="100px">

                <el-form-item label="事件id">
                  <el-input v-model="form.id" />
                </el-form-item>

                <el-form-item label="事件名称">
                  <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="所属系统">
                  <el-select
                    v-model="value"
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
                    v-model="value"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择所属系统"
                  >
                    <!--              label是展示在页面选项中的内容-->
                    <el-option
                      v-for="item in EventSourceType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="对应指标">
                  <el-input  placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.target" />
                </el-form-item>

                <el-form-item label="事件类型">
                  <el-select
                    v-model="value"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择所属系统"
                  >
                    <!--              label是展示在页面选项中的内容-->
                    <el-option
                      v-for="item in EventType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="事件阈值">
                  <el-input v-model="form.threshold" />
                </el-form-item>

                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>
              </el-form>
              <span  slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false,new Cancel()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false,new Confirm()">确 定</el-button>
            </span>
            </div>

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
                <el-table-column label="添加">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="targetTableGetFocus(scope.$index, scope.row)">添加</el-button>
                  </template>
                </el-table-column>

<!--                <template slot-scope="scope">-->
<!--                  -->
<!--                </template>-->
              </el-table>
            </div>

<!--        <el-row>-->

<!--        </el-row>-->

      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>


// Vue.config.productionTip=false;
export default {
  name: 'OpOperate',
  data() {
    return {
      controlShow: false,
      dialogVisible: false,
      form: {
        id : '',//事件id
        name: '',//事件名称
        threshold: '',//阈值
        remarks: '',//备注
        target: ''//指标
      },
      //右侧的指标表格
      targetTable:[
        {
        id:'001',
        name:'指标名称1'
      },{
        id:'002',
        name:'指标名称2'
      },{
        id:'003',
        name:'指标名称3'
      },{
        id:'004',
        name:'指标名称4'
      },{
        id:'005',
        name:'指标名称1'
      },{
        id:'006',
        name:'指标名称2'
      },{
        id:'007',
        name:'指标名称3'
      },{
        id:'008',
        name:'指标名称4'
      },{
        id:'009',
        name:'指标名称1'
      },{
        id:'010',
        name:'指标名称2'
      },{
        id:'011',
        name:'指标名称3'
      },{
        id:'012',
        name:'指标名称4'
      },{
        id:'013',
        name:'指标名称1'
      },{
        id:'014',
        name:'指标名称2'
      },{
        id:'015',
        name:'指标名称3'
      },{
        id:'016',
        name:'指标名称4'
      },{
        id:'017',
        name:'指标名称1'
      },{
        id:'018',
        name:'指标名称2'
      },{
        id:'019',
        name:'指标名称3'
      },{
        id:'020',
        name:'指标名称4'
      },
      ],
      //右侧的指标表格
      serverTargetTable:[
        {
          id:'001',
          name:'指标名称1'
        },{
          id:'002',
          name:'指标名称2'
        },{
          id:'003',
          name:'指标名称3'
        },{
          id:'004',
          name:'指标名称4'
        },{
          id:'005',
          name:'指标名称1'
        },{
          id:'006',
          name:'指标名称2'
        },{
          id:'007',
          name:'指标名称3'
        },{
          id:'008',
          name:'指标名称4'
        },{
          id:'009',
          name:'指标名称1'
        },{
          id:'010',
          name:'指标名称2'
        },{
          id:'011',
          name:'指标名称3'
        },{
          id:'012',
          name:'指标名称4'
        },{
          id:'013',
          name:'指标名称1'
        },{
          id:'014',
          name:'指标名称2'
        },{
          id:'015',
          name:'指标名称3'
        },{
          id:'016',
          name:'指标名称4'
        },{
          id:'017',
          name:'指标名称1'
        },{
          id:'018',
          name:'指标名称2'
        },{
          id:'019',
          name:'指标名称3'
        },{
          id:'020',
          name:'指标名称4'
        },
      ],
      // 所属系统
      BelongingSystems: [//所属系统
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
      EventSourceType: [//事件来源类型
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
      EventType: [//事件类型
        {
        value: '选项1',
        label: '1--报警'
      }, {
        value: '选项2',
        label: '2--恢复'
      }
      ],
      value: ''
    }
  },
  methods: {
    Del() {
      console.log(this);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    Cancel() {
      this.$message('取消成功')
    },
    Confirm() {
      this.$message('添加成功')
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(index,row){
      this.form.target = row.id
      this.targetTable = row
      // event
      // console.log(row.id)
      // console.log("点击了某个东西")
    }
  },
  watch:{
    //当对应指标中输入东西的时候搜索
    'form.target':{
      immediate:true,
      handler(val){
        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.name.indexOf(val) !== -1 || p.id.indexOf(val) !== -1
        })
      }
    }
  },
  mounted:{

  }
}

</script>

<style scoped>
  .dialog-footer{
    margin: 0 auto;
  }
  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
  }
  .targetTableGetFocus{
    background-color: #4A9FF9;
  }
</style>
