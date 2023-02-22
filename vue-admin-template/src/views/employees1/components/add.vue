<template>
  <el-dialog
    title="新增员工"
    :visible.sync="isShow"
    width="600px"
    @close="closeEvent"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item prop="username" label="姓名">
        <el-input v-model.trim="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model.trim="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          v-model.trim="form.timeOfEntry"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select
          v-model.trim="form.formOfEmployment"
          placeholder="请输入聘用形式"
        >
          <el-option
            v-for="item in employeesData.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model.trim="form.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model.trim="form.departmentName"
          placeholder="请选择部门"
          readonly
          @focus="focusEvent"
        />
        <el-tree
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name', children: 'children' }"
          @node-click="treeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model.trim="form.correctionTime"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="center">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import employeesData from '@/api/constant/employees'
import { companyDepartment } from '@/api/departments'
import { changeData } from '@/utils/index'
import { sysUserPost } from '@/api/employees'
export default {
  data() {
    return {
      isShow: false,
      employeesData: employeesData,
      value1: '',
      treeData: [],
      showTree: false,
      form: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 2, max: 10, message: '请正确输入用户名', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '必填', trigger: 'change' },
          {
            pattern: /^1[3,9]\d{9}$/,
            message: '请输入正确手机号',
            trigger: 'change'
          }
        ],
        timeOfEntry: [{ required: true, message: '必填', trigger: 'change' }],
        formOfEmployment: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        workNumber: [{ required: true, message: '必填', trigger: 'change' }],
        departmentName: [
          { required: true, message: '必填', trigger: 'change' }
        ],
        correctionTime: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 部门选择聚焦时间
    async focusEvent() {
      this.showTree = true
      if (this.treeData.length === 0) {
        const res = await companyDepartment()
        console.log(res)
        this.treeData = changeData(res.data.depts, '')
      }
    },
    treeClick(obj) {
      console.log(obj.name)
      //  实际上就是点击的节点数据
      //   关闭el-tree
      this.showTree = false
      // 拿到选择项的值赋值给输入框
      this.form.departmentName = obj.name
    },
    // 确定点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          const res = await sysUserPost(this.form)
          this.$message.success('新增成功')
          this.isShow = false
          //  清空表单内容
          console.log(res)
          this.$emit('getData')
        }
      })
    },
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
