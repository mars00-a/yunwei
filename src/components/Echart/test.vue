<template>
  <div id="main" style="width: 100%;height: 100%"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: "test",
    mounted(){
      this.init()
    },
    methods:{
      init(){
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
