<template>
  <div>
    <!-- 需求：num可修改持久化用cookie处理 -->
    <h1>{{ num }}</h1>
    <button @click="setNum">修改num</button>
  </div>
</template>

<script>
import jsCookie from 'js-cookie'
export default {
  data() {
    return {
      // +是将字符串转为数字，初始值设置
      num: +jsCookie.get('num') || 10
    }
  },
  methods: {
    setNum() {
      this.num++
      // 存储数据
      jsCookie.set('num', this.num)
    }
  }
}
</script>

<style></style>
