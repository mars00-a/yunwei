<template>
  <div id="box">
    <div id="FilterParameter">过滤参数</div>
    <el-select v-model="value" placeholder="请选择" title="过滤参数:" id="FilterBox">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'OpControl',
  data() {
    return {
      options: [{
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
      value: ''
    }
  }
}
</script>

<style scoped>
 #box{
   display: flex;
 }
  #FilterParameter{
    flex: 0 0 20%!important;;
  }
  #FilterBox{
    flex: 0 0 20%!important;;
  }
</style>
