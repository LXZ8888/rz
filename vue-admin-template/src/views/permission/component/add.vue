<template>
  <el-dialog :title="title" width="600px" :visible.sync="isShow">
    <el-form
      ref="form"
      label-width="120px"
      :model="form"
      :rules="rules"
      @close="closeEvent"
    >
      <el-form-item label="权限名称" :model="form" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="开启" prop="enVisible">
        <el-switch
          v-model="form.enVisible"
          active-color="#409eff"
          inactive-color="#dcdfe6"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <!--

name	string	非必须
code	string	非必须
description	string	非必须
enVisible	string	非必须
type	number	非必须
pid	string	非必须
         -->
    <template #footer>
      <div class="tc">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermissionPost, sysPermissionPut } from '@/api/peimission'
export default {
  data() {
    return {
      isShow: false,
      mode: 'add',
      form: {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        type: 1,
        pid: 0
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }],
        code: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  computed: {
    title() {
      if (this.mode === 'add') {
        return '新增权限'
      } else if (this.mode === 'edit') {
        return '编辑权限'
      }
      return ''
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            await sysPermissionPost(this.form)
            this.$message.success('添加成功')
          } else if (this.mode === 'edit') {
            await sysPermissionPut(this.form)
            this.$message.success('编辑成功')
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
        code: '',
        description: '',
        enVisible: '0',
        type: 1,
        pid: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
