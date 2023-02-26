<template>
  <div>
    <button @click="btnClick">点击生成二维码</button>
    <canvas ref="canvas" />
  </div>
</template>

<script>
import Qrcode from 'qrcode'

export default {
  data() {
    return {}
  },
  methods: {
    btnClick() {
      Qrcode.toCanvas(this.$refs.canvas, '123', {
        width: 350,
        height: 350
      })
    }
  }
}
</script>

<style></style>
