<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="600px"
    @close="closeEvent"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div style="text-align: center">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysRolePost, sysRolePut } from '@/api/setting'
export default {
  data() {
    return {
      mode: 'add',

      isShow: false,
      form: { name: '', description: '' },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }],
        description: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  computed: {
    title() {
      if (this.mode === 'add') {
        return '新增角色'
      } else {
        return '编辑角色'
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            const res = await sysRolePost(this.form)

            this.$message.success('新增角色成功')

            console.log(res)
          } else if (this.mode === 'edit') {
            await sysRolePut(this.form)
            this.$message.success('编辑角色成功')
          }
          this.isShow = false
          this.$emit('getData')
        }
      })
    },
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    }
  }
}
</script>

<style></style>
