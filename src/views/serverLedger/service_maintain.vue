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
          <el-button @click="Find" type="primary" id="Find">过 滤</el-button>
          <el-button @click="dealData" type="primary">恢 复</el-button>
          <el-button type="success" id="Add" @click="visables.dialogChooseServiceType = true">新 增</el-button>
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
                <el-button type="primary" @click="openOneDialog(scope.row.serviceType)">修 改</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="danger" @click="serviceDel(scope.row.serviceId)">删 除</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="warning" @click="visables.dialogCustomerVisible = true">客 户</el-button>
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
      top="5vh"
      title="修改客户信息"
      :visible.sync="visables.dialogCustomerVisible">
      <el-table
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
          prop="areaManager"
          label="客户经理"
        >
        </el-table-column>
<!--        客户名称-->
        <el-table-column
          prop="company"
          label="客户名称"
        >
        </el-table-column>
<!--        联系电话-->
        <el-table-column
          prop="contactPhone"
          label="联系电话"
        >
        </el-table-column>
<!--        回访时间-->
        <el-table-column
          prop="revisitTime"
          label="回访时间"
        >
        </el-table-column>
<!--        客户地址-->
        <el-table-column
          prop="address"
          label="客户地址"
        >
        </el-table-column>
<!--        备注-->
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>
<!--        操作栏-->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" @click="CustomerDel(scope.row.customerId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="visables.dialogAddCustomerVisible = true">新 增</el-button>
        <el-button type="primary" @click="myConfirm()">确 定</el-button>
      </span>
    </el-dialog>
<!--------------------新增用户的弹窗------------>
    <el-dialog
    top="5vh"
    title="新增用户"

    :visible.sync="visables.dialogAddCustomerVisible">
<!--      搜索那一行-->
      <el-row>
        <el-col :span="5">
          <span style="line-height: 40px;margin-left: 20px">输入搜索关键字：</span>
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
      >
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
<!--        操作列-->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" @click="addCustomerToInput(scope.row.customerId)">添加</el-button>
          </template>
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
      <!--      搜索那一行-->
      <el-row>
        <el-col :span="8" style="margin-left: 15px">
          <el-button type="primary" @click="openOneDialog(1)">安防(3000)</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="openOneDialog(2)">智 慧 用 电</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="openOneDialog(3)">巡 更 巡 检</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="openOneDialog(4)">微 信 服 务</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="openOneDialog(5)">APP&nbsp;&nbsp;&nbsp;服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="openOneDialog(6)">短 信 网 关</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8"  style="margin-left: 15px">
          <el-button type="primary" @click="openOneDialog(7)">第三方短信</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="openOneDialog(8)">语 音 服 务</el-button>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="openOneDialog(9)">第三方语音</el-button>
        </el-col>
      </el-row>
      <!--      最下方操作-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="visables.dialogChooseServiceType = false">取 消</el-button>
      </span>
    </el-dialog>

<!---------------------下面是九个弹窗---------------------------------------->

<!--    安防服务（3000）-->
    <el-dialog
      top="7vh"
      title="安防服务（3000）"
      width="60%"
      :visible.sync="visables.dialogSecurity"
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
        <el-button type="info" plain @click="visables.dialogSecurity = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    智慧用电-->
    <el-dialog
      top="1vh"
      title="智慧用电"
      width="60%"
      :visible.sync="visables.dialogSmartHome"
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
        <el-button type="info" plain @click="visables.dialogSmartHome = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    巡更巡检服务-->
    <el-dialog
      top="7vh"
      title="巡更巡检服务"
      width="60%"
      :visible.sync="visables.dialogPatrol"
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
        <el-button type="info" plain @click="visables.dialogPatrol = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    微信服务-->
    <el-dialog
      top="1vh"
      title="微信服务"
      width="60%"
      :visible.sync="visables.dialogWeixin"
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
        <el-button type="info" plain @click="visables.dialogWeixin = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    APP服务-->
    <el-dialog
      top="1vh"
      title="APP服务"
      width="30%"
      :visible.sync="visables.dialogAPP"
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
        <el-button type="info" plain @click="visables.dialogAPP = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    短信网关服务-->
    <el-dialog
      top="5vh"
      title="短信网关服务"
      width="30%"
      :visible.sync="visables.dialogSMS"
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
        <el-button type="info" plain @click="visables.dialogSMS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    第三方短信服务-->
    <el-dialog
      top="15vh"
      title="第三方短信服务"
      width="30%"
      :visible.sync="visables.dialogOtherSMS"
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
        <el-button type="info" plain @click="visables.dialogOtherSMS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    语音服务-->
    <el-dialog
      top="15vh"
      title="语音服务"
      width="30%"
      :visible.sync="visables.dialogNVS"
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
        <el-button type="info" plain @click="visables.dialogNVS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
<!--    第三方语音服务-->
    <el-dialog
      top="15vh"
      title="第三方语音服务"
      width="30%"
      :visible.sync="visables.dialogOtherNVS"
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
        <el-button type="info" plain @click="visables.dialogOtherNVS = false">取 消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getServicePageList, getServiceFindServiceId, getServiceFindServiceType, getServiceFindServiceName,
  getServiceFindServerId, getServiceDelete, getAllCustomer
} from '@/api/wang'
import {getOpServerPageList} from "@/api/serverLedger";
  export default {
    name: 'op_service',
    data() {
      return {
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
            label: '安装的id'
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
        tableData: [
          {
            serviceId: '1231',
            serviceName: '31231',
            serverId: '3123',
            serviceType: '31231'
          },

        ],
        // 所有的服务器数据，用于鼠标悬浮显示
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
        addForm: {},
        // 修改弹窗的数据
        reviseForm: {},
        // 客户弹窗的数据和修改客户弹窗的数据
        customerForm: {
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
          ]
        },
        // 九个弹窗的数据
        nineDialogForm: {
          securityForm:{

          },
          smartHomeForm:{

          },
          patrolForm:{

          },
          weixinForm:{

          },
          APPForm:{

          },
          SMSForm:{

          },
          otherSMSForm:{

          },
          NVSForm:{

          },
          otherNVSForm: {

          },

        }
      }
    },
    methods:{
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
            console.log("触发了查询分页的服务类型查询")
            console.log("返回的内容为：")
            console.log(request)
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
          console.log("打开了3000系统弹窗")
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
      CustomerDel(id) {
        console.log("进行了删除客户操作，被删除的客户的id为："+id)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delSuccessMessage()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //删除主页面上的服务
      serviceDel(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getServiceDelete(id).then(request=>{
            if (request.data.body) {
              this.Find();
              console.log("删除了一个服务，对应的服务id为："+id)
              this.delSuccessMessage()
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
        console.log("点击了添加用户到输入框，用户的id为："+id)
        this.customerForm.searchCustomerKeyword = id
      },
      // 确认添加用户
      confirmAddCustomer(){
        console.log("确认添加了客户，客户的id为："+this.customerForm.searchCustomerKeyword)
        this.confirmSuccessMessage()
        this.visables.dialogAddCustomerVisible = false
      },
      // 鼠标悬浮提示
      tableServerNameGet(id){
        for(let i=0;i<this.allServerInfos.length; i++){
          if(id === this.allServerInfos[i].serverId){
            return this.allServerInfos[i].serverName
          }
        }
      }
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
      }
    },
    mounted(){
      this.dealData()
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      }
      // 获取所有客户信息表
      getAllCustomer().then(request=>{
        this.customerForm.searchAllCustomerInfos = request.data.body;
        this.customerForm.allCustomerInfos = request.data.body;
      });
      // 获取所有服务器信息表
      getOpServerPageList(1,1000).then(request=>{
        this.allServerInfos = request.data.body.data;
        console.log(this.allServerInfos)
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
</style>
