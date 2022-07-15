<template>
  <div id="box">
    <el-row :gutter="10" id="Header">
      <el-col :span="6"><div class="grid-content bg-purple">
        <span id="FilterParameters">过滤参数：</span>
        <el-select v-model="FilterParameter_value" placeholder="请选择" title="过滤参数:" id="FilterBox">
          <el-option
            v-for="item in FilterParameters"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
        <span id="Value">值：</span>
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" id="Find">查找</el-button>
        <el-button type="success" id="Add" @click="dialogVisible = true">新增</el-button>
        <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="监控的id">
              <el-input v-model="f_object_id" />
            </el-form-item>
            <el-form-item label="所属系统">
              <el-select
                v-model="f_system_name"
                filterable
                allow-create
                default-first-option
                placeholder="请选择所属系统"
              >
                <el-option
                  v-for="item in BelongingSystems"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="所属模块">
              <el-select
                v-model="f_module_name"
                filterable
                allow-create
                default-first-option
                placeholder="请选择所属模块"
              >
                <el-option
                  v-for="item in BelongingModules"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="对象名称">
              <el-input v-model="f_object_name" />
            </el-form-item>
            <el-form-item label="对象类型">
              <el-select
                v-model="f_category"
                filterable
                allow-create
                default-first-option
                placeholder="请选择对象类型"
              >
                <el-option
                  v-for="item in ObjectTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="检测内容">
              <el-input v-model="f_item" />
            </el-form-item>
            <el-form-item label="数据类型">
              <el-select v-model="f_type" placeholder="请选择数据类型">
                <el-option
                  v-for="item in DataTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false,Cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,Confirm()">确 定</el-button>
        </span>
        </el-dialog>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OpControl',
  props: {
    parameter:Array
  },
  data() {
    return {
      //过滤参数
      FilterParameters: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      FilterParameter_value: '',
      //值查询
      options: [],
      value: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"],
      //新增
      dialogVisible: false,
      form: {
        name: '',
        number: ''
      },
      // 所属模组下拉框数组
      BelongingSystems: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // 对象类型下拉框数组
      ObjectTypes: [],
      // 数据类型下拉框数组
      DataTypes: [],
      //监控的id
      f_object_id:'',
      //所属系统
      f_system_name:'',
      //所属模块
      f_object_name:'',
      //对象名称
      f_module_name:'',
      //对象类型
      f_category:'',
      //检测内容
      f_item:'',
      //数据类型
      f_type:'',
      //用于返回新增的数据值
      Value:[
        {
          f_object_id:'',
          f_system_name:'',
          f_object_name:'',
          f_module_name:'',
          f_category:'',
          f_item:'',
          f_type:''
        }
      ]
    }
  },
  mounted(){
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
       } else {
        this.options = [];
      }
    },
    Cancel() {
      this.$message('取消成功')
    },
    Confirm() {
      //储存修改的值到Value
      this.Value.f_object_id = this.f_object_id;
      this.Value.f_system_name = this.f_system_name;
      this.Value.f_object_name = this.f_object_name;
      this.Value.f_module_name = this.f_module_name;
      this.Value.f_category = this.f_category;
      this.Value.f_item = this.f_item;
      this.Value.f_type = this.f_type;
      this.$message('新增成功');
      this.$emit("Add",this.Value);
    }
  }
}
</script>

<style scoped>
  #Find{
    margin-left: 1rem;
  }
  #Header{
    margin-top: 0.8rem;
  }
</style>
