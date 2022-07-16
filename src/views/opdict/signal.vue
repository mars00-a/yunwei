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
                <el-input v-model="form.f_note" />
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
        style="width: 87.8rem">
        <!--f_service_type-->
        <el-table-column
          prop="f_service_type"
          label="f_service_type"
        >
        </el-table-column>
        <!--f_service_name-->
        <el-table-column
          prop="f_service_name"
          label="f_service_name"
        >
        </el-table-column>
        <!--f_service_table-->
        <el-table-column
          prop="f_service_table"
          label="f_service_table"
        >
        </el-table-column>
        <!--f_note-->
        <el-table-column
          prop="f_note"
          label="f_note"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <Signal :myData="scope.row" @Revise='GetRevise' @Del='GetDel'/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <OpStatus/>
    </el-footer>
  </el-container>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import Signal from '../../components/Opdict/OpOperate/Signal'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    Signal
  },
  data() {
    return {
      tableData: [
        {
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
      FilterParameters: [
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
      FilterParameter_value: '',

      //新增
      dialogVisible: false,
      form: {
        f_service_type: '',
        f_service_name: '',
        f_service_table: '',
        f_note: ''
      }
    }
  },
  methods:{
    //新增功能弹窗的取消和确认
    Cancel() {
      this.$message('取消成功')
    },
    Confirm(id) {
      //非空验证
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('监控的id不能为空');
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
  }</style>
