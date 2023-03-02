<template>
  <div class="login">
    <el-form ref="form" :model="form" class="form" :rules="rules">
      <img src="@/assets/common/login-logo.png" alt="" class="logo">
      <el-form-item label="用户名" prop="mobile">
        <el-input v-model="form.mobile" prefix-icon="el-icon-user-solid" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          show-password
          prefix-icon="el-icon-lock"
          @keyup.enter.native="submit"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="subimt">{{
          $t('login.login')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sysLogin } from '@/api/login'
export default {
  data() {
    return {
      form: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: this.$t('login.tip'), trigger: 'change' },
          {
            pattern: /^1[3,9]\d{9}$/,
            message: '请正确输入手机号',
            trigger: 'change'
          }
        ],
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
  methods: {
    subimt() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          const res = await sysLogin(this.form)
          if (res.success) {
            this.$store.dispatch('user/setToken', res.data)
            this.$message.success('登录成功')
            this.$router.push('/')
            console.log(res)
          } else {
            this.$message.error(res.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  // background: url('@/assets/common/login.jpg');
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // @代表src，在html,js代表src,在style也就是css中不是,~@才是代表src。在vue-cli 5.x版本后，@代表src,~@也是代表src
  background: url('~@/assets/common/login.jpg');
  .form {
    height: 400px;
    // width: 500px;
    // background-color: #f00;
    .logo {
      padding: 0 15px 20px 15px;
    }
    .btn {
      width: 100%;
      background-color: #407ffe;
      height: 60px;
      font-size: 24px;
    }
    ::v-deep .el-input__inner {
      height: 55px;
      background-color: hsla(0, 0%, 100%, 0.7);
    }
    ::deep .el-form-item__error {
      color: #fff;
    }
  }
}
</style>
