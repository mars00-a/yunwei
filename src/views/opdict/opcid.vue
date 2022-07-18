<template>
  <el-container>
    <el-header id="Header">
      <el-row :gutter="10" id="Control">
        <!--过滤参数选择-->
        <el-col :span="6">
          <span id="FilterParameters">过滤参数：</span>
          <el-select v-model="FilterParameter_value" placeholder="请选择" title="过滤参数:" id="FilterBox">
            <el-option
              v-for="item in FilterParameters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!--查找输入框-->
        <el-col :span="1">
          <span id="Value">值：</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="CompleteValue" placeholder="请输入内容"/>
        </el-col>
        <!--查找、新增功能按钮-->
        <el-col :span="13">
          <el-button type="primary" id="Find">查找</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
            <!--            左侧表单栏-->
            <div>
              <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="事件id" :rules="[{ required: true}]">
                  <el-input v-model="form.EventId" />
                </el-form-item>
                <el-form-item label="事件名称">
                  <el-input v-model="form.EventName" />
                </el-form-item>
                <el-form-item label="所属系统">
                  <el-select
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
                <el-form-item label="事件来源类型">
                  <el-select
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
                <el-form-item label="对应指标">
                  <el-input  placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.target" />
                </el-form-item>
                <el-form-item label="事件类型">
                  <el-select
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
                <el-form-item label="事件阈值">
                  <el-input v-model="form.Threshold" />
                </el-form-item>
                <el-form-item label="事件默认级别">
                  <el-input v-model="form.Level" />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form.Remark"/>
                </el-form-item>
              </el-form>
              <span  slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible=false,Confirm(form.EventId)">确 定</el-button>
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
              </el-table>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="Main" >
      <el-table
        :data="tableData"
        height="520"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow">
        <!--运维事件id：f_opcid-->
        <el-table-column
          prop="f_opcid"
          label="运维事件id"
        >
        </el-table-column>
        <!--运维事件名称：f_opcid_name-->
        <el-table-column
          prop="f_opcid_name"
          label="运维事件名称"
        >
        </el-table-column>
        <!--所属系统id：f_system_id-->
        <el-table-column
          prop="f_system_id"
          label="所属系统id"
        >
        </el-table-column>
        <!--事件类型：f_type-->
        <el-table-column
          prop="f_type"
          label="事件类型"
        >
        </el-table-column>
        <!--运维指标id：f_opsignal_id-->
        <el-table-column
          prop="f_opsignal_id"
          label="运维指标id"
        >
        </el-table-column>
        <!--事件类型：f_event_type-->
        <el-table-column
          prop="f_event_type"
          label="事件类型"
        >
        </el-table-column>
        <!--默认阈值：f_threshold-->
        <el-table-column
          prop="f_threshold"
          label="默认阈值"
        >
        </el-table-column>
        <!--事件默认级别：f_level-->
        <el-table-column
          prop="f_level"
          label="事件默认级别"
        >
        </el-table-column>
        <!--备注：f_note-->
        <el-table-column
          prop="f_note"
          label="备注"
        >
        </el-table-column>
        <!--操作-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <OpOperateOpcid
              :target-table="targetTable"
              :server-target-table="serverTargetTable"
              :MyData="scope.row"
              @Revise='GetRevise'
              @Del='GetDel'/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <!--当前行数与总数据条数-->
      <div id="now_line_number">第{{nowRow}}条/共{{totalNumber}}条数据</div>
      <!--分页-->
      <div id="paginate">
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next, jumper"
          :total="12000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpOperateOpcid from '../../components/Opdict/OpOperate/Opcid'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpOperateOpcid
  },
  data() {
    return {
      tableData: [{
        f_opcid: 'E000100001',
        f_opcid_name: '服务器失联报警',
        f_system_id: '0',
        f_type: '硬件',
        f_opsignal_id: 'S000100001',
        f_event_type: '1',
        f_threshold: '0',
        f_level: '6',
        f_note: ''
      },{
        f_opcid: 'E000100001',
        f_opcid_name: '服务器失联报警',
        f_system_id: '0',
        f_type: '硬件',
        f_opsignal_id: 'S000100001',
        f_event_type: '1',
        f_threshold: '0',
        f_level: '6',
        f_note: ''
      },{
        f_opcid: 'E000100001',
        f_opcid_name: '服务器失联报警',
        f_system_id: '0',
        f_type: '硬件',
        f_opsignal_id: 'S000100001',
        f_event_type: '1',
        f_threshold: '0',
        f_level: '6',
        f_note: ''
      },{
        f_opcid: 'E000100001',
        f_opcid_name: '服务器失联报警',
        f_system_id: '0',
        f_type: '硬件',
        f_opsignal_id: 'S000100001',
        f_event_type: '1',
        f_threshold: '0',
        f_level: '6',
        f_note: ''
      }],
      FilterParameters: [{
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
      FilterParameter_value: '',
      //值查询

      //新增
      controlShow: false,
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
      EventSourceTypes: [//事件来源类型
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
      EventTypes: [//事件类型
        {
          value: '选项1',
          label: '1--报警'
        }, {
          value: '选项2',
          label: '2--恢复'
        }
      ],
      // 分页
      //currentPage进入的第一页是第几页
      currentPage: 1,
      //当前行数
      nowRow: 1,
      //总页数
      totalNumber: 1200
    }
  },
  methods: {
    //************************分页************************
    //处理页面初始数据
    dealData(){

    },
    //鼠标放到某一行上就触发
    getNowRow(row){
      // console.log(row);
    },
    //每页最大条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    //当前页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(index,row){
      this.form.target = "@"+row.id;
    },
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm(id) {
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('运维状态的id不能为空');
      }
      else{
        //储存新增的值到Value
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        console.log(this.form)
      }
    },
    handleEdit(row) {
      console.log(row);
    },
    //修改、删除后的表数据返回到以下两个函数
    GetRevise(msg) {
      console.log(msg);
    },
    GetDel(msg) {
      console.log(msg);
    },
  },
  watch:{
    //当对应指标中输入东西的时候搜索
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
  mounted(){
    this.dealData();
  }
}
</script>

<style scoped>
  #Header{
    background: #f1f3f4;
  }
  #Find{
    margin-left: 1rem;
  }
  #Control{
    margin-top: 0.8rem;
  }
  .dialog-footer{
    margin: 0 auto;
  }
  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
  }
  /*设置分页属性*/
  #now_line_number{
    font-size: 0.85rem;
    margin-left: 2rem;
    margin-top: 0.6rem;
    color: #606266;
    float:left;
  }
  #paginate{
    float:right;
    margin-right: 2rem;
  }
  #Value{
    line-height: 2.2rem;
    padding-left: 1.2rem;
  }
</style>
