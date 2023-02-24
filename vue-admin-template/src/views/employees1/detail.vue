<template>
  <!-- 动态路由匹配  路由params传值
 1、配置路由 {path：'/xxx/:ids'}
 2、传 this.$router.push('/xxx/123')
 3、收 this.$route.params.id
-->
  <div class="detail">
    <el-card>
      <el-tabs>
        <el-tab-pane v-model="activeName" label="登录账户设置" name="first">
          <!-- 表单 -->
          <el-form
            ref="form"
            v-model="form"
            label-width="80px"
            class="form"
            :model="form"
            :rules="rules"
          >
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">
          <Info
            lazy
            :user-info="userInfo2"
            @getData="getData"
          /></el-tab-pane>
        <el-tab-pane label="岗位信息" name="third">
          <Job lazy />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { sysUser } from '@/api/user'
import { sysUserPut } from '@/api/employees'

export default {
  components: {
    Info: () => import('./components/Info.vue'),
    Job: () => import('./components/Job.vue')
  },

  data() {
    return {
      id: this.$route.params.id,
      activeName: 'first',
      userInfo: {},
      userInfo2: {},
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'change' }],
        password: [
          { required: true, message: '必填', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysUser(this.id)
      this.form.username = res.data.username
      this.userInfo = res.data
      this.userInfo2 = JSON.parse(JSON.stringify(res.data))
      // this.form.password = res.data.password
      console.log(res)
    },
    // 更新按钮点击
    submit(id) {
      console.log('更新')
      this.$refs.form.validate(async(result) => {
        if (result) {
          const res = await sysUserPut({
            ...this.userInfo,
            ...this.form
          })
          this.$message.success('更新成功')
          console.log(res)
          this.getData()
          if (this.id === this.$store.state.userInfo.id) {
            this.$store.dispatch('user/getUserInfo')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px;
  .form {
    width: 400px;
    margin: 40px 0 30px 120px;
  }
}
</style>
