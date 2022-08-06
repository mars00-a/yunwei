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
      },
      dealTime(beginTime,timeInterval,n){
        for(let i=0;i<=n;i++){
          this.xAxisData[i] = (Array(2).join('0') + beginTime.getHours()).slice(-2) + ":" +
            (Array(2).join('0') + beginTime.getMinutes()).slice(-2);
          beginTime.setTime(beginTime.valueOf()+timeInterval)
        }
        this.init();
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
          if(Date[0]&&Date[1]){
            let now = new Date().getTime();
            if(this.Date[1].valueOf()< now){
              if(this.Date[1]-this.Date[0] > 2*60*60*1000){
                this.dealTime(this.Date[0], 6*60*1000, 20);
              }
              if(this.Date[1]-this.Date[0] <= 20*60*1000 && this.Date[1]-this.Date[0] >= 10*60*1000){
                this.dealTime(this.Date[0], (this.Date[1]-this.Date[0])/20, 20);
              }
              if(this.Date[1]-this.Date[0] <= 10*60*1000 && this.Date[1]-this.Date[0] >= 0){
                this.dealTime(this.Date[0], 30*1000, parseInt((this.Date[1]-this.Date[0])/(30000))+1);
              }
            }
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
