<template>
  <el-container>
    <el-header height="4rem" id="Header">
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
          <el-button type="primary">恢复</el-button>
          <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
          <!--新增按钮的弹窗-->
        </el-col>
      </el-row>
    </el-header>
    <el-main  :style="myStyle" id="Main" >
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 87.8rem"
        @cell-mouse-enter="getNowRow">
        <!--运维状态id：statusId-->
        <el-table-column
          prop="statusId"
          label="运维状态id"
        >
        </el-table-column>
        <!--运维状态名称：statusName-->
        <el-table-column
          prop="statusName"
          label="运维状态名称"
        >
        </el-table-column>
        <!--运维指标id：opsignalId-->
        <el-table-column
          prop="opsignalId"
          label="运维指标id"
        >
        </el-table-column>
        <!--阈值默认上限：upthres-->
        <el-table-column
          prop="upthres"
          label="阈值默认上限"
        >
        </el-table-column>
        <!--阈值默认下限：downthres-->
        <el-table-column
          prop="downthres"
          label="阈值默认下限"
        >
        </el-table-column>
        <!--事件默认级别：level-->
        <el-table-column
          prop="level"
          label="状态类型"
        >
        </el-table-column>
        <!--备注：note-->
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <Status
              :server-table="serverTargetTable"
              :myData="scope.row"
              @Revise='GetRevise'
              @Del='GetDel'
            />
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
    <!--    弹窗-->
    <div>
      <el-dialog top="5vh" title="新增运维状态" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <!--statusId-->
          <el-form-item label="状态的id" :rules="[{ required: true}]">
            <el-input
              v-model="form.statusId"
              :disabled="true"
            />
          </el-form-item>
          <!--statusName-->
          <el-form-item label="状态名称">
            <el-input v-model="form.statusName" />
          </el-form-item>
          <!--opsignalId-->
          <el-form-item label="对应指标">
            <el-input v-model="form.opsignalId" placeholder="输入指标名称可查找指标id" @focus="getFocus"/>
          </el-form-item>
          <!--upthres-->
          <el-form-item label="阈值上限">
            <el-input v-model="form.upthres" />
          </el-form-item>
          <!--downthres-->
          <el-form-item label="阈值下限">
            <el-input v-model="form.downthres" />
          </el-form-item>
          <!--level-->
          <el-form-item label="状态类型">
            <el-select
              :style="controlWidth"
              v-model="form.level"
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
          <!--note-->
          <el-form-item label="备注">
            <el-input v-model="form.note"  type="textarea"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.statusId)">确 定</el-button>
        </span>
        <!--对应指标列表-->
        <div v-show = controlShow id="targetTable">
          <el-table
            :data="targetTable"
            height="95%"
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
    </div>
  </el-container>
</template>

<script>
  import OpStatus from '../../components/Opdict/OpStatus'
  import Status from '../../components/Opdict/OpOperate/Status'
  import {getStatusFindStatusId,getStatusDelete,getStatusCreate} from '@/api/opdictWang'
  import {getObjectCreate, getObjectPageList} from "@/api/opdict";
  export default {
    name: 'MonitorObjectPage',
    components: {
      OpStatus,
      Status
    },
    data() {
      return {
        myStyle:{
          height:"29rem"
        },
        controlWidth:{
          width: "100%"
        },
        //*******************控制区*******************
        FilterParameters: [
          {
            value: '黄金糕',
            label: '黄金糕'
          }, {
            value: '双皮奶',
            label: '双皮奶'
          }, {
            value: '蚵仔煎',
            label: '蚵仔煎'
          }, {
            value: '龙须面',
            label: '龙须面'
          }, {
            value: '北京烤鸭',
            label: '北京烤鸭'
          }],
        //过滤参数
        FilterParameter_value: '',
        //查找输入框
        CompleteValue:'',
        //新增弹窗
        //用于显示弹窗中的表格
        controlShow: false,
        //用于显示弹窗
        dialogVisible: false,
        //弹窗表格内容
        targetTable:[
          {
            id:'001',
            name:'指标名称1'
          },{
            id:'002',
            name:'指标名称2'
          },{
            id:'003',
            name:'指标名称3'
          },{
            id:'004',
            name:'指标名称4'
          },{
            id:'005',
            name:'指标名称1'
          },{
            id:'006',
            name:'指标名称2'
          },{
            id:'007',
            name:'指标名称3'
          },{
            id:'008',
            name:'指标名称4'
          },{
            id:'009',
            name:'指标名称1'
          },{
            id:'010',
            name:'指标名称2'
          },{
            id:'011',
            name:'指标名称3'
          },{
            id:'012',
            name:'指标名称4'
          },{
            id:'013',
            name:'指标名称1'
          },{
            id:'014',
            name:'指标名称2'
          },{
            id:'015',
            name:'指标名称3'
          },{
            id:'016',
            name:'指标名称4'
          },{
            id:'017',
            name:'指标名称1'
          },{
            id:'018',
            name:'指标名称2'
          },{
            id:'019',
            name:'指标名称3'
          },{
            id:'020',
            name:'指标名称4'
          },
        ],
        serverTargetTable:[
          {
            id:'001',
            name:'指标名称1'
          },{
            id:'002',
            name:'指标名称2'
          },{
            id:'003',
            name:'指标名称3'
          },{
            id:'004',
            name:'指标名称4'
          },{
            id:'005',
            name:'指标名称1'
          },{
            id:'006',
            name:'指标名称2'
          },{
            id:'007',
            name:'指标名称3'
          },{
            id:'008',
            name:'指标名称4'
          },{
            id:'009',
            name:'指标名称1'
          },{
            id:'010',
            name:'指标名称2'
          },{
            id:'011',
            name:'指标名称3'
          },{
            id:'012',
            name:'指标名称4'
          },{
            id:'013',
            name:'指标名称1'
          },{
            id:'014',
            name:'指标名称2'
          },{
            id:'015',
            name:'指标名称3'
          },{
            id:'016',
            name:'指标名称4'
          },{
            id:'017',
            name:'指标名称1'
          },{
            id:'018',
            name:'指标名称2'
          },{
            id:'019',
            name:'指标名称3'
          },{
            id:'020',
            name:'指标名称4'
          },
        ],
        //弹窗数据
        form: {
          // 状态id
          statusId: '1',
          statusName: '',
          opsignalId: '',
          upthres: '',
          downthres: '',
          level: [
          ],
          note: ''
        },
        //*******************中间主体*******************
        //表格数据
        tableData: [
          {
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },{
            statusId: 'A000100001',
            statusName: '服务器存活',
            opsignalId: 'S000100001',
            upthres: '1',
            downthres: '1',
            level: '1',
            note: ''
          },
        ],
        //*******************分页尾部*******************
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
        this.FilterParameter_value = ''
        this.CompleteValue = ''
        getObjectPageList(this.currentPage,this.size).then(request=>{
          this.totalNumber = request.data.body.total;
          this.tableData = request.data.body.data;
        })
      },
      //鼠标放到某一行上就触发
      getNowRow(row){
        // console.log(row);
      },
      //每页最大条数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
      },
      //当前页数
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
      },
      //************************新增与查找按钮************************
      //新增功能弹窗的取消和确认
      Cancel() {
        this.$message('取消成功')
      },
      Confirm(id) {
        console.log(this.form)
        //非空验证
        if(id === ""){
          this.dialogVisible = true;
          this.$message.error('状态的id不能为空');
        }
        else{
          getStatusCreate(this.form).then(request=>{
            if(request.data.body){
              this.dealData();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }else{
              this.$message({
                message: '新增失败',
                type: 'warning'
              });
            }
          });
        }
      },
      //查找按钮的事件
      Find(){
        const msg = [this.FilterParameter_value , this.CompleteValue];
        console.log(msg);
      },
      //************************修改、删除按钮************************
      //修改、删除后的表数据返回到以下两个函数
      GetRevise(msg){
        console.log(msg);
      },
      GetDel(msg){
        console.log(msg);
      },
      getFocus(){
        this.controlShow = true
      },
      targetTableGetFocus(index,row){
        this.form.opsignalId = "@" + row.id;
        // this.targetTable = row
        // event
        // console.log(row.id)
        // console.log("点击了某个东西")
      }
    },
    mounted(){
      this.dealData();
      this.myStyle = {
        height: document.body.clientHeight-50-30-64-70+"px"
      }
    },
    watch:{
      //当对应指标中输入东西的时候搜索
      'form.opsignalId':{
        immediate:true,
        handler(val){
          let Arr = val.split("@")
          // console.log(Arr)
          if (Arr[0] === '')
            val = Arr[1]
          else
            val = Arr[0]
          if (val === undefined)
            val = ''
          // console.log(val)
          this.targetTable = this.serverTargetTable.filter(p =>{
            return p.name.indexOf(val) !== -1 || p.id.indexOf(val) !== -1
          })
        }
      }
    },
  }
</script>

<style scoped>

  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
    height: 100%;
  }
  #Header{
    background: #f1f3f4;
  }
  /*#Main{*/
  /*  height: 28.5rem;*/
  /*}*/
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
