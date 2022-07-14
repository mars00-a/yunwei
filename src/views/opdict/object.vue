<template>
  <div id="box">
    <div id="OpControl">2</div>
    <div id="ObjectTable">
      <OpOperate />
    </div>
    <div id="OpStatus">
      <OpStatus />
    </div>
  </div>
</template>

<script>
import OpStatus from '../../components/Opdict/OpStatus'
import OpControl from '../../components/Opdict/OpControl'
import OpOperate from '../../components/Opdict/OpOperate'
export default {
  name: 'MonitorObjectPage',
  components: {
    OpStatus,
    OpControl,
    OpOperate
  }
}
</script>

<style scoped>
  #box{
    display: flex;
    flex-direction: column;
  }
  #OpControl{
    flex: 1;
    background: red;
    min-height: 3rem;
  }
  #ObjectTable{
    flex: 1;
    background: green;
    min-height: 36rem;
  }
  #OpStatus{
    flex: 1;
    margin-top: 0.5rem;
  }
</style>
