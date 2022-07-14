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
        <el-button type="success" id="Add">新增</el-button>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">

      </div></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'OpControl',
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
        "Wyoming"]
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
