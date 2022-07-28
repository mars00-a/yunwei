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
          <el-button @click="currentPage = 1,Find()" type="primary" id="Find">过 滤</el-button>
          <el-button @click="dealData" type="primary">恢 复</el-button>
          <el-button type="success" id="Add" @click="clickAdd()">新 增</el-button>
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
        <!--服务实例id：f_service_id-->
        <el-table-column
          prop="serviceId"
          label="服务实例id"
        >
        </el-table-column>
        <!--服务名称：f_service_name-->
        <el-table-column
          prop="serviceName"
          label="服务名称"
        >
        </el-table-column>
        <!--安装的服务器id：f_server_id-->
        <el-table-column
          prop="serverId"
          label="安装的服务器id"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="tableServerNameGet(scope.row.serverId)" placement="top-start">
              <span>{{scope.row.serverId}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--服务类型：f_service_type-->
        <el-table-column
          prop="serviceType"
          label="服务类型"
          :formatter="dealServiceType"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column label="操作" width="255">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-button type="primary" @click="clickRevise(scope.row)">修 改</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="danger" @click="serviceDel(scope.row)">删 除</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="warning" @click="openCustomer(scope.row)">客 户</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer id="Footer">
      <!--分页功能-->
      <!--当前行数与总数据条数-->
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
    <!----------------新增按钮的弹窗-->
    <el-dialog title="新增" :visible.sync="visables.dialogAddVisible" width="30%">
      <el-form ref="addForm" :model="addForm" label-width="110px">
        <!--服务类型-->
        <el-form-item label="服务类型id" :rules="[{ required: true}]">
          <el-input
            v-model="addForm.serviceType" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="服务名称">
          <el-input v-model="addForm.serviceName" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="安装的服务器id">
          <el-input v-model="addForm.serviceTable" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="服务类型">
          <el-input v-model="addForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visables.dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="visables.dialogAddVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!----------------主页面中修改按钮的弹窗-->
    <el-dialog title="修改" :visible.sync="visables.dialogReviseVisible" width="30%">
      <el-form ref="reviseForm" :model="reviseForm" label-width="90px">
        <!--服务类型-->
        <el-form-item label="服务实例id" :rules="[{ required: true}]">
          <el-input
            :disabled="true"
            v-model="reviseForm.serviceType" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="服务名称">
          <el-input v-model="reviseForm.serviceName" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="安装的服务器id">
          <el-input v-model="reviseForm.serviceTable" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="服务类型">
          <el-input v-model="reviseForm.note"  type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="visables.dialogReviseVisible = false">取 消</el-button>
          <el-button type="primary" @click="visables.dialogReviseVisible = false">确 定</el-button>
        </span>
    </el-dialog>
<!--------------------客户按钮的弹窗------------->
    <el-dialog
      width="70%"
      top="2vh"
      title="修改客户信息"
      :visible.sync="visables.dialogCustomerVisible">
      <el-table
        height="480"
        :data="customerForm.customerInfos"
        border
      >
<!--        序号-->
        <el-table-column
          type="index"
          label="序号"
        >
        </el-table-column>
<!--        客户id-->
        <el-table-column
          prop="customerId"
          label="客户id"
        >
        </el-table-column>
<!--        客户经理-->
        <el-table-column
          prop="customer.areaManager"
          label="客户经理"
        >
        </el-table-column>
<!--        客户名称-->
        <el-table-column
          prop="customer.company"
          label="客户名称"
        >
        </el-table-column>
<!--        联系电话-->
        <el-table-column
          prop="customer.contactPhone"
          label="联系电话"
        >
        </el-table-column>
<!--        回访时间-->
        <el-table-column
          prop="customer.revisitTime"
          label="回访时间"
        >
        </el-table-column>
<!--        客户地址-->
        <el-table-column
          prop="customer.address"
          label="客户地址"
        >
        </el-table-column>
<!--        备注-->
        <el-table-column
          prop="customer.note"
          label="备注"
        >
        </el-table-column>
<!--        操作栏-->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" @click="serviceCustomerDel(scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="visables.dialogAddCustomerVisible = true">新 增</el-button>
        <el-button type="primary" @click="myConfirm()">确 定</el-button>
      </span>
    </el-dialog>
<!--------------------新增客户的弹窗------------>
    <el-dialog
    top="5vh"
    title="新增用户"
    width="30%"
    :visible.sync="visables.dialogAddCustomerVisible">
<!--      搜索那一行-->
      <el-row>
        <el-col :span="5">
          <span style="line-height: 40px;margin-left: 20px">搜索：</span>
        </el-col>
        <el-col :span="19">
          <el-input v-model="customerForm.searchCustomerKeyword" placeholder="输入客户id或者名称直接搜索"></el-input>
        </el-col>
      </el-row>
<!--      所有用户列标-->
      <el-table
        :data="customerForm.searchAllCustomerInfos"
        border
        height="26rem"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <!--        客户id-->
        <el-table-column
          prop="customerId"
          label="客户id"
        >
        </el-table-column>
        <!--        客户名称-->
        <el-table-column
          prop="company"
          label="客户名称"
        >
        </el-table-column>
      </el-table>
<!--      最下方操作-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visables.dialogAddCustomerVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddCustomer()">确 定</el-button>
      </span>
    </el-dialog>
<!--------------------选择进入哪个系统新增弹窗-->
    <el-dialog
      top="15vh"
      title="请选择新增服务的类型"
      width="480px"
      :visible.sync="visables.dialogChooseServiceType">

      <el-form ref="addForm" :model="addForm" label-width="110px">
        <!--服务类型-->
        <el-form-item label="服务名称">
          <el-input
            v-model="addForm.serviceName" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="所属服务器">
          <el-input
            @focus="getFocus"
            placeholder="输入id或名称搜索服务器"
            v-model="addForm.serverId"
          />
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="8" style="margin-left: 15px">
          <el-button type="primary" @click="clickAddSomeType(1)">安防(3000)</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="clickAddSomeType(2)">智 慧 用 电</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="clickAddSomeType(3)">巡 更 巡 检</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="clickAddSomeType(4)">微 信 服 务</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="clickAddSomeType(5)">APP&nbsp;&nbsp;&nbsp;服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="clickAddSomeType(6)">短 信 网 关</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="clickAddSomeType(7)">第三方短信</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="clickAddSomeType(8)">语 音 服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="clickAddSomeType(9)">第三方语音</el-button>
        </el-col>
      </el-row>
      <!--      最下方操作-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="visables.dialogChooseServiceType = false">取 消</el-button>
      </span>
<!--      左侧选择服务器列表-->
      <div v-show = controlShow id="targetTable">
        <el-table
          :data="searchServerInfos"
          height="95%"
          border
          style="width: 100%">
          <el-table-column
            active-class="targetTableGetFocus"
            prop="serverId"
            label="服务器id"
            width="105%">
          </el-table-column>
          <el-table-column
            prop="serverName"
            label="服务器名称"
            width="100%">
          </el-table-column>
          <el-table-column label="添加">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="addServer(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
<!-----------------------------------下面是九个弹窗---------------------------------------->
<!--    安防服务（3000）-->
    <el-dialog
      top="7vh"
      title="安防服务（3000）"
      width="65%"
      :visible.sync="visables.dialogSecurity"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.securityForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                disabled="true"
                v-model="addForm.serviceId" />
            </el-form-item>
            <el-form-item label="服务名称">
              <el-input
                v-model="addForm.serviceName" />
            </el-form-item>
            <el-form-item label="安装的服务器id">
              <el-input
                disabled="true"
                v-model="addForm.serverId" />
            </el-form-item>
            <el-form-item label="数据库类型">
              <el-input v-model="nineDialogForm.securityForm.dbType" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.securityForm.dbIp" />
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.securityForm.dbPort"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.securityForm.dbUser"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.securityForm" label-width="120px">
          <el-form-item label="数据库密码">
            <el-input v-model="nineDialogForm.securityForm.dbPwd"/>
          </el-form-item>
          <el-form-item label="软件名称">
            <el-input v-model="nineDialogForm.securityForm.software"/>
          </el-form-item>
          <el-form-item label="版本信息">
            <el-input v-model="nineDialogForm.securityForm.version"/>
          </el-form-item>
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.securityForm.authorize" />
            </el-form-item>
            <el-form-item label="授权时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.securityForm.authorizeTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.securityForm.authorizeStatus"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.securityForm" label-width="120px">
            <el-form-item label="授权数目">
              <el-select v-model="nineDialogForm.securityForm.authorizeNum" placeholder="请选择">
                <el-option
                  v-for="item in authorizeNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="授权人员">
            <el-input v-model="nineDialogForm.securityForm.authorizePerson"/>
          </el-form-item>
          <el-form-item label="客户数量">
            <el-input-number v-model="nineDialogForm.securityForm.clientNum" :min="3" :max="20" label="请输入3-20之间的数字"/>
          </el-form-item>
          <el-form-item label="是否巡检">
            <el-select v-model="nineDialogForm.securityForm.ispatrol" placeholder="请选择">
              <el-option
                v-for="item in ispatrolList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否永久授权">
            <el-radio v-model="isPermanentAuthorize" label='0'>否</el-radio>
            <el-radio v-model="isPermanentAuthorize" label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="过期时间" v-show="controlIsPermanentAuthorizeShow">
            <el-date-picker
              :style="controlWidth"
              v-model="nineDialogForm.securityForm.expireDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="nineDialogForm.securityForm.note" type="textarea"/>
          </el-form-item>
<!--          <el-form-item label="创建时间">-->
<!--            <el-date-picker-->
<!--              :style="controlWidth"-->
<!--              v-model="nineDialogForm.securityForm.time"-->
<!--              type="datetime"-->
<!--              placeholder="选择日期时间">-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogSecurity = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvSecurity()">确认</el-button>
      </span>
    </el-dialog>
<!--    智慧用电-->
    <el-dialog
      top="7vh"
      title="智慧用电"
      width="65%"
      :visible.sync="visables.dialogSmartHome"
    >
      <el-row>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.smartHomeForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                disabled="true"
                v-model="addForm.serviceId" />
            </el-form-item>
            <el-form-item label="服务名称">
              <el-input
                v-model="addForm.serviceName" />
            </el-form-item>
            <el-form-item label="安装的服务器id">
              <el-input
                disabled="true"
                v-model="addForm.serverId" />
            </el-form-item>
            <el-form-item label="版本信息">
              <el-input v-model="nineDialogForm.smartHomeForm.version" />
            </el-form-item>
            <el-form-item label="小程序版本">
              <el-input v-model="nineDialogForm.smartHomeForm.appVersion" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.smartHomeForm.mysqlIp"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.smartHomeForm.mysqlPort"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.smartHomeForm" label-width="120px">
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.smartHomeForm.mysqlUser"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.smartHomeForm.mysqlPwd"/>
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.smartHomeForm.influxdbIp"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.smartHomeForm.influxdbPort" />
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.smartHomeForm.influxdbUser" />
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.smartHomeForm.influxdbPwd" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form ref="reviseForm" :model="nineDialogForm.smartHomeForm" label-width="120px">
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.smartHomeForm.authorize"/>
            </el-form-item>
            <el-form-item label="授权时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.smartHomeForm.authorizeTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.smartHomeForm.authorizeStatus"/>
            </el-form-item>
            <el-form-item label="授权数目">
              <el-input v-model="nineDialogForm.smartHomeForm.authorizeNum"/>
            </el-form-item>
            <el-form-item label="授权人员">
              <el-input v-model="nineDialogForm.smartHomeForm.authorizePerson"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="nineDialogForm.smartHomeForm.note" type="textarea"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogSmartHome = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvSmartHome">确认</el-button>
      </span>
    </el-dialog>
<!--    巡更巡检服务-->
    <el-dialog
      top="3vh"
      title="巡更巡检服务"
      width="50%"
      :visible.sync="visables.dialogPatrol"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.patrolForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                disabled="true"
                v-model="addForm.serviceId" />
            </el-form-item>
            <el-form-item label="服务名称">
              <el-input
                v-model="addForm.serviceName" />
            </el-form-item>
            <el-form-item label="安装的服务器id">
              <el-input
                disabled="true"
                v-model="addForm.serverId" />
            </el-form-item>
            <el-form-item label="数据库类型">
              <el-input v-model="nineDialogForm.patrolForm.dbType" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.patrolForm.dbIp" />
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.patrolForm.dbPort"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.patrolForm.dbUser"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.patrolForm.dbPwd"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.patrolForm" label-width="120px">
            <el-form-item label="版本信息">
              <el-input v-model="nineDialogForm.patrolForm.version"/>
            </el-form-item>
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.patrolForm.authorize" />
            </el-form-item>
            <el-form-item label="授权时间">
            <el-date-picker
              :style="controlWidth"
              v-model="nineDialogForm.patrolForm.authorizeTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.patrolForm.authorizeStatus"/>
            </el-form-item>
            <el-form-item label="授权数目">
              <el-input v-model="nineDialogForm.patrolForm.authorizeNum"/>
            </el-form-item>
            <el-form-item label="授权人员">
              <el-input v-model="nineDialogForm.patrolForm.authorizePerson"/>
            </el-form-item>
            <el-form-item label="公司备注信息">
              <el-input v-model="nineDialogForm.patrolForm.note" type="textarea"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogPatrol = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvPatrol">确认</el-button>
      </span>
    </el-dialog>
<!--    微信服务-->
    <el-dialog
      top="0vh"
      title="微信服务"
      width="50%"
      :visible.sync="visables.dialogWeixin"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.weixinForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                disabled="true"
                v-model="addForm.serviceId" />
            </el-form-item>
            <el-form-item label="服务名称">
              <el-input
                v-model="addForm.serviceName" />
            </el-form-item>
            <el-form-item label="安装的服务器id">
              <el-input
                disabled="true"
                v-model="addForm.serverId" />
            </el-form-item>
            <el-form-item label="中心id">
              <el-input v-model="nineDialogForm.weixinForm.centerId" />
            </el-form-item>
            <el-form-item label="域名">
              <el-input v-model="nineDialogForm.weixinForm.domain" />
            </el-form-item>
            <el-form-item label="FTP/IP">
              <el-input v-model="nineDialogForm.weixinForm.ftpIp"/>
            </el-form-item>
            <el-form-item label="FTP/UserName">
              <el-input v-model="nineDialogForm.weixinForm.ftpUser"/>
            </el-form-item>
            <el-form-item label="FTP/Password">
              <el-input v-model="nineDialogForm.weixinForm.ftpPwd"/>
            </el-form-item>
            <el-form-item label="微信公众号用户名">
              <el-input v-model="nineDialogForm.weixinForm.wxUser"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.weixinForm" label-width="120px">
            <el-form-item label="微信公众号密码">
              <el-input v-model="nineDialogForm.weixinForm.wxPwd"/>
            </el-form-item>
            <el-form-item label="授权密钥">
              <el-input v-model="nineDialogForm.weixinForm.wxAuthkey" />
            </el-form-item>
            <el-form-item label="Appid">
              <el-input v-model="nineDialogForm.weixinForm.wxAppid" />
            </el-form-item>
            <el-form-item label="AppSecret">
              <el-input v-model="nineDialogForm.weixinForm.wxAppsecret" />
            </el-form-item>
            <el-form-item label="服务器固定IP">
              <el-input v-model="nineDialogForm.weixinForm.serverIp"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.weixinForm.dbPort"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.weixinForm.dbUser"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.weixinForm.dbPwd"/>
            </el-form-item>
            <el-form-item label="公司备注信息">
              <el-input v-model="nineDialogForm.weixinForm.note" type="textarea"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogWeixin = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvWeixin">确认</el-button>
      </span>
    </el-dialog>
<!--    APP服务-->
    <el-dialog
      top="12vh"
      title="APP服务"
      width="50%"
      :visible.sync="visables.dialogAPP"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.APPForm" label-width="110px">
            <el-form-item label="服务实例id">
              <el-input
                disabled="true"
                v-model="addForm.serviceId" />
            </el-form-item>
            <el-form-item label="服务名称">
              <el-input
                v-model="addForm.serviceName" />
            </el-form-item>
            <el-form-item label="安装的服务器id">
              <el-input
                disabled="true"
                v-model="addForm.serverId" />
            </el-form-item>
            <el-form-item label="域名">
              <el-input v-model="nineDialogForm.APPForm.url" />
            </el-form-item>
            <el-form-item label="服务IP">
              <el-input v-model="nineDialogForm.APPForm.serviceIp" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.APPForm" label-width="110px">
            <el-form-item label="服务端口">
              <el-input v-model="nineDialogForm.APPForm.servicePort"/>
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.APPForm.mysqlIp"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.APPForm.mysqlPort"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.APPForm.mysqlUser"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.APPForm.mysqlPwd"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogAPP = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvAPP">确认</el-button>
      </span>
    </el-dialog>
<!--    短信网关服务-->
    <el-dialog
      top="3vh"
      title="短信网关服务"
      width="30%"
      :visible.sync="visables.dialogSMS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.SMSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            disabled="true"
            v-model="addForm.serviceId" />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input
            v-model="addForm.serviceName" />
        </el-form-item>
        <el-form-item label="安装的服务器id">
          <el-input
            disabled="true"
            v-model="addForm.serverId" />
        </el-form-item>
        <el-form-item label="服务IP">
          <el-input v-model="nineDialogForm.SMSForm.serviceIp" />
        </el-form-item>
        <el-form-item label="服务端口">
          <el-input v-model="nineDialogForm.SMSForm.servicePort" />
        </el-form-item>
        <el-form-item label="节点ID">
          <el-input v-model="nineDialogForm.SMSForm.nodeId"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="nineDialogForm.SMSForm.user"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="nineDialogForm.SMSForm.pwd"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogSMS = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvSMS">确认</el-button>
      </span>
    </el-dialog>
<!--    第三方短信服务-->
    <el-dialog
      top="7vh"
      title="第三方短信服务"
      width="30%"
      :visible.sync="visables.dialogOtherSMS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.otherSMSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            disabled="true"
            v-model="addForm.serviceId" />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input
            v-model="addForm.serviceName" />
        </el-form-item>
        <el-form-item label="安装的服务器id">
          <el-input
            disabled="true"
            v-model="addForm.serverId" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="http地址">
          <el-input v-model="nineDialogForm.otherSMSForm.http" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="账号">
          <el-input v-model="nineDialogForm.otherSMSForm.user" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="密码">
          <el-input v-model="nineDialogForm.otherSMSForm.pwd"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogOtherSMS = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvOtherSMS">确认</el-button>
      </span>
    </el-dialog>
<!--    语音服务-->
    <el-dialog
      top="7vh"
      title="语音服务"
      width="30%"
      :visible.sync="visables.dialogNVS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.NVSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            disabled="true"
            v-model="addForm.serviceId" />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input
            v-model="addForm.serviceName" />
        </el-form-item>
        <el-form-item label="安装的服务器id">
          <el-input
            disabled="true"
            v-model="addForm.serverId" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="2030设备GUID">
          <el-input v-model="nineDialogForm.NVSForm._2030Guid" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="手机卡号">
          <el-input v-model="nineDialogForm.NVSForm.phoneNum" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="通道号">
          <el-input v-model="nineDialogForm.NVSForm.channelNum"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogNVS = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvNVS">确认</el-button>
      </span>
    </el-dialog>
<!--    第三方语音服务-->
    <el-dialog
      top="7vh"
      title="第三方语音服务"
      width="30%"
      :visible.sync="visables.dialogOtherNVS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.otherNVSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            disabled="true"
            v-model="addForm.serviceId" />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input
            v-model="addForm.serviceName" />
        </el-form-item>
        <el-form-item label="安装的服务器id">
          <el-input
            disabled="true"
            v-model="addForm.serverId" />
        </el-form-item>
      <!--服务名称-->
      <el-form-item label="http地址">
        <el-input v-model="nineDialogForm.otherNVSForm.http" />
      </el-form-item>
      <!--服务数据表-->
      <el-form-item label="账号">
        <el-input v-model="nineDialogForm.otherNVSForm.user" />
      </el-form-item>
      <!--备注-->
      <el-form-item label="密码">
        <el-input v-model="nineDialogForm.otherNVSForm.pwd"/>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="visables.dialogOtherNVS = false">取 消</el-button>
        <el-button type="primary" @click="confirmOpsvOtherNVS">确认</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getServicePageList, getServiceFindServiceId, getServiceFindServiceType, getServiceFindServiceName,
  getServiceFindServerId, getServiceDelete, getAllCustomer
} from '@/api/serverLedger'
import {getOpServerPageList} from "@/api/serverLedger";
import {
  getOpsvSecurityCreate, getOpsv2030NvsCreate, getOpsvAppCreate, getOpsvOtherSmsCreate, getOpsvOtherVsCreate,
  getOpsvPatrolCreate, getOpsvSmartHomeCreate, getOpsvSmsCreate,getOpsvWeixinCreate,getOpsvSecurityUpdate,
  getOpsv2030NvsUpdate,getOpsvAppUpdate,getOpsvOtherSmsUpdate,getOpsvOtherVsUpdate,getOpsvPatrolUpdate,
  getOpsvSmartHomeUpdate,getOpsvSmsUpdate,getOpsvWeixinUpdate,getOpServiceCreate,getOpsvSecurityByService, getOpsv2030NvsByService,
  getOpsvAppByService, getOpsvOtherSmsByService, getOpsvOtherVsByService,
  getOpsvPatrolByService, getOpsvSmartHomeByService, getOpsvSmsByService,getOpsvWeixinByService,getOpServiceUpdate,
  getOpsvSecurityDelete, getOpsv2030NvsDelete, getOpsvAppDelete, getOpsvOtherSmsDelete, getOpsvOtherVsDelete,
  getOpsvPatrolDelete, getOpsvSmartHomeDelete, getOpsvSmsDelete,getOpsvWeixinDelete,getOpCustomerByService,getOpCustomerServicesCreate,
  getOpCustomerServicesDelete
} from '@/api/serverLedger'
import {getOpDictSignalCreate} from "@/api/opdict";
  export default {
    name: 'op_service',
    data() {
      return {
        controlServiceId:'',
        // 控制新增还是修改，新增是0，修改是1
        addOrRevise: 0,
        controlShow: false,
        //*******************控制区*******************
        //过滤参数下拉框
        FilterParameters: [
          {
            value: 'ServiceId',
            label: '服务实例id'
          },
          {
            value: 'ServiceName',
            label: '服务名称'
          },
          {
            value: 'ServerId',
            label: '安装的服务器id'
          },
          {
            value: 'ServiceType',
            label: '服务类型'
          },
        ],
        //过滤参数的值
        FilterParameter_value: '',
        //查找输入框
        CompleteValue: '',
        //*******************中间主体*******************
        //处理页面自适应
        myStyle: {
          height: "29rem"
        },
        // 处理表格里面宽度不铺满的情况
        controlWidth:{
          width: '100%'
        },
        //表格数据
        tableData: [],
        // 所有的服务器数据，用于鼠标悬浮显示和添加新数据时服务器的选择
        searchServerInfos:[],
        allServerInfos: [],
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
        //*******************控制弹窗显示*******************
        // 所有弹窗的可见属性
        visables: {
          // 新增
          dialogAddVisible: false,
          //修改的弹窗
          dialogReviseVisible: false,
          //客户的弹窗
          dialogCustomerVisible: false,
          // 新增用户的弹窗
          dialogAddCustomerVisible: false,
          // 选择进入哪个系统新增页面的弹窗
          dialogChooseServiceType: false,
          // 3000系统弹窗
          dialogSecurity: false,
          // 智慧用电
          dialogSmartHome: false,
          // 巡更巡检服务
          dialogPatrol: false,
          // 微信服务
          dialogWeixin: false,
          // APP服务
          dialogAPP: false,
          // 短信网关服务
          dialogSMS: false,
          // 第三方短信服务
          dialogOtherSMS: false,
          // 2030N语音服务
          dialogNVS: false,
          // 第三方语音服务
          dialogOtherNVS: false,
        },
        //新增弹窗的数据
        addForm: {
          serviceId:'',
          serviceName:'',
          serverId:'',
          serviceType:'',
        },
        // 修改弹窗的数据
        reviseForm: {},
        // 客户弹窗的数据和修改客户弹窗的数据
        customerForm: {
          // 查询使用该服务的所有用户
          customerInfos: [
            {
              customerId: "001",
              areaManager: "黄奇峰",
              company: "湖北邮政",
              contactPhone: "123456789",
              revisitTime: "2022.7.1",
              address: "湖北武汉",
              note: "无"
            }, {
              customerId: "002",
              areaManager: "张三",
              company: "武汉食品有限",
              contactPhone: "98711234",
              revisitTime: "2002.1.1",
              address: "武汉孝感",
              note: "暂无"
            }, {
              customerId: "003",
              areaManager: "李四",
              company: "广东深圳视频加工",
              contactPhone: "238261675",
              revisitTime: "1999.12.12",
              address: "广东深圳",
              note: "视频处理厂"
            },
          ],
          // 添加用户时搜索的关键字
          searchCustomerKeyword: '',
          // 所有的客户信息
          allCustomerInfos: [
            {
              customerId: "001",
              areaManager: "黄奇峰",
              company: "湖北邮政",
              contactPhone: "123456789",
              revisitTime: "2022.7.1",
              address: "湖北武汉",
              note: "无"
            }, {
              customerId: "002",
              areaManager: "张三",
              company: "武汉食品有限",
              contactPhone: "98711234",
              revisitTime: "2002.1.1",
              address: "武汉孝感",
              note: "暂无"
            }, {
              customerId: "003",
              areaManager: "李四",
              company: "广东深圳视频加工",
              contactPhone: "238261675",
              revisitTime: "1999.12.12",
              address: "广东深圳",
              note: "视频处理厂"
            },
          ],
          // 经过搜索的客户信息
          searchAllCustomerInfos: [
            {
              customerId: "001",
              areaManager: "黄奇峰",
              company: "湖北邮政",
              contactPhone: "123456789",
              revisitTime: "2022.7.1",
              address: "湖北武汉",
              note: "无"
            }, {
              customerId: "002",
              areaManager: "张三",
              company: "武汉食品有限",
              contactPhone: "98711234",
              revisitTime: "2002.1.1",
              address: "武汉孝感",
              note: "暂无"
            }, {
              customerId: "003",
              areaManager: "李四",
              company: "广东深圳视频加工",
              contactPhone: "238261675",
              revisitTime: "1999.12.12",
              address: "广东深圳",
              note: "视频处理厂"
            },
          ],
          selectServiceList:[],
        },
        // 授权数目列表
        authorizeNumList: [
          {
            value: 300,
            label: '300--标准'
          },
          {
            value: 1000,
            label: '1000--专业'
          },
          {
            value: 100000,
            label: '100000--白金'
          },
        ],
        // 安放服务弹窗的是否巡检
        ispatrolList:[
          {
            value: 0,
            label: '0--不巡检'
          },
          {
            value: 1,
            label: '1--巡检'
          }
        ],
        // 安放服务弹窗的是否永久授权
        isPermanentAuthorize: '0',
        // 是否显示选择授权过期时间
        controlIsPermanentAuthorizeShow: true,
        // 九个弹窗的数据
        nineDialogForm: {
          securityForm:{
            serviceId: '',
            dbType:'',
            dbIp: '',
            dbPort:'',
            dbUser: '',
            dbPwd:'',
            software: '',
            version:'',
            authorize: '',
            authorizeTime:'',
            authorizeStatus: '',
            authorizeNum:'',
            authorizePerson: '',
            clientNum:'',
            ispatrol: '',
            expireDate:'',
            note: '',
            time:'',
          },
          smartHomeForm:{
            serviceId: '',
            version:'',
            appVersion: '',
            mysqlIp:'',
            mysqlPort: '',
            mysqlUser:'',
            mysqlPwd: '',
            influxdbIp:'',
            influxdbPort: '',
            influxdbUser:'',
            influxdbPwd: '',
            authorize:'',
            authorizeTime: '',
            authorizeStatus:'',
            authorizeNum: '',
            authorizePerson:'',
            note: '',
            time:'',
          },
          patrolForm:{
            serviceId: '',
            dbType:'',
            dbIp: '',
            dbPort:'',
            dbUser: '',
            dbPwd:'',
            version: '',
            authorize:'',
            authorizeTime: '',
            authorizeStatus:'',
            authorizeNum: '',
            authorizePerson:'',
            note: '',
            time:'',
          },
          weixinForm:{
            serviceId: '',
            centerId:'',
            domain: '',
            ftpIp:'',
            ftpUser: '',
            ftpPwd:'',
            wxUser: '',
            wxPwd:'',
            wxAuthkey: '',
            wxAppid:'',
            wxAppsecret: '',
            serverIp:'',
            dbPort:'',
            dbUser: '',
            dbPwd:'',
            note: '',
            time:'',
          },
          APPForm:{
            serviceId: '',
            url:'',
            serviceIp: '',
            servicePort:'',
            mysqlIp: '',
            mysqlPort:'',
            mysqlUser: '',
            mysqlPwd:'',
            time: '',
          },
          SMSForm:{
            serviceId: '',
            url:'',
            serviceIp: '',
            servicePort:'',
            nodeId: '',
            user:'',
            pwd: '',
            time: '',
          },
          otherSMSForm:{
            serviceId: '',
            http:'',
            user:'',
            pwd: '',
            time: '',
          },
          NVSForm:{
            serviceId: '',
            _2030Guid:'',
            phoneNum:'',
            channelNum: '',
            time: '',
          },
          otherNVSForm: {
            serviceId: '',
            http:'',
            user:'',
            pwd: '',
            time: '',
          },
        }
      }
    },
    methods:{
      // 打开用户窗口
      openCustomer(row){
        this.visables.dialogCustomerVisible = true
        this.controlServiceId = row.serviceId
        getOpCustomerByService(row.serviceId).then(request=>{
          this.customerForm.customerInfos = request.data.body;
        });
      },
      clickAdd(){
        this.visables.dialogChooseServiceType = true
        this.addOrRevise = 0
      },
      // ***********************修改按钮
      clickRevise(row){
        this.addForm.serviceId = row.serviceId
        this.addForm.serviceName = row.serviceName
        this.addForm.serviceType = row.serviceType
        this.addForm.serverId = row.serverId
        this.addOrRevise = 1
        this.openOneDialog(row.serviceType)
        if(row.serviceType === 1){
          getOpsvSecurityByService(row.serviceId).then(request=>{
            if(request.data.body){
              this.nineDialogForm.securityForm = request.data.body
              if (this.nineDialogForm.securityForm.expireDate === "9998-12-31 00:00"){
                this.isPermanentAuthorize = '1'
              }
              else {
                this.isPermanentAuthorize = '0'
              }
            }
          });
        }
        else if(row.serviceType === 2){
          getOpsvSmartHomeByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.smartHomeForm = request.data.body
          });
        }
        else if(row.serviceType === 3){
          getOpsvPatrolByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.patrolForm = request.data.body
          });
        }
        else if(row.serviceType === 4){
          getOpsvWeixinByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.weixinForm = request.data.body
          });
        }
        else if(row.serviceType === 5){
          getOpsvAppByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.APPForm = request.data.body
          });
        }
        else if(row.serviceType === 6){
          getOpsvSmsByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.SMSHomeForm = request.data.body
          });
        }
        else if(row.serviceType === 7){
          getOpsvOtherSmsByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.otherSMSForm = request.data.body
          });
        }
        else if(row.serviceType === 8){
          getOpsv2030NvsByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.NVSForm = request.data.body
          });
        }
        else if(row.serviceType === 9){
          getOpsvOtherVsByService(row.serviceId).then(request=>{
            if(request.data.body)
              this.nineDialogForm.otherNVSForm = request.data.body
          });
        }
      },
      // 点击了九个按钮中的一个就触发
      clickAddSomeType(type){
        this.addForm.serviceType = type
        this.openOneDialog(type)
        let searchKeyword = this.addForm.serverId+"0"+type
        console.log("用于查找的关键字是：",searchKeyword)
        getServiceFindServiceId(searchKeyword,1,200).then(request=>{
          let totalArr = request.data.body.data;
          // 获取返回的所有数的流水号
          let indexArr = []
          for(let i=0;i<totalArr.length;i++){
            indexArr[i] = totalArr[i].serviceId.substr((totalArr[0].serviceId.length-2),2)
          }
          let myIndex = "0"+ (Math.max.apply(null,indexArr)+1)
          if (myIndex === "0-Infinity"){
            myIndex = '01'
          }
          this.addForm.serviceId = searchKeyword + myIndex
        })
      },
      getFocus(){
        this.controlShow = true
      },
      addServer(row){
        this.addForm.serverId = row.serverId
      },
      //**********************数据更新**********************
      Find(){
        if(this.FilterParameter_value === 'ServiceId'){
          getServiceFindServiceId(this.CompleteValue,this.currentPage,this.size).then(request=>{
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'ServiceName') {
          getServiceFindServiceName(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'ServiceType') {
          getServiceFindServiceType(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else if(this.FilterParameter_value === 'ServerId') {
          getServiceFindServerId(this.CompleteValue, this.currentPage, this.size).then(request => {
            this.totalNumber = request.data.body.total;
            this.tableData = request.data.body.data;
          })
        }
        else {
          this.dealData();
        }
      },
      dealData(){
        getServicePageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        });
        this.FilterParameter_value = '';
        this.CompleteValue='';
      },
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
      // 处理服务类型的展示
      dealServiceType(row){
        switch (row.serviceType){
          case 1:
            return "1-安防服务（3000）";
          case 2:
            return "2-智慧用电服务";
          case 3:
            return "3-巡更巡检服务";
          case 4:
            return "4-微信服务";
          case 5:
            return "5-APP服务";
          case 6:
            return "6-短信网关服务";
          case 7:
            return "7-第三方短信服务";
          case 8:
            return "8-2030N语音服务";
          case 9:
            return "9-第三方语音服务";
        }
      },
      //************************弹窗************************
      // 检测打开九种弹窗的哪一个
      openOneDialog(type){
        this.visables.dialogChooseServiceType = false
        if (type === 1){
          this.visables.dialogSecurity = true
        }
        else if (type === 2){
          this.visables.dialogSmartHome = true
        }
        else if (type === 3){
          this.visables.dialogPatrol = true
        }
        else if (type === 4){
          this.visables.dialogWeixin = true
        }
        else if (type === 5){
          this.visables.dialogAPP = true
        }
        else if (type === 6){
          this.visables.dialogSMS = true
        }
        else if (type === 7){
          this.visables.dialogOtherSMS = true
        }
        else if (type === 8){
          this.visables.dialogNVS = true
        }
        else if (type === 9){
          this.visables.dialogOtherNVS = true
        }
      },
      //删除客户
      serviceCustomerDel(row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("客户id为：",row.customerId,"服务id为：",this.controlServiceId)
          getOpCustomerServicesDelete(row.customerId,this.controlServiceId).then(request=>{
            if(request.data.body){
              getOpCustomerByService(this.controlServiceId).then(request=>{
                this.customerForm.customerInfos = request.data.body;
              });
              this.delSuccessMessage()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //删除主页面上的服务
      serviceDel(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getServiceDelete(row.serviceId).then(request=>{
            if (request.data.body) {
              if (row.serviceType === 1){
                getOpsvSecurityDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 2){
                getOpsvSmartHomeDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 3){
                getOpsvPatrolDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 4){
                getOpsvWeixinDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 5){
                getOpsvAppDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 6){
                getOpsvSmsDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 7){
                getOpsvOtherSmsDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 8){
                getOpsv2030NvsDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
              else if (row.serviceType === 9){
                getOpsvOtherVsDelete(row.serviceId).then(request=>{
                    this.Find();
                    this.delSuccessMessage()
                })
              }
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
      // 并给出确认信息
      myConfirm(){
        this.visables.dialogCustomerVisible = false
        this.confirmSuccessMessage()
      },
      // 新增成功提示
      addSuccessMessage(){
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      },
      // 修改成功提示
      confirmSuccessMessage(){
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },
      // 删除成功提示
      delSuccessMessage(){
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      },
      // 在新增用户的弹窗里点击添加用户到输入框
      addCustomerToInput(id){
        this.customerForm.searchCustomerKeyword = id
      },
      // 确认添加用户
      confirmAddCustomer(){
        // let data={
        //   customerId:this.customerForm.searchCustomerKeyword,
        //   serviceId:this.controlServiceId
        // }
        let dataArr = []
        for (let i=0;i<this.customerForm.selectServiceList.length;i++){
          dataArr[i] = {
            customerId:this.customerForm.selectServiceList[i].customerId,
            serviceId:this.controlServiceId
          }
        }
        console.log(dataArr)
        for (let i=0;i<this.customerForm.selectServiceList.length;i++){
          getOpCustomerServicesCreate(dataArr[i]).then(request=>{
            if(request.data.body){}
            else{
              this.$message({
                message: request.data.msg+"id为"+dataArr[i].customerId+"的数据提交失败",
                type: 'warning'
              });
            }
          })
        }

        getOpCustomerByService(this.controlServiceId).then(request=>{
          this.customerForm.customerInfos = request.data.body;
        });
        this.addSuccessMessage()

        this.customerForm.searchCustomerKeyword = ''
        this.visables.dialogAddCustomerVisible = false
      },
      handleSelectionChange(val){
        this.customerForm.selectServiceList = val
        console.log(this.customerForm.selectServiceList)
      },
      // 鼠标悬浮提示
      tableServerNameGet(id){
        for(let i=0;i<this.allServerInfos.length; i++){
          if(id === this.allServerInfos[i].serverId){
            return this.allServerInfos[i].serverName
          }
        }
      },
      // **************************九个弹窗的确认按钮
      // 安防系统确认
      confirmOpsvSecurity(){
        this.nineDialogForm.securityForm.serviceId = this.addForm.serviceId
        if (3<this.nineDialogForm.securityForm.clientNum+0<20){
          if(this.addOrRevise === 0){
            getOpServiceCreate(this.addForm).then(request=>{
              if(request.data.body){
                getOpsvSecurityCreate(this.nineDialogForm.securityForm).then(request=>{
                  if(request.data.body){
                    this.Find();
                    this.addSuccessMessage()
                    this.visables.dialogSecurity = false
                  }else{
                    this.$message({
                      message: request.data.msg,
                      type: 'warning'
                    });
                  }
                });
              }else{
                this.$message({
                  message: request.data.msg,
                  type: 'warning'
                });
              }
            });
          }
          else{
            getOpServiceUpdate(this.addForm).then(request=>{
              if(request.data.body){
                getOpsvSecurityUpdate(this.nineDialogForm.securityForm).then(request=>{
                  if(request.data.body){
                    this.Find();
                    this.confirmSuccessMessage()
                    this.visables.dialogSecurity = false
                  }else{
                    this.$message({
                      message: request.data.msg,
                      type: 'warning'
                    });
                  }
                });
              }else{
                this.$message({
                  message: request.data.msg,
                  type: 'warning'
                });
              }
            });
          }
        }
        else {
          this.$message.error('请输入3-20之间的数字');
        }


      },
      // 智慧用电
      confirmOpsvSmartHome(){
        this.nineDialogForm.smartHomeForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvSmartHomeCreate(this.nineDialogForm.smartHomeForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogSmartHome = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvSmartHomeUpdate(this.nineDialogForm.smartHomeForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogSmartHome = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
      },
      // 巡更巡检
      confirmOpsvPatrol(){
        this.nineDialogForm.patrolForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvPatrolCreate(this.nineDialogForm.patrolForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogPatrol = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvPatrolUpdate(this.nineDialogForm.patrolForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogPatrol = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // 微信
      confirmOpsvWeixin(){
        this.nineDialogForm.weixinForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvWeixinCreate(this.nineDialogForm.weixinForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogWeixin = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvWeixinUpdate(this.nineDialogForm.weixinForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogWeixin = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // App服务
      confirmOpsvAPP(){
        this.nineDialogForm.APPForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvAppCreate(this.nineDialogForm.APPForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogAPP = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvAppUpdate(this.nineDialogForm.APPForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogAPP = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // 短信网关服务
      confirmOpsvSMS(){
        this.nineDialogForm.SMSForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvSmsCreate(this.nineDialogForm.SMSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogSMS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvSmsUpdate(this.nineDialogForm.SMSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogSMS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // 第三方短信服务
      confirmOpsvOtherSMS(){
        this.nineDialogForm.otherSMSForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvOtherSmsCreate(this.nineDialogForm.otherSMSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogOtherSMS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvOtherSmsUpdate(this.nineDialogForm.otherSMSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogOtherSMS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // 语音服务
      confirmOpsvNVS(){
        this.nineDialogForm.NVSForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsv2030NvsCreate(this.nineDialogForm.NVSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogNVS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsv2030NvsUpdate(this.nineDialogForm.NVSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogNVS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
      // 第三方语音服务
      confirmOpsvOtherNVS(){
        this.nineDialogForm.otherNVSForm.serviceId = this.addForm.serviceId
        if(this.addOrRevise === 0){
          getOpServiceCreate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvOtherVsCreate(this.nineDialogForm.otherNVSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.addSuccessMessage()
                  this.visables.dialogOtherNVS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }
        else{
          getOpServiceUpdate(this.addForm).then(request=>{
            if(request.data.body){
              getOpsvOtherVsUpdate(this.nineDialogForm.otherNVSForm).then(request=>{
                if(request.data.body){
                  this.Find();
                  this.confirmSuccessMessage()
                  this.visables.dialogOtherNVS = false
                }else{
                  this.$message({
                    message: request.data.msg,
                    type: 'warning'
                  });
                }
              });
            }else{
              this.$message({
                message: request.data.msg,
                type: 'warning'
              });
            }
          });
        }

      },
    },
    watch:{
      // 检测新增用户弹窗页面的输入框内容
      'customerForm.searchCustomerKeyword':{
        immediate:true,
        handler(val){
          this.customerForm.searchAllCustomerInfos = this.customerForm.allCustomerInfos.filter(p =>{
            return p.company.indexOf(val) !== -1 || p.customerId.indexOf(val) !== -1
          })
        }
      },
      'addForm.serverId':{
        immediate:true,
        handler(val){
          this.searchServerInfos = this.allServerInfos.filter(p => {
            if (p.serverId !== null && p.serverName!==null) {
            return p.serverId.indexOf(val) !== -1 || p.serverName.indexOf(val) !== -1
            }
          })
        }
      },
      'isPermanentAuthorize': {
        immediate: true,
        handler(val){
          console.log("检测到是否永久授权发生改变,值为：",val)
          if(val === 0 || val ==='0') {
            this.controlIsPermanentAuthorizeShow = true
            this.nineDialogForm.securityForm.expireDate = ""
          }
          else {
            this.controlIsPermanentAuthorizeShow = false
            this.nineDialogForm.securityForm.expireDate = "9998-12-31 00:00"
          }

        }
      }
    },
    mounted(){
      if(this.$route.params.ServerId === null || this.$route.params.ServerId === undefined || this.$route.params.ServerId === ''){
        this.dealData();
      }else {
        this.FilterParameter_value = '安装的id';
        this.CompleteValue = this.$route.params.ServerId;
        this.FilterParameter_value = 'ServerId';
        getServiceFindServerId(this.CompleteValue, this.currentPage, this.size).then(request => {
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        });
      }
      this.visables.dialogChooseServiceType = this.$route.params.dialogChooseServiceType;
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      };
      // 获取所有客户信息表
      getAllCustomer().then(request=>{
        this.customerForm.searchAllCustomerInfos = request.data.body;
        this.customerForm.allCustomerInfos = request.data.body;
      });
      // 获取所有服务器信息表
      getOpServerPageList(1,1000).then(request=>{
        this.allServerInfos = request.data.body.data;
        this.searchServerInfos = request.data.body.data;
      });
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
  #targetTable{
       position: absolute;
       top: 1%;
       left:103%;
       height: 100%;
     }
</style>
