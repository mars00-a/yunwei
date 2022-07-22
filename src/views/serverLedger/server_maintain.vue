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
          <el-button type="primary" id="Find">过滤</el-button>
          <el-button type="primary">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogAddVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="myStyle" id="Main" >
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
        <!--服务器id：f_server_id-->
        <el-table-column
          prop="f_server_id"
          label="服务器id"
        >
        </el-table-column>
        <!--服务器名称：f_server_name-->
        <el-table-column
          prop="f_server_name"
          label="服务器名称"
        >
        </el-table-column>
        <!--服务器ip：f_server_ip-->
        <el-table-column
          prop="f_server_ip"
          label="服务器ip"
        >
        </el-table-column>
        <!--服务器运维管理端口：f_server_port-->
        <el-table-column
          prop="f_server_port"
          width="150"
          label="服务器运维管理端口"
        >
        </el-table-column>
        <!--是否监测该服务器：f_ismonitored-->
        <el-table-column
          prop="f_ismonitored"
          label="是否监测该服务器"
        >
        </el-table-column>
        <!--是否控制该服务器：f_iscontroled-->
        <el-table-column
          prop="f_iscontroled"
          label="是否控制该服务器"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="415">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="4.8">
                <el-button type="primary" @click="dialogReviseVisible = true">修改</el-button>
              </el-col>
              <el-col :span="4.8">
                <el-button type="danger" @click="Del">删除</el-button>
              </el-col>
              <el-col :span="4.8">
                <el-button type="warning" @click="dialogCustomerVisible = true">客户</el-button>
              </el-col>
              <el-col :span="4.8">
                <el-button type="info" @click="dialogServiceVisible = true">服务</el-button>
              </el-col>
              <el-col :span="4.8">
                <el-button type="success" @click="dialogLoginVisible = true">登录</el-button>
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
    <el-dialog top="1vh" title="新增服务器信息" :visible.sync="dialogAddVisible" width="30%">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <!--服务器id-->
        <el-form-item label="服务器ID" :rules="[{ required: true}]">
          <el-input
            v-model="addForm.serviceType" />
        </el-form-item>
        <!--服务器类型-->
        <el-form-item label="服务器类型">
          <el-input v-model="addForm.serviceName" />
        </el-form-item>
        <!--服务器名称-->
        <el-form-item label="服务器名称">
          <el-input v-model="addForm.note"/>
        </el-form-item>
        <!--服务器IP-->
        <el-form-item label="服务器IP">
          <el-input v-model="addForm.serviceName"/>
        </el-form-item>
        <!--运维端口-->
        <el-form-item label="运维端口">
          <el-input v-model="addForm.serviceName"/>
        </el-form-item>
        <!--是否监测-->
        <el-form-item label="是否监测">
          <el-radio v-model="addForm.isMonitored" label="1">否</el-radio>
          <el-radio v-model="addForm.isMonitored" label="2">是</el-radio>
        </el-form-item>
        <!--是否远程控制-->
        <el-form-item label="是否远程控制">
          <el-radio v-model="addForm.isControled" label="1">否</el-radio>
          <el-radio v-model="addForm.isControled" label="2">是</el-radio>
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="addForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改按钮的弹窗-->
    <el-dialog top="1vh" title="新增服务器信息" :visible.sync="dialogReviseVisible" width="30%">
      <el-form ref="reviseForm" :model="reviseForm" label-width="100px">
        <!--服务器id-->
        <el-form-item label="服务器ID" :rules="[{ required: true}]">
          <el-input
            :disabled="true"
            v-model="reviseForm.serviceType" />
        </el-form-item>
        <!--服务器类型-->
        <el-form-item label="服务器类型">
          <el-input v-model="reviseForm.serviceName" />
        </el-form-item>
        <!--服务器名称-->
        <el-form-item label="服务器名称">
          <el-input v-model="reviseForm.note"/>
        </el-form-item>
        <!--服务器IP-->
        <el-form-item label="服务器IP">
          <el-input v-model="reviseForm.serviceName"/>
        </el-form-item>
        <!--运维端口-->
        <el-form-item label="运维端口">
          <el-input v-model="reviseForm.serviceName"/>
        </el-form-item>
        <!--是否监测-->
        <el-form-item label="是否监测">
          <el-radio v-model="reviseForm.isMonitored" label="1">否</el-radio>
          <el-radio v-model="reviseForm.isMonitored" label="2">是</el-radio>
        </el-form-item>
        <!--是否远程控制-->
        <el-form-item label="是否远程控制">
          <el-radio v-model="reviseForm.isControled" label="1">否</el-radio>
          <el-radio v-model="reviseForm.isControled" label="2">是</el-radio>
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="reviseForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReviseVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogReviseVisible = false">确 定</el-button>
      </span>

    </el-dialog>

    <!--客户按钮的弹窗-->
    <el-dialog title="修改客户信息" :visible.sync="dialogCustomerVisible" width="30%">
      <el-form ref="CustomerForm" :model="CustomerForm" label-width="90px">
        <!--客户ID-->
        <el-form-item label="客户ID">
          <el-input
            @focus="getCustomerId"
            v-model="CustomerForm.CustomerId" />
        </el-form-item>
        <!--选择日期-->
        <el-form-item label="启用日期">
          <el-date-picker
            v-model="CustomerForm.f_begin_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--停用日期-->
        <el-form-item label="停用日期">
          <el-date-picker
            v-model="CustomerForm.f_end_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--客户id选择列表-->
        <div v-show = tableCustomerVisible id="targetTable">
          <el-table
            :data="targetCustomerIdTable"
            height="500"
            border
            style="width: 100%">
            <el-table-column
              active-class="targetTableGetFocus"
              prop="customerlId"
              label="客户ID"
              width="105%">
            </el-table-column>
            <el-table-column
              prop="customerName"
              label="客户名称"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCustomerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCustomerVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--服务按钮的弹窗-->
    <el-dialog title="修改服务信息" :visible.sync="dialogServiceVisible" width="30%">
      <el-form ref="serviceForm" :model="serviceForm" label-width="90px">
        <!--服务类型-->
        <el-form-item label="服务类型id" :rules="[{ required: true}]">
          <el-input
            :disabled="true"
            v-model="serviceForm.serviceType" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="服务名称">
          <el-input v-model="serviceForm.serviceName" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="服务数据表">
          <el-input v-model="serviceForm.serviceTable" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="serviceForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogServiceVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogServiceVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <!--登录按钮的弹窗-->
    <el-dialog title="修改登录信息" :visible.sync="dialogLoginVisible" width="60%">
      <el-table
        :data="loginTable"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="f_server_name"
          label="服务器ID">
        </el-table-column>
        <el-table-column
          prop="f_begin_time"
          label="服务器IP">
        </el-table-column>
        <el-table-column
          prop="f_server_port"
          label="服务器端口">
        </el-table-column>
        <el-table-column
          prop="f_end_time"
          label="登录工具">
        </el-table-column>
        <el-table-column
          prop="f_login_name"
          label="登录用户名">
        </el-table-column>
        <el-table-column
          prop="f_login_pwd"
          label="登录密码">
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
        <el-button @click="dialogLoginVisible = true, dialogLoginAddVisible = true">新 增</el-button>
        <el-button @click="dialogLoginVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogLoginVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增登录信息" :visible.sync="dialogLoginAddVisible" width="30%">
      <el-form ref="loginAddForm" :model="customerAddForm" label-width="90px">
        <!--服务器ID-->
        <el-form-item label="服务器ID">
          <el-input v-model="loginAddForm.f_server_id" />
        </el-form-item>
        <!--服务器IP-->
        <el-form-item label="服务器IP">
          <el-input v-model="loginAddForm.f_server_ip" />
        </el-form-item>
        <!--服务器端口-->
        <el-form-item label="服务器端口">
          <el-input v-model="loginAddForm.f_server_port" />
        </el-form-item>
        <!--使用工具-->
        <el-form-item label="使用工具">
          <el-input v-model="loginAddForm.f_login_soft" />
        </el-form-item>
        <!--登录用户名-->
        <el-form-item label="登录用户名">
          <el-input v-model="loginAddForm.f_login_name" />
        </el-form-item>
        <!--登录密码-->
        <el-form-item label="登录密码">
          <el-input v-model="loginAddForm.f_login_pwd" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLoginAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogLoginAddVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>

  export default {
    name: 'op_server',
    components: {
    },
    data() {
      return{
        //*******************控制区*******************
        //过滤参数下拉框
        FilterParameters: [],
        //过滤参数的值
        FilterParameter_value: '',
        //查找输入框
        CompleteValue:'',
        //*******************中间主体*******************
        //处理页面自适应
        myStyle:{
          height:"29rem"
        },
        //表格数据
        tableData: [],
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
        //新增弹窗
        dialogAddVisible: false,
        addForm:{},
        //修改的弹窗
        dialogReviseVisible: false,
        reviseForm:{},
        //客户的弹窗
        dialogCustomerVisible: false,
        tableCustomerVisible: false,
        CustomerForm:{
          CustomerId:'',
        },
        targetCustomerIdTable:[{
          customerlId:'101',
          customerName:'张三'
        },{
          customerlId:'102',
          customerName:'李四'
        },{
          customerlId:'201',
          customerName:'王五'
        }],
        customerIdTable:[{
          customerlId:'101',
          customerName:'张三'
        },{
          customerlId:'102',
          customerName:'李四'
        },{
          customerlId:'201',
          customerName:'王五'
        }],
        //服务的弹窗
        dialogServiceVisible: false,
        serviceForm:{},
        //登录的弹窗
        dialogLoginVisible: false,
        dialogLoginAddVisible:false,
        loginTable:[{}],
        loginAddForm:[],

      }
    },
    methods:{
      //**********************数据更新**********************
      //************************分页************************
      //鼠标放到某一行上就触发
      tableCellClassName({row,rowIndex}){
        row.index=rowIndex;
      },
      //鼠标放到某一行上就触发
      getNowRow(row){
        this.nowRow = row.index+1+(this.currentPage-1)*this.size;
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
      //删除功能的事件
      Del() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //显示客户id选择列表
      getCustomerId(){
        this.tableCustomerVisible = true;
      },
      //添加客户id
      targetTableGetFocus(index,row){
        console.log(row.customerlId);
        console.log(this.CustomerForm.CustomerId);
        this.CustomerForm.CustomerId = row.customerlId;
        console.log(this.CustomerForm.CustomerId);
      },
    },
    watch:{
      //当对应指标中输入东西的时候搜索
      'CustomerForm.customer_id':{
        immediate:true,

        handler(val){
          if(val !== undefined){
            console.log(val);
            this.targetCustomerIdTable = this.customerIdTable.filter(p =>{
              return p.customerName.indexOf(val) !== -1 || p.customerlId.indexOf(val) !== -1
            });
            console.log(this.targetCustomerIdTable);
          }
          else {
            this.targetCustomerIdTable = this.customerIdTable;
          }
        }
      }
    },
    mounted(){

      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
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
  #myFooter{
    position: absolute;
    right: 4vh;
    bottom: 2vh;
  }
  #controlPosition{
    display: inline-block;
    position: absolute;
    right: 2rem;
    top: 0;
  }
  #controlBigPosition{
    position: absolute;
    right: 7.2rem;
  }
</style>

