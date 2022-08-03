<template>
  <div id="main" style="width: 40rem;height: 25rem"></div>
</template>
<script>
  import * as echarts from 'echarts';
  export default {
    name: "echartsTab",
    data(){
      return{
        xAxisData:[],
        CPU:[],
        physicalMemory:[]
      }
    },
    methods:{
      init(){
        let chartDom = document.getElementById('main');
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'CPU',
              data: this.CPU,
              type: 'line',
              smooth: true
            },
            {
              name:'物理内存',
              data: this.physicalMemory,
              type: 'line',
              smooth: true
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    mounted(){
      this.xAxisData = ['一小时前', '四十五分钟前', '半小时前', '十五分钟前', '现在'];
      this.CPU = ['0.1', '0.5', '0.6', '0.7', '0.2', '0.3'];
      this.physicalMemory = ['0.5', '0.1', '0.3', '0.8', '0.9', '1'];
      this.init()
    },
    watch:{
      'Date':{
        immediate:true,
        handler(val){
          if(this.Date[1]-this.Date[0] > 2*60*60*1000){
            this.Date[1] = this.Date[0]+2*60*60*1000;
          }
          if(this.Date[1]-this.Date[0] <= 20*60*1000 && this.Date[1]-this.Date[0] >= 10*60*1000){

          }
        }
      }
    },
    props:{
      Date:Array,
    }
  }
</script>

<style scoped>

</style>
