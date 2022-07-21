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
          <el-button type="success" id="Add" @click="visables.dialogAddVisible = true">新增</el-button>
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
          prop="f_service_id"
          label="服务实例id"
        >
        </el-table-column>
        <!--服务名称：f_service_name-->
        <el-table-column
          prop="f_service_name"
          label="服务名称"
        >
        </el-table-column>
        <!--安装的服务器id：f_server_id-->
        <el-table-column
          prop="f_server_id"
          label="安装的服务器id"
        >
        </el-table-column>
        <!--服务类型：f_service_type-->
        <el-table-column
          prop="f_service_type"
          label="服务类型"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column label="操作" width="255">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-button type="primary" @click="visables.dialogReviseVisible = true">修改</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="danger" @click="Del">删除</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="warning" @click="visables.dialogCustomerVisible = true">客户</el-button>
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
    <!--修改按钮的弹窗-->
    <el-dialog title="修改" :visible.sync="visables.dialogReviseVisible" width="30%">
      <el-form ref="reviseForm" :model="reviseForm" label-width="90px">
        <!--服务类型-->
        <el-form-item label="服务类型id" :rules="[{ required: true}]">
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
    <!--客户按钮的弹窗-->
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
          prop="customerManager"
          label="客户经理"
        >
        </el-table-column>
<!--        客户名称-->
        <el-table-column
          prop="customerName"
          label="客户名称"
        >
        </el-table-column>
<!--        联系电话-->
        <el-table-column
          prop="phoneNumber"
          label="联系电话"
        >
        </el-table-column>
<!--        回访时间-->
        <el-table-column
          prop="returnVisitDate"
          label="回访时间"
        >
        </el-table-column>
<!--        客户地址-->
        <el-table-column
          prop="customerAddress"
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
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-button type="primary" @click="visables.dialogReviseVisible = true">修改</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" @click="Del">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>


      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    name: 'op_service',
    data() {
      return {
        //*******************控制区*******************
        //过滤参数下拉框
        FilterParameters: [],
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
          {
            serviceType: '1231',
            serviceName: '31231',
            serviceTable: '3123',
            note: '31231'
          }
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
        //*******************控制弹窗显示*******************
        visables: {
          // 新增
          dialogAddVisible : false,
          //修改的弹窗
          dialogReviseVisible: false,
          //客户的弹窗
          dialogCustomerVisible: false,
        },
        //新增弹窗的数据
        addForm:{},
        // 修改弹窗的数据
        reviseForm:{},
        // 客户弹窗的数据
        customerForm: {
          customerInfos: [
            {
              customerId: "001",
              customerManager: "黄奇峰",
              customerName: "湖北邮政",
              phoneNumber: "123456789",
              returnVisitDate: "2022.7.1",
              customerAddress: "湖北武汉",
              note: "无"
            },{
              customerId: "002",
              customerManager: "张三",
              customerName: "武汉食品有限",
              phoneNumber: "98711234",
              returnVisitDate: "2002.1.1",
              customerAddress: "武汉孝感",
              note: "暂无"
            },{
              customerId: "003",
              customerManager: "李四",
              customerName: "广东深圳视频加工",
              phoneNumber: "238261675",
              returnVisitDate: "1999.12.12",
              customerAddress: "广东深圳",
              note: "视频处理厂"
            },
          ]
        },
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
