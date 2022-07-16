<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="指标id" :rules="[{ required: true}]">
            <el-input v-model="form.f_opsignal_id" />
          </el-form-item>
          <el-form-item label="指标名称">
            <el-input v-model="form.f_opsignal_name" />
          </el-form-item>
          <el-form-item label="指标类型">
            <el-select
              v-model="form.f_para_type"
              filterable
              allow-create
              default-first-option
              placeholder="请选择指标类型"
            >
              <el-option
                v-for="item in f_para_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="指标公式">
            <el-input placeholder="输入指标名称可查找指标id" @focus="getFocus" v-model="form.f_para" />
          </el-form-item>
          <!--note-->
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.f_note"/>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm(form.f_opsignal_id)">确 定</el-button>
        </span>

<!--        弹窗的右侧表单-->
        <div v-show = controlShow id="targetTable">
          <el-table
            :data="targetTable"
            height="480"
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
                  @click="targetTableGetFocus(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'OpOperate',
  data() {
    return {
      //用于显示公式表格
      controlShow: false,
      //右侧的指标表格
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
      //右侧的指标表格
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
      //用于弹窗的显示
      dialogVisible: false,
      form: {
        f_opsignal_id:'',
        f_opsignal_name:'',
        f_para_type:'',
        f_para:'',
        target:'',
      },
      //指标类型
      f_para_types:[{
        value:'0',
        label:'0--监控对象',
      },{
        value:'1',
        label:'1--计算公式',
      }]
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
        this.$emit("Del",this.myData.f_opsignal_id);
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
      this.form.f_opsignal_id = this.myData.f_opsignal_id;
      this.form.f_opsignal_name = this.myData.f_opsignal_name;
      this.form.f_para_type = this.myData.f_para_type;
      this.form.f_para = this.myData.f_para;
      this.form.target = this.myData.target;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm(id) {
      if(id === ""){
        this.dialogVisible = true;
        this.$message.error('运维指标id不能为空');
      }
      else{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit("Revise",this.form);
      }
    },
    getFocus(){
      this.controlShow = true
    },
    targetTableGetFocus(row){
      let val = this.form.f_para
      let myVal = val.split("@");
      let FrontArr = val.split("@",myVal.length-1);
      let FrontStr = '';
      for(let i = 0;i<myVal.length-1;i++){
        if (FrontArr[i] === "(") {
          FrontStr += FrontArr[i]
        }else if(FrontArr[i] === ""){
        }else{
          FrontStr += "@"+FrontArr[i]
        }
      }
      // console.log("maVal:",myVal)
      // console.log("FrontArr",FrontArr)
      // console.log("FrontStr",FrontStr)
      val = myVal[myVal.length-1];
      this.form.f_para = FrontStr+"@"+row.id;
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索
    'form.f_para':{
      immediate:true,
      handler(val){
        let myVal = val.split("@");
        val = myVal[myVal.length-1];
        // console.log("Arr值为：",val)
        // console.log(typeof myVal)
        // let testString = "@123+@123-@78";
        // let testArr = testString.split("@");
        // let myStr = testArr[testArr.length-1]
        // console.log(myVal,myVal.length);
        this.targetTable = this.serverTargetTable.filter(p =>{
          return p.name.indexOf(val) !== -1 || p.id.indexOf(val) !== -1
        })
      }
    }
  },
  //接入来自../../../views/opdict/object的数据
  props:{
    myData:Array
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
