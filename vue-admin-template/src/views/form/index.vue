<template>
  <div>
    123
    <button @click="btnClick">跳转路由</button>
  </div>
</template>

<script>
export default {
  created() {
    // 创建前，vue渲染的dom还不能访问
    document.title = this.$route.meta.xxx
    // document.querySelector('title')=this.$route.meta.xxx 意思跟上面是一样的。
    console.log(this.$route)
  },
  methods: {
    btnClick() {
      this.$router.push('/example/table')
    }
  }
}
</script>

<style></style>
