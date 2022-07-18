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
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
              <!--服务类型-->
              <el-form-item label="服务类型" :rules="[{ required: true}]">
                <el-input v-model="form.f_service_type" />
              </el-form-item>
              <!--服务名称-->
              <el-form-item label="服务名称">
                <el-input v-model="form.f_service_name" />
              </el-form-item>
              <!--服务数据表-->
              <el-form-item label="服务数据表">
                <el-input v-model="form.f_service_table" />
              </el-form-item>
              <!--备注-->
              <el-form-item label="备注">
                <el-input v-model="form.f_note"  type="textarea"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm(form.f_service_type)">确 定</el-button>
        </span>
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
        <!--服务类型id：f_service_type-->
        <el-table-column
          prop="f_service_type"
          label="服务类型id"
        >
        </el-table-column>
        <!--服务类型名称：f_service_name-->
        <el-table-column
          prop="f_service_name"
          label="服务类型名称"
        >
        </el-table-column>
        <!--服务信息存放表：f_service_table-->
        <el-table-column
          prop="f_service_table"
          label="服务信息存放表"
        >
        </el-table-column>
        <!--说明：f_note-->
        <el-table-column
          prop="f_note"
          label="说明"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <Service :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
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
import Service from '../../components/Opdict/OpOperate/Service'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    Service
  },
  data() {
    return {
      tableData: [{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
      },{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
      },{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
      },{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
      },{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
      },{
        f_service_type: '1',
        f_service_name: '安防服务',
        f_service_table: 'Opsv_security',
        f_note: 'SK3000,SK2008,SK6800等',
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
        f_service_type: '',
        f_service_name: '',
        f_service_table: '',
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
        this.$message.error('服务类型id不能为空');
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
