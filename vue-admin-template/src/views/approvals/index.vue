<template>
  <div>
    审批
    <button @click="btnClick">调用api</button>
  </div>
</template>
<script>
import { sysLogin } from '@/api/test'
export default {
  methods: {
    async btnClick() {
      const res = await sysLogin()
      console.log(res)
    }
  }
}
</script>
<style></style>
