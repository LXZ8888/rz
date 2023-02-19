<template>
  <el-dialog
    title="新增部门"
    :visible.sync="isShow"
    width="600px"
    :before-close="handleClose"
  >
    <el-form label-with="100px">
      <el-form-item label="部门名称">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-input placeholder="请选择负责人" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="4"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="center">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      textarea: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
