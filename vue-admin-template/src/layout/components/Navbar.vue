<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="name">
      <span>江苏传智播客教育科技股份有限公司</span>

      <span class="tip">体验版</span>
    </div>
    <Lang />
    <svg-icon icon-class="fullscreen" class="mr" @click="fullClick" />
    <el-dropdown trigger="click">
      <div class="user">
        <img
          v-errorimg="avatar1"
          :src="$store.state.user.userInfo.staffPhoto"
          alt=""
          class="avatar"
        >
        <span class="username">{{ $store.state.user.userInfo.username }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click.native="$router.push('/')"
          >首页</el-dropdown-item>
          <el-dropdown-item @click.native="toGit">项目地址</el-dropdown-item>
          <el-dropdown-item divided @click.native="exit">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { mapGetters } from 'vuex'
import Lang from '@/components/lang'

import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger,
    Lang
  },
  data() {
    return {
      avatar1: require('@/assets/common/img.jpeg')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toGit() {
      location.href = 'http://www.kuwo.cn/rankList'
    },
    exit() {
      this.$confirm('您确定退出该网站吗')
        .then(() => {
          this.$message.success('退出成功')
          this.$store.commit('user/LOGOUT')
          this.$router.push('/login')
        })
        .catch(() => {})
      console.log('退出')
    },
    // 全屏点击
    fullClick() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message.error('该浏览器不支持全屏')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background: #4676fa;
  display: flex;
  color: #fff;
  align-items: center;

  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .name {
    flex: 1;
    .tip {
      padding: 6px;
      border-radius: 8px;
      background-color: #84a9fe;
      margin-left: 15px;
      font-size: 12px;
    }
  }

  .hamburger-container {
    ::v-deep svg {
      fill: #fff;
    }
  }
  .user {
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: 15px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .username {
      margin: 0 12px;
    }
  }
}
.mr {
  margin-right: 15px;
  cursor: pointer;
}
</style>
