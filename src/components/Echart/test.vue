<template>
  <div id="container" style="height: 100%;width: 100%"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: "test",
    mounted(){
      this.Init()
    },
    methods: {
      Init() {
        var dom = document.getElementById('container');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};

        var option;

        option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              areaStyle: {}
            }
          ]
        };

        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
      }
    }
  }
</script>

<style scoped>
  .branchDistribute {
    width: 4.75rem;
    height: 3.75rem;
    margin-top: 0.1rem;
    padding: 0;
  }
  .branchDistribute .lable {
    width: 4.3625rem;
    height: 0.375rem;
    margin-left: 0.125rem;
    background-size: 100%;
  }
  .branchDistribute .lable h2 {
    font-family: PingFang-SC-Bold;
    font-size: 0.2rem;
    text-align: center;
    color: #ffffff;
    position: relative;
    top: 10%;
  }
  .branchDistribute .Echarts5 {
    width: 4.375rem;
    height: 3.25rem;
    margin-left: 0.125rem;
    margin-top: 0.125rem;
  }
</style>
