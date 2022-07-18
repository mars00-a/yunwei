<template>
  <el-container>
    <el-header id="Header">
      <el-row :gutter="10" id="Control">
        <el-col :span="6"><div class="grid-content bg-purple">
          <span id="FilterParameters">过滤参数：</span>
          <el-select v-model="FilterParameter_value" placeholder="请选择" title="过滤参数:" id="FilterBox">
            <el-option
              v-for="item in FilterParameters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span id="Value">值：</span>
          <!--远程搜索框-->
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"/>
          <el-button type="primary" id="Find">查找</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <!--新增按钮的弹窗-->
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="35%">
            <el-form ref="form" :model="form" label-width="80px">
              <!--f_status_id-->
              <el-form-item label="状态的id" :rules="[{ required: true}]">
                <el-input v-model="form.f_status_id" />
              </el-form-item>
              <!--f_status_name-->
              <el-form-item label="状态名称">
                <el-input v-model="form.f_status_name" />
              </el-form-item>
              <!--f_opsignal_id-->
              <el-form-item label="对应指标">
                <el-input v-model="form.f_opsignal_id" placeholder="输入指标名称可查找指标id" @focus="getFocus"/>
              </el-form-item>
              <!--f_upthres-->
              <el-form-item label="阈值上限">
                <el-input v-model="form.f_upthres" />
              </el-form-item>
              <!--f_downthres-->
              <el-form-item label="阈值下限">
                <el-input v-model="form.f_downthres" />
              </el-form-item>
              <!--f_level-->
              <el-form-item label="状态类型">
                <el-select
                  v-model="form.f_level"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择状态类型">
                  <el-option
                    v-for="item in ObjectTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!--f_note-->
              <el-form-item label="备注">
                <el-input v-model="form.f_note"  type="textarea"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.f_status_id)">确 定</el-button>
        </span>
            <!--对应指标列表-->
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
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
        </div></el-col>
      </el-row>
    </el-header>
    <el-main id="Main" >
      <el-table
        :data="tableData"
        height="520"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow">
        <!--运维状态id：f_status_id-->
        <el-table-column
          prop="f_status_id"
          label="运维状态id"
        >
        </el-table-column>
        <!--运维状态名称：f_status_name-->
        <el-table-column
          prop="f_status_name"
          label="运维状态名称"
        >
        </el-table-column>
        <!--运维指标id：f_opsignal_id-->
        <el-table-column
          prop="f_opsignal_id"
          label="运维指标id"
        >
        </el-table-column>
        <!--阈值默认上限：f_upthres-->
        <el-table-column
          prop="f_upthres"
          label="阈值默认上限"
        >
        </el-table-column>
        <!--阈值默认下限：f_downthres-->
        <el-table-column
          prop="f_downthres"
          label="阈值默认下限"
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
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <Status :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
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
import Status from '../../components/Opdict/OpOperate/Status'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    Status
  },
  data() {
    return {
      tableData: [{
        f_status_id: 'A000100001',
        f_status_name: '服务器存活',
        f_opsignal_id: 'S000100001',
        f_upthres: '1',
        f_downthres: '1',
        f_level: '1',
        f_note: ''
      },{
        f_status_id: 'A000100001',
        f_status_name: '服务器存活',
        f_opsignal_id: 'S000100001',
        f_upthres: '1',
        f_downthres: '1',
        f_level: '1',
        f_note: ''
      },{
        f_status_id: 'A000100001',
        f_status_name: '服务器存活',
        f_opsignal_id: 'S000100001',
        f_upthres: '1',
        f_downthres: '1',
        f_level: '1',
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

      //新增
      dialogVisible: false,
      form: {
        f_status_id: '',
        f_status_name: '',
        f_opsignal_id: '',
        f_upthres: '',
        f_downthres: '',
        f_level: '',
        f_note: ''
      },
      // 分页
      //currentPage进入的第一页是第几页
      currentPage: 1,
      //当前行数
      nowRow: 1,
      //总页数
      totalNumber: 1200
    }
  },
  methods:{
    //************************分页************************
    //处理页面初始数据
    dealData(){

    },
    //鼠标放到某一行上就触发
    getNowRow(row){
      console.log(row);
    },
    //每页最大条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    //当前页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm(id) {
      //非空验证
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('状态的id不能为空');
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
    GetRevise(msg){
      console.log(msg);
    },
    GetDel(msg){
      console.log(msg);
    },
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
</style>
