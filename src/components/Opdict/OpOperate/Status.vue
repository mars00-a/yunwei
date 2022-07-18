<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <!--弹窗-->
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <!--f_status_id-->
          <el-form-item label="状态的id" :rules="[{ required: true}]">
            <el-input v-model="form.f_status_id" />
          </el-form-item>
          <!--f_status_name-->
          <el-form-item label="状态名称">
            <el-input v-model="form.f_status_name" />
          </el-form-item>
          <!--f_opsignal_id-->
          <el-form-item label="对应指标">
            <el-input v-model="form.f_opsignal_id" placeholder="输入指标名称可查找指标id" @focus="getFocus"/>
          </el-form-item>
          <!--f_upthres-->
          <el-form-item label="阈值上限">
            <el-input v-model="form.f_upthres" />
          </el-form-item>
          <!--f_downthres-->
          <el-form-item label="阈值下限">
            <el-input v-model="form.f_downthres" />
          </el-form-item>
          <!--f_level-->
          <el-form-item label="状态类型">
            <el-select
              v-model="form.f_level"
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
          <!--f_note-->
          <el-form-item label="备注">
            <el-input v-model="form.f_note"  type="textarea"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, Confirm(form.f_status_id)">确 定</el-button>
        </span>
        <!--对应指标列表-->
        <div v-show = controlShow id="targetTable">
          <el-table
            :data="targetTable"
            height="625"
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
      <el-button type="danger" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'OpOperate',
  data() {
    return {
      //用于弹窗的显示
      dialogVisible: false,
      controlShow: false,
      form: {
        f_status_id: '',
        f_status_name: '',
        f_opsignal_id: '',
        f_upthres: '',
        f_downthres: '',
        f_level: '',
        f_note: ''
      },
      // targetTable:[
      //   {
      //     id:'001',
      //     name:'指标名称1'
      //   },{
      //     id:'002',
      //     name:'指标名称2'
      //   },{
      //     id:'003',
      //     name:'指标名称3'
      //   },{
      //     id:'004',
      //     name:'指标名称4'
      //   },{
      //     id:'005',
      //     name:'指标名称1'
      //   },{
      //     id:'006',
      //     name:'指标名称2'
      //   },{
      //     id:'007',
      //     name:'指标名称3'
      //   },{
      //     id:'008',
      //     name:'指标名称4'
      //   },{
      //     id:'009',
      //     name:'指标名称1'
      //   },{
      //     id:'010',
      //     name:'指标名称2'
      //   },{
      //     id:'011',
      //     name:'指标名称3'
      //   },{
      //     id:'012',
      //     name:'指标名称4'
      //   },{
      //     id:'013',
      //     name:'指标名称1'
      //   },{
      //     id:'014',
      //     name:'指标名称2'
      //   },{
      //     id:'015',
      //     name:'指标名称3'
      //   },{
      //     id:'016',
      //     name:'指标名称4'
      //   },{
      //     id:'017',
      //     name:'指标名称1'
      //   },{
      //     id:'018',
      //     name:'指标名称2'
      //   },{
      //     id:'019',
      //     name:'指标名称3'
      //   },{
      //     id:'020',
      //     name:'指标名称4'
      //   },
      // ],
      // serverTargetTable:[
      //   {
      //     id:'001',
      //     name:'指标名称1'
      //   },{
      //     id:'002',
      //     name:'指标名称2'
      //   },{
      //     id:'003',
      //     name:'指标名称3'
      //   },{
      //     id:'004',
      //     name:'指标名称4'
      //   },{
      //     id:'005',
      //     name:'指标名称1'
      //   },{
      //     id:'006',
      //     name:'指标名称2'
      //   },{
      //     id:'007',
      //     name:'指标名称3'
      //   },{
      //     id:'008',
      //     name:'指标名称4'
      //   },{
      //     id:'009',
      //     name:'指标名称1'
      //   },{
      //     id:'010',
      //     name:'指标名称2'
      //   },{
      //     id:'011',
      //     name:'指标名称3'
      //   },{
      //     id:'012',
      //     name:'指标名称4'
      //   },{
      //     id:'013',
      //     name:'指标名称1'
      //   },{
      //     id:'014',
      //     name:'指标名称2'
      //   },{
      //     id:'015',
      //     name:'指标名称3'
      //   },{
      //     id:'016',
      //     name:'指标名称4'
      //   },{
      //     id:'017',
      //     name:'指标名称1'
      //   },{
      //     id:'018',
      //     name:'指标名称2'
      //   },{
      //     id:'019',
      //     name:'指标名称3'
      //   },{
      //     id:'020',
      //     name:'指标名称4'
      //   },
      // ],
    }
  },
  methods: {
    //删除功能的事件
    Del() {
      console.log(this);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("Del",this.myData.f_status_id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //点击编辑时将该行的数据传入弹窗中
    Revise(){
      this.form.f_status_id = this.myData.f_status_id;
      this.form.f_status_name = this.myData.f_status_name;
      this.form.f_opsignal_id = this.myData.f_opsignal_id;
      this.form.f_upthres = this.myData.f_upthres;
      this.form.f_downthres = this.myData.f_downthres;
      this.form.f_level = this.myData.f_level;
      this.form.f_note = this.myData.f_note;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm(id) {
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('状态的id不能为空');
      }
      else{
        this.$message('修改成功');
        this.$emit("Revise",this.form);
      }
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(index,row){
      this.form.f_opsignal_id = "@" + row.id;
      // this.targetTable = row
      // event
      // console.log(row.id)
      // console.log("点击了某个东西")
    }
  },
  watch:{
    //当对应指标中输入东西的时候搜索
    'form.f_opsignal_id':{
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
  //接入来自../../../views/opdict/object的数据
  props:{
    myData:Array,
    serverTargetTable:Array,
    targetTable:Array
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
  }
  .targetTableGetFocus{
    background-color: #4A9FF9;
  }
</style>
