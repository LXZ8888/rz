<template>
  <el-dropdown>
    <span> <svg-icon icon-class="language" class="icon" /></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="$i18n.locale === 'zh'"
          @click.native="changeLang('zh')"
        >中文</el-dropdown-item>
        <el-dropdown-item
          :disabled="$i18n.locale === 'en'"
          @click.native="changeLang('en')"
        >en</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import jsCookie from 'js-cookie'
export default {
  methods: {
    changeLang(code) {
      this.$i18n.locale = code
      this.$router.go(0)
      jsCookie.set('lang', code)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  color: #fff;
  font-size: 20px;
  margin-right: 15px;
}
</style>
