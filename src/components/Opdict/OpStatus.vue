<template>
  <div id="box">
    <!--当前行数-->
    <div id="now_line_number">{{info}}</div>
    <!--分页-->
    <div id="paginate">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next, jumper"
        :total="12000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'OpStatus',
  data() {
    return {
      //currentPage进入的第一页是第几页
      currentPage: 1,
      info : ''
    }
  },
  methods: {
    dealData(){
      switch (this.footerData){
        case '1':
          this.info = "第1条/共1000条数据";   //object表的数据
          break;
        case '2':
          this.info = "第1条/共1000条数据";   //opcid表的数据
          break;
        case '3':
          this.info = "第1条/共1000条数据";   //service表的数据
          break;
        case '4':
          this.info = "第1条/共1000条数据";   //signal表的数据
          break;
        case '5':
          this.info = "第1条/共1000条数据";   //status表的数据
          break;
      }
    },
    //每页最大条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    //当前页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  props:{
    footerData: Array,
    myData: Array
  },
  //进入页面时调用方法dealData
  watch:{
   '$router': 'dealData'
  },
  mounted(){
    this.dealData();
  }
}
</script>

<style scoped>
  /*设置当前行数属性*/
  #now_line_number{
    font-size: 0.85rem;
    margin-left: 2rem;
    margin-top: 0.6rem;
    color: #606266;
    float:left;
  }
  #paginate{
    float:right;
    margin-right: 2rem;
  }
</style>
