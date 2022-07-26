<template>
  <el-row :gutter="10">
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true,Revise()">修改</el-button>
      <el-dialog title="修改运维指标" :visible.sync="dialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="指标id" :rules="[{ required: true}]">
            <el-input
              disabled="true"
              v-model="form.opsignalId" />
          </el-form-item>
          <el-form-item label="指标名称">
            <el-input v-model="form.opsignalName" />
          </el-form-item>
          <el-form-item label="指标类型">
            <el-select
              :style="controlWidth"
              v-model="form.paraType"
              filterable
              allow-create
              default-first-option
              placeholder="请选择指标类型"
            >
              <el-option
                v-for="item in para_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="指标公式">
            <el-tooltip class="item" effect="dark" :content="tip" placement="bottom">
              <el-input placeholder="输入对象名称或对象id可查找对应的对象" @focus="getFocus" v-model="form.para" />
            </el-tooltip>
          </el-form-item>
          <div>

          </div>
          <!--note-->
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.note"/>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm()">确 定</el-button>
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
              prop="objectId"
              label="对象id"
              width="100%">
            </el-table-column>
            <el-table-column
              prop="objectName"
              label="对象名称"
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
      <el-button type="danger" @click="Del">删除</el-button>
    </div></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'OpOperate',
  data() {
    return {
      controlWidth:{
        width: "100%"
      },
      //用于显示公式表格
      controlShow: false,
      //右侧的指标表格
      targetTable: this.targetTable,
      serverTargetTable: this.serverTable,
      dialogVisible: false,
      form: {
        opsignalId: '',
        opsignalName: '',
        paraType: '',
        para: '',
        note: '',
        objectIds: [],
      },
      tip:'此处输入指标公式',
      //指标类型
      para_types:[
        {
        value:1,
        label:'1--监控对象',
      },{
        value:2,
        label:'2--计算公式',
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
        this.$emit("Del",this.myData.opsignalId);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //点击编辑时将该行的数据传入弹窗中
    Revise(){
      this.form.opsignalId = this.myData.opsignalId;
      this.form.opsignalName = this.myData.opsignalName;
      this.form.paraType = this.myData.paraType;
      this.form.para = this.myData.para;
      this.form.note = this.myData.note;
    },
    //编辑弹窗点击取消时响应
    Cancel() {
      this.$message('取消成功')
    },
    //编辑弹窗点击确认时响应
    Confirm() {
      console.log(this.form)
      if(this.form.opsignalId === ""){
        this.dialogVisible = true;
        this.$message.error('运维指标id不能为空');
      }
      else if(this.form.paraType !== 1 && this.form.paraType !== 2){
        this.dialogVisible = true;
        this.$message.error('请正确选择指标类型');
      }
      else if(this.form.paraType === '1' || this.form.objectIds.length > 1){
        this.dialogVisible = true;
        this.$message.error('指标类型为1时请输入单独的对象id作为指标公式');
      }
      else if(this.form.paraType === 2 && this.form.objectIds.length === 1){
        this.dialogVisible = true;
        this.$message.error('指标类型为2时请输入对象的计算公式作为指标公式');
      }
      else{
        this.$emit("Revise",this.form);
      }
    },
    // 输入框被选中时显示指标列表
    getFocus(){
      this.controlShow = true
    },
    // 点击添加按钮后将输入的搜索内容替换成插入的指标id
    targetTableGetFocus(row){
      let val = this.form.para
      let myValArr = val.split("@");
      let FrontArr = val.split("@",myValArr.length-1);
      let FrontStr = '';
      for(let i = 0;i<myValArr.length-1;i++){
        if (FrontArr[i] === "(") {
          FrontStr += FrontArr[i]
        }else if(FrontArr[i] === ""){
        }else{
          FrontStr += "@"+FrontArr[i]
        }
      }
      val = myValArr[myValArr.length-1];
      this.form.para = FrontStr+"@"+row.objectId;
    }
  },
  watch:{
    // 当对应指标中输入东西的时候搜索，并且更改提示内容
    'form.para':{
      immediate:true,
      handler(val){
        //当输入框里值为空时，将提示标为指定内容
        if(val === '' || val === undefined || val === null){
          this.tip = '请输入指标公式'
        }
        else{
          //获取@符号后面的数据，用于搜索
          let myValArr = val.split("@");
          let mySearch = myValArr[myValArr.length-1];
          //获取所有的id变成数组，用于查找指标名称
          let myIdArr = val.split(/[-,+,*,/,(,),^,@]/);
          myIdArr = myIdArr.filter(function (s) {
            return s && s.trim();
          });
          this.form.objectIds = myIdArr;
          // console.log("id数组为：",myIdArr)
          //获取所有的符号，用于添加在注释的指标名称之间解释指标名称作用
          let myOperatorArr = val.split(/[0,1,2,3,4,5,6,7,8,9]/);
          myOperatorArr = myOperatorArr.filter(function (s) {
            return s && s.trim();
          });
          // console.log("符号数组为：",myOperatorArr)
          //以id为依据获取到对应的指标名称
          let myNameArr = []
          for(let i=0; i<myIdArr.length; i++){
            for(let j=0; j<this.serverTargetTable.length; j++){
              if(this.serverTargetTable[j].objectId === myIdArr[i]){
                // console.log("发现了指定id的指标")
                // console.log("对应的指标id和指标名称为：",this.serverTargetTable[j].id,this.serverTargetTable[j].name)
                myNameArr[i] = this.serverTargetTable[j].objectName
              }
            }
          }
          // console.log("指标名称数组为：",myNameArr)
          //将指标名称和运算符组合成一句话传入到tip中
          this.tip = ''
          for(let i=0;i<myOperatorArr.length;i++){
            this.tip += myOperatorArr[i]
            if (myNameArr[i])
              this.tip += myNameArr[i]
          }

          this.targetTable = this.serverTargetTable.filter(p =>{
            return p.objectName.indexOf(mySearch) !== -1 || p.objectId.indexOf(mySearch) !== -1
          })
        }

      }
    },
  },
  //接入来自../../../views/opdict/object的数据
  props:{
    myData:Array,
    // 父组件传过来的未经过搜索的指标列表
    serverTable:Array,
    //经过搜索的指标列表
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
