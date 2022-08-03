<template>
  <div id="main" style="width: 52rem;height: 25rem"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: "echartsTab",
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
