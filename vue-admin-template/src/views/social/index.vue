<template>
  <div>
    <!--
    上传组件
    el-upload
     http-request:自定义上传
   -->
    <el-upload
      :http-request="httpRequest"
      action="#"
      :before-upload="beforeUpload"
    >上传图片</el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    httpRequest(res) {
      console.log(res)
    }
  }
}
</script>

<style></style>
