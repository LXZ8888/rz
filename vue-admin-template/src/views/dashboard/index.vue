<template>
  <div>
    {{ $t('xxx') }}
    <button @click="$i18n.locale = 'en'">切换成英文</button>
    <button @click="$i18n.locale = 'zh'">切换成中文</button>
    <button @click="btnClick">确定框</button>
  </div>
</template>

<script>
export default {
  methods: {
    btnClick() {
      this.$confirm('提示信息')
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style></style>
