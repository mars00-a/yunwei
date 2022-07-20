<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <!--弹窗-->
      <el-dialog top="5vh" title="修改运维状态" :visible.sync="dialogVisible" width="35%">
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
            <el-input
              v-model="form.opsignalId"
              placeholder="输入指标名称可查找指标id"
              @focus="getFocus"/>
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
              placeholder="请选择状态类型"
            >
              <el-option
                v-for="item in levelList"
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

    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="danger" @click="Del()">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
import {getStatusDelete,getStatusUpdate} from "@/api/opdict";
  export default {
    name: 'OpOperate',
    data() {
      return {
        controlWidth:{
          width: "100%"
        },
        //用于弹窗的显示
        dialogVisible: false,
        controlShow: false,
        form: {
          statusId: '',
          statusName: '',
          opsignalId: '',
          upthres: '',
          downthres: '',
          level: '',
          note: ''
        },
        targetTable: this.serverTable,
        serverTargetTable: this.serverTable
      }
    },
    methods: {
      //删除功能的事件
      Del() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("Del",this.myData.statusId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //点击编辑时将该行的数据传入弹窗中
      Revise(){
        this.form.statusId = this.myData.statusId;
        this.form.statusName = this.myData.statusName;
        this.form.opsignalId = this.myData.opsignalId;
        this.form.upthres = this.myData.upthres;
        this.form.downthres = this.myData.downthres;
        this.form.level = this.myData.level;
        this.form.note = this.myData.note;
      },
      //编辑弹窗点击取消时响应
      Cancel() {
        this.$message('取消成功')
      },
      //编辑弹窗点击确认时响应
      Confirm(id) {
        if(id === ""){
          this.$message.error('状态的id不能为空');
        }
        else if(this.form.downthres > this.form.upthres){
          this.dialogVisible = true;
          this.$message.error('阈值上限需大于阈值下限');
        }
        else if(this.form.downthres<0 || this.form.downthres>100 || this.form.upthres<0 || this.form.upthres>100){
          this.dialogVisible = true;
          this.$message.error('阈值下限或阈值上限需在0-100之内');
        }
        else if(this.form.level !== 1 && this.form.level !== 2 && this.form.level !== 3){
          console.log(this.form.level)
          this.dialogVisible = true;
          this.$message.error('请正确的选择状态类型');
        }
        else{
          this.$emit("Revise",this.form);
        }
      },
      getFocus(){
        this.controlShow = true
      },
      targetTableGetFocus(index,row){
        this.form.opsignalId = "@" + row.id;
        // this.targetTable = row
        // event
      }
    },
    watch:{
      //当对应指标中输入东西的时候搜索
      'form.opsignalId':{
        immediate:true,
        handler(val){
          let Arr = val.split("@")
          if (Arr[0] === '')
            val = Arr[1]
          else
            val = Arr[0]
          if (val === undefined)
            val = ''
          this.targetTable = this.serverTargetTable.filter(p =>{
            return p.name.indexOf(val) !== -1 || p.id.indexOf(val) !== -1
          })
        }
      }
    },
    //接入来自../../../views/opdict/object的数据
    props:{
      myData:Array,
      serverTable:Array,
      levelList:Array
    }
  }

</script>

<style scoped>
  .dialog-footer{
    margin: 0 auto;
  }
  #targetTable{
    position: absolute;
    top: 1%;
    left:103%;
    height: 100%;
  }
  .targetTableGetFocus{
    background-color: #4A9FF9;
  }
</style>
