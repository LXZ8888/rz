<template>
  <el-dialog
    title="新增部门"
    :visible.sync="isShow"
    width="600px"
    :before-close="handleClose"
    @close="closeEvent"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model.trim="form.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="form.code" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="form.manager" @focus="focusEvent">
          <!--v-model="form.manager" -->
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :rows="4"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="center">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 自定义表单验证
   rules:{
    props的值：{
      ，，，
      {validator:(rule,value,callback)=》{
        value:当前的值
        callback:
        成功：callback()
        失败：callback(new Error(错误信息))
      }}
    }
   }
   判断是否有重复值
  -->
</template>

<script>
import { sysUserSimple, companyDepartmentPost } from '@/api/departments'
export default {
  props: {
    initList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      textarea: '',
      userList: [],
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 1, max: 50, message: '请输入1-50个字符', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // 需求：当前需要输入的值不能和组织结构中任意项的code相同，拿到所有项
              const arr = this.initList.filter(
                (item) => item.pid === this.form.pid
              )
              const bol = arr.every((item) => item.name !== value)
              bol
                ? callback()
                : callback(new Error(`请不要输入重复部门名称` + value))
            },
            trigger: 'change'
          }
        ],
        code: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 1, max: 50, message: '请输入1-50个字符', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // 需求：当前需要输入的值不能和组织结构中任意项的code相同，拿到所有项
              const bol = this.initList.every((item) => {
                return item.code !== value
              })
              bol ? callback() : callback(new Error(`部门编码重复` + value))
            }
          }
        ],
        manager: [{ required: true, message: '必填', trigger: 'change' }], //  string  非必须    负责人名称
        introduce: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 1, max: 300, message: '请输入1-300个字符', trigger: 'change' }
        ] //  string  非必须    介绍
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
    async focusEvent() {
      if (this.userList.length === 0) {
        const res = await sysUserSimple()
        this.userList = res.data
        console.log(res)
      }
    },
    // 确定点击事件
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          await companyDepartmentPost(this.form)
          this.$message.success('新增部门成功')
          this.isShow = false
          this.$refs.form.resetFields()
          // 刷新父级列表数据
          this.$emit('getData')
          console.log('验证成功')
        }
      })
    },
    closeEvent() {
      console.log(1)
      this.$refs.form.resetFields()
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
