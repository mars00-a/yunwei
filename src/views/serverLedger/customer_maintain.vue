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
    <el-dialog title="新增服务器信息" :visible.sync="dialogAddServerVisible" width="30%">
      <el-form ref="addServerForm" :model="customerAddForm" label-width="90px">
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
        <el-col :span="5"> <el-button type="primary" @click="">新增服务器</el-button></el-col>
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
        <el-col :span="4"> <el-button type="primary" @click="newServiceVisables.dialogChooseServiceType = true">新增服务</el-button></el-col>
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
    <!--选择进入哪个系统新增弹窗-->
    <el-dialog
      top="15vh"
      title="请选择新增服务的类型"
      width="480px"
      :visible.sync="newServiceVisables.dialogChooseServiceType">
      <!--      搜索那一行-->
      <el-row>
        <el-col :span="8" style="margin-left: 15px">
          <el-button type="primary" @click="newServiceVisables.dialogSecurity = true">安防(3000)</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="newServiceVisables.dialogSmartHome = true">智 慧 用 电</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="newServiceVisables.dialogPatrol = true">巡 更 巡 检</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="newServiceVisables.dialogWeixin = true">微 信 服 务</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="newServiceVisables.dialogAPP = true">APP&nbsp;&nbsp;&nbsp;服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="newServiceVisables.dialogSMS = true">短 信 网 关</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="newServiceVisables.dialogOtherSMS = true">第三方短信</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="newServiceVisables.dialogNVS = true">语 音 服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="newServiceVisables.dialogOtherNVS = true">第三方语音</el-button>
        </el-col>
      </el-row>
      <!--      最下方操作-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="newServiceVisables.dialogChooseServiceType = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--下面是九个弹窗-->
    <!--    安防服务（3000）-->
    <el-dialog
      top="7vh"
      title="安防服务（3000）"
      width="60%"
      :visible.sync="newServiceVisables.dialogSecurity"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.securityForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                v-model="nineDialogForm.securityForm" />
            </el-form-item>
            <el-form-item label="数据库类型">
              <el-input v-model="nineDialogForm.securityForm" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.securityForm" />
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="版本信息">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.securityForm" label-width="120px">
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.securityForm" />
            </el-form-item>
            <el-form-item label="授权时间">
              <el-input v-model="nineDialogForm.securityForm" />
            </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="授权数目">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="授权人员">
              <el-input v-model="nineDialogForm.securityForm"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="nineDialogForm.securityForm" type="textarea"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.securityForm"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogSecurity = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    智慧用电-->
    <el-dialog
      top="1vh"
      title="智慧用电"
      width="60%"
      :visible.sync="newServiceVisables.dialogSmartHome"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.smartHomeForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
            <el-form-item label="版本信息">
              <el-input v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
            <el-form-item label="小程序版本">
              <el-input v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.smartHomeForm" label-width="120px">
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.smartHomeForm" />
            </el-form-item>
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="授权时间">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="授权数目">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="授权人员">
              <el-input v-model="nineDialogForm.smartHomeForm"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="nineDialogForm.smartHomeForm" type="textarea"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.smartHomeForm"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogSmartHome = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    巡更巡检服务-->
    <el-dialog
      top="7vh"
      title="巡更巡检服务"
      width="60%"
      :visible.sync="newServiceVisables.dialogPatrol"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.patrolForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                v-model="nineDialogForm.patrolForm" />
            </el-form-item>
            <el-form-item label="数据库类型">
              <el-input v-model="nineDialogForm.patrolForm" />
            </el-form-item>
            <el-form-item label="数据库IP">
              <el-input v-model="nineDialogForm.patrolForm" />
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="版本信息">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.patrolForm" label-width="120px">
            <el-form-item label="授权方式">
              <el-input v-model="nineDialogForm.patrolForm" />
            </el-form-item>
            <el-form-item label="授权时间">
              <el-input v-model="nineDialogForm.patrolForm" />
            </el-form-item>
            <el-form-item label="授权状态">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="授权数目">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="授权人员">
              <el-input v-model="nineDialogForm.patrolForm"/>
            </el-form-item>
            <el-form-item label="公司备注信息">
              <el-input v-model="nineDialogForm.patrolForm" type="textarea"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.patrolForm"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogPatrol = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    微信服务-->
    <el-dialog
      top="1vh"
      title="微信服务"
      width="60%"
      :visible.sync="newServiceVisables.dialogWeixin"
      style="padding-bottom: 0"
    >
      <el-row>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.weixinForm" label-width="130px">
            <el-form-item label="服务实例id">
              <el-input
                v-model="nineDialogForm.weixinForm" />
            </el-form-item>
            <el-form-item label="中心id">
              <el-input v-model="nineDialogForm.weixinForm" />
            </el-form-item>
            <el-form-item label="域名">
              <el-input v-model="nineDialogForm.weixinForm" />
            </el-form-item>
            <el-form-item label="FTP/IP">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="FTP/UserName">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="FTP/Password">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="微信公众号用户名">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="微信公众号密码">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="授权密钥">
              <el-input v-model="nineDialogForm.weixinForm" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="reviseForm" :model="nineDialogForm.weixinForm" label-width="120px">
            <el-form-item label="Appid">
              <el-input v-model="nineDialogForm.weixinForm" />
            </el-form-item>
            <el-form-item label="AppSecret">
              <el-input v-model="nineDialogForm.weixinForm" />
            </el-form-item>
            <el-form-item label="服务器固定IP">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="数据库端口">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="数据库用户名">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="数据库密码">
              <el-input v-model="nineDialogForm.weixinForm"/>
            </el-form-item>
            <el-form-item label="公司备注信息">
              <el-input v-model="nineDialogForm.weixinForm" type="textarea"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                :style="controlWidth"
                v-model="nineDialogForm.weixinForm"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span style="padding-top: 0" slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogWeixin = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    APP服务-->
    <el-dialog
      top="1vh"
      title="APP服务"
      width="30%"
      :visible.sync="newServiceVisables.dialogAPP"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.APPForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            v-model="nineDialogForm.APPForm" />
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="nineDialogForm.APPForm" />
        </el-form-item>
        <el-form-item label="服务IP">
          <el-input v-model="nineDialogForm.APPForm" />
        </el-form-item>
        <el-form-item label="服务端口">
          <el-input v-model="nineDialogForm.APPForm"/>
        </el-form-item>
        <el-form-item label="数据库IP">
          <el-input v-model="nineDialogForm.APPForm"/>
        </el-form-item>
        <el-form-item label="数据库端口">
          <el-input v-model="nineDialogForm.APPForm"/>
        </el-form-item>
        <el-form-item label="数据库用户名">
          <el-input v-model="nineDialogForm.APPForm"/>
        </el-form-item>
        <el-form-item label="数据库密码">
          <el-input v-model="nineDialogForm.APPForm"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :style="controlWidth"
            v-model="nineDialogForm.APPForm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogAPP = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    短信网关服务-->
    <el-dialog
      top="5vh"
      title="短信网关服务"
      width="30%"
      :visible.sync="newServiceVisables.dialogSMS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.SMSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            v-model="nineDialogForm.SMSForm" />
        </el-form-item>
        <el-form-item label="服务IP">
          <el-input v-model="nineDialogForm.SMSForm" />
        </el-form-item>
        <el-form-item label="服务端口">
          <el-input v-model="nineDialogForm.SMSForm" />
        </el-form-item>
        <el-form-item label="节点ID">
          <el-input v-model="nineDialogForm.SMSForm"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="nineDialogForm.SMSForm"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="nineDialogForm.SMSForm"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :style="controlWidth"
            v-model="nineDialogForm.SMSForm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogSMS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    第三方短信服务-->
    <el-dialog
      top="15vh"
      title="第三方短信服务"
      width="30%"
      :visible.sync="newServiceVisables.dialogOtherSMS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.otherSMSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            v-model="nineDialogForm.otherSMSForm" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="http地址">
          <el-input v-model="nineDialogForm.otherSMSForm" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="账号">
          <el-input v-model="nineDialogForm.otherSMSForm" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="密码">
          <el-input v-model="nineDialogForm.otherSMSForm"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :style="controlWidth"
            v-model="nineDialogForm.otherSMSForm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogOtherSMS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    语音服务-->
    <el-dialog
      top="15vh"
      title="语音服务"
      width="30%"
      :visible.sync="newServiceVisables.dialogNVS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.NVSForm" label-width="110px">
        <el-form-item label="服务实例id">
          <el-input
            v-model="nineDialogForm.NVSForm" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="2030设备GUID">
          <el-input v-model="nineDialogForm.NVSForm" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="手机卡号">
          <el-input v-model="nineDialogForm.NVSForm" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="通道号">
          <el-input v-model="nineDialogForm.NVSForm"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :style="controlWidth"
            v-model="nineDialogForm.NVSForm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogNVS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
    <!--    第三方语音服务-->
    <el-dialog
      top="15vh"
      title="第三方语音服务"
      width="30%"
      :visible.sync="newServiceVisables.dialogOtherNVS"
    >
      <el-form ref="reviseForm" :model="nineDialogForm.otherNVSForm" label-width="90px">
        <el-form-item label="服务实例id">
          <el-input
            v-model="nineDialogForm.otherNVSForm" />
        </el-form-item>
        <!--服务名称-->
        <el-form-item label="http地址">
          <el-input v-model="nineDialogForm.otherNVSForm" />
        </el-form-item>
        <!--服务数据表-->
        <el-form-item label="账号">
          <el-input v-model="nineDialogForm.otherNVSForm" />
        </el-form-item>
        <!--备注-->
        <el-form-item label="密码">
          <el-input v-model="nineDialogForm.otherNVSForm"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :style="controlWidth"
            v-model="nineDialogForm.otherNVSForm"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="newServiceVisables.dialogOtherNVS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import {getOpCustomerPageList, getOpCustomerFindCustomerId, getOpCustomerFindAreaManager, getOpCustomerFindCompany,
    getOpCustomerFindContact, getOpCustomerFindContactPhone, getOpCustomerFindRevisitTime, getOpCustomerFindAddress,
    getOpCustomerFindNote, getOpCustomerFindAreaManagerId, getOpCustomerAreaManagerList, getOpCustomerCreate, getOpCustomerUpdate,
    getOpCustomerDelete, getOpCustomerServerByCustomer, getOpCustomerServerDelete, getOpServerPageList, getOpCustomerServerCreate,
    getOpCustomerServicesByCustomer, OpCustomerServicesCreate, getServicePageList, getServiceFindServiceId, getOpCustomerServicesDelete
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
        dialogAddServerVisible:false,
        dialogServerVisible: false,
        dialogServerIdTableVisible:false,
        //服务器的表格
        serverTable: [],
        nowCustomerId:'',
        addServerForm:{},
        pushAddServerForm:{},
        serverIdTable:[],
        backupServerIdTable:[],
        ServerIdTableCompleteValue:'',
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
        newServiceVisables: {
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
        //新增服务的九个弹窗
        nineDialogForm: {
          securityForm:{},
          smartHomeForm:{},
          patrolForm:{},
          weixinForm:{},
          APPForm:{},
          SMSForm:{},
          otherSMSForm:{},
          NVSForm:{},
          otherNVSForm: {},
        }
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
      dealServerIdTable(){
        getOpServerPageList(1,1000).then(request=>{
          this.serverIdTable = request.data.body.data;
          this.backupServerIdTable = request.data.body.data;
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
      },
      //服务器按钮的弹窗事件
      getServer(row){
        getOpCustomerServerByCustomer(row.customerId).then(request=>{
          this.serverTable = request.data.body;
          this.nowCustomerId = row.customerId;
        })
      },
      ServerDel(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getOpCustomerServerDelete(this.nowCustomerId,row.server.serverId).then(request=>{
            getOpCustomerServerByCustomer(this.nowCustomerId).then(request=>{
              this.serverTable = request.data.body;
            });
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
      },
      AddServerId(row){
        this.addServerForm.serverId = row.serverId;
        this.addServerForm.serverName = row.serverName;
      },
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
          if (request.data.body) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            super.$message({
              message: request.data.msg,
              type: 'warning'
            });
          }
        })
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
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            super.$message({
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
              super.$message({
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
      }
    },
    mounted(){
      this.dealServerIdTable();
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
