<template>
  <div id="box">
    <div id="Add">
      <el-button type="primary" @click="dialogVisible = true,Add">修改</el-button>
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="指标id">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="指标名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="指标类型">
            <el-select
              v-model="value"
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
              v-model="value"
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
            <el-input v-model="form.number" />
          </el-form-item>
          <el-form-item label="对象类型">
            <el-select
              v-model="value"
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
            <el-input v-model="form.number" />
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select v-model="value" placeholder="请选择数据类型">
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
    </div>
    <div id="Del">
      <el-button type="primary" @click="Del">删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OpOperate',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        number: ''
      },
      // 所属系统
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
      // 所属模组
      BelongingModules: [],
      // 对象类型
      ObjectTypes: [],
      // 数据类型
      DataTypes: [],
      value: ''
    }
  },
  methods: {
    Del() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Cancel() {
      this.$message('取消成功')
    },
    Confirm() {
      this.$message('添加成功')
    }
  }
}
</script>

<style scoped>

</style>
