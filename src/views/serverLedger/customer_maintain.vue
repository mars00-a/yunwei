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
          <el-button type="primary" id="Find" @click="Find()">过滤</el-button>
          <el-button type="primary" @click="dealData()">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogAddVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="myStyle" id="Main"  >
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow"
        :cell-class-name="tableCellClassName">
        <!--序号-->
        <el-table-column
          width="50"
          type="index"
          label="序号"
        >
        </el-table-column>
        <!--客户id：customerId-->
        <el-table-column
          prop="customerId"
          label="客户id"
        >
        </el-table-column>
        <!--区域负责人：areaManager-->
        <el-table-column
          prop="areaManager"
          label="区域负责人"
        >
        </el-table-column>
        <!--使用公司：company-->
        <el-table-column
          prop="company"
          label="公司名称"
        >
        </el-table-column>
        <!--联系人：contact-->
        <el-table-column
          prop="contact"
          label="联系人"
        >
        </el-table-column>
        <!--联系电话：contactPhone-->
        <el-table-column
          prop="contactPhone"
          label="联系电话"
        >
        </el-table-column>
        <!--回访时间：revisitTime-->
        <el-table-column
          prop="revisitTime"
          label="回访时间"
        >
        </el-table-column>
        <!--地址：address-->
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <!--备注：note-->
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>
        <!--区域经理ID：areaManagerId-->
        <el-table-column
          prop="areaManagerId"
          label="区域经理ID"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="345">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="5.4">
                <el-button type="primary" @click="dialogReviseVisible = true, getRow(scope.row)">修改</el-button>
              </el-col>
              <el-col :span="5.4">
                <el-button type="danger" @click="Del(scope.row)">删除</el-button>
              </el-col>
              <el-col :span="7.4">
                <el-button type="warning" @click="dialogServerVisible = true">服务器</el-button>
              </el-col>
              <el-col :span="5.4">
                <el-button type="info" @click="dialogServiceVisible = true">服务</el-button>
              </el-col>
            </el-row>
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
          :page-sizes="[20, 50, 100, 200, 300]"
          :page-size="size"
          layout="sizes, prev, pager, next, jumper"
          :total="totalNumber"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-footer>
    <!--新增按钮的弹窗-->
    <el-dialog top="1vh" title="新增" :visible.sync="dialogAddVisible" width="30%">
      <el-form ref="addForm" :model="addForm" label-width="90px">
        <!--客户id-->
        <el-form-item label="客户id" :rules="[{ required: true}]">
          <el-input
            v-model="addForm.customerId" />
        </el-form-item>
        <!--客户经理-->
        <el-form-item label="客户经理">
          <el-select
            :style="controlWidth"
            v-model="addForm.areaManager"
            filterable
            allow-create
            default-first-option
            placeholder="请选择客户经理"
          >
            <el-option
              v-for="item in accountManagers"
              :key=item
              :label=item
              :value=item
            />
          </el-select>
        </el-form-item>
        <!--公司名称-->
        <el-form-item label="公司名称">
          <el-input v-model="addForm.company" />
        </el-form-item>
        <!--客户名称-->
        <el-form-item label="联系人">
          <el-input v-model="addForm.contact" />
        </el-form-item>
        <!--联系电话-->
        <el-form-item label="联系电话">
          <el-input v-model="addForm.contactPhone"/>
        </el-form-item>
        <!--回访时间-->
        <el-form-item label="回访时间">
          <el-date-picker
            :style="controlWidth"
            v-model="addForm.revisitTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--区域经理ID-->
        <el-form-item label="区域经理ID">
          <el-input v-model="addForm.areaManagerId"/>
        </el-form-item>
        <!--客户地址-->
        <el-form-item label="客户地址">
          <el-input v-model="addForm.address"  type="textarea"/>
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="addForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddVisible = false, addConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改按钮的弹窗-->
    <el-dialog top="1vh" title="修改" :visible.sync="dialogReviseVisible" width="30%">
      <el-form ref="reviseForm" :model="reviseForm" label-width="90px">
        <!--客户id-->
        <el-form-item label="客户id" :rules="[{ required: true}]">
          <el-input
            :disabled="true"
            v-model="reviseForm.customerId" />
        </el-form-item>
        <!--客户经理-->
        <el-form-item label="客户经理">
          <el-select
            :style="controlWidth"
            v-model="reviseForm.areaManager"
            filterable
            allow-create
            default-first-option
            placeholder="请选择客户经理"
          >
            <el-option
              v-for="item in accountManagers"
              :key=item
              :label=item
              :value=item
            />
          </el-select>
        </el-form-item>
        <!--公司名称-->
        <el-form-item label="公司名称">
          <el-input v-model="reviseForm.company" />
        </el-form-item>
        <!--联系人-->
        <el-form-item label="联系人">
          <el-input v-model="reviseForm.contact" />
        </el-form-item>
        <!--联系电话-->
        <el-form-item label="联系电话">
          <el-input v-model="reviseForm.contactPhone"/>
        </el-form-item>
        <!--回访时间-->
        <el-form-item label="回访时间">
          <el-date-picker
            :style="controlWidth"
            v-model="reviseForm.revisitTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--区域经理ID-->
        <el-form-item label="区域经理ID">
          <el-input v-model="reviseForm.areaManagerId"/>
        </el-form-item>
        <!--客户地址-->
        <el-form-item label="客户地址">
          <el-input v-model="reviseForm.address"  type="textarea"/>
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="reviseForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReviseVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogReviseVisible = false, ReviseConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!--服务器按钮的弹窗-->
    <el-dialog title="修改服务器信息" :visible.sync="dialogServerVisible" width="50%">
      <el-table
        :data="serverTable"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="f_server_name"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          prop="f_begin_time"
          label="启用"
          width="180">
        </el-table-column>
        <el-table-column
          prop="f_end_time"
          label="停用"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="Del">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServerVisible = true, dialogServerAddVisible = true">新 增</el-button>
        <el-button @click="dialogServerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogServerVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增服务器信息" :visible.sync="dialogServerAddVisible" width="30%">
      <el-form ref="serverAddForm" :model="serverAddForm" label-width="90px">
        <!--客户id-->
        <el-form-item label="服务名称">
          <el-input v-model="serverAddForm.serverName" />
        </el-form-item>
        <!--客户id-->
        <el-form-item label="启用日期">
          <el-date-picker
            :style="controlWidth"
            v-model="serverAddForm.beginDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--客户id-->
        <el-form-item label="停用日期">
          <el-date-picker
            :style="controlWidth"
            v-model="serverAddForm.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServerAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogServerAddVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--服务器按钮的弹窗-->
    <el-dialog title="修改服务信息" :visible.sync="dialogServiceVisible" width="30%">
      <el-table
        :data="serverTable"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="f_service_name"
          label="服务名称">
        </el-table-column>
        <el-table-column
          prop="f_service_type"
          label="服务类型">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="Del">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServiceVisible = true, dialogServiceAddVisible = true">新 增</el-button>
          <el-button @click="dialogServiceVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogServiceVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="新增服务信息" :visible.sync="dialogServiceAddVisible" width="30%">
      <el-form ref="serviceAddForm" :model="serviceAddForm" label-width="90px">
        <!--服务名称-->
        <el-form-item label="服务名称">
          <el-input v-model="serviceAddForm.serviceName" />
        </el-form-item>
        <!--服务类型-->
        <el-form-item label="服务类型">
          <el-input v-model="serviceAddForm.serviceType" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServiceAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogServiceAddVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import {getOpCustomerPageList, getOpCustomerFindCustomerId, getOpCustomerFindAreaManager, getOpCustomerFindCompany,
    getOpCustomerFindContact, getOpCustomerFindContactPhone, getOpCustomerFindRevisitTime, getOpCustomerFindAddress,
    getOpCustomerFindNote, getOpCustomerFindAreaManagerId, getOpCustomerAreaManagerList, getOpCustomerCreate, getOpCustomerUpdate,
    getOpCustomerDelete, } from '@/api/serverLedger'
  export default {
    name: 'op_customer',
    components: {},
    data() {
      return {
        //*******************控制区*******************
        //过滤参数下拉框
        FilterParameters: [{
          value: 'CustomerId',
          label: '客户ID'
        },{
          value: 'AreaManager',
          label: '区域负责人'
        },{
          value: 'Company',
          label: '使用公司'
        },{
          value: 'Contact',
          label: '联系人'
        },{
          value: 'ContactPhone',
          label: '联系电话'
        },{
          value: 'RevisitTime',
          label: '回访时间'
        },{
          value: 'Address',
          label: '地址'
        },{
          value: 'Note',
          label: '备注'
        },{
          value: 'AreaManagerId',
          label: '区域经理ID'
        },],
        //过滤参数的值
        FilterParameter_value: '',
        //查找输入框
        CompleteValue: '',
        //*******************中间主体*******************
        //处理页面自适应
        myStyle: {
          height: "29rem"
        },
        //表格数据
        tableData: [
          {}
        ],
        //*******************分页尾部*******************
        // 分页
        //currentPage进入的第一页是第几页
        currentPage: 1,
        //当前行数
        nowRow: 1,
        //数据总数
        totalNumber: '',
        //当前页面显示最大数量
        size: 20,
        //*******************弹窗*******************
        //弹窗中各类宽度调整
        controlWidth: {
          width: "100%"
        },
        //********新增弹窗********
        //弹窗是否可见
        dialogAddVisible: false,
        //新增的表单
        addForm: {},
        //客户经理下拉框
        accountManagers: [],
        //********修改的弹窗********
        //弹窗是否可见
        dialogReviseVisible: false,
        //修改的表单
        reviseForm: {},
        //********服务器的弹窗********
        //弹窗是否可见
        dialogServerVisible: false,
        //服务器的表格
        serverTable: [{}],
        dialogServerAddVisible:false,
        serverAddForm:{},
        //********服务的弹窗********
        //弹窗是否可见
        dialogServiceVisible: false,
        //服务的表单
        serviceForm: [{}],
        dialogServiceAddVisible:false,
        serviceAddForm:{},
      }
    },
    methods: {
      //********************数据更新处理********************
      dealData(){
        getOpCustomerPageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
          console.log(request);
        });
        this.FilterParameter_value = '';
        this.CompleteValue='';
      },
      Find(){
        if(this.FilterParameter_value === 'CustomerId'){
          getOpCustomerFindCustomerId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'AreaManager') {
          getOpCustomerFindAreaManager(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Company') {
          getOpCustomerFindCompany(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Contact') {
          getOpCustomerFindContact(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'ContactPhone') {
          getOpCustomerFindContactPhone(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'RevisitTime') {
          getOpCustomerFindRevisitTime(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Address') {
          getOpCustomerFindAddress(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'Note') {
          getOpCustomerFindNote(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'AreaManagerId') {
          getOpCustomerFindAreaManagerId(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else{
          this.dealData();
        }
      },
      //下拉框数据
      dropDownBox(){
        getOpCustomerAreaManagerList().then(request=>{
          for(let i=0;i<request.data.body.length;i++){
            this.accountManagers[i] = request.data.body[i].managerName;
          }
        });
      },
      //************************分页************************
      //鼠标放到某一行上就触发
      tableCellClassName({row, rowIndex}) {
        row.index = rowIndex;
      },
      //鼠标放到某一行上就触发
      getNowRow(row) {
        this.nowRow = row.index + 1 + (this.currentPage - 1) * this.size;
      },
      //每页最大条数
      handleSizeChange(val) {
        this.size = val;
        this.Find();
      },
      //当前页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.Find();
      },
      //**********************表格主体**********************
      //************************弹窗************************
      //新增功能的事件
      addConfirm(){
        if(this.addForm.customerId === ""){
          this.dialogAddVisible = true;
          this.$message.error('客户ID不能为空');
        }
        else{
          getOpCustomerCreate(this.addForm).then(request=>{
            if(request.data.body){
              this.Find();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }else {
              super.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
      },
      //修改功能的事件
      getRow(row){
        this.reviseForm = row;
      },
      ReviseConfirm(){
        if(this.reviseForm.customerId === ""){
          this.dialogReviseVisible = true;
          this.$message.error('客户ID不能为空');
        }
        else {
          getOpCustomerUpdate(this.reviseForm).then(request => {
            if (request.data.body) {
              this.Find();
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
            } else {
              super.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
      },
      //删除功能的事件
      Del(row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getOpCustomerDelete(row.customerId).then(request=>{
            if (request.data.body) {
              this.Find();
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              super.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted(){
      this.dealData();
      this.dropDownBox();
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      }

    },
    watch:{
      'reviseForm.managerName':{
        immediate:true,
        handler(val){
          let i = 1;
          this.accountManagers.forEach(a=>{
            if(val === a){
              this.reviseForm.customerId = i
            }
            i++;
          });
        }
      },
      'addForm.managerName':{
        immediate:true,
        handler(val){
          let i = 1;
          this.accountManagers.forEach(a=>{
            if(val === a){
              this.addForm.customerId = i
            }
            i++;
          });
        }
      }
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
  #Value{
    line-height: 2.2rem;
    padding-left: 1.2rem;
  }
</style>
