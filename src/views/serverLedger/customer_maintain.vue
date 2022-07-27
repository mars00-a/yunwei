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
          <el-button type="success" id="Add" @click="dialogAddVisible = true, dealAddForm()">新增</el-button>
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
        <!--客户经理：areaManager-->
        <el-table-column
          prop="areaManager"
          label="客户经理"
        >
        </el-table-column>
        <!--使用公司：company-->
        <el-table-column
          :show-overflow-tooltip="true"
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
          width="120"
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
          :show-overflow-tooltip="true"
          prop="address"
          label="地址"
        >
        </el-table-column>
        <!--备注：note-->
        <el-table-column
          prop="note"
          label="备注"
          :show-overflow-tooltip="true"
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
                <el-button type="warning" @click="dialogServerVisible = true, getServer(scope.row)">服务器</el-button>
              </el-col>
              <el-col :span="5.4">
                <el-button type="info" @click="dialogServiceVisible = true, getService(scope.row)">服务</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <el-row :gutter="30">
        <el-col :span="10">
          <div id="now_line_number">第{{nowRow}}条/共{{totalNumber}}条数据</div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-pagination
              id="controlBigPosition"
              background
              :current-page="currentPage"
              :page-sizes="[20, 50, 100, 200, 300]"
              :page-size="size"
              layout="sizes, prev, pager, next, jumper"
              :total="totalNumber"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
            <el-button id="controlPosition" type="primary" round>跳转</el-button>
          </div>
        </el-col>
      </el-row>
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
    <el-dialog title="查看相关服务器信息" :visible.sync="dialogServerVisible" width="50%">
      <el-table
        :data="serverTable"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="server.serverId"
          label="服务器ID">
        </el-table-column>
        <el-table-column
          prop="server.serverName"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="启用"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="停用"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="ServerDel(scope.row)">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServerVisible = true, dialogAddServerVisible = true">新 增</el-button>
        <el-button @click="dialogServerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogServerVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增所属服务器信息" :visible.sync="dialogAddServerVisible" width="30%">
      <el-form ref="addServerForm" :model="addServerForm" label-width="90px">
        <!--服务器ID-->
        <el-form-item label="服务器ID">
          <el-input v-model="addServerForm.serverId" :disabled="true"/>
        </el-form-item>
        <!--服务器名称-->
        <el-form-item label="服务器名称">
          <el-input v-model="addServerForm.serverName" @focus="dialogServerIdTableVisible = true"/>
        </el-form-item>
        <!--启用日期-->
        <el-form-item label="启用日期">
          <el-date-picker
            :style="controlWidth"
            v-model="addServerForm.beginTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--停用日期-->
        <el-form-item label="停用日期">
          <el-date-picker
            :style="controlWidth"
            v-model="addServerForm.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddServerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddServerVisible = false, ServerAddConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="获取服务器ID/名称" :visible.sync="dialogServerIdTableVisible" width="50%">
      <el-row :gutter="30">
        <el-col :span="19">
          <el-tooltip class="item" effect="dark" content="如果查无信息，可点击新增服务器按钮添加新的服务器" placement="top">
            <el-input v-model="ServerIdTableCompleteValue" placeholder="请输入内容"/>
          </el-tooltip>
        </el-col>
        <el-col :span="5"> <el-button type="primary" @click="dialogCreateServerVisible = true, CreateNewServer()">新增服务器</el-button></el-col>
      </el-row>
      <el-table
        :data="serverIdTable"
        height="350"
        border
        style="width: 100%"
        id="ServerIdTable">
        <el-table-column
          prop="serverId"
          label="服务器ID">
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="服务器名称">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="dialogServerIdTableVisible = false, AddServerId(scope.row)">添加</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog top="1vh" title="新增服务器信息" :visible.sync="dialogCreateServerVisible" width="30%">
      <el-form ref="newServerForm" :model="newServerForm" label-width="100px">
        <!--服务器id-->
        <el-form-item label="服务器ID" :rules="[{ required: true}]">
          <el-input
            v-model="newServerForm.serverId" />
        </el-form-item>
        <!--服务器类型-->
        <el-form-item label="服务器类型">
          <el-input v-model="newServerForm.serverType" />
        </el-form-item>
        <!--服务器名称-->
        <el-form-item label="服务器名称">
          <el-input v-model="newServerForm.serverName"/>
        </el-form-item>
        <!--服务器IP-->
        <el-form-item label="服务器IP">
          <el-input v-model="newServerForm.serverIp"/>
        </el-form-item>
        <!--运维端口-->
        <el-form-item label="运维端口">
          <el-input v-model="newServerForm.serverPort"/>
        </el-form-item>
        <!--是否监测-->
        <el-form-item label="是否监测">
          <el-radio v-model="newServerForm.monitored" label="0">否</el-radio>
          <el-radio v-model="newServerForm.monitored" label="1">是</el-radio>
        </el-form-item>
        <!--是否远程控制-->
        <el-form-item label="是否远程控制">
          <el-radio v-model="newServerForm.controlled" label="0">否</el-radio>
          <el-radio v-model="newServerForm.controlled" label="1">是</el-radio>
        </el-form-item>
        <!--备注-->
        <el-form-item label="备注">
          <el-input v-model="newServerForm.node"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateServerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCreateServerVisible = false, addNewServer()">确 定</el-button>
      </span>
    </el-dialog>

    <!--服务按钮的弹窗-->
    <el-dialog title="查看相关服务信息" :visible.sync="dialogServiceVisible" width="50%">
      <el-table
        :data="serviceTable"
        height="350"
        border
        style="width: 100%">
        <el-table-column
          prop="serviceId"
          label="服务Id">
        </el-table-column>
        <el-table-column
          prop="service.serviceName"
          label="服务名称">
        </el-table-column>
        <el-table-column
          prop="service.serviceType"
          label="服务类型">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="ServiceDel(scope.row)">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServiceVisible = true, dialogAddServiceVisible = true">新 增</el-button>
        <el-button @click="dialogServiceVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogServiceVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增相关服务信息" :visible.sync="dialogAddServiceVisible" width="30%">
      <el-form ref="addServiceForm" :model="addServiceForm" label-width="90px">
        <!--服务器ID-->
        <el-form-item label="服务ID">
          <el-input v-model="addServiceForm.serviceId" :disabled="true"/>
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="服务名称">
          <el-input v-model="addServiceForm.serviceName" @focus="dialogServiceIdTableVisible = true, getServiceId()"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddServiceVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddServiceVisible = false, ServiceAddConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog top="8vh" title="获取服务ID/名称" :visible.sync="dialogServiceIdTableVisible" width="50%">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-tooltip class="item" effect="dark" content="如果查无信息，可点击新增服务按钮添加新的服务" placement="top">
            <el-input v-model="ServiceIdTableCompleteValue" placeholder="请输入内容"/>
          </el-tooltip>
        </el-col>
        <el-col :span="4"> <el-button type="primary" @click="gotoService()">新增服务</el-button></el-col>
      </el-row>
      <el-table
        :data="serviceIdTable"
        height="450"
        border
        style="width: 100%"
        id="ServiceIdTable">
        <el-table-column
          prop="serviceId"
          label="服务ID">
        </el-table-column>
        <el-table-column
          prop="serviceName"
          label="服务名称">
        </el-table-column>
        <el-table-column
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button type="danger" @click="dialogServiceIdTableVisible = false, AddServiceId(scope.row)">添加</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
  import {getOpCustomerPageList, getOpCustomerFindCustomerId, getOpCustomerFindAreaManager, getOpCustomerFindCompany,
    getOpCustomerFindContact, getOpCustomerFindContactPhone, getOpCustomerFindRevisitTime, getOpCustomerFindAddress,
    getOpCustomerFindNote, getOpCustomerFindAreaManagerId, getOpCustomerAreaManagerList, getOpCustomerCreate, getOpCustomerUpdate,
    getOpCustomerDelete, getOpCustomerServerByCustomer, getOpCustomerServerDelete, getOpServerPageList, getOpCustomerServerCreate,
    getOpCustomerServicesByCustomer, OpCustomerServicesCreate, getServicePageList, getServiceFindServiceId, getOpCustomerServicesDelete,
    getOpServerCreate, getOpServerUnBindList, getOpCustomerAll,
  } from '@/api/serverLedger'
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
        tableData: [],
        //所有客户数据
        totalTableData:[],
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
        dialogAddServerVisible:false,
        dialogServerVisible: false,
        dialogServerIdTableVisible:false,
        dialogCreateServerVisible:false,
        //服务器的表格
        serverTable: [],
        nowCustomerId:'',
        addServerForm:{},
        pushAddServerForm:{},
        serverIdTable:[],
        backupServerIdTable:[],
        ServerIdTableCompleteValue:'',
        newServerForm:{},
        //********服务的弹窗********
        //弹窗是否可见
        dialogServiceVisible: false,
        dialogAddServiceVisible:false,
        dialogServiceIdTableVisible:false,
        //服务的表单
        serviceTable: [],
        addServiceForm:{},
        pushAddServiceForm:{},
        serviceIdTable:[],
        backupServiceIdTable:[],
        ServiceIdTableCompleteValue: '',
      }
    },
    methods: {
      //********************数据更新处理********************
      dealData(){
        getOpCustomerPageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
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
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
      },
      //处理新增功能的ID自动生成数据
      dealAddForm(){
        getOpCustomerAll().then(request=>{
          this.totalTableData = request.data.body;
        });
      },
      //修改功能的事件
      getRow(row){
        getOpCustomerAll().then(request=>{
          this.totalTableData = request.data.body;
        });
        this.reviseForm = {...row};
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
              this.$message({
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
              this.$message({
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
      },
      //************************弹窗************************
      //服务器按钮的弹窗事件
      //获取用户-服务器表单信息
      getServer(row){
        getOpCustomerServerByCustomer(row.customerId).then(request=>{
          this.serverTable = request.data.body;
          this.nowCustomerId = row.customerId;
        })
      },
      //用户-服务器表单信息的删除
      ServerDel(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getOpCustomerServerDelete(this.nowCustomerId,row.server.serverId).then(request=>{
            if (request.data.body) {
              getOpCustomerServerByCustomer(this.nowCustomerId).then(request=>{
                this.serverTable = request.data.body;
              });
              this.dealServerIdTable();
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
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
      },
      //选择添加服务器ID
      AddServerId(row){
        this.addServerForm.serverId = row.serverId;
        this.addServerForm.serverName = row.serverName;
      },
      //确认新增用户-服务器信息
      ServerAddConfirm(){
        this.pushAddServerForm.beginTime= this.addServerForm.beginTime;
        this.pushAddServerForm.endTime= this.addServerForm.endTime;
        this.pushAddServerForm.customerId= this.nowCustomerId;
        this.pushAddServerForm.serverId= this.addServerForm.serverId;
        console.log(this.pushAddServerForm);
        getOpCustomerServerCreate(this.pushAddServerForm).then(request=>{
          getOpCustomerServerByCustomer(this.nowCustomerId).then(request=>{
            this.serverTable = request.data.body;
          });
          this.dealServerIdTable();
          this.addServerForm = {};
          if (request.data.body) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        })
      },
      //获取服务器id与名称列表
      dealServerIdTable(){
        getOpServerUnBindList().then(request=>{
          this.serverIdTable = request.data.body;
          this.backupServerIdTable = request.data.body;
        });
      },
      //新增服务器
      addNewServer(){
        getOpServerCreate(this.newServerForm).then(request=>{
          if (request.data.body) {
            this.dealServerIdTable();
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        })
      },
      //创建新的服务器
      CreateNewServer(){
        let dealData=[];
        for(let i=0;i<this.serverTable.length;i++){
          dealData[i] = this.serverTable[i].serverId
        }
        let max = dealData.reduce((total,value)=>total>value?total:value);
        max = max.slice(-2);
        if(max>='09'){
          this.newServerForm.serverId = this.nowCustomerId+'S'+(parseInt(max)+1);
        }else{
          this.newServerForm.serverId = this.nowCustomerId+'S0'+(parseInt(max)+1);
        }
      },
      //服务按钮的相关事件
      getService(row){
        getOpCustomerServicesByCustomer(row.customerId).then(request=>{
          this.nowCustomerId = row.customerId;
          this.serviceTable = request.data.body;
        })
      },
      getServiceId(){
        getServicePageList(1,1000).then(request=>{
          this.serviceIdTable = request.data.body.data;
          this.backupServiceIdTable = request.data.body.data;
        })
      },
      AddServiceId(row){
        this.addServiceForm.serviceId = row.serviceId;
        this.addServiceForm.serviceName = row.serviceName;
      },
      ServiceAddConfirm(){
        this.addServiceForm.customerId = this.nowCustomerId;
        OpCustomerServicesCreate(this.addServiceForm).then(request=>{
          if (request.data.body) {
            getOpCustomerServicesByCustomer(this.nowCustomerId).then(request=>{
              this.serviceTable = request.data.body;
            });
            this.addServiceForm = {};
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        })
      },
      ServiceDel(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getOpCustomerServicesDelete(this.nowCustomerId,row.serviceId).then(request=>{
            if(request.data.body){
              getOpCustomerServicesByCustomer(this.nowCustomerId).then(request=>{
                this.serviceTable = request.data.body;
              });
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }else {
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //跳转到服务页面
      gotoService(){
        this.$router.push({name:'ServiceMaintainPage',params:{dialogChooseServiceType:true}});
      }
    },
    mounted(){
      this.dealServerIdTable();
      this.dealData();
      this.dropDownBox();
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      };
    },
    watch:{
      'reviseForm.areaManager':{
        immediate:true,
        handler(val){
          let backupTableData;
          backupTableData = this.totalTableData.filter((myval,index,arr) =>{
            if(myval.areaManager !== null){
              return (myval.areaManager.indexOf(val) !== -1)
            }
          });
          let MaxId = [];
          console.log("backupTableData"+backupTableData);
          for(let i=0;i<backupTableData.length;i++){
            MaxId[i] = backupTableData[i].customerId;
          }
          let max = MaxId.reduce((total,value)=>total>value?total:value);
          let number = max.replace(/[^0-9]/ig,"");
          let String = max.replace(/[^a-z]+/ig,"");
          this.reviseForm.customerId = String + (Array(4).join('0') + (parseInt(number)+1)).slice(-4);
        }
      },
      'addForm.areaManager':{
        immediate:true,
        handler(val){
          let backupTableData;
          backupTableData = this.totalTableData.filter((myval,index,arr) =>{
            if(myval.areaManager !== null){
              return (myval.areaManager.indexOf(val) !== -1)
            }
          });
          let MaxId = [];
          console.log("backupTableData"+backupTableData);
          for(let i=0;i<backupTableData.length;i++){
            MaxId[i] = backupTableData[i].customerId;
          }
          let max = MaxId.reduce((total,value)=>total>value?total:value);
          let number = max.replace(/[^0-9]/ig,"");
          let String = max.replace(/[^a-z]+/ig,"");
          this.addForm.customerId = String + (Array(4).join('0') + (parseInt(number)+1)).slice(-4);
        }
      },
      'ServerIdTableCompleteValue':{
        immediate:true,
        handler(val){
          this.serverIdTable = this.backupServerIdTable.filter((myval,index,arr) =>{
            if(myval.serverName !== null && myval.serverId !== null){
              return (myval.serverId.indexOf(val) !== -1 || myval.serverName.indexOf(val) !== -1)
            }
          });
        }
      },
      'ServiceIdTableCompleteValue':{
        immediate:true,
        handler(val){
          this.serviceIdTable = this.backupServiceIdTable.filter((myval,index,arr) =>{
            if(myval.serviceId !== null && myval.serviceName !== null){
              return (myval.serviceId.indexOf(val) !== -1 || myval.serviceName.indexOf(val) !== -1)
            }
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
  #ServerIdTable{
    margin-top: 0.2rem;
  }
  #ServiceIdTable{
    margin-top: 0.2rem;
  }
  #controlBigPosition{
    position: absolute;
    right: 7.2rem;
  }
  #controlPosition{
    display: inline-block;
    position: absolute;
    right: 2rem;
    top: 0;
  }
</style>
