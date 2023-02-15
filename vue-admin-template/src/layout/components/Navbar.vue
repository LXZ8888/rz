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
    <el-dropdown trigger="click">
      <div class="user">
        <img src="@/assets/common/head.jpg" alt="" class="avatar">
        <span class="username">我c罗必胜</span>
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
import { mapGetters } from 'vuex'

import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
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
      console.log('退出')
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
</style>
